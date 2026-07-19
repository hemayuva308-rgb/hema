import { embedText } from "./embeddings";
import { search, isIndexStale } from "./vectorStore";
import type { RetrievedChunk } from "./types";

const TOP_K = 5;

/**
 * Retrieves the top-K most relevant knowledge-base chunks for a user question.
 * The query is embedded locally (BAAI/bge-small-en-v1.5 via @xenova/transformers)
 * with the BGE retrieval-query instruction prefix, then matched by brute-force
 * cosine similarity against data/vector-store.json (see vectorStore.ts for why
 * that's plain JSON + JS instead of a native ANN library). No network call is
 * made here — the only network request in the whole pipeline is the final
 * local LLM chat completion (via Ollama) in lib/rag/localLlm.ts.
 *
 * In development, automatically reloads the index if docs/ changed since the
 * last `npm run build:index`, so editing a markdown file is picked up without
 * a manual restart.
 */
export async function retrieveRelevantChunks(
  query: string,
  topK = TOP_K
): Promise<RetrievedChunk[]> {
  const forceReload =
    process.env.NODE_ENV !== "production" ? safeIsStale() : false;

  const queryEmbedding = await embedText(query, /* isQuery */ true);
  return search(queryEmbedding, topK, forceReload);
}

function safeIsStale(): boolean {
  try {
    return isIndexStale();
  } catch {
    return false;
  }
}
