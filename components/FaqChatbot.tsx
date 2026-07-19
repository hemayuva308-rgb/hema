"use client";

import { motion } from "framer-motion";
import ChatWindow from "@/components/chat/ChatWindow";
import AssistantAnimation from "@/components/AssistantAnimation";

const EASE = [0.22, 1, 0.36, 1] as const;

function ChatIntroPanel() {
  return (
    <div
      className="flex h-[560px] flex-col items-center justify-center gap-6 border p-8 text-center"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <AssistantAnimation />
      </motion.div>
      <div>
        <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
          Ask me anything
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
          My AI assistant knows my services, projects, skills, and availability —
          chat with it directly for instant answers.
        </p>
      </div>
    </div>
  );
}

export default function FaqChatbot() {
  return (
    <section id="faq" className="px-[6%] py-24">
      <p className="token-mono mb-2 text-center">Talk To My Assistant</p>
      <h2 className="brutal-heading mb-14 text-center text-4xl md:text-5xl">
        Ask The Assistant
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
        <ChatIntroPanel />

        {/* Sandboxed chatbot: left completely untouched — same wrapper, same
            markup, same behaviour on every viewport including mobile. */}
        <div
          className="flex h-[560px] flex-col overflow-hidden border"
          style={{ borderColor: "var(--border)" }}
        >
          <ChatWindow />
        </div>
      </div>
    </section>
  );
}
