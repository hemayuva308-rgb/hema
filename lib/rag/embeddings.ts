import { env, pipeline, type FeatureExtractionPipeline } from "@xenova/transformers";
import path from "node:path";

/**
 * Fully local embeddings — no API key, no network calls at query time.
 *
 * Model: BAAI/bge-small-en-v1.5 (384 dimensions), run via the ONNX build
 * published as "Xenova/bge-small-en-v1.5" so it works with @xenova/transformers
 * in plain Node.js (no Python runtime required).
 *
 * The ONNX weights (~130MB) are downloaded from the Hugging Face Hub the
 * FIRST time this runs, then cached on disk in .cache/transformers. Every
 * run after that is 100% offline. No external LLM is called for embeddings —
 * a local model (via Ollama, see lib/rag/localLlm.ts) is only used for the
 * final answer generation.
 */

// Cache model weights inside the project instead of the OS temp dir, so the
// cache survives reinstalls and is easy to find/clear.
env.cacheDir = path.join(process.cwd(), ".cache", "transformers");
env.allowRemoteModels = true; // needed for the first download only
env.allowLocalModels = true;

const MODEL_ID = "Xenova/bge-small-en-v1.5";
export const EMBEDDING_MODEL = MODEL_ID;
export const EMBEDDING_DIMENSIONS = 384;

// BGE models are asymmetric: retrieval QUERIES should be prefixed with this
// instruction for best accuracy, but the PASSAGES/chunks being indexed
// should NOT be prefixed. See the official BGE usage docs.
const QUERY_INSTRUCTION =
  "Represent this sentence for searching relevant passages: ";

const BATCH_SIZE = 16;

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    extractorPromise = pipeline("feature-extraction", MODEL_ID) as Promise<FeatureExtractionPipeline>;
  }
  return extractorPromise;
}

/**
 * Local model — there is no API key to check. Kept for interface symmetry
 * with the rest of the pipeline (and so callers don't need to change if a
 * hosted embedding model is ever swapped back in later).
 */
export function hasEmbeddingCredentials(): boolean {
  return true;
}

/**
 * Embeds a single piece of text.
 * Pass `isQuery: true` when embedding a user's search question so the BGE
 * retrieval instruction prefix is applied; leave it false when embedding
 * knowledge-base chunks at index-build time.
 */
export async function embedText(text: string, isQuery = false): Promise<number[]> {
  const extractor = await getExtractor();
  const input = isQuery ? `${QUERY_INSTRUCTION}${text}` : text;
  const output = await extractor(input, { pooling: "mean", normalize: true });
  return Array.from(output.data as Float32Array);
}

/**
 * Embeds many chunks in small batches (fast, CPU-only, fully offline).
 * No retries/rate-limit handling needed — there's no external API involved.
 */
export async function embedBatch(
  texts: string[],
  onProgress?: (done: number, total: number) => void
): Promise<number[][]> {
  const extractor = await getExtractor();
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const output = await extractor(batch, { pooling: "mean", normalize: true });

    const [batchLen, dim] = output.dims as [number, number];
    const flat = output.data as Float32Array;

    for (let b = 0; b < batchLen; b++) {
      results.push(Array.from(flat.slice(b * dim, (b + 1) * dim)));
    }

    onProgress?.(Math.min(i + BATCH_SIZE, texts.length), texts.length);
  }

  return results;
}
