export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-base-elevated px-4 py-3.5 shadow-bubble">
      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-text-muted [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-text-muted [animation-delay:200ms]" />
      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-text-muted [animation-delay:400ms]" />
    </div>
  );
}
