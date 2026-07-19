# Hema — Portfolio (Next.js)

Pristine-minimalist portfolio built with Next.js (App Router), TypeScript, Tailwind CSS,
and Framer Motion — implementing the brief section by section:

1. **Entry system** — blank load → "Welcome" fade/slide → voice-reactive wave loader → hero grid reveal.
   `components/Preloader.tsx`
2. **Services + Budget Blueprint** — staggered service grid with an interactive pricing
   calculator (tiers, add-ons, urgent +20%) positioned above the pricing tier cards.
   `components/Services.tsx`, `components/PricingCalculator.tsx`
3. **Projects — "Wix scale" effect** — a full-screen project card compresses to a centered
   card on scroll while two side cards slide in, then the rest of the grid flows normally.
   `components/Projects.tsx`
4. **Ventures marquee** — infinite-loop badges for Quix and INTASIA.
   `components/VenturesMarquee.tsx`
5. **FAQ + sandboxed AI assistant** — an accordion FAQ next to the real chatbot app from
   `quix-ai-portfolio-assistant-local.zip`, fully ported in (`components/chat/*`,
   `lib/rag/*`, `app/api/chat/route.ts`, `docs/*.md`).
   `components/FaqChatbot.tsx`
6. **Launch CTA** — "Book a Free Call" opens WhatsApp with a pre-filled inquiry message
   (mailto as a fallback), plus WhatsApp/Instagram icon row.
   `components/LaunchCTA.tsx`
7. **Footer** — left untouched, ported 1:1 from the existing boilerplate.
   `components/Footer.tsx`

Theme tokens (`--ink`, `--border`, `--surface-2`, etc.) are carried over exactly from the
original `index.html` in `app/globals.css`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Setting up the AI assistant (optional but wired in)

The chatbot in the FAQ section is a real local RAG pipeline — no API key required:

1. **Embeddings** run fully offline via `@xenova/transformers` (auto-downloads model
   weights to `.cache/` on first run).
2. **Answer generation** uses [Ollama](https://ollama.com) running locally:
   ```bash
   ollama pull llama3.1
   ollama serve
   ```
3. Build the vector index from `/docs` (source-of-truth content already included):
   ```bash
   npm run build:index
   ```
   This creates `data/vector-store.json`. Re-run it whenever a file in `/docs` changes.

If Ollama isn't running, the assistant still boots and replies with a graceful
"AI service is temporarily unavailable" message instead of crashing — nothing else on
the site depends on it.

## Editing content

- `/docs/*.md` — source content the chatbot answers from (about, services, skills,
  projects, Quix, experience, contact, business hours).
- `components/PricingCalculator.tsx` — tiers, add-on prices, urgency multiplier.
- `components/LaunchCTA.tsx` — WhatsApp number / default message / email.
- `public/animations/*` — the four provided `.lottie` files + the loading JSON.
- `public/audio/bg_voice.mp3` — voice-protocol loader audio.

## Build

```bash
npm run build   # runs build:index, then next build
npm start
```
