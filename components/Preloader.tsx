"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Stage = "blank" | "welcome" | "voice" | "done";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<Stage>("blank");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number>();

  // Stage sequencing: அனிமேஷன்கள் மற்றும் ஆடியோ முழுமையாக முடியுமாறு நேரம் தாராளமாக அதிகரிக்கப்பட்டுள்ளது
  useEffect(() => {
    const t1 = setTimeout(() => setStage("welcome"), 260);
    
    // Welcome அனிமேஷன் முழுமையாக ஓடி முடிக்க 4.5 நொடிகள் (4500ms)
    const t2 = setTimeout(() => setStage("voice"), 260 + 4500);
    
    // Voice ஆடியோ முழுமையாகக் கேட்டு முடிக்க 5.5 நொடிகள் (5500ms)
    const t3 = setTimeout(() => setStage("done"), 260 + 4500 + 5500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Voice protocol engine
  useEffect(() => {
    if (stage !== "voice") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let audioCtx: AudioContext | null = null;

    const setupAnalyser = async () => {
      try {
        const audioEl = audioRef.current;
        if (!audioEl) return;
        await audioEl.play();
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AC();
        const source = audioCtx.createMediaElementSource(audioEl);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
       dataArray = new Uint8Array(analyser.frequencyBinCount);
      } catch {
        // autoplay blocked fallback
      }
    };
    setupAnalyser();

    let t = 0;
    const barCount = 42;
    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0f172a";

      if (analyser && dataArray) {
   analyser.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);
      }

      const gap = width / barCount;
      for (let i = 0; i < barCount; i++) {
        let amp: number;
        if (analyser && dataArray) {
          amp = dataArray[i % dataArray.length] / 255;
        } else {
          amp = (Math.sin(t * 0.12 + i * 0.35) + 1) / 2;
        }
        const barHeight = 6 + amp * (height - 12);
        const x = i * gap + gap * 0.3;
        const y = (height - barHeight) / 2;
        ctx.globalAlpha = 0.35 + amp * 0.65;
        ctx.fillRect(x, y, gap * 0.4, barHeight);
      }
      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audioCtx?.close().catch(() => {});
    };
  }, [stage]);

  return (
    <>
      <audio ref={audioRef} src="/audio/bg_voice.mp3" preload="auto" />
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-white"
          >
            {stage === "welcome" && (
              <div className="flex flex-col items-center gap-6">
                <div className="h-38 w-38">
                  <DotLottieReact src="/animations/Welcome.lottie" autoplay loop />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }} // இங்கிருந்த opacity: 3 எரர் சரிசெய்யப்பட்டுள்ளது
                  transition={{ duration: 4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="font-display text-3xl italic tracking-tight text-ink"
                >
                  Welcome
                </motion.p>
              </div>
            )}
            {stage === "voice" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-5"
              >
                <canvas ref={canvasRef} width={340} height={64} />
                <p className="token-mono">initializing interface</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ visibility: stage === "done" ? "visible" : "hidden" }}>{children}</div>
    </>
  );
}