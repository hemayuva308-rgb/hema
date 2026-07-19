"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/components/services/data";
import DesktopStack from "@/components/services/DesktopStack";
import MobileSlider from "@/components/services/MobileSlider";
import PricingCalculatorDrawer from "@/components/services/PricingCalculatorDrawer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [calcOpen, setCalcOpen] = useState(false);

  const handleActiveChange = useCallback((i: number) => setActiveIndex(i), []);
  const activeService = SERVICES[activeIndex];

  return (
    <section id="services" className="relative" style={{ background: "var(--surface)" }}>
      <div className="px-[6%] lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* LEFT — sticky intro, desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center">
            <p className="token-mono mb-5">What I Offer</p>
            <h2 className="brutal-heading text-4xl md:text-5xl">
              Services
              <br />
              &amp; Pricing
            </h2>
            <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-ink-muted">
              End-to-end digital solutions — from branding to scalable software.
            </p>

            <button
              onClick={() => setCalcOpen(true)}
              className="mt-10 inline-flex w-fit items-center gap-3 rounded-full px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--ink)" }}
            >
              Estimate Your Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            {/* progress rail — reflects the card currently in focus on the right */}
            <div className="mt-16 flex items-center gap-4">
              <div className="flex flex-col gap-2">
                {SERVICES.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? "28px" : "10px",
                      background: i === activeIndex ? "var(--ink)" : "var(--border)",
                    }}
                  />
                ))}
              </div>
              <div className="token-mono">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeService.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {activeService.index} / {String(SERVICES.length).padStart(2, "0")}
                    <br />
                    <span className="text-ink-faint">{activeService.category}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — desktop scroll stack */}
        <DesktopStack onActiveChange={handleActiveChange} />
      </div>

      {/* MOBILE — intro + fullscreen slider */}
      <div className="lg:hidden">
        <div className="px-[6%] pb-10 pt-24">
          <p className="token-mono mb-4">What I Offer</p>
          <h2 className="brutal-heading text-4xl">Services &amp; Pricing</h2>
          <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-ink-muted">
            End-to-end digital solutions — from branding to scalable software.
          </p>
          <button
            onClick={() => setCalcOpen(true)}
            className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white"
            style={{ background: "var(--ink)" }}
          >
            Estimate Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <MobileSlider />
      </div>

      <PricingCalculatorDrawer
        open={calcOpen}
        onClose={() => setCalcOpen(false)}
        initialServiceId={activeService.id}
      />
    </section>
  );
}
