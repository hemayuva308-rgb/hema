"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SERVICES } from "./data";
import ServiceCard from "./ServiceCard";

function MobileSlide({ service, i }: { service: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // மெயின் ஸ்க்ரோலிங் உடன் ஒத்திசையும் அனிமேஷன்
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end end"] 
  });

  // ஸ்மூத் பேரலக்ஸ் ஸ்டாக்கிங் (Stacking Effect) மட்டும் இருக்கும், பிளர் ஆகாது
  const cardY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-[6%] py-16 border-b border-[var(--border)] last:border-b-0 sticky top-0 bg-[var(--background)]"
    >
      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
          rotate: cardRotate,
        }}
        className="relative z-10 w-full max-w-md will-change-transform"
      >
        {/* கார்டுகளின் ஹைட் அட்ஜஸ்ட்மென்ட் */}
        <div className="h-auto min-h-[420px]">
          <ServiceCard service={service} />
        </div>
      </motion.div>
    </div>
  );
}

export default function MobileSlider() {
  return (
    // மொபைல் ஸ்க்ரீனில் ஸ்மூத் பேரலக்ஸ் அனிமேஷனுக்காக 'relative' லேஅவுட்
    <div className="relative w-full flex flex-col lg:hidden bg-[var(--background)]">
      {SERVICES.map((service, i) => (
        <MobileSlide key={service.id} service={service} i={i} />
      ))}
    </div>
  );
}