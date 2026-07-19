"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const REVEAL_RADIUS = 140;

export default function ProfileCard() {
  const frameRef = useRef<HTMLDivElement>(null);
  const grayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // pointer-driven 3D tilt (separate from the CSS mask reveal)
  const rotateX = useMotionValue(6);
  const rotateY = useMotionValue(-8);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 14 });
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 160, damping: 16 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    const gray = grayRef.current;
    if (!frame) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = frame.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // tilt, relative to card center
      const nx = px / rect.width - 0.5;
      const ny = py / rect.height - 0.5;
      rotateY.set(nx * 16 - 8);
      rotateX.set(-ny * 16 + 6);

      // mouse-light color reveal on the image layer
      if (gray) {
        const imgRect = gray.getBoundingClientRect();
        const ix = e.clientX - imgRect.left;
        const iy = e.clientY - imgRect.top;
        gray.style.setProperty("--reveal-x", `${ix}px`);
        gray.style.setProperty("--reveal-y", `${iy}px`);
        gray.style.setProperty("--reveal-r", `${REVEAL_RADIUS}px`);
      }
    });
  }, [rotateX, rotateY]);

  const handleEnter = () => scale.set(1.02);
  const handleLeave = () => {
    scale.set(1);
    rotateX.set(6);
    rotateY.set(-8);
    grayRef.current?.style.setProperty("--reveal-r", "0px");
  };

  return (
    <div className="relative mx-auto w-full max-w-sm" style={{ perspective: 1400 }}>
      {/* lanyard */}
      <div className="mx-auto mb-1 h-14 w-px bg-gradient-to-b from-transparent via-ink-faint/60 to-ink-faint/60" />
      <div
        className="mx-auto mb-[-10px] h-4 w-10 rounded-full border"
        style={{ borderColor: "var(--border)", background: "var(--white)" }}
      />

      {/* deep, luxurious ambient shadow */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-6 top-10 -z-10 h-[85%] rounded-[28px]"
        style={{
          background: "rgba(15,23,42,0.18)",
          filter: "blur(70px)",
        }}
      />

      <motion.div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX: springX,
          rotateY: springY,
          scale: springScale,
          transformStyle: "preserve-3d",
          borderColor: "rgba(226,232,240,0.8)",
        }}
        className="relative overflow-hidden rounded-[28px] border bg-white p-3"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow:
              "0 30px 60px -20px rgba(15,23,42,0.28), 0 2px 0 rgba(255,255,255,0.6) inset",
          }}
        />

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]" style={{ background: "var(--surface)" }}>
          {/* base: full colour image */}
          <Image
            src="/hema.jpg"
            alt="Hemamalini — Full Stack Developer"
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover"
            priority
          />
          {/* top: grayscale + fog layer, masked into a soft circle following the cursor */}
          <div ref={grayRef} className="reveal-gray absolute inset-0">
            <Image
              src="/hema.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover"
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 45%)",
              }}
            />
          </div>
        </div>

        <div className="relative flex items-center justify-between px-2 pb-1 pt-3">
          <div>
            <p className="font-display text-lg italic leading-none text-ink">Hema</p>
            <p className="token-mono mt-1">Full Stack Engineer</p>
          </div>
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.18)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
