"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Stage = "welcome" | "done";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<Stage>("welcome");

  // Welcome animation முடிஞ்சதும் 3.5 வினாடியில் நேரடியா portfolio காட்டும்
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("done");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-white"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="h-44 w-44">
                <DotLottieReact src="/animations/Welcome.lottie" autoplay loop />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="font-display text-3xl italic tracking-tight text-ink"
              >
                Welcome
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ visibility: stage === "done" ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
}