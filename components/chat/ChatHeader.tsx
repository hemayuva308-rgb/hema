"use client";

import { Bot, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

export default function ChatHeader({ onClear, hasMessages }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-base-border px-5 py-4 md:px-7 md:py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-lavender md:h-12 md:w-12">
          <Bot size={20} className="text-accent-blue" />
        </div>
        <div>
          <h1 className="font-chat-display text-base font-bold leading-tight text-text-primary md:text-lg">
            AI Portfolio Assistant
          </h1>
          <p className="text-xs text-text-secondary md:text-sm">
            Ask anything, I&apos;m here to help!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-online opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-online" />
          </span>
          <span className="text-sm text-text-secondary">Online</span>
        </div>

        {hasMessages && (
          <button
            onClick={onClear}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-base-border text-text-muted transition hover:border-accent-blue/40 hover:text-accent-blue"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
