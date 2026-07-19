import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const chatDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chat-display",
  display: "swap",
});

const chatBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-chat-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hema — Tech Architect & Full Stack Engineer",
  description:
    "Hemamalini — Freelance Full Stack Developer, Founder of Quix, Co-Founder & Lead Developer at INTASIA. Web development, AI systems, UI/UX and SaaS engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} ${mono.variable} ${chatDisplay.variable} ${chatBody.variable}`}
    >
      <body className="font-sans antialiased">
        <Preloader>{children}</Preloader>
      </body>
    </html>
  );
}
