"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Users,
  AlertTriangle,
  TrendingUp,
  ThumbsUp,
  Clock,
  BookOpen,
  Calendar,
  FileText,
  Heart,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  GraduationCap,
  BarChart3,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// === SEED DATA ===
const kpiData = [
  {
    title: "Total Queries Today",
    value: 1847,
    change: "+23%",
    positive: true,
    icon: MessageSquare,
    color: "amber",
  },
  {
    title: "Active Students",
    value: 3241,
    change: "+12%",
    positive: true,
    icon: Users,
    color: "indigo",
  },
  {
    title: "Open Grievances",
    value: 23,
    change: "-8%",
    positive: true,
    icon: AlertTriangle,
    color: "red",
  },
  {
    title: "Satisfaction Rate",
    value: "94.2%",
    change: "+2.1%",
    positive: true,
    icon: ThumbsUp,
    color: "emerald",
  },
  {
    title: "Avg Response Time",
    value: "1.2s",
    change: "-15%",
    positive: true,
    icon: Clock,
    color: "cyan",
  },
  {
    title: "Wellness Flags",
    value: 7,
    change: "+2",
    positive: false,
    icon: Heart,
    color: "pink",
  },
];

const queryTrends = [
  { hour: "8AM", queries: 45 },
  { hour: "9AM", queries: 120 },
  { hour: "10AM", queries: 210 },
  { hour: "11AM", queries: 280 },
  { hour: "12PM", queries: 195 },
  { hour: "1PM", queries: 150 },
  { hour: "2PM", queries: 230 },
  { hour: "3PM", queries: 310 },
  { hour: "4PM", queries: 265 },
  { hour: "5PM", queries: 180 },
  { hour: "6PM", queries: 120 },
  { hour: "7PM", queries: 85 },
];

const categoryData = [
  { name: "Library", value: 35, color: "#f59e0b" },
  { name: "Exams", value: 28, color: "#6366f1" },
  { name: "Grievances", value: 15, color: "#ef4444" },
  { name: "Campus Info", value: 12, color: "#10b981" },
  { name: "Wellness", value: 5, color: "#ec4899" },
  { name: "Other", value: 5, color: "#64748b" },
];

const departmentGrievances = [
  { dept: "IT", open: 5, resolved: 18, pending: 2 },
  { dept: "CSE", open: 3, resolved: 12, pending: 1 },
  { dept: "ECE", open: 4, resolved: 8, pending: 3 },
  { dept: "Mech", open: 2, resolved: 15, pending: 0 },
  { dept: "Civil", open: 1, resolved: 6, pending: 1 },
  { dept: "Mgmt", open: 3, resolved: 10, pending: 2 },
  { dept: "Law", open: 2, resolved: 7, pending: 1 },
  { dept: "Pharm", open: 1, resolved: 9, pending: 0 },
];

const weeklyTrend = [
  { day: "Mon", queries: 1520, satisfaction: 93 },
  { day: "Tue", queries: 1680, satisfaction: 94 },
  { day: "Wed", queries: 1425, satisfaction: 92 },
  { day: "Thu", queries: 1890, satisfaction: 95 },
  { day: "Fri", queries: 1750, satisfaction: 94 },
  { day: "Sat", queries: 820, satisfaction: 96 },
  { day: "Sun", queries: 450, satisfaction: 97 },
];

const trendingTopics = [
  { topic: "CAE-2 Exam Schedule", queries: 342, trend: "up", emoji: "📅" },
  { topic: "Library Book Renewal", queries: 218, trend: "up", emoji: "📚" },
  { topic: "Hostel Wi-Fi Issue", queries: 156, trend: "up", emoji: "📶" },
  { topic: "Fee Payment Deadline", queries: 134, trend: "down", emoji: "💰" },
  { topic: "Sports Day Registration", queries: 98, trend: "up", emoji: "🏃" },
];

const recentConversations = [
  { student: "BCA-2026-043", query: "When is CAE-2 for BCA Semester 4?", category: "Exams", time: "2m ago", lang: "EN", sentiment: "neutral" },
  { student: "MBA-2025-112", query: "मुझे कैंटीन में खाने की क्वालिटी के बारे में शिकायत करनी है", category: "Grievance", time: "5m ago", lang: "HI", sentiment: "negative" },
  { student: "B.Tech-2027-089", query: "Is the digital library open on Sunday?", category: "Library", time: "8m ago", lang: "EN", sentiment: "neutral" },
  { student: "B.Pharm-2026-034", query: "I can't sleep properly due to exam stress", category: "Wellness", time: "12m ago", lang: "EN", sentiment: "concern" },
  { student: "LL.B-2025-067", query: "How do I access Manupatra legal database?", category: "Library", time: "15m ago", lang: "EN", sentiment: "neutral" },
];

const languageDistribution = [
  { lang: "English", percentage: 68, color: "#6366f1" },
  { lang: "Hindi", percentage: 24, color: "#f59e0b" },
  { lang: "Gujarati", percentage: 8, color: "#10b981" },
];

