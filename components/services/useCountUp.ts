"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * Animates a number counting up to `target` once the returned ref scrolls
 * into view. Returns the ref to attach and the live formatted value.
 */
export function useCountUp(target: number, format: (n: number) => string, duration = 1.1) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration, format]);

  return { ref, display };
}
