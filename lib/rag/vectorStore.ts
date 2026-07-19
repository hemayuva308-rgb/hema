import fs from "node:fs";
import path from "node:path";
import type { EmbeddedChunk, RetrievedChunk, VectorStoreFile } from "./types";

const STORE_PATH = path.join(process.cwd(), "data", "vector-store.json");

let cache: VectorStoreFile | null = null;

/**
 * Local vector storage: a flat JSON file (data/vector-store.json) holding
 * every chunk plus its locally-computed embedding, searched with brute-force
 * cosine similarity in plain JavaScript.
 *
 * Why not hnswlib-node or faiss-node?
 * Both are native addons. faiss-node's native build is fragile across
 * platforms. hnswlib-node is more portable in theory, but its published
 * package ships NO prebuilt binaries — `npm install` runs `node-gyp rebuild`
 * unconditionally, which requires a full C++ build toolchain (Visual Studio
 * Build Tools + Python on Windows, Xcode Command Line Tools on macOS). That
 * install step is a common source of failures, especially on Windows.
 *
 * At this knowledge base's scale (a few hundred small chunks, 384-dim
 * vectors), brute-force cosine similarity over a plain array is well under
 * a millisecond per query — there's no real performance case for an
 * approximate-nearest-neighbor index here, and going pure-JS means
 * `npm install` never needs to compile anything.
 *
 * If the knowledge base grows into the tens of thousands of chunks and you
 * want a real ANN index, swap this module for hnswlib-node or faiss-node —
 * `retriever.ts` and `build-index.ts` only depend on `search()` and
 * `saveVectorStore()`, so nothing else needs to change.
 */
export function loadVectorStore(forceReload = false): VectorStoreFile {
  if (cache && !forceReload) return cache;

  if (!fs.existsSync(STORE_PATH)) {
    throw new Error(
      `Vector store not found at ${STORE_PATH}. Run "npm run build:index" first.`
    );
  }

  const raw = fs.readFileSync(STORE_PATH, "utf-8");
  cache = JSON.parse(raw) as VectorStoreFile;
  return cache;
}

export function saveVectorStore(store: VectorStoreFile): void {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  cache = store;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function search(
  queryEmbedding: number[],
  topK = 5,
  forceReload = false
): RetrievedChunk[] {
  const store = loadVectorStore(forceReload);

  const scored: RetrievedChunk[] = store.chunks.map((chunk: EmbeddedChunk) => ({
    id: chunk.id,
    source: chunk.source,
    heading: chunk.heading,
    content: chunk.content,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export function isIndexStale(): boolean {
  const docsDir = path.join(process.cwd(), "docs");
  if (!fs.existsSync(STORE_PATH) || !fs.existsSync(docsDir)) return true;

  const store = loadVectorStore(true);
  const generatedAt = new Date(store.generatedAt).getTime();

  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
  return files.some((f) => {
    const stat = fs.statSync(path.join(docsDir, f));
    return stat.mtimeMs > generatedAt;
  });
}
