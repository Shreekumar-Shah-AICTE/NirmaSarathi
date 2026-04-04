import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getSystemPrompt } from "@/lib/system-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Detect language from the latest user message
  const lastUserMessage = (messages as UIMessage[])
    .filter((m) => m.role === "user")
    .pop();
  const lastContent = extractTextFromUIMessage(lastUserMessage);
  const detectedLang = detectLanguage(lastContent);
  const lang = detectedLang || "en";

  // Convert UI messages to model messages (async in v6)
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google("gemini-2.5-pro"),
    system: getSystemPrompt(lang as "en" | "hi" | "gu"),
    messages: modelMessages,
    temperature: 0.7,
    maxOutputTokens: 1024,
  });

  // v6: Use toUIMessageStreamResponse for useChat compatibility
  return result.toUIMessageStreamResponse();
}

function extractTextFromUIMessage(message?: UIMessage): string {
  if (!message) return "";
  // AI SDK v6 uses parts array
  if (message.parts) {
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");
  }
  return "";
}

function detectLanguage(text: string): "en" | "hi" | "gu" | null {
  if (!text) return null;

  // Check for Devanagari (Hindi) or Gujarati script characters
  const devanagari = /[\u0900-\u097F]/;
  const gujarati = /[\u0A80-\u0AFF]/;

  if (gujarati.test(text)) return "gu";
  if (devanagari.test(text)) return "hi";

  // Check for common Hindi words written in Latin script
  const hindiWords =
    /\b(kya|kaise|kab|kahan|mera|meri|batao|chahiye|hai|hain|nahi|aur|se|ko|mein|ka|ki|ke)\b/i;
  if (hindiWords.test(text)) return "hi";

  return null;
}
