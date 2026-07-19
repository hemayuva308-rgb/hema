"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessage } from "@/lib/rag/types";

function timestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendToApi(question: string, historyForApi: ChatMessage[]) {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: timestamp() }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history: historyForApi }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setIsLoading(false);
      setIsStreaming(true);

      let accumulated = "";
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            ...next[next.length - 1],
            content: accumulated,
          };
          return next;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          ...next[next.length - 1],
          content:
            "Something went wrong reaching the assistant. Please try again in a moment.",
        };
        return next;
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  const handleSend = (text: string) => {
    lastUserMessageRef.current = text;
    const historyForApi = messages.slice(-10);
    setMessages((prev) => [...prev, { role: "user", content: text, timestamp: timestamp() }]);
    sendToApi(text, historyForApi);
  };

  const handleRegenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser || isLoading || isStreaming) return;
    const withoutLastAssistant = messages.slice(0, -1);
    const historyForApi = withoutLastAssistant.slice(-11, -1);
    setMessages(withoutLastAssistant);
    sendToApi(lastUser.content, historyForApi);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const busy = isLoading || isStreaming;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader onClear={handleClear} hasMessages={messages.length > 0} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-3">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
          
          </div>
        ) : (
          messages.map((m, i) => {
            const isLastAssistant =
              m.role === "assistant" && i === messages.length - 1 && !busy;
            return (
              <MessageBubble
                key={i}
                message={m}
                isAssistant={m.role === "assistant"}
                isLast={isLastAssistant}
                onRegenerate={isLastAssistant ? handleRegenerate : undefined}
              />
            );
          })
        )}

        {isLoading && (
          <div className="flex gap-3 px-4 md:px-6">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-lavender" />
            <TypingIndicator />
          </div>
        )}
      </div>

      {messages.length === 0 && <SuggestedQuestions onSelect={handleSend} />}

      <ChatInput onSend={handleSend} isLoading={busy} />
    </div>
  );
}
