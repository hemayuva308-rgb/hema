const TIMEZONE = process.env.ASSISTANT_TIMEZONE || "Asia/Kolkata";

// Matches docs/business-hours.md and docs/contact.md
// Saturday & Sunday: 9:00 AM – 9:00 PM
// Monday – Friday: 3:00 PM – 9:00 PM
const SCHEDULE: Record<number, { start: number; end: number }> = {
  0: { start: 9, end: 21 }, // Sunday
  1: { start: 15, end: 21 }, // Monday
  2: { start: 15, end: 21 }, // Tuesday
  3: { start: 15, end: 21 }, // Wednesday
  4: { start: 15, end: 21 }, // Thursday
  5: { start: 15, end: 21 }, // Friday
  6: { start: 9, end: 21 }, // Saturday
};

export interface AvailabilityStatus {
  isAvailable: boolean;
  dayName: string;
  timeString: string;
  hoursToday: string;
}

/**
 * Computes real-time availability against the published business hours,
 * always evaluated in Asia/Kolkata regardless of server location.
 */
export function getAvailabilityStatus(now: Date = new Date()): AvailabilityStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sunday";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  const dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].indexOf(weekday);

  const todayHours = SCHEDULE[dayIndex];
  const currentDecimal = hour + minute / 60;
  const isAvailable =
    currentDecimal >= todayHours.start && currentDecimal < todayHours.end;

  return {
    isAvailable,
    dayName: weekday,
    timeString: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    hoursToday: formatRange(todayHours.start, todayHours.end),
  };
}

function formatRange(start: number, end: number): string {
  return `${formatHour(start)} – ${formatHour(end)}`;
}

function formatHour(h: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
}

export const CONTACT = {
  phone: "+91 99411 69199",
  instagram: "https://www.instagram.com/hema.dev_/",
  portfolio: "https://portfolio-bglz.vercel.app/",
  linkedin: "https://www.linkedin.com/in/hemamalini-yuvaraj-291996329/",
};

export function buildAvailabilityReply(status: AvailabilityStatus): string {
  if (status.isAvailable) {
    return `Yes! I'm currently available. 😊

📞 Phone: ${CONTACT.phone}

📩 You can also contact me on Instagram:
${CONTACT.instagram}

I'd be happy to discuss your project.`;
  }

  return `I'm currently outside my business hours.

🕒 My working hours are:

• Saturday & Sunday: 9:00 AM – 9:00 PM
• Monday – Friday: 3:00 PM – 9:00 PM

You can still leave a message.

📞 Phone: ${CONTACT.phone}

📩 Instagram:
${CONTACT.instagram}

I'll get back to you as soon as I'm available.`;
}

export function buildCallReply(status: AvailabilityStatus): string {
  if (status.isAvailable) {
    return `Yes, you can call me now.

📞 ${CONTACT.phone}

If I'm unable to answer immediately, please leave a message or contact me on Instagram:
${CONTACT.instagram}`;
  }

  return `Please call me during my business hours.

🕒 Saturday & Sunday: 9:00 AM – 9:00 PM
🕒 Monday – Friday: 3:00 PM – 9:00 PM

Meanwhile, you can send me a message on Instagram:
${CONTACT.instagram}

or leave a missed call, and I'll get back to you.`;
}