// === ANIMATED COUNTER HOOK ===
function useCounter(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// === KPI CARD ===
function KPICard({ data, index }: { data: typeof kpiData[0]; index: number }) {
  const numericValue = typeof data.value === "number" ? data.value : null;
  const animatedValue = useCounter(numericValue || 0);

  const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", shadow: "shadow-amber-500/5" },
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", shadow: "shadow-indigo-500/5" },
    red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", shadow: "shadow-red-500/5" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", shadow: "shadow-emerald-500/5" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", shadow: "shadow-cyan-500/5" },
    pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", shadow: "shadow-pink-500/5" },
  };

  const colors = colorMap[data.color] || colorMap.amber;

  return (
    <div
      className={`glass rounded-2xl p-5 border ${colors.border} hover:bg-white/[0.02] transition-all duration-300 animate-fade-in-up group`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <data.icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-medium ${data.positive ? "text-emerald-400" : "text-red-400"}`}>
          {data.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {data.change}
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">
        {numericValue !== null ? animatedValue.toLocaleString() : data.value}
      </p>
      <p className="text-xs text-slate-500">{data.title}</p>
    </div>
  );
}

// === MAIN DASHBOARD ===
export default function AdminDashboard() {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  return (
    <div className="min-h-screen bg-[var(--bg-deepest)]">
      {/* Header */}
      <header className="glass-strong border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              Nirma<span className="text-gradient">Sarathi</span>
              <span className="text-sm font-normal text-slate-500 ml-2">Admin Intelligence</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLastRefresh(new Date())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <div className="text-xs text-slate-600">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
          <a
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all border border-amber-500/20"
          >
            ← Back to Chat
          </a>
        </div>
      </header>

      <main className="p-6 max-w-[1400px] mx-auto space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiData.map((kpi, i) => (
            <KPICard key={i} data={kpi} index={i} />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Query Trends */}
          <div className="lg:col-span-2 glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" /> Query Volume — Today
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Hourly distribution of student queries</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={queryTrends}>
                <defs>
                  <linearGradient id="queryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(148,163,184,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#f1f5f9",
                  }}
                />
                <Area type="monotone" dataKey="queries" stroke="#f59e0b" fill="url(#queryGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" /> Query Categories
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(148,163,184,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#f1f5f9",
                  }}
                  formatter={(value: any) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <span className="text-[10px] text-slate-400">{cat.name} ({cat.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Trending Topics */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Trending Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{topic.emoji}</span>
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{topic.topic}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-slate-500">{topic.queries}</span>
                    {topic.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Grievances */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Grievances by Department
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={departmentGrievances} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="dept" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(148,163,184,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#f1f5f9",
                  }}
                />
                <Bar dataKey="open" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-red-500" /><span className="text-[10px] text-slate-500">Open</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-emerald-500" /><span className="text-[10px] text-slate-500">Resolved</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-amber-500" /><span className="text-[10px] text-slate-500">Pending</span></div>
            </div>
          </div>

          {/* Language Distribution */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Language Distribution
            </h3>
            <div className="space-y-4 mt-6">
              {languageDistribution.map((lang, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400">{lang.lang}</span>
                    <span className="text-xs font-semibold text-white">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${lang.percentage}%`,
                        background: lang.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Campus Mood */}
            <div className="mt-6 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <p className="text-[10px] text-emerald-500/70 uppercase tracking-wider font-medium mb-1">
                Campus Mood Index
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">😊</span>
                <div>
                  <p className="text-lg font-bold text-emerald-400">78%</p>
                  <p className="text-[10px] text-slate-500">Positive Sentiment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" /> Recent Conversations
            </h3>
            <span className="text-[10px] text-slate-600">Live Feed</span>
          </div>
          <div className="divide-y divide-white/5">
            {recentConversations.map((conv, i) => (
              <div
                key={i}
                className="px-5 py-3 hover:bg-white/[0.02] transition-colors flex items-center gap-4"
              >
                <div className="shrink-0">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      conv.sentiment === "concern"
                        ? "bg-pink-400 animate-pulse"
                        : conv.sentiment === "negative"
                        ? "bg-red-400"
                        : "bg-emerald-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 truncate">{conv.query}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-600">{conv.student}</span>
                    <span className="text-[10px] text-slate-700">•</span>
                    <span className="text-[10px] text-slate-600">{conv.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      conv.category === "Wellness"
                        ? "bg-pink-500/10 text-pink-400"
                        : conv.category === "Grievance"
                        ? "bg-red-500/10 text-red-400"
                        : conv.category === "Exams"
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {conv.category}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-500">
                    {conv.lang}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-slate-700">
            NirmaSarathi Admin Intelligence Dashboard • Data refreshes every 30 seconds •{" "}
            <span className="text-amber-700">Powered by Gemini AI</span>
          </p>
        </div>
      </main>
    </div>
  );
}
