"use client";

import { motion } from "framer-motion";

const VENTURES = ["Quix — Founder", "INTASIA — Co-Founder"];
const TRACK = [...VENTURES, ...VENTURES, ...VENTURES, ...VENTURES];

export default function VenturesMarquee() {
  return (
    <section id="ventures" className="overflow-hidden border-y py-10" style={{ borderColor: "var(--border)" }}>
      <div className="no-scrollbar flex w-max gap-6">
        <motion.div
          className="flex shrink-0 items-center gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          {[...TRACK, ...TRACK].map((v, i) => (
            <span
              key={i}
              className="token-mono whitespace-nowrap border px-6 py-3 text-sm font-semibold text-ink"
              style={{ borderColor: "var(--ink)" }}
            >
              {v}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
