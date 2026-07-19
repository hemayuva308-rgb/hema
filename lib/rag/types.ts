export interface DocChunk {
  id: string;
  source: string; // e.g. "about.md"
  heading: string; // nearest markdown heading for context
  content: string;
}

export interface EmbeddedChunk extends DocChunk {
  embedding: number[];
}

/**
 * The local vector store file (data/vector-store.json): every chunk plus
 * its locally-computed embedding, searched with brute-force cosine
 * similarity at query time. See lib/rag/vectorStore.ts for why a native
 * ANN library (hnswlib-node / faiss-node) isn't used here.
 */
export interface VectorStoreFile {
  model: string;
  dimensions: number;
  generatedAt: string;
  chunks: EmbeddedChunk[];
}

export interface RetrievedChunk extends DocChunk {
  score: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}
