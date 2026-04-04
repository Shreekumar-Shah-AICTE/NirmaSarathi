"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Calendar,
  FileText,
  Building2,
  Heart,
  Globe,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Zap,
  Shield,
  Languages,
  GraduationCap,
  Square,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const QUICK_ACTIONS = [
  { icon: BookOpen, label: "Library Hours", prompt: "What are the library timings?" },
  { icon: Calendar, label: "Exam Schedule", prompt: "When are the upcoming CAE-2 exams?" },
  { icon: FileText, label: "File Grievance", prompt: "I want to file a grievance about classroom infrastructure" },
  { icon: Building2, label: "Campus Info", prompt: "Where is the main canteen located?" },
  { icon: Heart, label: "Wellness", prompt: "I've been feeling stressed about exams lately" },
  { icon: Globe, label: "हिंदी में पूछें", prompt: "मुझे लाइब्रेरी के बारे में जानकारी दें" },
];

const FEATURES = [
  { icon: BookOpen, title: "Library Intelligence", desc: "Search books, check availability, borrowing rules" },
  { icon: Calendar, title: "Exam Scheduling", desc: "CAE, MidSem, EndSem dates & timetables" },
  { icon: FileText, title: "Grievance Filing", desc: "File, track, and resolve campus complaints" },
  { icon: Shield, title: "Wellness Support", desc: "Confidential mental health resources" },
  { icon: Languages, title: "Multi-Lingual", desc: "English, Hindi & Gujarati support" },
  { icon: Zap, title: "Instant Answers", desc: "Powered by Gemini AI with Nirma knowledge" },
];

// Extract text content from a UIMessage (v6 uses parts array)
function getMessageText(message: UIMessage): string {
  if (message.parts) {
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");
  }
  return "";
}

