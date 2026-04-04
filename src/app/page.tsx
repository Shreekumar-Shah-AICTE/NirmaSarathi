"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const QUICK_ACTIONS = [
  { label: "Library Hours", prompt: "What are the library timings?" },
  { label: "Exam Schedule", prompt: "When are the upcoming CAE-2 exams?" },
  { label: "Today's Menu", prompt: "What's the hostel mess menu for today?" },
  { label: "Upcoming Events", prompt: "What events are happening this week?" },
  { label: "Find My Club", prompt: "I'm interested in coding and AI. Which clubs should I join?" },
  { label: "Placement Stats", prompt: "What are the placement statistics for B.Tech CSE?" },
];

const FEATURES = [
  { icon: "search", title: "Lost & Found", desc: "Report lost items or help reunite found belongings. AI-matched recovery.", link: "/lost-found", color: "#ef4444" },
  { icon: "event", title: "Events Hub", desc: "Campus events, workshops, fests, and placement drives — all in one place.", link: "/events", color: "#ec4899" },
  { icon: "groups", title: "Community", desc: "15+ clubs and societies. Find your tribe based on your interests.", link: "/community", color: "#f59e0b" },
  { icon: "school", title: "Study Resources", desc: "Peer-shared notes, PYQs, videos, and slides. Verified by upvotes.", link: "/resources", color: "#10b981" },
  { icon: "campaign", title: "Grievances", desc: "File and track complaints with auto-routing and real-time status.", link: "/grievances", color: "#a78bfa" },
  { icon: "self_improvement", title: "Wellness", desc: "Mental health support, counseling access, and crisis helplines.", color: "#4cd7f6" },
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
    <div
      className="min-h-screen nebula-bg"
      style={{
        backgroundColor: "#06061a",
        color: "#e2e0fd",
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* ═══ Top Navigation Bar — Verbatim from Stitch ═══ */}
      <nav
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4"
        style={{
          backgroundColor: "rgba(6,6,26,0.6)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 8px 32px 0 rgba(124,58,237,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center pulsing-orb"
            style={{ background: "linear-gradient(to top right, #7c3aed, #06b6d4)" }}
          >
            <span style={{ fontSize: "20px" }}>🎓</span>
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.025em" }}>
            <span style={{ color: "white" }}>Nirma</span>
            <span className="animated-gradient-text">Sarathi</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              backgroundColor: "#19192e",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span style={{ fontSize: "10px", fontWeight: 500, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Online
            </span>
          </div>
          <Link href="/events" style={{ color: "#94a3b8", fontWeight: 500, fontSize: "14px" }} className="hover:text-violet-300 transition-colors duration-300">Events</Link>
          <Link href="/lost-found" style={{ color: "#94a3b8", fontWeight: 500, fontSize: "14px" }} className="hover:text-violet-300 transition-colors duration-300">Lost & Found</Link>
          <Link href="/community" style={{ color: "#94a3b8", fontWeight: 500, fontSize: "14px" }} className="hover:text-violet-300 transition-colors duration-300">Community</Link>
          <Link href="/resources" style={{ color: "#94a3b8", fontWeight: 500, fontSize: "14px" }} className="hover:text-violet-300 transition-colors duration-300">Resources</Link>
          <Link href="/grievances" style={{ color: "#94a3b8", fontWeight: 500, fontSize: "14px" }} className="hover:text-violet-300 transition-colors duration-300">Grievances</Link>
          <Link
            href="/admin"
            className="flex items-center gap-1 group"
            style={{ color: "#a78bfa", fontWeight: 600, fontSize: "14px" }}
          >
            Admin
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: "14px" }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </nav>

      {/* ═══ Side Navigation (Desktop Only) — Verbatim from Stitch ═══ */}
      <aside
        className="hidden lg:flex flex-col py-8 px-4 w-64 fixed left-0 z-40"
        style={{
          top: "73px",
          height: "calc(100vh - 73px)",
          backgroundColor: "rgba(12,12,32,0.8)",
          backdropFilter: "blur(48px)",
          WebkitBackdropFilter: "blur(48px)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <button
            className="w-full py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            style={{
              backgroundColor: "#7c3aed",
              color: "#ede0ff",
              boxShadow: "0 10px 20px rgba(124,58,237,0.2)",
            }}
          >
            <span className="material-symbols-outlined">add</span>
            New Thread
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all"
            style={{
              color: "#22d3ee",
              fontWeight: 700,
              borderRight: "2px solid #22d3ee",
              backgroundColor: "rgba(139,92,246,0.1)",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Oracle</span>
          </div>
          <Link href="/events" className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all hover:text-violet-200" style={{ color: "#64748b", textDecoration: "none" }}>
            <span className="material-symbols-outlined">event</span>
            <span>Events</span>
          </Link>
          <Link href="/lost-found" className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all hover:text-violet-200" style={{ color: "#64748b", textDecoration: "none" }}>
            <span className="material-symbols-outlined">search</span>
            <span>Lost & Found</span>
          </Link>
          <Link href="/community" className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all hover:text-violet-200" style={{ color: "#64748b", textDecoration: "none" }}>
            <span className="material-symbols-outlined">groups</span>
            <span>Community</span>
          </Link>
          <Link href="/resources" className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all hover:text-violet-200" style={{ color: "#64748b", textDecoration: "none" }}>
            <span className="material-symbols-outlined">school</span>
            <span>Resources</span>
          </Link>
          <Link href="/grievances" className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all hover:text-violet-200" style={{ color: "#64748b", textDecoration: "none" }}>
            <span className="material-symbols-outlined">campaign</span>
            <span>Grievances</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all hover:text-violet-200" style={{ color: "#64748b", textDecoration: "none" }}>
            <span className="material-symbols-outlined">dashboard</span>
            <span>Admin</span>
          </Link>
        </div>
        <div className="mt-auto p-4 rounded-2xl" style={{ backgroundColor: "#19192e", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(to top right, #7c3aed, #06b6d4)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <span style={{ fontSize: "18px" }}>👤</span>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Student Hub</div>
              <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "-0.025em" }}>
                Cosmic Intelligence
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ Main Content Area ═══ */}
      {!hasMessages ? (
        <main style={{ marginLeft: "0", paddingTop: "112px", paddingBottom: "160px", paddingLeft: "24px", paddingRight: "24px" }}
          className="lg:!ml-64 md:!px-12"
        >
          <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
            {/* Hero Section — From Stitch */}
            <section className="text-center animate-fade-in-up" style={{ marginBottom: "64px" }}>
              <div className="relative inline-block" style={{ marginBottom: "24px" }}>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto pulsing-orb relative z-10"
                  style={{
                    backgroundColor: "#28283e",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "36px", color: "#a78bfa", fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
                <div
                  className="absolute rounded-full"
                  style={{ inset: 0, backgroundColor: "rgba(124,58,237,0.2)", filter: "blur(24px)" }}
                ></div>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 900, marginBottom: "16px", letterSpacing: "-0.025em" }}>
                🙏 <span style={{ color: "white" }}>Namaste! I&apos;m</span>{" "}
                <span className="animated-gradient-text">NirmaSarathi</span>
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 500, maxWidth: "42rem", margin: "0 auto" }}>
                Your Unified Campus Intelligence Platform — One interface, ten solutions, zero fragmentation.
              </p>
            </section>

            {/* Feature Grid (2x3 Bento) — From Stitch */}
            <section
              className="stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: "24px",
                marginBottom: "48px",
              }}
            >
              <style>{`
                @media (min-width: 768px) { .ns-feature-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (min-width: 1024px) { .ns-feature-grid { grid-template-columns: repeat(3, 1fr) !important; } }
              `}</style>
              <div className="ns-feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "24px" }}>
                {FEATURES.map((f, i) => {
                  const cardStyle = {
                    padding: "32px",
                    borderRadius: "16px",
                    transition: "all 0.3s",
                    animationDelay: `${i * 80}ms`,
                    textDecoration: "none" as const,
                    color: "inherit" as const,
                    cursor: f.link ? "pointer" as const : "default" as const,
                    borderLeft: `3px solid ${f.color || '#8b5cf6'}`,
                  };
                  const cardContent = (
                    <>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "30px", color: f.color || "#8b5cf6", marginBottom: "24px", display: "block" }}
                      >
                        {f.icon}
                      </span>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "8px" }}>{f.title}</h3>
                      <p style={{ color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
                      {f.link && (
                        <span style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 700, color: f.color || "#a78bfa" }}>
                          Explore <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
                        </span>
                      )}
                    </>
                  );
                  return f.link ? (
                    <Link key={i} href={f.link} className="glass-card animate-fade-in-up" style={cardStyle}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={i} className="glass-card animate-fade-in-up" style={cardStyle}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Action Pills — From Stitch */}
            <section className="flex flex-wrap items-center justify-center gap-3" style={{ marginBottom: "64px" }}>
              <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(167,139,250,0.6)", marginRight: "8px" }}>
                Try asking
              </span>
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="glass-card"
                  style={{
                    padding: "8px 20px",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#cbd5e1",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: "rgba(124,58,237,0.06)",
                  }}
                >
                  {action.label}
                </button>
              ))}
            </section>
          </div>
        </main>
      ) : (
        /* ═══ Chat Messages View ═══ */
        <main
          ref={chatContainerRef}
          className="lg:!ml-64"
          style={{ paddingTop: "112px", paddingBottom: "160px", paddingLeft: "24px", paddingRight: "24px", maxWidth: "56rem", margin: "0 auto" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.map((message) => {
              const text = getMessageText(message);
              if (!text && message.role === "user") return null;

              return (
                <div key={message.id} className={message.role === "user" ? "message-user" : "message-assistant"}>
                  <div style={{ display: "flex", gap: "16px", justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}>
                    {message.role === "assistant" && (
                      <div
                        className="pulsing-orb"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "9999px",
                          background: "linear-gradient(to top right, #7c3aed, #06b6d4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "4px",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ color: "white", fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>
                          auto_awesome
                        </span>
                      </div>
                    )}
                    <div style={{ maxWidth: "80%", textAlign: message.role === "user" ? "right" : "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: message.role === "user" ? "#a78bfa" : "#22d3ee", marginLeft: message.role === "user" ? "auto" : undefined }}>
                          {message.role === "user" ? "You" : "NirmaSarathi"}
                        </span>
                        {message.role === "assistant" && (
                          <span style={{ fontSize: "10px", color: "#475569", display: "flex", alignItems: "center", gap: "4px" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>auto_awesome</span> Gemini AI
                          </span>
                        )}
                      </div>
                      <div
                        className={message.role === "user" ? "" : "glass-panel"}
                        style={{
                          borderRadius: "16px",
                          padding: "14px 20px",
                          display: message.role === "user" ? "inline-block" : undefined,
                          ...(message.role === "user"
                            ? {
                                backgroundColor: "rgba(124,58,237,0.2)",
                                border: "1px solid rgba(124,58,237,0.3)",
                                color: "#e2e0fd",
                              }
                            : {
                                color: "#ccc3d8",
                              }),
                        }}
                      >
                        {message.role === "assistant" ? (
                          <div className="chat-markdown" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                            <ReactMarkdown>{text}</ReactMarkdown>
                          </div>
                        ) : (
                          <p style={{ fontSize: "14px", lineHeight: 1.6 }}>{text}</p>
                        )}
                      </div>
                      {/* Feedback Buttons */}
                      {message.role === "assistant" && text && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", marginLeft: "4px" }}>
                          <button
                            onClick={() => sendFeedback(message.id, "thumbs_up")}
                            disabled={!!feedbackGiven[message.id]}
                            style={{
                              padding: "6px",
                              borderRadius: "8px",
                              border: "none",
                              background: feedbackGiven[message.id] === "thumbs_up" ? "rgba(16,185,129,0.1)" : "transparent",
                              color: feedbackGiven[message.id] === "thumbs_up" ? "#34d399" : "#475569",
                              cursor: feedbackGiven[message.id] ? "default" : "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>thumb_up</span>
                          </button>
                          <button
                            onClick={() => sendFeedback(message.id, "thumbs_down")}
                            disabled={!!feedbackGiven[message.id]}
                            style={{
                              padding: "6px",
                              borderRadius: "8px",
                              border: "none",
                              background: feedbackGiven[message.id] === "thumbs_down" ? "rgba(239,68,68,0.1)" : "transparent",
                              color: feedbackGiven[message.id] === "thumbs_down" ? "#f87171" : "#475569",
                              cursor: feedbackGiven[message.id] ? "default" : "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>thumb_down</span>
                          </button>
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "9999px",
                          backgroundColor: "#28283e",
                          border: "1px solid rgba(139,92,246,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "4px",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ color: "#a78bfa", fontSize: "18px" }}>person</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (messages.length === 0 || messages[messages.length - 1]?.role === "user") && (
              <div className="message-assistant" style={{ display: "flex", gap: "16px" }}>
                <div
                  className="pulsing-orb"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    background: "linear-gradient(to top right, #7c3aed, #06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "4px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: "white", fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#22d3ee", marginBottom: "4px", display: "block" }}>NirmaSarathi</span>
                  <div className="glass-panel" style={{ borderRadius: "16px", padding: "14px 20px", display: "inline-block" }}>
                    <div className="typing-indicator" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
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
          className="glass-panel"
          style={{
            position: "fixed",
            bottom: "128px",
            right: "32px",
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 50,
            border: "none",
          }}
        >
          <span className="material-symbols-outlined" style={{ color: "#94a3b8" }}>keyboard_arrow_down</span>
        </button>
      )}

      {/* ═══ Bottom Sticky Chat Input Bar — Verbatim from Stitch ═══ */}
      <div
        className="lg:!pl-64"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 50,
          padding: "24px",
          pointerEvents: "none",
        }}
      >
        <div style={{ maxWidth: "56rem", margin: "0 auto", pointerEvents: "auto" }}>
          <form onSubmit={onFormSubmit} className="relative group">
            {/* Animated Gradient Border Wrapper */}
            <div
              style={{
                position: "absolute",
                inset: "-1px",
                background: "linear-gradient(to right, #7c3aed, #06b6d4, #7c3aed)",
                borderRadius: "16px",
                opacity: 0.3,
                filter: "blur(1px)",
                transition: "opacity 0.3s",
              }}
              className="group-focus-within:!opacity-100"
            ></div>
            <div
              style={{
                position: "relative",
                backgroundColor: "rgba(51,51,73,0.4)",
                backdropFilter: "blur(48px)",
                WebkitBackdropFilter: "blur(48px)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                padding: "8px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              <button type="button" style={{ padding: "12px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  color: "#e2e0fd",
                  padding: "12px 16px",
                  fontSize: "16px",
                  fontFamily: "'Inter', sans-serif",
                }}
                placeholder="Message NirmaSarathi..."
              />
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "8px" }}>
                {isLoading ? (
                  <button
                    type="button"
                    onClick={() => stop()}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(239,68,68,0.2)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f87171",
                      cursor: "pointer",
                    }}
                  >
                    <span className="material-symbols-outlined">stop</span>
                  </button>
                ) : (
                  <>
                    <button type="button" style={{ padding: "12px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>
                      <span className="material-symbols-outlined">mic</span>
                    </button>
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "linear-gradient(to bottom right, #8b5cf6, #6d28d9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        border: "none",
                        cursor: inputValue.trim() ? "pointer" : "not-allowed",
                        boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
                        transition: "all 0.2s",
                        opacity: inputValue.trim() ? 1 : 0.3,
                      }}
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
          <footer style={{ marginTop: "16px", textAlign: "center" }}>
            <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", color: "#64748b", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              Powered by Google Gemini AI
              <span style={{ width: "4px", height: "4px", backgroundColor: "#334155", borderRadius: "9999px", display: "inline-block" }}></span>
              <span style={{ color: "rgba(167,139,250,0.8)" }}>EN / हिंदी / ગુજરાતી</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
