"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// === SEED DATA ===
const kpiData = [
  { title: "Total Queries", value: "1,847", icon: "query_stats", change: "+23%", positive: true, iconBg: "bg-primary-container/20", iconColor: "text-primary" },
  { title: "Active Students", value: "3,241", icon: "group", change: "+12%", positive: true, iconBg: "bg-secondary-container/20", iconColor: "text-secondary" },
  { title: "Open Grievances", value: "23", icon: "report_problem", change: "-8%", positive: true, iconBg: "bg-error-container/20", iconColor: "text-error" },
  { title: "Satisfaction", value: "94.2%", icon: "thumb_up", change: "+2.1%", positive: true, iconBg: "bg-emerald-500/20", iconColor: "text-emerald-400" },
  { title: "Avg Response", value: "1.2s", icon: "speed", change: "-15%", positive: true, iconBg: "bg-tertiary-container/20", iconColor: "text-tertiary" },
  { title: "Wellness Flags", value: "7", icon: "monitor_heart", change: "+2 red", positive: false, iconBg: "bg-pink-500/20", iconColor: "text-pink-400", borderClass: "border-pink-500/20" },
];

const queryBars = [
  { hour: "8 AM", h: "30%" }, { hour: "9 AM", h: "45%" }, { hour: "10 AM", h: "60%" },
  { hour: "11 AM", h: "55%" }, { hour: "12 PM", h: "70%" }, { hour: "1 PM", h: "85%" },
  { hour: "2 PM", h: "100%" }, { hour: "3 PM", h: "90%" }, { hour: "4 PM", h: "75%" },
  { hour: "5 PM", h: "60%" }, { hour: "6 PM", h: "40%" }, { hour: "7 PM", h: "25%" },
];

const trendingTopics = [
  { emoji: "📅", topic: "CAE-2 Exam Schedule", count: "342 ↑", positive: true },
  { emoji: "📚", topic: "Library Book Renewal", count: "218 ↑", positive: true },
  { emoji: "📶", topic: "Hostel Wi-Fi Issue", count: "156 ↑", positive: true },
  { emoji: "💰", topic: "Fee Payment Deadline", count: "134 ↓", positive: false },
  { emoji: "🏃", topic: "Sports Day Reg.", count: "98 ↑", positive: true },
];

const deptBars = [
  { dept: "IT", open: "60%", resolved: "30%" },
  { dept: "CSE", open: "80%", resolved: "10%" },
  { dept: "ECE", open: "40%", resolved: "50%" },
  { dept: "ME", open: "30%", resolved: "60%" },
  { dept: "LAW", open: "10%", resolved: "80%" },
];

const recentConvos = [
  { dot: "bg-emerald-500", dotGlow: true, query: "How do I renew my ID card?", student: "21BCE084", time: "2m ago", category: "Campus Info", catClass: "bg-surface-bright", catTextClass: "text-white", lang: "EN" },
  { dot: "bg-pink-500", dotGlow: true, query: "Feeling very stressed about the upcoming exams.", student: "20BME012", time: "14m ago", category: "Wellness", catClass: "bg-pink-500/20 border border-pink-500/30", catTextClass: "text-pink-400", lang: "EN" },
  { dot: "bg-amber-500", dotGlow: false, query: "CAE-2 Exam dates for Civil Engineering?", student: "22BCL045", time: "28m ago", category: "Exams", catClass: "bg-tertiary-container/20", catTextClass: "text-tertiary", lang: "HI" },
  { dot: "bg-red-500", dotGlow: true, query: "Hostel mess food quality is very poor today.", student: "23BPH102", time: "45m ago", category: "Grievance", catClass: "bg-error-container/40 border border-error-container", catTextClass: "text-error", lang: "GU" },
  { dot: "bg-emerald-500", dotGlow: false, query: "Library timing on Saturday?", student: "21BEE055", time: "1h ago", category: "Library", catClass: "bg-primary-container/20", catTextClass: "text-primary", lang: "EN" },
];

