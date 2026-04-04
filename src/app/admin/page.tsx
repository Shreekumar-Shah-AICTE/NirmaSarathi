"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// === SEED DATA ===
const kpiData = [
  { title: "Total Queries", value: "1,847", icon: "query_stats", change: "+23%", positive: true, iconBg: "rgba(124,58,237,0.2)", iconColor: "#d2bbff" },
  { title: "Active Students", value: "3,241", icon: "group", change: "+12%", positive: true, iconBg: "rgba(87,27,193,0.2)", iconColor: "#d0bcff" },
  { title: "Open Grievances", value: "23", icon: "report_problem", change: "-8%", positive: true, iconBg: "rgba(147,0,10,0.2)", iconColor: "#ffb4ab" },
  { title: "Satisfaction", value: "94.2%", icon: "thumb_up", change: "+2.1%", positive: true, iconBg: "rgba(16,185,129,0.2)", iconColor: "#34d399" },
  { title: "Avg Response", value: "1.2s", icon: "speed", change: "-15%", positive: true, iconBg: "rgba(0,113,132,0.2)", iconColor: "#4cd7f6" },
  { title: "Wellness Flags", value: "7", icon: "monitor_heart", change: "+2 red", positive: false, iconBg: "rgba(236,72,153,0.2)", iconColor: "#f472b6", borderColor: "rgba(236,72,153,0.2)" },
];

const queryBars = [
  { hour: "8 AM", h: 30 }, { hour: "9 AM", h: 45 }, { hour: "10 AM", h: 60 },
  { hour: "11 AM", h: 55 }, { hour: "12 PM", h: 70 }, { hour: "1 PM", h: 85 },
  { hour: "2 PM", h: 100 }, { hour: "3 PM", h: 90 }, { hour: "4 PM", h: 75 },
  { hour: "5 PM", h: 60 }, { hour: "6 PM", h: 40 }, { hour: "7 PM", h: 25 },
];

const trendingTopics = [
  { emoji: "📅", topic: "CAE-2 Exam Schedule", count: "342 ↑", positive: true },
  { emoji: "📚", topic: "Library Book Renewal", count: "218 ↑", positive: true },
  { emoji: "📶", topic: "Hostel Wi-Fi Issue", count: "156 ↑", positive: true },
  { emoji: "💰", topic: "Fee Payment Deadline", count: "134 ↓", positive: false },
  { emoji: "🏃", topic: "Sports Day Reg.", count: "98 ↑", positive: true },
];

const deptBars = [
  { dept: "IT", open: 60, resolved: 30 },
  { dept: "CSE", open: 80, resolved: 10 },
  { dept: "ECE", open: 40, resolved: 50 },
  { dept: "ME", open: 30, resolved: 60 },
  { dept: "LAW", open: 10, resolved: 80 },
];

const recentConvos = [
  { dot: "#10b981", dotGlow: true, query: "How do I renew my ID card?", student: "21BCE084", time: "2m ago", category: "Campus Info", catBg: "#37374e", catColor: "white", lang: "EN" },
  { dot: "#ec4899", dotGlow: true, query: "Feeling very stressed about the upcoming exams.", student: "20BME012", time: "14m ago", category: "Wellness", catBg: "rgba(236,72,153,0.2)", catColor: "#f472b6", catBorder: "rgba(236,72,153,0.3)", lang: "EN" },
  { dot: "#f59e0b", dotGlow: false, query: "CAE-2 Exam dates for Civil Engineering?", student: "22BCL045", time: "28m ago", category: "Exams", catBg: "rgba(0,113,132,0.2)", catColor: "#4cd7f6", lang: "HI" },
  { dot: "#ef4444", dotGlow: true, query: "Hostel mess food quality is very poor today.", student: "23BPH102", time: "45m ago", category: "Grievance", catBg: "rgba(147,0,10,0.4)", catColor: "#ffb4ab", catBorder: "#93000a", lang: "GU" },
  { dot: "#10b981", dotGlow: false, query: "Library timing on Saturday?", student: "21BEE055", time: "1h ago", category: "Library", catBg: "rgba(124,58,237,0.2)", catColor: "#d2bbff", lang: "EN" },
];

