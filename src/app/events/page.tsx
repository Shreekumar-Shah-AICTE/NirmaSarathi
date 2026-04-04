"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  endDate: string | null;
  organizer: string;
  isToday: boolean;
  isFeatured: boolean;
  registrationLink: string | null;
}

const CATEGORY_FILTERS = ["All", "Academic", "Cultural", "Sports", "Technical", "Clubs", "Placement"];

const categoryConfig: Record<string, { color: string; bg: string; icon: string }> = {
  Academic: { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", icon: "school" },
  Cultural: { color: "#ec4899", bg: "rgba(236,72,153,0.15)", icon: "celebration" },
  Sports: { color: "#10b981", bg: "rgba(16,185,129,0.15)", icon: "sports_soccer" },
  Technical: { color: "#4cd7f6", bg: "rgba(76,215,246,0.15)", icon: "code" },
  Clubs: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: "group" },
  Placement: { color: "#ef4444", bg: "rgba(239,68,68,0.15)", icon: "work" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function getCountdown(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff < 0) return "Ongoing";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams();
        if (activeCategory !== "All") params.set("category", activeCategory);
        const res = await fetch(`/api/events?${params}`);
        const data = await res.json();
        setEvents(data.events || []);
      } catch { /* */ }
      setLoading(false);
    })();
  }, [activeCategory]);

  const featured = events.filter(e => e.isFeatured);
  const todayEvents = events.filter(e => e.isToday);
  const upcomingEvents = events.filter(e => !e.isToday);

  return (
    <div style={{ backgroundColor: "#06061a", color: "#e2e0fd", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <div className="nebula-blob" style={{ top: "-200px", left: "-100px", background: "#ec4899" }}></div>
      <div className="nebula-blob" style={{ bottom: "-200px", right: "-100px", background: "#4cd7f6" }}></div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center" style={{ backgroundColor: "rgba(6,6,26,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(139,92,246,0.1)", boxShadow: "0px 20px 40px rgba(124,58,237,0.15)", padding: "16px 32px" }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to top right, #ec4899, #7c3aed)", boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}>
            <span className="material-symbols-outlined" style={{ color: "white", fontVariationSettings: "'FILL' 1" }}>event</span>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.05em", color: "#a78bfa" }}>NirmaSarathi</h1>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 600 }}>Events & Announcements</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-all" style={{ padding: "8px 16px", borderRadius: "8px", backgroundColor: "rgba(139,92,246,0.1)", color: "#a78bfa", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chat</span> Oracle
          </Link>
          <Link href="/lost-found" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Lost & Found</Link>
          <Link href="/community" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Community</Link>
          <Link href="/resources" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Resources</Link>
        </div>
      </nav>

      <main style={{ paddingTop: "128px", paddingBottom: "80px", paddingLeft: "16px", paddingRight: "16px", maxWidth: "72rem", margin: "0 auto" }} className="md:!px-8">
        {/* Hero */}
        <header className="animate-fade-in-up" style={{ marginBottom: "48px", textAlign: "center" }}>
          <span style={{ color: "#ec4899", fontWeight: 700, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>Campus Pulse</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "16px" }}>
            What&apos;s{" "}
            <span style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #ec4899, #a78bfa)" }}>Happening?</span>
          </h1>
          <p style={{ color: "#ccc3d8", maxWidth: "42rem", margin: "0 auto", fontSize: "18px", lineHeight: 1.6 }}>Your unified event calendar. Never miss a hackathon, fest, placement drive, or workshop again.</p>
        </header>

        {/* Category Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "48px" }}>
          {CATEGORY_FILTERS.map(c => {
            const cc = categoryConfig[c];
            return (
              <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "8px 20px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px", ...(activeCategory === c ? { backgroundColor: cc?.bg || "#7c3aed", color: cc?.color || "white", boxShadow: `0 0 20px ${cc?.bg || "rgba(124,58,237,0.2)"}` } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>
                {cc && <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{cc.icon}</span>}
                {c}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div className="typing-indicator" style={{ display: "inline-flex", gap: "4px" }}><span></span><span></span><span></span></div>
          </div>
        ) : (
          <>
            {/* Featured / Today Events */}
            {todayEvents.length > 0 && (
              <section style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                  <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
                  Happening Today
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                  {todayEvents.map(event => {
                    const cc = categoryConfig[event.category] || categoryConfig.Academic;
                    return (
                      <div key={event.id} style={{ position: "relative", overflow: "hidden", borderRadius: "20px", padding: "32px", border: "1px solid rgba(16,185,129,0.3)", background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(124,58,237,0.08))", backdropFilter: "blur(16px)" }}>
                        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: cc.bg, filter: "blur(80px)", opacity: 0.4 }}></div>
                        <div style={{ position: "relative" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                            <span style={{ padding: "4px 12px", borderRadius: "9999px", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", backgroundColor: cc.bg, color: cc.color }}>{event.category}</span>
                            <span style={{ padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 900, backgroundColor: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>LIVE NOW</span>
                          </div>
                          <h3 style={{ fontSize: "24px", fontWeight: 900, color: "white", marginBottom: "8px" }}>{event.title}</h3>
                          <p style={{ fontSize: "14px", color: "#ccc3d8", lineHeight: 1.6, marginBottom: "16px" }}>{event.description}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#94a3b8" }}><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>location_on</span> {event.venue}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#94a3b8" }}><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>schedule</span> {formatTime(event.date)}{event.endDate ? ` – ${formatTime(event.endDate)}` : ""}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#94a3b8" }}><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>group</span> {event.organizer}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Featured Events */}
            {featured.length > 0 && (
              <section style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                  <span className="material-symbols-outlined" style={{ color: "#f59e0b" }}>star</span> Featured Events
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                  <style>{`@media (min-width: 768px) { .ns-featured-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (min-width: 1024px) { .ns-featured-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
                  <div className="ns-featured-grid stagger" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                    {featured.filter(e => !e.isToday).map((event, i) => {
                      const cc = categoryConfig[event.category] || categoryConfig.Academic;
                      return (
                        <div key={event.id} className="glass-card animate-fade-in-up" style={{ borderRadius: "16px", padding: "24px", animationDelay: `${i * 80}ms`, position: "relative", overflow: "hidden" }}>
                          <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", background: cc.bg, filter: "blur(50px)", opacity: 0.5 }}></div>
                          <div style={{ position: "relative" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                              <span style={{ padding: "4px 12px", borderRadius: "9999px", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", backgroundColor: cc.bg, color: cc.color }}>{event.category}</span>
                              <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 700 }}>⏱ {getCountdown(event.date)}</span>
                            </div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "8px", lineHeight: 1.3 }}>{event.title}</h3>
                            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.5, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{event.description}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#94a3b8" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="material-symbols-outlined" style={{ fontSize: "14px" }}>calendar_today</span> {formatDate(event.date)}</span>
                              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span> {event.venue}</span>
                              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="material-symbols-outlined" style={{ fontSize: "14px" }}>group</span> {event.organizer}</span>
                            </div>
                            {event.registrationLink && (
                              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "16px", padding: "8px 16px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
                                Register <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>open_in_new</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* All Upcoming Events */}
            <section>
              <h2 style={{ fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                <span className="material-symbols-outlined" style={{ color: "#a78bfa" }}>calendar_month</span> All Events
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {upcomingEvents.map(event => {
                  const cc = categoryConfig[event.category] || categoryConfig.Academic;
                  return (
                    <div key={event.id} className="glass-panel" style={{ borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px", borderLeft: `3px solid ${cc.color}` }}>
                      {/* Date Badge */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px", padding: "8px 12px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.05)" }}>
                        <span style={{ fontSize: "20px", fontWeight: 900, color: "white" }}>{new Date(event.date).getDate()}</span>
                        <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8" }}>{new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}</span>
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", backgroundColor: cc.bg, color: cc.color }}>{event.category}</span>
                        </div>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{event.title}</h3>
                        <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "#94a3b8" }}>
                          <span>{event.venue}</span>
                          <span>{formatTime(event.date)}</span>
                          <span className="hidden md:inline">{event.organizer}</span>
                        </div>
                      </div>
                      {/* Countdown */}
                      <div className="hidden md:block" style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: cc.color }}>{getCountdown(event.date)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
