import { SYSTEM_INSTRUCTIONS } from "./prompts";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const CHAT_MODEL = process.env.OLLAMA_MODEL || "llama3.1";

export const AI_UNAVAILABLE_MESSAGE =
  "AI service is temporarily unavailable. Make sure GROQ_API_KEY is configured in Render or Ollama is running locally.";

export function hasLocalLlmCredentials(): boolean {
  return true;
}

export async function generateLocalAnswer(userPrompt: string): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY;

  // 1. Render Cloud deployment-ல் இருந்தால் Groq Cloud API-ஐப் பயன்படுத்தும்
  if (groqApiKey) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTIONS },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        console.error("Groq request failed:", response.status, await response.text());
        return AI_UNAVAILABLE_MESSAGE;
      }

      const data = await response.json();
      const text: string | undefined = data?.choices?.[0]?.message?.content;
      return (text ?? "").trim();
    } catch (error) {
      console.error("Groq Cloud generation error:", error);
      return AI_UNAVAILABLE_MESSAGE;
    }
  }

  // 2. Local Machine-ல் இருந்தால் Ollama-வுக்கு Fallback ஆகும்
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CHAT_MODEL,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTIONS },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Ollama request failed:", response.status, await response.text());
      return AI_UNAVAILABLE_MESSAGE;
    }

    const data = await response.json();
    const text: string | undefined = data?.message?.content;
    return (text ?? "").trim();
  } catch (error) {
    console.error("Local LLM generation error:", error);
    return AI_UNAVAILABLE_MESSAGE;
  }
}