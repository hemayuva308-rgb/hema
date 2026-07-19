import { SYSTEM_INSTRUCTIONS } from "./prompts";

// Fully local answer generation — no API key, no external network call.
// Uses Ollama (https://ollama.com), which runs open models (Llama 3, Qwen,
// Mistral, Phi, etc.) locally and exposes a simple HTTP API on localhost.
//
// Setup (one-time):
//   1. Install Ollama: https://ollama.com/download
//   2. Pull a model:   ollama pull llama3.1
//   3. Ollama runs its local server automatically (default: http://localhost:11434)
//
// Embeddings were already fully local (see lib/rag/embeddings.ts). With this
// module, the entire RAG pipeline — retrieval AND generation — never leaves
// the machine.

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const CHAT_MODEL = process.env.OLLAMA_MODEL || "llama3.1";

export const AI_UNAVAILABLE_MESSAGE =
  "AI service is temporarily unavailable. Make sure Ollama is running locally (`ollama serve`) and that the model has been pulled (`ollama pull " +
  CHAT_MODEL +
  "`).";

/**
 * Local models have no API key to check — the only failure mode is Ollama
 * not running, which is handled as a request-time error below. This always
 * returns true; it exists so route.ts can keep the same "do we even attempt
 * generation" check it had before.
 */
export function hasLocalLlmCredentials(): boolean {
  return true;
}

/**
 * Runs the full local completion (via Ollama's /api/chat endpoint) and
 * returns the final text.
 *
 * We resolve the complete answer first (rather than piping the model's
 * native stream straight to the client) because the model is instructed to
 * reply with the exact sentinel "NOT_FOUND" when the retrieved context
 * doesn't answer the question — that sentinel must be inspected in full
 * before deciding whether to show the model's words or the contact
 * fallback. The route handler then re-streams this text to the client for
 * the typing animation, so the UX is still a live stream.
 */
export async function generateLocalAnswer(userPrompt: string): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CHAT_MODEL,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTIONS },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Ollama request failed:", response.status, await response.text());
      return AI_UNAVAILABLE_MESSAGE;
    }

    const data = await response.json();
    const text: string | undefined = data?.message?.content;
    return (text ?? "").trim();
  } catch (error) {
    console.error("Local LLM generation error:", error);
    return AI_UNAVAILABLE_MESSAGE;
  }
}