export default function AdminDashboard() {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  return (
    <div style={{ backgroundColor: "#06061a", color: "#e2e0fd", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* Nebula Background Blobs */}
      <div className="nebula-blob" style={{ top: "-200px", left: "-100px", background: "#7c3aed" }}></div>
      <div className="nebula-blob" style={{ bottom: "-200px", right: "-100px", background: "#007184" }}></div>
      <div className="nebula-blob" style={{ top: "40%", right: "10%", background: "#571bc1" }}></div>

      {/* ═══ TopNavBar — From Stitch Admin Dashboard ═══ */}
      <header
        className="fixed top-0 w-full z-50 flex justify-between items-center"
        style={{
          backgroundColor: "rgba(6,6,26,0.6)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(139,92,246,0.1)",
          boxShadow: "0px 20px 40px rgba(124,58,237,0.15)",
          padding: "16px 32px",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(to top right, #7c3aed, #007184)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "white", fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.05em", color: "#a78bfa" }}>NirmaSarathi</h1>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 600 }}>Admin Intelligence</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a style={{ fontSize: "14px", letterSpacing: "-0.025em", color: "#a78bfa", borderBottom: "2px solid #8b5cf6", paddingBottom: "4px" }} href="#">Dashboard</a>
          <a style={{ fontSize: "14px", letterSpacing: "-0.025em", color: "#94a3b8" }} href="#" className="hover:text-violet-300 transition-colors">Analytics</a>
          <a style={{ fontSize: "14px", letterSpacing: "-0.025em", color: "#94a3b8" }} href="#" className="hover:text-violet-300 transition-colors">Reports</a>
        </nav>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLastRefresh(new Date())}
            className="hidden md:flex items-center gap-2"
            style={{ fontSize: "12px", color: "#64748b", backgroundColor: "rgba(255,255,255,0.05)", padding: "6px 12px", borderRadius: "9999px", border: "none", cursor: "pointer" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>refresh</span>
            Last updated: {lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 active:scale-95 transition-all"
            style={{
              padding: "8px 16px",
              backgroundColor: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#d2bbff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
            Back to Chat
          </Link>
        </div>
      </header>

      <main style={{ paddingTop: "112px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1600px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

          {/* ═══ KPI Row ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
            {kpiData.map((kpi, i) => (
              <div
                key={i}
                className="glass-panel hover:-translate-y-1 transition-transform"
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  ...(kpi.borderColor ? { borderColor: kpi.borderColor } : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "9999px",
                      backgroundColor: kpi.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ color: kpi.iconColor, fontSize: "20px" }}>{kpi.icon}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      color: kpi.positive ? "#34d399" : "#ffb4ab",
                      backgroundColor: kpi.positive ? "rgba(16,185,129,0.1)" : "rgba(147,0,10,0.2)",
                    }}
                  >
                    {kpi.change}
                  </span>
                </div>
                <h3 style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.title}</h3>
                <p style={{ fontSize: "24px", fontWeight: 700, color: "white", marginTop: "4px" }}>{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* ═══ Row 2: Large Analytics ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
            <style>{`
              @media (min-width: 1024px) { .ns-analytics-grid { grid-template-columns: 2fr 1fr !important; } }
            `}</style>
            <div className="ns-analytics-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
              {/* Query Volume Area Chart */}
              <div className="glass-panel" style={{ padding: "32px", borderRadius: "12px", position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>Query Volume — Today</h2>
                    <p style={{ fontSize: "12px", color: "#64748b" }}>Hourly activity from 8:00 AM to 7:00 PM</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "9999px", backgroundColor: "#d2bbff", boxShadow: "0 0 8px rgba(210,187,255,0.6)" }}></span>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>Total Queries</span>
                  </div>
                </div>
                <div style={{ height: "256px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "4px", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(210,187,255,0.05), transparent)" }}></div>
                  {queryBars.map((bar, i) => (
                    <div
                      key={i}
                      style={{
                        width: "100%",
                        borderTopLeftRadius: "2px",
                        borderTopRightRadius: "2px",
                        position: "relative",
                        height: `${bar.h}%`,
                        background: `rgba(210,187,255,${0.1 + (bar.h / 100) * 0.6})`,
                        ...(i === 6 ? { boxShadow: "0 0 20px rgba(124,58,237,0.3)" } : {}),
                      }}
                    >
                      {i === 6 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-40px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#7c3aed",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: 700,
                            padding: "4px 8px",
                            borderRadius: "8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Peak: 310
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontSize: "10px", color: "#64748b", fontWeight: 500, padding: "0 4px" }}>
                  {queryBars.map((bar, i) => (
                    <span key={i} style={i === 6 ? { color: "#d2bbff", fontWeight: 700 } : {}}>{bar.hour}</span>
                  ))}
                </div>
              </div>

              {/* Query Categories Donut */}
              <div className="glass-panel" style={{ padding: "32px", borderRadius: "12px", display: "flex", flexDirection: "column" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "24px" }}>Query Categories</h2>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "24px 0" }}>
                  <div
                    style={{
                      width: "192px",
                      height: "192px",
                      borderRadius: "9999px",
                      border: "18px solid #28283e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "-18px",
                        borderRadius: "9999px",
                        border: "18px solid #7c3aed",
                        borderTopColor: "transparent",
                        borderLeftColor: "transparent",
                        transform: "rotate(45deg)",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        inset: "-18px",
                        borderRadius: "9999px",
                        border: "18px solid #007184",
                        borderRightColor: "transparent",
                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent",
                        transform: "rotate(-120deg)",
                      }}
                    ></div>
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "30px", fontWeight: 900, color: "white" }}>1.8k</span>
                      <p style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase" }}>Queries</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px", marginTop: "16px" }}>
                  {[
                    { color: "#7c3aed", label: "Library (35%)" },
                    { color: "#007184", label: "Exams (28%)" },
                    { color: "#93000a", label: "Grievances (15%)" },
                    { color: "#37374e", label: "Campus Info (12%)" },
                    { color: "#ec4899", label: "Wellness (5%)" },
                    { color: "#4a4455", label: "Other (5%)" },
                  ].map((cat, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: cat.color }}></div>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Row 3: Insights Bento ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
            <style>{`
              @media (min-width: 1024px) { .ns-bento-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
            `}</style>
            <div className="ns-bento-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
              {/* Trending Topics */}
              <div className="glass-panel" style={{ padding: "32px", borderRadius: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                  <span className="material-symbols-outlined" style={{ color: "#d2bbff" }}>trending_up</span>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>Trending Topics</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {trendingTopics.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.05)", cursor: "default" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "20px" }}>{t.emoji}</span>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#e2e1f0" }}>{t.topic}</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: t.positive ? "#34d399" : "#ffb4ab" }}>{t.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grievances by Dept */}
              <div className="glass-panel" style={{ padding: "32px", borderRadius: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "24px" }}>Grievances by Dept</h2>
                <div style={{ height: "240px", display: "flex", alignItems: "flex-end", gap: "8px", paddingBottom: "24px" }}>
                  {deptBars.map((d, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%", height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ width: "100%", display: "flex", gap: "1px", alignItems: "flex-end", height: "100%" }}>
                        <div style={{ width: "50%", backgroundColor: "#ffb4ab", borderTopLeftRadius: "2px", borderTopRightRadius: "2px", height: `${d.open}%` }}></div>
                        <div style={{ width: "50%", backgroundColor: "#10b981", borderTopLeftRadius: "2px", borderTopRightRadius: "2px", height: `${d.resolved}%` }}></div>
                      </div>
                      <span style={{ fontSize: "9px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{d.dept}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", fontSize: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#ffb4ab", display: "inline-block" }}></span> Open</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#10b981", display: "inline-block" }}></span> Resolved</div>
                </div>
              </div>

              {/* Language & Mood */}
              <div className="glass-panel" style={{ padding: "32px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "24px" }}>Language Distribution</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {[
                      { lang: "English", pct: 68, barColor: "#7c3aed" },
                      { lang: "Hindi", pct: 24, barColor: "#fb923c" },
                      { lang: "Gujarati", pct: 8, barColor: "#4cd7f6" },
                    ].map((l, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                          <span style={{ color: "#94a3b8" }}>{l.lang}</span>
                          <span style={{ color: "white", fontWeight: 700 }}>{l.pct}%</span>
                        </div>
                        <div style={{ height: "8px", width: "100%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "9999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", backgroundColor: l.barColor, borderRadius: "9999px", width: `${l.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 700 }}>Campus Mood Index</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#34d399" }}>Positive Sentiment</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "36px" }}>😊</span>
                    <span style={{ fontSize: "30px", fontWeight: 900, color: "white" }}>78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Recent Conversations Table ═══ */}
          <div className="glass-panel" style={{ borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>Recent Conversations</h2>
              <button style={{ fontSize: "12px", color: "#d2bbff", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>View All Transactions</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    {["Status", "Query / Prompt", "Student ID", "Time", "Category", "Lang"].map((h, i) => (
                      <th key={i} style={{ padding: "16px 32px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentConvos.map((c, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="hover:bg-white/5 transition-colors">
                      <td style={{ padding: "16px 32px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: c.dot, display: "inline-block", boxShadow: c.dotGlow ? `0 0 8px ${c.dot}` : undefined }}></span>
                      </td>
                      <td style={{ padding: "16px 32px", fontSize: "14px", color: "#e2e1f0" }}>{c.query}</td>
                      <td style={{ padding: "16px 32px", fontSize: "12px", fontFamily: "monospace", color: "#94a3b8" }}>{c.student}</td>
                      <td style={{ padding: "16px 32px", fontSize: "12px", color: "#94a3b8" }}>{c.time}</td>
                      <td style={{ padding: "16px 32px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            backgroundColor: c.catBg,
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: c.catColor,
                            textTransform: "uppercase",
                            ...(c.catBorder ? { border: `1px solid ${c.catBorder}` } : {}),
                          }}
                        >
                          {c.category}
                        </span>
                      </td>
                      <td style={{ padding: "16px 32px", fontSize: "10px", fontWeight: 700, color: "#64748b" }}>{c.lang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ═══ Footer ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 32px", textAlign: "center", backgroundColor: "rgba(6,6,26,0.8)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 700 }}>
            <span>NirmaSarathi Admin Intelligence Dashboard</span>
            <span style={{ width: "4px", height: "4px", borderRadius: "9999px", backgroundColor: "#334155", display: "inline-block" }}></span>
            <span>Data refreshes every 30 seconds</span>
            <span style={{ width: "4px", height: "4px", borderRadius: "9999px", backgroundColor: "#334155", display: "inline-block" }}></span>
            <span style={{ color: "#d2bbff", display: "flex", alignItems: "center", gap: "4px" }}>
              Powered by <span style={{ fontWeight: 900 }}>Gemini AI</span>
            </span>
          </div>
          <div style={{ fontSize: "10px", color: "#475569" }}>
            © 2026 Nirma University IT Services. All digital assets protected.
          </div>
        </div>
      </footer>

      {/* Floating Action */}
      <div
        className="glass-panel"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "48px",
          height: "48px",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          borderColor: "rgba(124,58,237,0.3)",
          transition: "all 0.2s",
        }}
      >
        <span className="material-symbols-outlined" style={{ color: "#d2bbff" }}>bolt</span>
      </div>
    </div>
  );
}
