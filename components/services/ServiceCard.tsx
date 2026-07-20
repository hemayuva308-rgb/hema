"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Service } from "./data";
import { formatINR, buildWhatsAppLink, serviceBookingMessage } from "./data";
import { useCountUp } from "./useCountUp";

const springCfg = { stiffness: 220, damping: 22, mass: 0.6 };

export default function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mvY, [0, 1], [3, -3]), springCfg);
  const rotateY = useSpring(useTransform(mvX, [0, 1], [-3, 3]), springCfg);
  const glowX = useTransform(mvX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(mvY, [0, 1], ["10%", "90%"]);
  const glowBackground = useTransform([glowX, glowY], (values) => {
    const [gx, gy] = values as string[];
    return `radial-gradient(280px circle at ${gx} ${gy}, rgba(15,23,42,0.08), transparent 70%)`;
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  const { ref: priceRef, display } = useCountUp(service.basePrice, formatINR);
  const isRange = service.priceDisplay.includes("–");
  const rangeTail = isRange ? service.priceDisplay.split("–")[1]?.trim() : null;
  const showsStartsAt = service.priceDisplay.startsWith("Starts at");

  const waLink = buildWhatsAppLink(serviceBookingMessage(service.title));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", ...springCfg }}
      style={{
        borderColor: "var(--border)",
        rotateX,
        rotateY,
        transformPerspective: 1000,
        backgroundColor: "#ffffff", // Solid white background (Opaque)
        isolation: "isolate", // own stacking context — stops sibling cards bleeding through
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl md:p-10"
    >
      {/* animated border sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-0"
        style={{
          padding: 1,
          background: "conic-gradient(from 180deg, transparent, var(--ink-faint), transparent 30%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude" as any,
        }}
      />
      {/* mouse-follow glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <span className="font-display text-4xl font-light leading-none text-ink-faint md:text-5xl">
            {service.index}
          </span>
          <span className="token-mono mt-1 text-right">{service.category}</span>
        </div>

        <h3 className="font-display mt-6 text-3xl font-medium leading-[1.05] tracking-tight text-ink md:text-4xl">
          {service.title}
        </h3>

        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-muted">
          {service.description}
        </p>
      </div>

      <div
        className="relative z-10 mt-8 flex flex-wrap items-end justify-between gap-6 border-t pt-6"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div>
          <p className="token-mono mb-1">{service.priceLabel}</p>
          <p className="brutal-heading text-3xl md:text-[2.15rem]">
            {showsStartsAt && (
              <span className="mr-1 align-baseline text-base font-medium normal-case tracking-normal text-ink-muted">
                Starts at
              </span>
            )}
            <span ref={priceRef}>{display}</span>
            {isRange && rangeTail && <span className="ml-1 text-ink-faint"> – {rangeTail}</span>}
          </p>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--ink)" }}
        >
          <span className="absolute inset-0 -z-10 bg-black opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
          Book Now
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}