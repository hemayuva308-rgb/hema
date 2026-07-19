"use client";

const QUESTIONS = [
  "Who is Hema?",
  "Tell me about Quix",
  "Tell me about INTASIA",
  "What services do you provide?",
  "Show my projects",
  "What are your skills?",
  "How can I contact you?",
  "What are your business hours?",
  "How much do you charge?",
  "Can you build AI Chatbots?",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 pb-4 md:px-6">
      <p className="mb-2 text-xs font-medium text-text-muted">Try asking</p>
      <div className="flex flex-wrap gap-2">
        {QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="rounded-full border border-base-border bg-base-elevated px-3 py-1.5 text-xs text-text-secondary transition hover:border-accent-blue/50 hover:text-accent-blue"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
