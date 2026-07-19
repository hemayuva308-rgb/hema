"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Check, CheckCheck, Copy, RotateCcw } from "lucide-react";
import type { ChatMessage } from "@/lib/rag/types";

interface MessageBubbleProps {
  message: ChatMessage;
  isLast: boolean;
  isAssistant: boolean;
  onRegenerate?: () => void;
}

export default function MessageBubble({
  message,
  isLast,
  isAssistant,
  onRegenerate,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!isAssistant) {
    return (
      <div className="flex justify-end px-4 py-2 md:px-6">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent-periwinkle px-4 py-2.5 text-sm text-text-primary shadow-bubble">
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          {message.timestamp && (
            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-text-muted">
              {message.timestamp}
              <CheckCheck size={13} className="text-accent-blue" />
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group flex gap-3 px-4 py-2 md:px-6">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-lavender">
        <Bot size={14} className="text-accent-blue" />
      </div>

      <div className="max-w-[85%] flex-1">
        <div className="rounded-2xl rounded-tl-sm bg-base-elevated px-4 py-3 text-sm text-text-primary shadow-bubble">
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-3 px-1">
          {message.timestamp && (
            <span className="text-[10px] text-text-muted">{message.timestamp}</span>
          )}
          <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-text-secondary hover:text-accent-blue"
              aria-label="Copy message"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
            {isLast && onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1 text-[11px] text-text-secondary hover:text-accent-blue"
                aria-label="Regenerate response"
              >
                <RotateCcw size={12} />
                Regenerate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
