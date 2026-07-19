"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS = [
  {
    name: "Aarav Menon",
    
    quote:
      "Hema turned our vague idea into a polished, premium website faster than we thought possible. Every revision was handled with real care.",
  },
  {
    name: "Priya Raghavan",
    // role: "Marketing Lead, Digital Marketing Course",
    quote:
      "Clear communication from day one and a landing page that genuinely converts. Working with Hema felt like working with a full team.",
  },
  {
    name: "sathish",
    role: "Founder, Scube3D",
    quote:
      "The e-commerce build was clean, fast, and exactly on spec. Hema thinks like an engineer and designs like a creative — rare combination.",
  },
  {
    name: "Divya Shankar",
    role: "Operations Manager,",
    quote:
      "Reliable, detail-oriented, and genuinely invested in the outcome. Our platform launched on time with zero surprises.",
  },
];

const TRACK = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

function TiltProfileImage() {
  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(4);
  const rotateY = useMotionValue(-6);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 14 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(nx * 14 - 6);
      rotateX.set(-ny * 14 + 4);
    },
    [rotateX, rotateY]
  );

  const handleLeave = () => {
    rotateX.set(4);
    rotateY.set(-6);
  };

  return (
    <div className="relative mx-auto w-full max-w-xs md:max-w-sm" style={{ perspective: 1200 }}>
      <motion.div
        aria-hidden
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-8 top-10 -z-10 h-[85%] rounded-[24px]"
        style={{ background: "rgba(15,23,42,0.16)", filter: "blur(60px)" }}
      />
      <motion.div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[24px] border bg-white p-3"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 30px 60px -20px rgba(15,23,42,0.28), 0 2px 0 rgba(255,255,255,0.6) inset",
          }}
        />
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px]" style={{ background: "var(--surface)" }}>
          <Image
            src="/hema.jpg"
            alt="Hemamalini — Full Stack Developer"
            fill
            sizes="(max-width: 768px) 80vw, 380px"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div
      className="flex h-full w-[280px] shrink-0 flex-col justify-between border bg-white p-6 sm:w-[340px] sm:p-7"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="text-[0.92rem] leading-relaxed text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border-soft)" }}>
        <p className="text-sm font-semibold tracking-tight text-ink">{t.name}</p>
        <p className="token-mono mt-1">{t.role}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="px-[6%] py-24 bg-[var(--surface)]">
      
      {/* CENTERED BOLD TITLE & SUBTITLE */}
      <div className="w-full text-center mb-16">
        <h2 className="text-sm font-extrabold tracking-[0.35em] text-ink uppercase mb-2">
          About Me
        </h2>
        <p className="token-mono text-xs text-ink-muted font-medium tracking-wide">
          The Story So Far
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="order-1"
        >
          <TiltProfileImage />
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="order-2"
        >
          <h2 className="font-serif text-4xl md:text-[3.25rem] font-normal leading-[1.15] text-ink tracking-tight">
            Designer. Developer. <br />
            <span className="italic font-light text-ink-muted">Problem-solver.</span>
          </h2>

          {/* STATS COUNTER GRID SECTION */}
          <div className="grid grid-cols-3 gap-4 my-8 border-y border-[var(--border-soft)] py-6">
            <div>
              <p className="font-serif text-2xl md:text-3xl font-medium text-ink tracking-tight">May 2026</p>
              <p className="text-[11px] md:text-xs text-ink-muted mt-1 font-medium">Since Starting</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-medium text-ink tracking-tight">100%</p>
              <p className="text-[11px] md:text-xs text-ink-muted mt-1 font-medium">Client Satisfaction</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-medium text-ink tracking-tight">2</p>
              <p className="text-[11px] md:text-xs text-ink-muted mt-1 font-medium">Startups Founded</p>
            </div>
          </div>

          {/* பயோ டெக்ஸ்ட் விவரங்கள் */}
          <div className="space-y-4 text-[0.98rem] md:text-[1.02rem] leading-relaxed text-ink-muted">
            <p>
              &ldquo;Hello, I’m based in Chennai and currently pursuing my 3rd year of BCA. My journey in technology began at the age of 17. I’m completely self-taught, having learned everything through curiosity, consistency, and a genuine passion for building impactful products.

As an independent freelancer, I manage projects end-to-end as a one-person team. Beyond freelancing, I co-founded <strong>Intasia</strong>, a service-based startup, where I serve as the Lead Developer, and I also founded <strong>Quix</strong>, my own product-based startup. These experiences have helped me grow not only as a software developer but also as an entrepreneur.

I’m passionate about continuously exploring emerging technologies, artificial intelligence, and modern development tools, always looking for opportunities to learn, innovate, and create meaningful solutions."

            </p>
            
           
          </div>
        </motion.div>
      </div>

      {/* testimonials — auto-scrolling marquee */}
      <div className="mx-auto mt-20 max-w-6xl">
        <p className="token-mono mb-6 text-center text-xs tracking-wider uppercase text-ink-muted">What People Say</p>
        <div
          className="no-scrollbar overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <motion.div
            className="flex w-max gap-5"
            animate={{ x: ["0%", "-33.3333%"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          >
            {TRACK.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}