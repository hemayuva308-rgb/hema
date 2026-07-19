import {
  getAvailabilityStatus,
  buildAvailabilityReply,
  buildCallReply,
  CONTACT,
} from "./businessHours";

export type DeterministicIntent = "availability" | "call" | null;

const AVAILABILITY_PATTERNS = [
  /are\s+you\s+available/i,
  /available\s+(right\s+)?now/i,
  /are\s+you\s+online/i,
  /can\s+we\s+talk\s+now/i,
];

const CALL_PATTERNS = [
  /can\s+i\s+call\s+you/i,
  /can\s+you\s+call\s+me/i,
  /\bcall\s+you\s+now\b/i,
];

/**
 * These two questions require a real-time, computed answer (current day/time
 * in Asia/Kolkata against the published schedule) rather than a static
 * retrieved chunk, so they're detected first and answered deterministically —
 * exactly matching the wording specified in business-hours.md.
 */
export function detectDeterministicIntent(message: string): DeterministicIntent {
  const text = message.trim();
  if (AVAILABILITY_PATTERNS.some((p) => p.test(text))) return "availability";
  if (CALL_PATTERNS.some((p) => p.test(text))) return "call";
  return null;
}

export function resolveDeterministicIntent(intent: DeterministicIntent): string {
  const status = getAvailabilityStatus();
  if (intent === "availability") return buildAvailabilityReply(status);
  if (intent === "call") return buildCallReply(status);
  return "";
}

export const FALLBACK_MESSAGE = `I couldn't find that information in Hema's portfolio knowledge base.

If your question is related to a custom project or something not listed yet, feel free to contact Hema.

📞 Phone:
${CONTACT.phone}

📩 Instagram:
${CONTACT.instagram}

🌐 Portfolio:
${CONTACT.portfolio}`;
