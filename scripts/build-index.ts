/**
 * Build (or rebuild) the local vector index from everything in /docs.
 *
 * Run:
 *   npm run build:index
 *
 * This is fully offline after the first run (the BGE model weights are
 * downloaded once and cached in .cache/transformers). No API key is needed
 * for this step — the local LLM (Ollama) is only used later, at answer-generation time.
 *
 * Also run automatically before `next build` (see package.json), and should
 * be re-run any time a markdown file in /docs changes and you want the
 * change reflected in production. In development, retriever.ts detects
 * stale docs and reloads automatically.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// Load .env.local (Next.js convention) then .env as a fallback. Not required
// for this script (embeddings are local), but kept so OLLAMA_MODEL /
// other future build-time env vars are picked up consistently.
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

import { chunkMarkdown } from "../lib/rag/chunker";
import { embedBatch, EMBEDDING_MODEL, EMBEDDING_DIMENSIONS } from "../lib/rag/embeddings";
import { saveVectorStore } from "../lib/rag/vectorStore";
import type { DocChunk, EmbeddedChunk } from "../lib/rag/types";

async function main() {
  const docsDir = path.join(process.cwd(), "docs");
  const files = fs
    .readdirSync(docsDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    console.error(`❌ No markdown files found in ${docsDir}`);
    process.exit(1);
  }

  console.log(`📚 Found ${files.length} markdown files in /docs`);

  let allChunks: DocChunk[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(docsDir, file), "utf-8");
    const chunks = chunkMarkdown(file, raw);
    allChunks = allChunks.concat(chunks);
    console.log(`   • ${file} → ${chunks.length} chunk(s)`);
  }

  console.log(`\n✂️  Total chunks: ${allChunks.length}`);
  console.log(`🧠 Embedding locally with ${EMBEDDING_MODEL} (via @xenova/transformers) ...`);
  console.log(
    "   First run downloads the ONNX model weights (~130MB) and caches them in " +
      ".cache/transformers — every run after that is fully offline.\n"
  );

  const embeddings = await embedBatch(
    allChunks.map((c) => c.content),
    (done, total) => {
      process.stdout.write(`\r   Progress: ${done}/${total}`);
    }
  );
  console.log("\n✅ Embedding complete.");

  const embeddedChunks: EmbeddedChunk[] = allChunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
  }));

  saveVectorStore({
    model: EMBEDDING_MODEL,
    dimensions: EMBEDDING_DIMENSIONS,
    generatedAt: new Date().toISOString(),
    chunks: embeddedChunks,
  });

  console.log(`💾 Saved data/vector-store.json (${embeddedChunks.length} chunks).`);
}

main().catch((err) => {
  console.error("\n❌ Index build failed:", err);
  process.exit(1);
});
