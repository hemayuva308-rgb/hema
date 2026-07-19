import type { CSSProperties } from "react";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "3.5rem 6%",
        borderTop: "1px solid var(--border)",
        background: "var(--white)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        <a
          href="#"
          className="font-display"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.55rem",
            fontWeight: 700,
            color: "var(--ink)",
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          Hema.
        </a>

        {/* 'Web Designer & Developer' மாற்றப்பட்டு 'Founder of Quix' என வைக்கப்பட்டுள்ளது */}
        <p style={{ fontSize: "0.82rem", color: "var(--ink-muted)" }}>
          Founder of Quix &middot; Chennai, India 🇮🇳
        </p>

        {/* ஐகான்கள் துல்லியமாகத் தெரிய 'stroke="currentColor"' சேர்க்கப்பட்டுள்ளது */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          
          {/* Instagram */}
          <a
            href="https://instagram.com/hema_.08._/"
            target="_blank"
            rel="noreferrer"
            className="f-icon"
            aria-label="Instagram"
            style={footerIconStyle}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hemamalini-yuvaraj-291996329/"
            target="_blank"
            rel="noreferrer"
            className="f-icon"
            aria-label="LinkedIn"
            style={footerIconStyle}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919941116919"
            target="_blank"
            rel="noreferrer"
            className="f-icon"
            aria-label="WhatsApp"
            style={footerIconStyle}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>

        </div>

        <p style={{ fontSize: "0.76rem", color: "var(--ink-faint)" }}>
          © 2026 Hema. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const footerIconStyle: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid var(--border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--ink-muted)",
  textDecoration: "none",
};