export default function Home() {
  // AI SDK v6: useChat returns sendMessage, status, messages, stop
  const { messages, sendMessage, status, stop } = useChat({});

  const [inputValue, setInputValue] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Track scroll position for scroll-to-bottom button
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle quick action button clicks
  const handleQuickAction = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send feedback to API
  const sendFeedback = async (messageId: string, rating: "thumbs_up" | "thumbs_down") => {
    if (feedbackGiven[messageId]) return; // Already gave feedback
    setFeedbackGiven((prev) => ({ ...prev, [messageId]: rating }));
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: messageId, rating }),
      });
    } catch {
      // Silently fail — feedback is non-critical
    }
  };

  // Handle form submission
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue("");
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  // Enter to submit, Shift+Enter for new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        sendMessage({ text: inputValue.trim() });
        setInputValue("");
        if (inputRef.current) {
          inputRef.current.style.height = "auto";
        }
      }
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-deepest)]">
      {/* === HEADER === */}
      <header className="glass-strong border-b border-white/5 px-4 py-3 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Nirma<span className="text-gradient">Sarathi</span>
            </h1>
            <p className="text-[11px] text-slate-500 -mt-0.5">
              AI-Powered Campus Assistant • Nirma University
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
              Online
            </span>
          </div>
          <a
            href="/admin"
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            Admin →
          </a>
        </div>
      </header>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {!hasMessages ? (
          /* === WELCOME SCREEN === */
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 hero-bg overflow-y-auto">
            <div className="max-w-2xl w-full text-center animate-fade-in-up">
              {/* Hero Icon */}
              <div className="mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/25 animate-float">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  🙏 Namaste! I&apos;m{" "}
                  <span className="text-gradient">NirmaSarathi</span>
                </h2>
                <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
                  Your AI-powered campus companion at Nirma University.
                  <br />
                  <span className="text-slate-500 text-sm">
                    Ask me anything about library, exams, grievances, or campus life.
                  </span>
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 stagger">
                {FEATURES.map((f, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl p-3.5 text-left hover:bg-white/[0.03] transition-all duration-200 animate-fade-in-up group"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <f.icon className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-white mb-0.5">{f.title}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-xs text-slate-600 uppercase tracking-wider font-medium">
                  Try asking
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {QUICK_ACTIONS.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass hover:bg-amber-500/10 hover:border-amber-500/20 transition-all text-sm text-slate-300 hover:text-amber-300 group"
                    >
                      <action.icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* === CHAT MESSAGES === */
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6 space-y-1"
          >
            {messages.map((message) => {
              const text = getMessageText(message);
              if (!text && message.role === "user") return null;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 max-w-3xl mx-auto py-2 ${
                    message.role === "user" ? "message-user" : "message-assistant"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                      message.role === "user"
                        ? "bg-indigo-500/20 border border-indigo-500/30"
                        : "bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-500/20"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold ${
                          message.role === "user"
                            ? "text-indigo-400"
                            : "text-amber-400"
                        }`}
                      >
                        {message.role === "user" ? "You" : "NirmaSarathi"}
                      </span>
                      {message.role === "assistant" && (
                        <span className="flex items-center gap-1 text-[10px] text-slate-600">
                          <Sparkles className="w-3 h-3" /> Gemini AI
                        </span>
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-indigo-500/10 border border-indigo-500/15 text-slate-200"
                          : "bg-white/[0.03] border border-white/5 text-slate-300"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="chat-markdown text-sm leading-relaxed">
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{text}</p>
                      )}
                    </div>

                    {/* Feedback Buttons for Assistant messages */}
                    {message.role === "assistant" && text && (
                      <div className="flex items-center gap-2 mt-1.5 ml-1">
                        <button
                          onClick={() => sendFeedback(message.id, "thumbs_up")}
                          disabled={!!feedbackGiven[message.id]}
                          className={`p-1 rounded transition-colors ${
                            feedbackGiven[message.id] === "thumbs_up"
                              ? "text-emerald-400 bg-emerald-500/10"
                              : "text-slate-600 hover:bg-white/5 hover:text-emerald-400"
                          } disabled:cursor-default`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => sendFeedback(message.id, "thumbs_down")}
                          disabled={!!feedbackGiven[message.id]}
                          className={`p-1 rounded transition-colors ${
                            feedbackGiven[message.id] === "thumbs_down"
                              ? "text-red-400 bg-red-500/10"
                              : "text-slate-600 hover:bg-white/5 hover:text-red-400"
                          } disabled:cursor-default`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator — shown when waiting for assistant response */}
            {isLoading &&
              (messages.length === 0 ||
                messages[messages.length - 1]?.role === "user") && (
                <div className="flex gap-3 max-w-3xl mx-auto py-2 message-assistant">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-amber-500/20">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-amber-400 mb-1 block">
                      NirmaSarathi
                    </span>
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 inline-block">
                      <div className="typing-indicator flex items-center gap-0.5">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-6 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all shadow-lg z-10"
          >
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        )}

        {/* === INPUT BAR === */}
        <div className="shrink-0 p-4 border-t border-white/5 glass-strong">
          <form
            id="chat-form"
            onSubmit={onFormSubmit}
            className="max-w-3xl mx-auto flex items-end gap-3"
          >
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask NirmaSarathi anything about Nirma University..."
                rows={1}
                className="w-full resize-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all max-h-32"
                style={{ height: "auto", minHeight: "44px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 128) + "px";
                }}
              />
            </div>

            {isLoading ? (
              <button
                type="button"
                onClick={() => stop()}
                className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all shrink-0"
                title="Stop generating"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none hover:scale-105 active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </form>
          <p className="text-center text-[10px] text-slate-700 mt-2 max-w-3xl mx-auto">
            NirmaSarathi is powered by Google Gemini AI • Answers grounded in verified
            Nirma University data •{" "}
            <span className="text-amber-700">EN</span> /{" "}
            <span className="text-amber-700">हिंदी</span> /{" "}
            <span className="text-amber-700">ગુજરાતી</span>
          </p>
        </div>
      </main>
    </div>
  );
}