// === ANIMATED COUNTER HOOK ===
function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function AdminDashboard() {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  return (
    <div className="antialiased min-h-screen" style={{ backgroundColor: "#06061a", color: "#e2e0fd" }}>
      {/* Nebula Background Blobs */}
      <div className="nebula-blob bg-primary-container" style={{ top: "-200px", left: "-100px" }}></div>
      <div className="nebula-blob bg-tertiary-container" style={{ bottom: "-200px", right: "-100px" }}></div>
      <div className="nebula-blob bg-secondary-container" style={{ top: "40%", right: "10%" }}></div>

      {/* ═══ TopNavBar ═══ */}
      <header className="fixed top-0 w-full z-50 bg-[#06061a]/60 backdrop-blur-xl border-b border-violet-500/10 shadow-[0px_20px_40px_rgba(124,58,237,0.15)] flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-container to-tertiary-container shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-violet-400">NirmaSarathi</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Admin Intelligence</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm tracking-tight text-violet-400 border-b-2 border-violet-500 pb-1" href="#">Dashboard</a>
          <a className="text-sm tracking-tight text-slate-400 hover:text-violet-300 transition-colors" href="#">Analytics</a>
          <a className="text-sm tracking-tight text-slate-400 hover:text-violet-300 transition-colors" href="#">Reports</a>
        </nav>
        <div className="flex items-center gap-6">
          <button onClick={() => setLastRefresh(new Date())} className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            Last updated: {lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </button>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-primary-container/20 hover:bg-primary-container/30 border border-primary-container/30 text-primary rounded-xl transition-all active:scale-95 text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Chat
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-12 px-8 max-w-[1600px] mx-auto space-y-8">

        {/* ═══ KPI Row ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiData.map((kpi, i) => (
            <div key={i} className={`glass-panel p-5 rounded-xl transition-transform hover:-translate-y-1 ${kpi.borderClass || ""}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full ${kpi.iconBg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${kpi.iconColor} text-[20px]`}>{kpi.icon}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.positive ? "text-emerald-400 bg-emerald-400/10" : "text-error bg-error-container/20"}`}>{kpi.change}</span>
              </div>
              <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">{kpi.title}</h3>
              <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* ═══ Row 2: Large Analytics ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Query Volume Area Chart */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-xl font-bold text-white">Query Volume — Today</h2>
                <p className="text-xs text-slate-500">Hourly activity from 8:00 AM to 7:00 PM</p>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(210,187,255,0.6)]"></span>
                <span className="text-xs text-slate-400">Total Queries</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-1 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
              {queryBars.map((bar, i) => (
                <div key={i} className={`w-full rounded-t-sm relative group ${i === 6 ? "shadow-[0_0_20px_rgba(124,58,237,0.3)]" : ""}`}
                  style={{ height: bar.h, background: `rgba(210,187,255,${0.1 + (parseInt(bar.h) / 100) * 0.6})` }}>
                  {i === 6 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary-container text-white text-xs font-bold p-1 px-2 rounded-lg whitespace-nowrap">Peak: 310</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-medium px-1">
              {queryBars.map((bar, i) => (
                <span key={i} className={i === 6 ? "text-primary font-bold" : ""}>{bar.hour}</span>
              ))}
            </div>
          </div>

          {/* Query Categories Donut */}
          <div className="glass-panel p-8 rounded-xl flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Query Categories</h2>
            <div className="flex-grow flex items-center justify-center relative py-6">
              <div className="w-48 h-48 rounded-full border-[18px] border-surface-container-high flex items-center justify-center relative">
                <div className="absolute inset-[-18px] rounded-full border-[18px] border-primary-container border-t-transparent border-l-transparent" style={{ transform: "rotate(45deg)" }}></div>
                <div className="absolute inset-[-18px] rounded-full border-[18px] border-tertiary-container border-r-transparent border-b-transparent border-l-transparent" style={{ transform: "rotate(-120deg)" }}></div>
                <div className="text-center">
                  <span className="text-3xl font-black text-white">1.8k</span>
                  <p className="text-[10px] text-slate-500 uppercase">Queries</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
              {[
                { color: "bg-primary-container", label: "Library (35%)" },
                { color: "bg-tertiary-container", label: "Exams (28%)" },
                { color: "bg-error-container", label: "Grievances (15%)" },
                { color: "bg-surface-bright", label: "Campus Info (12%)" },
                { color: "bg-pink-500", label: "Wellness (5%)" },
                { color: "bg-outline-variant", label: "Other (5%)" },
              ].map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${cat.color}`}></div>
                  <span className="text-xs text-slate-400">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Row 3: Insights Bento ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Topics */}
          <div className="glass-panel p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              <h2 className="text-lg font-bold text-white">Trending Topics</h2>
            </div>
            <div className="space-y-4">
              {trendingTopics.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{t.emoji}</span>
                    <span className="text-sm font-medium text-slate-200">{t.topic}</span>
                  </div>
                  <span className={`text-xs font-bold ${t.positive ? "text-emerald-400" : "text-error"}`}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grievances by Dept */}
          <div className="glass-panel p-8 rounded-xl">
            <h2 className="text-lg font-bold text-white mb-6">Grievances by Dept</h2>
            <div className="h-60 flex items-end gap-2 pb-6">
              {deptBars.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end">
                  <div className="w-full flex gap-[1px] items-end h-full">
                    <div className="w-1/2 bg-error rounded-t-sm" style={{ height: d.open }}></div>
                    <div className="w-1/2 bg-emerald-500 rounded-t-sm" style={{ height: d.resolved }}></div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">{d.dept}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center text-[10px]">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error"></span> Open</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Resolved</div>
            </div>
          </div>

          {/* Language & Mood */}
          <div className="glass-panel p-8 rounded-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-6">Language Distribution</h2>
              <div className="space-y-5">
                {[
                  { lang: "English", pct: 68, barClass: "bg-primary-container" },
                  { lang: "Hindi", pct: 24, barClass: "bg-orange-400" },
                  { lang: "Gujarati", pct: 8, barClass: "bg-tertiary" },
                ].map((l, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{l.lang}</span>
                      <span className="text-white font-bold">{l.pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${l.barClass} rounded-full`} style={{ width: `${l.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Campus Mood Index</p>
                <p className="text-sm font-semibold text-emerald-400">Positive Sentiment</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl">😊</span>
                <span className="text-3xl font-black text-white">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Recent Conversations Table ═══ */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Recent Conversations</h2>
            <button className="text-xs text-primary hover:underline font-medium">View All Transactions</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Query / Prompt</th>
                  <th className="px-8 py-4">Student ID</th>
                  <th className="px-8 py-4">Time</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Lang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentConvos.map((c, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-4">
                      <span className={`w-2.5 h-2.5 rounded-full ${c.dot} inline-block ${c.dotGlow ? `shadow-[0_0_8px_rgba(var(--dot-glow),0.5)]` : ""}`}></span>
                    </td>
                    <td className="px-8 py-4 text-sm text-slate-200">{c.query}</td>
                    <td className="px-8 py-4 text-xs font-mono text-slate-400">{c.student}</td>
                    <td className="px-8 py-4 text-xs text-slate-400">{c.time}</td>
                    <td className="px-8 py-4">
                      <span className={`px-2 py-1 ${c.catClass} rounded text-[10px] font-bold ${c.catTextClass} uppercase`}>{c.category}</span>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-[10px] font-bold text-slate-500">{c.lang}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-white/5 py-10 px-8 text-center bg-[#06061a]/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <span>NirmaSarathi Admin Intelligence Dashboard</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>Data refreshes every 30 seconds</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="flex items-center gap-1 text-primary-fixed-dim">Powered by <span className="font-black">Gemini AI</span></span>
          </div>
          <div className="text-[10px] text-slate-600">
            © 2026 Nirma University IT Services. All digital assets protected.
          </div>
        </div>
      </footer>

      {/* Floating Action */}
      <div className="fixed bottom-8 right-8 w-12 h-12 glass-panel rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-2xl group border-primary-container/30">
        <span className="material-symbols-outlined text-primary group-hover:animate-pulse">bolt</span>
      </div>
    </div>
  );
}
