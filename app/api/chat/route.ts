import { NextRequest } from "next/server";
import { retrieveRelevantChunks } from "@/lib/rag/retriever";
import { buildContextBlock, buildHistoryBlock, buildUserPrompt } from "@/lib/rag/prompts";
import { generateLocalAnswer, hasLocalLlmCredentials, AI_UNAVAILABLE_MESSAGE } from "@/lib/rag/localLlm";
import { detectDeterministicIntent, resolveDeterministicIntent, FALLBACK_MESSAGE } from "@/lib/rag/intents";
import type { ChatMessage } from "@/lib/rag/types";

export const runtime = "nodejs";

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

const encoder = new TextEncoder();

/**
 * Streams `text` to the client word-by-word so the UI shows a natural
 * typing animation, regardless of whether the text came from the local LLM,
 * a deterministic business-hours reply, or the contact fallback.
 */
function streamText(text: string): ReadableStream<Uint8Array> {
  const words = text.split(/(\s+)/); // keep whitespace tokens so spacing is preserved
  let i = 0;

  return new ReadableStream({
    async pull(controller) {
      if (i >= words.length) {
        controller.close();
        return;
      }
      // Small batches read more naturally than single characters and stay fast.
      const batch = words.slice(i, i + 3).join("");
      i += 3;
      controller.enqueue(encoder.encode(batch));
      await new Promise((r) => setTimeout(r, 18));
    },
  });
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const message = (body.message ?? "").toString().trim();
  const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

  if (!message) {
    return new Response(JSON.stringify({ error: "message is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 1. Deterministic, real-time answers (availability / call) bypass the LLM entirely.
  const intent = detectDeterministicIntent(message);
  if (intent) {
    return new Response(streamText(resolveDeterministicIntent(intent)), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // 2. If Ollama isn't reachable at all this still lets us try — the local
  // LLM call below fails gracefully with AI_UNAVAILABLE_MESSAGE if it's down.
  if (!hasLocalLlmCredentials()) {
    return new Response(streamText(AI_UNAVAILABLE_MESSAGE), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    // 3. Semantic retrieval: embed the question, pull top-5 chunks from the local vector store.
    const chunks = await retrieveRelevantChunks(message, 5);
    const contextBlock = buildContextBlock(chunks);
    const historyBlock = buildHistoryBlock(history);
    const prompt = buildUserPrompt(message, contextBlock, historyBlock);

    // 4. Generate, grounded strictly in the retrieved context.
    const answer = await generateLocalAnswer(prompt);

    const finalText =
      answer === "NOT_FOUND" || answer.trim().length === 0
        ? FALLBACK_MESSAGE
        : answer;

    return new Response(streamText(finalText), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Chat route error:", error);
    // Never crash — the vector store may be missing (index not built yet) or
    // the embedding call may have failed. Always resolve to a safe fallback.
    const isMissingIndex =
      error instanceof Error && error.message.includes("Vector store not found");

    const safeMessage = isMissingIndex
      ? "The knowledge base hasn't been indexed yet. Run `npm run build:index` and try again."
      : AI_UNAVAILABLE_MESSAGE;

    return new Response(streamText(safeMessage), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
