"use client";

import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden grid min-h-screen grid-cols-1 items-center gap-16 px-[6%] pt-32 pb-20 md:grid-cols-2 md:pt-24 bg-white">
      
      {/* ─── பின்னணி அனிமேஷன் (Framer Motion Floating Glow Background) ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* மெதுவாக மிதக்கும் முதல் வட்டம் */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        />
        
        {/* மெதுவாக மிதக்கும் இரண்டாவது வட்டம் */}
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.95, 1.05, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-20 right-0 w-[450px] h-[450px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* இடது பக்க கன்டென்ட் பகுதி */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative z-10"
      >
        <p className="token-mono mb-7">Full Stack Engineer</p>

        <h1 className="font-display text-[15vw] leading-[0.92] tracking-[-0.01em] text-ink md:text-[5.2vw]">
          <span className="block font-normal">Crafting digital</span>
          <span className="block font-light italic text-ink-soft">experiences</span>
          <span className="block font-normal">that scale.</span>
        </h1>

        {/* சப்டெக்ஸ்ட் - நீங்கள் கேட்டபடி கச்சிதமாக மாற்றப்பட்டுள்ளது */}
        <p className="mt-8 max-w-md text-[1.02rem] leading-relaxed text-ink-muted">
          Founder of Quix, Co-Founder &amp; Lead Developer at INTASIA.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
  href="https://wa.me/919941116919?text=Hi%20Hema,%20I%20would%20like%20to%20book%20a%20free%20call%20for%20a%20project!"
  target="_blank"
  rel="noopener noreferrer"
  className="border px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
  style={{ background: "var(--ink)", borderColor: "var(--ink)" }}
>
  Book a Free Call
</a>
          
        </div>
      </motion.div>

      {/* வலது பக்க இமேஜ் கார்டு பகுதி */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        className="hidden md:block relative z-10"
      >
        <ProfileCard />
      </motion.div>
    </section>
  );
}