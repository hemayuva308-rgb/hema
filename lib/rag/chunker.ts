import type { DocChunk } from "./types";

const MAX_CHUNK_CHARS = 900;
const OVERLAP_CHARS = 120;

/**
 * Splits a single markdown file into semantically meaningful chunks.
 *
 * Strategy:
 * 1. Split on markdown headings (#, ##, ###) so each chunk stays under one topic.
 * 2. If a section under a heading is still too long, split it further by
 *    paragraph with a small character overlap so context isn't lost at the seams.
 *
 * This keeps chunks small enough for accurate embedding similarity while
 * preserving enough surrounding context (the heading) for the LLM to answer well.
 */
export function chunkMarkdown(source: string, rawContent: string): DocChunk[] {
  const lines = rawContent.split("\n");

  type Section = { heading: string; body: string[] };
  const sections: Section[] = [];
  let current: Section = { heading: source, body: [] };

  for (const line of lines) {
    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line.trim());
    if (headingMatch) {
      if (current.body.some((l) => l.trim().length > 0)) {
        sections.push(current);
      }
      current = { heading: headingMatch[2].trim(), body: [] };
    } else {
      current.body.push(line);
    }
  }
  if (current.body.some((l) => l.trim().length > 0)) {
    sections.push(current);
  }

  const chunks: DocChunk[] = [];
  let chunkIndex = 0;

  for (const section of sections) {
    const text = section.body.join("\n").trim();
    if (!text) continue;

    if (text.length <= MAX_CHUNK_CHARS) {
      chunks.push({
        id: `${source}#${chunkIndex++}`,
        source,
        heading: section.heading,
        content: `## ${section.heading}\n${text}`,
      });
      continue;
    }

    // Split long sections by paragraph, respecting max chunk size with overlap.
    const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    let buffer = "";

    for (const para of paragraphs) {
      if ((buffer + "\n\n" + para).length > MAX_CHUNK_CHARS && buffer.length > 0) {
        chunks.push({
          id: `${source}#${chunkIndex++}`,
          source,
          heading: section.heading,
          content: `## ${section.heading}\n${buffer.trim()}`,
        });
        // carry a small overlap tail forward for continuity
        buffer = buffer.slice(Math.max(0, buffer.length - OVERLAP_CHARS)) + "\n\n" + para;
      } else {
        buffer = buffer ? `${buffer}\n\n${para}` : para;
      }
    }

    if (buffer.trim()) {
      chunks.push({
        id: `${source}#${chunkIndex++}`,
        source,
        heading: section.heading,
        content: `## ${section.heading}\n${buffer.trim()}`,
      });
    }
  }

  return chunks;
}
