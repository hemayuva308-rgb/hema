"use client";

import React from "react";
import { MessageCircle, Instagram, Mail } from "lucide-react"; 

export default function ContactCTA() {
  return (
    // வெளிப்பக்க பின்னணி முழுமையாக வெள்ளை நிறத்திற்கு (bg-white) மாற்றப்பட்டுள்ளது
    <section id="contact-cta" className="px-[6%] py-24 bg-white text-white flex justify-center items-center">
      
      {/* கார்டு மட்டும் தனியாக இருண்ட நிறத்தில் (bg-[#0B0F19]) கச்சிதமான அளவில் */}
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-16 text-center shadow-[0_24px_50px_-15px_rgba(0,0,0,0.15)] border border-black/[0.03]"
        style={{ background: "#0B0F19" }}
      >
        
        {/* BACKGROUND GRADIENT GLOW (கார்டுக்குள் மட்டும் தெரியும் நளினமான வெளிச்சம்) */}
        <div 
          className="absolute -left-1/4 -bottom-1/2 w-full aspect-square -z-10 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div 
          className="absolute -right-1/4 -top-1/2 w-full aspect-square -z-10 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        {/* கன்டென்ட் பகுதி */}
        <div className="mx-auto max-w-md relative z-10 flex flex-col items-center justify-center">
          
          {/* TOP MINI TITLE */}
          <p className="token-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-4">
            LET'S TALK
          </p>

          {/* MAIN HEADING */}
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.2] text-white tracking-tight mb-4">
            Ready to start <br /> your project?
          </h2>

          {/* SUBTITLE */}
          <p className="mx-auto text-xs sm:text-sm leading-relaxed text-white/50 mb-8 font-sans font-light">
            Book a free call. No pressure, no commitment — just a clear conversation about what you need and how I can help.
          </p>

          {/* CTA BUTTON */}
          <div className="mb-10">
            <a
              href="#book-call" 
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "0 16px 32px -8px rgba(255,255,255,0.1)" }}
            >
              Book a Free Call &rarr;
            </a>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center justify-center gap-4">
            
            {/* WHATSAPP */}
            <a 
              href="#whatsapp" 
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/40 bg-white/[0.01] hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <MessageCircle size={16} />
            </a>

            {/* INSTAGRAM */}
            <a 
              href="#instagram" 
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/40 bg-white/[0.01] hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <Instagram size={16} />
            </a>

            {/* EMAIL */}
            <a 
              href="#email" 
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/40 bg-white/[0.01] hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <Mail size={16} />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}