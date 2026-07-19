"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05, ease: EASE }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-card"
      style={{ borderColor: "var(--border)" }}
    >
      {/* image */}
      <div
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden"
        style={{ background: "var(--surface-2)" }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span className="token-mono text-ink-faint">Image Coming Soon</span>
          </div>
        )}
        <span
          className="token-mono absolute left-4 top-4 rounded-full px-3 py-1 text-[0.65rem]"
          style={{ background: "rgba(255,255,255,0.9)", color: "var(--ink)" }}
        >
          {project.imageLabel}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="token-mono mb-2">{project.category}</p>
        <h4 className="font-display text-xl font-medium leading-tight tracking-tight text-ink md:text-2xl">
          {project.name}
        </h4>
        <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <div
          className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t pt-5"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {project.stack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="token-mono rounded-full border px-3 py-1 text-[0.65rem] normal-case tracking-normal"
                  style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}

          <a
            href={project.link}
            target={project.link !== "#" ? "_blank" : undefined}
            rel={project.link !== "#" ? "noreferrer" : undefined}
            className="group/link inline-flex shrink-0 items-center gap-1 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink"
          >
            {project.linkLabel.replace("→", "").trim()}
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
