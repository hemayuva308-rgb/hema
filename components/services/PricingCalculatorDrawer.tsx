"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, formatINR, buildWhatsAppLink, calculatorBookingMessage } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PricingCalculatorDrawer({
  open,
  onClose,
  initialServiceId,
}: {
  open: boolean;
  onClose: () => void;
  initialServiceId?: string;
}) {
  const [serviceId, setServiceId] = useState(initialServiceId ?? SERVICES[0].id);
  const [addonIds, setAddonIds] = useState<Set<string>>(new Set());
  const [timeline, setTimeline] = useState<"standard" | "express">("standard");

  useEffect(() => {
    if (open) setServiceId(initialServiceId ?? SERVICES[0].id);
  }, [open, initialServiceId]);

  // Reset add-ons whenever the selected service changes — add-ons are service specific.
  useEffect(() => {
    setAddonIds(new Set());
  }, [serviceId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId)!, [serviceId]);

  const selectedAddons = useMemo(
    () => service.addons.filter((a) => addonIds.has(a.id)),
    [service, addonIds]
  );

  const total = useMemo(() => {
    const addonSum = selectedAddons.reduce((s, a) => s + a.price, 0);
    const sum = service.basePrice + addonSum;
    return timeline === "express" ? Math.round(sum * 1.2) : sum;
  }, [service, selectedAddons, timeline]);

  const toggleAddon = (id: string) => {
    setAddonIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const waLink = buildWhatsAppLink(
    calculatorBookingMessage({
      serviceTitle: service.title,
      addonLabels: selectedAddons.map((a) => a.label),
      timelineLabel: timeline === "express" ? `Express (${service.timeline.express})` : `Standard (${service.timeline.standard})`,
      total,
    })
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Pricing calculator"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div
              className="flex items-center justify-between border-b px-6 py-5 md:px-8"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <p className="token-mono mb-1">Budget Blueprint</p>
                <h3 className="brutal-heading text-xl md:text-2xl">Estimate Your Project</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close calculator"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-ink-muted transition-colors hover:border-ink hover:text-ink"
                style={{ borderColor: "var(--border)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
              <p className="token-mono mb-3">01 &middot; Select a Service</p>
              <div className="mb-8 space-y-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                      serviceId === s.id ? "bg-ink text-white" : "text-ink hover:border-ink"
                    }`}
                    style={{ borderColor: serviceId === s.id ? "var(--ink)" : "var(--border)" }}
                  >
                    <span>
                      <span className="token-mono mr-2 opacity-70">{s.index}</span>
                      <span className="text-sm font-semibold">{s.title}</span>
                    </span>
                    <span className="text-xs opacity-70">{formatINR(s.basePrice)}+</span>
                  </button>
                ))}
              </div>

              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="token-mono mb-3">02 &middot; What&apos;s Included</p>
                <ul className="mb-8 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0 text-ink"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {service.addons.length > 0 && (
                  <>
                    <p className="token-mono mb-3">03 &middot; Add-ons</p>
                    <div className="mb-8 flex flex-wrap gap-2">
                      {service.addons.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                            addonIds.has(a.id) ? "bg-ink text-white" : "text-ink-muted hover:border-ink hover:text-ink"
                          }`}
                          style={{ borderColor: addonIds.has(a.id) ? "var(--ink)" : "var(--border)" }}
                        >
                          {addonIds.has(a.id) ? "✓ " : "+ "}
                          {a.label}
                          <span className="ml-1 opacity-70">+{formatINR(a.price)}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <p className="token-mono mb-3">04 &middot; Timeline</p>
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTimeline("standard")}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      timeline === "standard" ? "bg-ink text-white" : "text-ink hover:border-ink"
                    }`}
                    style={{ borderColor: timeline === "standard" ? "var(--ink)" : "var(--border)" }}
                  >
                    <span className="block text-sm font-semibold">Standard</span>
                    <span className="block text-xs opacity-70">{service.timeline.standard}</span>
                  </button>
                  <button
                    onClick={() => setTimeline("express")}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      timeline === "express" ? "bg-ink text-white" : "text-ink hover:border-ink"
                    }`}
                    style={{ borderColor: timeline === "express" ? "var(--ink)" : "var(--border)" }}
                  >
                    <span className="block text-sm font-semibold">Express (+20%)</span>
                    <span className="block text-xs opacity-70">{service.timeline.express}</span>
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="border-t px-6 py-6 md:px-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <p className="token-mono mb-1">Estimated Investment</p>
              <motion.p
                key={total}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="brutal-heading mb-4 text-4xl"
              >
                {formatINR(total)}
              </motion.p>
              <p className="mb-4 text-xs leading-relaxed text-ink-muted">
                Indicative pricing — final scope confirmed on a discovery call. No hidden fees.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-full px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--ink)" }}
              >
                Discuss This Estimate
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
