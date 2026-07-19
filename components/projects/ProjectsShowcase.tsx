"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, type Project } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;

// Central, rotating "flagship" card — cycles through projects that have real
// preview imagery so the centerpiece always looks its best.
const MAIN_IDS = ["career-finder", "aurum-bistro", "scube3d"];
// Flanking nameplate stacks — three per side, independent of the main rotation.
const LEFT_IDS = ["intasia", "quix", "personal-ai-assistant"];
const RIGHT_IDS = ["trading-platform", "personal-portfolio", "gym-website"];

const byId = (id: string) => PROJECTS.find((p) => p.id === id)!;

const MAIN_PROJECTS = MAIN_IDS.map(byId);
const LEFT_PROJECTS = LEFT_IDS.map(byId);
const RIGHT_PROJECTS = RIGHT_IDS.map(byId);

const MAIN_ROTATE_MS = 4200;

function Nameplate({ project }: { project: Project }) {
  return (
    <div
      className="flex shrink-0 flex-col justify-center border bg-white/80 px-3 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-5 md:px-5 md:py-6"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="truncate text-[9px] font-semibold uppercase tracking-wide text-ink sm:text-[10px] md:text-xs">
        {project.name}
      </p>
      <p className="mt-1 hidden truncate text-[9px] text-ink-faint sm:block md:text-[10px]">
        {project.category}
      </p>
    </div>
  );
}

function NameplateColumn({
  projects,
  direction,
  duration,
}: {
  projects: Project[];
  direction: "up" | "down";
  duration: number;
}) {
  // Triple the list so a shift of exactly one third of the track height
  // loops back to a visually identical frame — a seamless infinite scroll.
  const track = useMemo(() => [...projects, ...projects, ...projects], [projects]);

  return (
    <div
      className="relative h-full w-[20vw] max-w-[110px] shrink-0 overflow-hidden sm:max-w-[150px] md:max-w-[220px] lg:max-w-[260px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex flex-col gap-3 md:gap-4"
        animate={{ y: direction === "up" ? ["0%", "-33.3333%"] : ["-33.3333%", "0%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {track.map((project, i) => (
          <Nameplate key={`${project.id}-${i}`} project={project} />
        ))}
      </motion.div>
    </div>
  );
}

function MainCard({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -16 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative flex h-full w-full flex-col justify-end overflow-hidden border p-5 sm:p-7 md:p-9"
      style={{ borderColor: "var(--border)" }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 70vw, 40vw"
          className="absolute inset-0 -z-10 object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 -z-10" style={{ background: "var(--ink)" }} />
      )}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.65) 65%, rgba(15,23,42,0.88) 100%)",
        }}
      />

      <p className="token-mono mb-2 text-white/70">Flagship Build</p>
      <h3 className="font-display text-2xl leading-[1.05] text-white sm:text-3xl md:text-5xl">
        {project.name}
      </h3>
      <p className="mt-2 text-xs text-white/70 sm:text-sm">{project.category}</p>

      <a
        href={project.link}
        target={project.link !== "#" ? "_blank" : undefined}
        rel={project.link !== "#" ? "noreferrer" : undefined}
        className="mt-5 inline-flex w-fit items-center gap-2 border border-white/40 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink sm:text-[0.75rem]"
      >
        {project.linkLabel.replace("→", "").trim()}
        <span aria-hidden>→</span>
      </a>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      setMainIndex((i) => (i + 1) % MAIN_PROJECTS.length);
    }, MAIN_ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-[58vh] min-h-[380px] w-full items-stretch justify-center gap-2 px-[4%] sm:h-[64vh] sm:gap-4 md:h-[70vh] md:gap-8 lg:gap-10">
      <NameplateColumn projects={LEFT_PROJECTS} direction="up" duration={16} />

      <div className="min-w-0 flex-1 max-w-3xl">
        <AnimatePresence mode="wait">
          <MainCard project={MAIN_PROJECTS[mainIndex]} />
        </AnimatePresence>
      </div>

      <NameplateColumn projects={RIGHT_PROJECTS} direction="down" duration={19} />
    </div>
  );
}
