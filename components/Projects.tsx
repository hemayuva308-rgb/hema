"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; 

const ALL_PROJECTS = [
  { 
    title: "Quix AI Context Engine", 
    tag: "Product", 
    image: "/assets/projects/project.jpeg", 
    link: "https://your-quix-link.com" 
  },
  { 
    title: "INTASIA Digital Ecosystem", 
    tag: "Service Asset", 
    image: "/assets/projects/intasia.png", 
    link: "https://intasia-com.vercel.app/" 
  },
  { 
    title: "AlphaPulse Algo System", 
    tag: "FinTech Automation System", 
    image: "/assets/projects/mt5.png", 
    link: "#" 
  },
  { 
    title: "Hema Portfolio Website", 
    tag: "Personal Portfolio", 
    image: "/assets/projects/personal-portfolio.jpg", 
    link: "https://portfolio-bglz.vercel.app/"
  },
  { 
    title: "Career Finder", 
    tag: "Career Platform", 
    image: "/assets/projects/career-finder.png", 
    link: "https://careerfinderapp.netlify.app/"
  },
  { 
    title: "Gym Website", 
    tag: "Landing Page", 
    image: "/assets/projects/gym-website.png", 
    link: "https://hemayuva308-rgb.github.io/ironforge/"
  },
  { 
    title: "Digital Marketing Master Course", 
    tag: "Educational Platform", 
    image: "/assets/projects/digital-marketing.png", 
    link: "https://dm-free-course.vercel.app/"
  },
  { 
    title: "Aurum Bistro", 
    tag: "Restaurant Website", 
    image: "/assets/projects/aurum-bistro.png", 
    link: "https://aurum-bistro.vercel.app/"
  },
  { 
    title: "Scube3D", 
    tag: "Full Stack E-Commerce Platform", 
    image: "/assets/projects/scube3d.png", 
    link: "#" 
  },
];

