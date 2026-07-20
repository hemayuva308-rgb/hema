"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "./data";
import ServiceCard from "./ServiceCard";

const STEP_VH = 92; // scroll distance dedicated to each card transition

export default function DesktopStack({
  onActiveChange,
}: {
  onActiveChange?: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

        if (reduceMotion) {
          gsap.set(cards, { opacity: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" });
          return;
        }

        cards.forEach((card, i) => {
          const wrapper = wrapperRefs.current[i];
          if (!wrapper) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top 88%",
              end: "top 20%",
              scrub: 0.6,
              onEnter: () => onActiveChangeRef.current?.(i),
              onEnterBack: () => onActiveChangeRef.current?.(i),
            },
            defaults: { force3D: true },
          });

          // Card mela varum podhu mattum y & scale marum (blur, opacity overlap varadhu)
          tl.fromTo(
            card,
            { y: 140, scale: 0.85, rotate: 3 },
            { y: 0, scale: 1, rotate: 0, ease: "none", duration: 1 },
            0
          );

          const prevCard = cards[i - 1];
          if (prevCard) {
            // Previous card kku opacity குறைக்க கூடாது! Solid white ah pinnaadi irukkanum.
            tl.to(prevCard, { scale: 0.94, y: -36, ease: "none", duration: 1 }, 0);
          }
        });

        return () => {
          cards.forEach((card) => gsap.set(card, { clearProps: "all" }));
        };
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:block"
      style={{ height: `${(SERVICES.length - 1) * STEP_VH + 100}vh` }}
    >
      {SERVICES.map((service, i) => (
        <div
          key={service.id}
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
          className="sticky top-[16vh] flex h-[70vh] items-center"
          style={{ zIndex: i + 1, isolation: "isolate" }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="w-full will-change-transform rounded-3xl bg-white"
            style={{
              isolation: "isolate",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <ServiceCard service={service} />
          </div>
        </div>
      ))}
    </div>
  );
}