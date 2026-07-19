"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  return (
    <div className="border-t border-base-border p-3 md:p-5">
      <div className="flex items-end gap-2 rounded-full border border-base-border bg-base-bg px-2 py-2 focus-within:border-accent-blue/50">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleInput();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask your FAQ question..."
          rows={1}
          disabled={isLoading}
          className="max-h-36 flex-1 resize-none bg-transparent px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-60"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue text-white transition hover:bg-accent-blueDark disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-text-muted">
        Answers are grounded in Hema&apos;s portfolio knowledge base — not a general-purpose AI.
      </p>
    </div>
  );
}
