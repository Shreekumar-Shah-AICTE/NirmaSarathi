import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getSystemPrompt } from "@/lib/system-prompt";
import { prisma } from "@/lib/prisma";

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

    // Log conversation to DB after completion (non-blocking)
    async onFinish({ text }) {
      try {
        const category = categorizeQuery(lastContent);
        const sentiment = detectSentiment(lastContent);
        const sessionId = `sess-${Date.now().toString(36)}`;

        await prisma.conversation.create({
          data: {
            sessionId,
            query: lastContent.substring(0, 500),
            response: text.substring(0, 1000),
            category,
            language: lang,
            sentiment,
          },
        });

        // Check for wellness flags
        if (sentiment === "concern") {
          await prisma.wellnessFlag.create({
            data: {
              sessionId,
              triggerText: lastContent.substring(0, 200),
              severity: detectWellnessSeverity(lastContent),
            },
          });
        }
      } catch (error) {
        console.error("Conversation logging error:", error);
        // Non-blocking — don't affect the response
      }
    },
  });

  // v6: Use toUIMessageStreamResponse for useChat compatibility
  return result.toUIMessageStreamResponse();
}

function extractTextFromUIMessage(message?: UIMessage): string {
  if (!message) return "";
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

  const devanagari = /[\u0900-\u097F]/;
  const gujarati = /[\u0A80-\u0AFF]/;

  if (gujarati.test(text)) return "gu";
  if (devanagari.test(text)) return "hi";

  const hindiWords =
    /\b(kya|kaise|kab|kahan|mera|meri|batao|chahiye|hai|hain|nahi|aur|se|ko|mein|ka|ki|ke)\b/i;
  if (hindiWords.test(text)) return "hi";

  return null;
}

function categorizeQuery(text: string): string {
  const lower = text.toLowerCase();

  if (/librar|book|opac|borrow|journal|ieee|springer|koha/i.test(lower)) return "Library";
  if (/exam|cae|midsem|endsem|timetable|marks|result|grade/i.test(lower)) return "Exams";
  if (/grievance|complaint|issue|problem|broken|not working/i.test(lower)) return "Grievance";
  if (/hostel|room|mess|food|warden|laundry/i.test(lower)) return "Hostel";
  if (/stress|anxious|depress|lonely|sleep|overwhelm|sad|scared|bully/i.test(lower)) return "Wellness";
  if (/fee|payment|scholarship|refund|financial/i.test(lower)) return "Financial";
  if (/canteen|sports|gym|transport|bus|parking|wifi|atm/i.test(lower)) return "Campus";
  if (/erp|portal|attendance|registration|id card/i.test(lower)) return "ERP";

  return "General";
}

function detectSentiment(text: string): string {
  const lower = text.toLowerCase();

  // Concern indicators (wellness)
  if (/stress|anxious|depress|lonely|can'?t sleep|overwhelm|hopeless|scared|bully|suicide|harm/i.test(lower))
    return "concern";

  // Negative indicators
  if (/complaint|angry|frustrat|terrible|worst|hate|unfair|not working|broken|bad quality/i.test(lower))
    return "negative";

  // Positive indicators
  if (/thank|great|awesome|helpful|love|excellent|amazing|perfect|good job/i.test(lower))
    return "positive";

  return "neutral";
}

function detectWellnessSeverity(text: string): string {
  const lower = text.toLowerCase();

  if (/suicide|self.?harm|end.?my.?life|kill|die/i.test(lower)) return "critical";
  if (/depress|hopeless|can'?t.?cope|extremely|breaking/i.test(lower)) return "high";
  if (/stress|anxious|lonely|overwhelm|can'?t sleep/i.test(lower)) return "medium";

  return "low";
}
