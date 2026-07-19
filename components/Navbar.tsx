"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Ventures" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[200] flex h-16 items-center justify-between border-b px-[6%] transition-colors duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-xl" : "bg-white/60 backdrop-blur-md"
        }`}
        style={{ borderColor: "var(--border)" }}
      >
        <a href="#" className="font-display text-xl font-bold tracking-tight text-ink">
          Hema
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="token-mono transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden border px-4 py-2 text-[0.78rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white md:inline-block"
          style={{ borderColor: "var(--ink)" }}
        >
          Book a Call
        </a>

        {/* mobile menu toggle — top right, mobile only */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[220] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="block h-[1.5px] w-6 bg-ink"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="block h-[1.5px] w-6 bg-ink"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="block h-[1.5px] w-6 bg-ink"
          />
        </button>
      </nav>

      {/* mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[210] bg-white md:hidden"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-8 px-[6%]"
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.08 + i * 0.05 }}
                  className="font-display text-3xl font-medium tracking-tight text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.08 + LINKS.length * 0.05 }}
                className="mt-4 border px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white"
                style={{ background: "var(--ink)", borderColor: "var(--ink)" }}
              >
                Book a Call
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
