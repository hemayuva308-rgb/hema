"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FILTERS, PROJECTS, type ProjectCategory } from "./data";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const visible = useMemo(
    () => (active === "all" ? PROJECTS : PROJECTS.filter((p) => p.filterCategory === active)),
    [active]
  );

  return (
    <div className="px-[6%] pb-24">
      {/* filter bar */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="token-mono rounded-full border px-4 py-2 transition-colors duration-300"
              style={{
                borderColor: isActive ? "var(--ink)" : "var(--border)",
                background: isActive ? "var(--ink)" : "transparent",
                color: isActive ? "var(--white)" : "var(--ink-muted)",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
