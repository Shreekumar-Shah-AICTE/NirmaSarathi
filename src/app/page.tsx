"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const QUICK_ACTIONS = [
  { label: "Library Hours", prompt: "What are the library timings?" },
  { label: "Exam Schedule", prompt: "When are the upcoming CAE-2 exams?" },
  { label: "Hostel Menu", prompt: "What's the hostel mess menu for today?" },
  { label: "Fee Structure", prompt: "What is the fee structure for B.Tech CSE?" },
];

const FEATURES = [
  { icon: "library_books", title: "Library", desc: "Access digital journals, book availability, and reserved study zones." },
  { icon: "assignment", title: "Exams", desc: "Get personalized schedules, seating plans, and previous year results." },
  { icon: "campaign", title: "Grievances", desc: "Direct channel for reporting campus issues or seeking administrative aid." },
  { icon: "self_improvement", title: "Wellness", desc: "Mental health resources, campus clinic hours, and sports schedules." },
  { icon: "translate", title: "Multi-Lingual", desc: "Engage with intelligence in English, Hindi, or Gujarati fluently." },
  { icon: "bolt", title: "Instant Answers", desc: "No more waiting. Get real-time data on campus events and announcements." },
];

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
  const { messages, sendMessage, status, stop } = useChat({});
  const [inputValue, setInputValue] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

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

  const handleQuickAction = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendFeedback = async (messageId: string, rating: "thumbs_up" | "thumbs_down") => {
    if (feedbackGiven[messageId]) return;
    setFeedbackGiven((prev) => ({ ...prev, [messageId]: rating }));
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: messageId, rating }),
      });
    } catch { /* non-critical */ }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        sendMessage({ text: inputValue.trim() });
        setInputValue("");
      }
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="bg-background text-on-surface min-h-screen selection:bg-primary-container selection:text-white nebula-bg">

      {/* ═══ Top Navigation Bar ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-[#06061a]/60 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 py-4 shadow-[0_8px_32px_0_rgba(124,58,237,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center pulsing-orb">
            <span className="text-xl">🎓</span>
          </div>
          <div className="text-xl font-bold tracking-tight font-headline">
            <span className="text-white">Nirma</span>
            <span className="animated-gradient-text">Sarathi</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Online</span>
          </div>
          <Link href="/grievances" className="text-slate-400 hover:text-violet-300 transition-colors duration-300 font-medium">
            Grievances
          </Link>
          <Link href="/admin" className="text-violet-400 font-semibold flex items-center gap-1 group">
            Admin
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </nav>

      {/* ═══ Side Navigation (Desktop) ═══ */}
      <aside className="hidden lg:flex flex-col py-8 px-4 h-full w-64 fixed left-0 top-[73px] bg-[#0c0c20]/80 backdrop-blur-2xl border-r border-white/5 z-40">
        <div className="mb-10">
          <button className="w-full py-3 px-4 bg-primary-container text-on-primary-container rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(124,58,237,0.2)] active:scale-95 transition-all">
            <span className="material-symbols-outlined">add</span>
            New Thread
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-4 px-4 py-3 text-cyan-400 font-bold border-r-2 border-cyan-400 cursor-pointer bg-violet-500/10 rounded-l-lg transition-all">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Oracle</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-violet-500/10 hover:text-violet-200 transition-all cursor-pointer">
            <span className="material-symbols-outlined">auto_stories</span>
            <span>Library</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-violet-500/10 hover:text-violet-200 transition-all cursor-pointer">
            <span className="material-symbols-outlined">quiz</span>
            <span>Exams</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-violet-500/10 hover:text-violet-200 transition-all cursor-pointer">
            <span className="material-symbols-outlined">history</span>
            <span>History</span>
          </div>
        </div>
        <div className="mt-auto p-4 rounded-2xl bg-surface-container-low border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-violet-500/30 bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Student Hub</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Cosmic Intelligence</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ Main Content Area ═══ */}
      {!hasMessages ? (
        <main className="lg:ml-64 pt-28 pb-40 px-6 md:px-12 max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16 animate-fade-in-up">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border border-violet-500/20 flex items-center justify-center mx-auto pulsing-orb relative z-10">
                <span className="material-symbols-outlined text-4xl text-violet-400" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              🙏 <span className="text-white">Namaste! I&apos;m</span> <span className="animated-gradient-text">NirmaSarathi</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Your cosmic guide through campus life at Nirma University.
            </p>
          </section>

          {/* Feature Grid (2x3 Bento Style) */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 stagger">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="material-symbols-outlined text-3xl text-violet-500 mb-6 block">{f.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </section>

          {/* Quick Action Pills */}
          <section className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400/60 mr-2">Try asking</span>
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.prompt)}
                className="px-5 py-2 rounded-full glass-card text-sm font-medium text-slate-300 hover:text-white hover:bg-violet-500/20 transition-all border border-white/5"
              >
                {action.label}
              </button>
            ))}
          </section>
        </main>
      ) : (
        /* ═══ Chat Messages View ═══ */
        <main className="lg:ml-64 pt-28 pb-40 px-6 md:px-12 max-w-4xl mx-auto" ref={chatContainerRef}>
          <div className="space-y-4">
            {messages.map((message) => {
              const text = getMessageText(message);
              if (!text && message.role === "user") return null;

              return (
                <div key={message.id} className={message.role === "user" ? "message-user" : "message-assistant"}>
                  <div className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
                    {message.role === "assistant" && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1 pulsing-orb">
                        <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold ${message.role === "user" ? "text-violet-400 ml-auto" : "text-cyan-400"}`}>
                          {message.role === "user" ? "You" : "NirmaSarathi"}
                        </span>
                        {message.role === "assistant" && (
                          <span className="text-[10px] text-slate-600 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">auto_awesome</span> Gemini AI
                          </span>
                        )}
                      </div>
                      <div className={`rounded-2xl px-5 py-3.5 ${
                        message.role === "user"
                          ? "bg-primary-container/20 border border-primary-container/30 text-on-surface inline-block"
                          : "glass-panel text-on-surface-variant"
                      }`}>
                        {message.role === "assistant" ? (
                          <div className="chat-markdown text-sm leading-relaxed">
                            <ReactMarkdown>{text}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{text}</p>
                        )}
                      </div>
                      {/* Feedback Buttons */}
                      {message.role === "assistant" && text && (
                        <div className="flex items-center gap-2 mt-2 ml-1">
                          <button
                            onClick={() => sendFeedback(message.id, "thumbs_up")}
                            disabled={!!feedbackGiven[message.id]}
                            className={`p-1.5 rounded-lg transition-all ${
                              feedbackGiven[message.id] === "thumbs_up"
                                ? "text-emerald-400 bg-emerald-500/10"
                                : "text-slate-600 hover:bg-white/5 hover:text-emerald-400"
                            } disabled:cursor-default`}
                          >
                            <span className="material-symbols-outlined text-base">thumb_up</span>
                          </button>
                          <button
                            onClick={() => sendFeedback(message.id, "thumbs_down")}
                            disabled={!!feedbackGiven[message.id]}
                            className={`p-1.5 rounded-lg transition-all ${
                              feedbackGiven[message.id] === "thumbs_down"
                                ? "text-red-400 bg-red-500/10"
                                : "text-slate-600 hover:bg-white/5 hover:text-red-400"
                            } disabled:cursor-default`}
                          >
                            <span className="material-symbols-outlined text-base">thumb_down</span>
                          </button>
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="w-10 h-10 rounded-full bg-surface-container-high border border-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                        <span className="material-symbols-outlined text-violet-400 text-lg">person</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (messages.length === 0 || messages[messages.length - 1]?.role === "user") && (
              <div className="flex gap-4 message-assistant">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1 pulsing-orb">
                  <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-cyan-400 mb-1 block">NirmaSarathi</span>
                  <div className="glass-panel rounded-2xl px-5 py-3.5 inline-block">
                    <div className="typing-indicator flex items-center gap-0.5">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>
      )}

      {/* Scroll to Bottom */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-32 right-8 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all shadow-lg z-50"
        >
          <span className="material-symbols-outlined text-slate-400">keyboard_arrow_down</span>
        </button>
      )}

      {/* ═══ Bottom Sticky Chat Input Bar ═══ */}
      <div className="fixed bottom-0 w-full lg:pl-64 z-50 p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <form onSubmit={onFormSubmit} className="relative group">
            {/* Animated Gradient Border Wrapper */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 rounded-2xl opacity-30 group-focus-within:opacity-100 transition-opacity blur-[1px]"></div>
            <div className="relative bg-surface-container-highest/40 backdrop-blur-2xl rounded-2xl flex items-center p-2 shadow-2xl">
              <button type="button" className="p-3 text-slate-400 hover:text-violet-400 transition-colors">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-on-surface placeholder:text-slate-500 px-4 py-3"
                placeholder="Message NirmaSarathi..."
                type="text"
              />
              <div className="flex items-center gap-2 pr-2">
                {isLoading ? (
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined">stop</span>
                  </button>
                ) : (
                  <>
                    <button type="button" className="p-3 text-slate-400 hover:text-violet-400 transition-colors">
                      <span className="material-symbols-outlined">mic</span>
                    </button>
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.6)] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
          <footer className="mt-4 text-center">
            <p className="text-[10px] font-medium tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2">
              Powered by Google Gemini AI
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <span className="text-violet-400/80">EN / हिंदी / ગુજરાતી</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