const HERO_PROJECTS = ALL_PROJECTS.slice(0, 3);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  // அனிமேஷன் டைமிங்கை இன்னும் வேகமாக்கியுள்ளோம் (0.5 க்கு பதிலாக 0.45 இல் முடியும்)
  const scale = useTransform(scrollYProgress, [0, 0.45], [1, 0.6]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [0, 16]);
  
  const leftX = useTransform(scrollYProgress, [0.15, 0.45], ["-140%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.45], ["140%", "0%"]);
  const sideOpacity = useTransform(scrollYProgress, [0.15, 0.42], [0, 1]);

  return (
    <section id="projects" style={{ background: "var(--surface)" }}>
      <div className="px-[6%] pt-16 md:pt-24">
        <p className="token-mono mb-2 text-center text-xs md:text-sm">Selected Work</p>
        <h2 className="brutal-heading mb-6 text-center text-3xl md:text-5xl">Projects</h2>
      </div>

      {/* மொபைலில் உயரத்தை h-[130vh] ஆகக் குறைத்துள்ளோம். இது கேப் விழுவதைத் தடுக்கும் */}
      <div ref={containerRef} className="relative h-[130vh] md:h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-[4%] md:px-[6%]">
          
          {/* Quix AI கார்டு */}
          {HERO_PROJECTS[0] && (
            <motion.div
              style={{ scale, borderRadius: radius }}
              className="relative z-10 flex h-[60vh] md:h-[70vh] w-full max-w-[92vw] sm:max-w-md md:max-w-3xl flex-col justify-end overflow-hidden border p-6 md:p-12 shadow-xl"
            >
              <div className="absolute inset-0 -z-10 bg-[var(--ink)]">
                <Image 
                  src={HERO_PROJECTS[0].image} 
                  alt={HERO_PROJECTS[0].title} 
                  fill
                  priority
                  className="object-cover opacity-90 md:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              </div>

              <div className="relative z-20 flex flex-col items-start w-full">
                <p className="token-mono mb-1 md:mb-2 text-[10px] md:text-sm text-white/70">Flagship Build • {HERO_PROJECTS[0].tag}</p>
                <h3 className="brutal-heading text-lg text-white md:text-5xl">{HERO_PROJECTS[0].title}</h3>
                <Link 
                  href={HERO_PROJECTS[0].link || "#"} 
                  target="_blank" 
                  className="text-xs text-white/90 underline font-medium mt-1 md:hidden pointer-events-auto"
                >
                  View Project →
                </Link>
              </div>
            </motion.div>
          )}

          {/* INTASIA & AlphaPulse கார்டுகள் */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between gap-3 md:gap-6 pointer-events-none z-20 w-[92%] md:w-[94%] mx-auto">
            
            {/* INTASIA */}
            {HERO_PROJECTS[1] && (
              <motion.div
                style={{ x: leftX, opacity: sideOpacity }}
                className="pointer-events-auto w-[48%] md:w-72 border rounded-xl bg-[var(--white)] overflow-hidden shadow-lg group flex flex-col justify-between"
              >
                <div className="relative h-20 sm:h-36 w-full bg-gray-200 overflow-hidden">
                  <Image src={HERO_PROJECTS[1].image} alt={HERO_PROJECTS[1].title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-2 md:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <p className="token-mono text-[9px] md:text-xs mb-0.5 opacity-60 truncate">{HERO_PROJECTS[1].tag}</p>
                    <h4 className="text-[11px] md:text-lg font-bold tracking-tight text-ink line-clamp-2 md:mb-3">{HERO_PROJECTS[1].title}</h4>
                  </div>
                  <Link href={HERO_PROJECTS[1].link || "#"} target="_blank" className="text-[10px] md:text-sm font-semibold flex items-center justify-between border-t pt-1.5 md:pt-3 hover:opacity-70 transition-opacity mt-1">
                    <span>View Project</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* AlphaPulse */}
            {HERO_PROJECTS[2] && (
              <motion.div
                style={{ x: rightX, opacity: sideOpacity }}
                className="pointer-events-auto w-[48%] md:w-72 border rounded-xl bg-[var(--white)] overflow-hidden shadow-lg group flex flex-col justify-between"
              >
                <div className="relative h-20 sm:h-36 w-full bg-gray-200 overflow-hidden">
                  <Image src={HERO_PROJECTS[2].image} alt={HERO_PROJECTS[2].title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div> 
                <div className="p-2 md:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <p className="token-mono text-[9px] md:text-xs mb-0.5 opacity-60 truncate">{HERO_PROJECTS[2].tag}</p>
                    <h4 className="text-[11px] md:text-lg font-bold tracking-tight text-ink line-clamp-2 md:mb-3">{HERO_PROJECTS[2].title}</h4>
                  </div>
                  <Link href={HERO_PROJECTS[2].link || "#"} target="_blank" className="text-[10px] md:text-sm font-semibold flex items-center justify-between border-t pt-1.5 md:pt-3 hover:opacity-70 transition-opacity mt-1">
                    <span>View Project</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* LOWER GRID: -mt-28 மற்றும் pb-16 மூலமாக மொபைலில் வெற்று இடைவெளி முழுமையாக நீக்கப்பட்டுள்ளது */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-[4%] md:px-[6%] pb-16 -mt-28 md:-mt-16 relative z-30">
        {ALL_PROJECTS.slice(3).map((p, idx) => {
          const isLeftReveal = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeftReveal ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="border rounded-xl flex flex-col justify-between overflow-hidden group bg-[var(--white)]"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="relative h-24 sm:h-44 w-full bg-gray-100 overflow-hidden">
                {p.image && (
                  <Image 
                    src={p.image} 
                    alt={p.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                )}
              </div>
              <div className="p-3 md:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <p className="token-mono mb-1 text-[9px] md:text-xs opacity-60 uppercase truncate">{p.tag}</p>
                  <h4 className="text-[11px] md:text-lg font-bold tracking-tight text-ink line-clamp-2">{p.title}</h4>
                </div>
                <Link 
                  href={p.link || "#"}
                  target={p.link && p.link !== "#" ? "_blank" : "_self"}
                  className="mt-3 md:mt-6 pt-2 md:pt-4 border-t border-[var(--border)] flex justify-between items-center text-[10px] md:text-sm font-semibold hover:opacity-70 transition-opacity"
                >
                  <span>View Project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}