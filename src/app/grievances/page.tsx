"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  GraduationCap,
  Loader2,
  Search,
  ChevronDown,
} from "lucide-react";

const CATEGORIES = [
  { value: "Academic", label: "📚 Academic", desc: "Grading, attendance, faculty" },
  { value: "Infrastructure", label: "🏗️ Infrastructure", desc: "AC, furniture, Wi-Fi" },
  { value: "Hostel", label: "🏠 Hostel", desc: "Room, food, security" },
  { value: "Library", label: "📖 Library", desc: "Books, access, fines" },
  { value: "Financial", label: "💰 Financial", desc: "Fees, scholarships, refunds" },
  { value: "Examination", label: "📝 Examination", desc: "Results, re-evaluation" },
  { value: "Harassment", label: "🛡️ Harassment/Safety", desc: "Bullying, discrimination" },
  { value: "General", label: "📋 General", desc: "Events, transport, certificates" },
];

interface Grievance {
  id: string;
  ticketId: string;
  category: string;
  department: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function GrievancesPage() {
  const [tab, setTab] = useState<"file" | "track">("file");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    ticketId?: string;
    department?: string;
    message?: string;
  } | null>(null);

  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTicket, setSearchTicket] = useState("");

  // Fetch grievances for tracking
  useEffect(() => {
    if (tab === "track") {
      fetchGrievances();
    }
  }, [tab]);

  const fetchGrievances = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/grievances");
      const data = await res.json();
      setGrievances(data.grievances || []);
    } catch {
      console.error("Failed to fetch grievances");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, description, studentId: studentId || undefined }),
      });
      const data = await res.json();
      setSubmitResult(data);
    } catch {
      setSubmitResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCategory("");
    setDescription("");
    setStudentId("");
    setSubmitResult(null);
  };

  const filteredGrievances = searchTicket
    ? grievances.filter(
        (g) =>
          g.ticketId.toLowerCase().includes(searchTicket.toLowerCase()) ||
          g.description.toLowerCase().includes(searchTicket.toLowerCase())
      )
    : grievances;

  const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
    Open: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: AlertTriangle },
    "In Progress": { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Clock },
    Resolved: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle },
    Escalated: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: AlertTriangle },
  };

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
              <span className="text-sm font-normal text-slate-500 ml-2">Grievance Portal</span>
            </h1>
          </div>
        </div>
        <a
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all border border-amber-500/20"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Chat
        </a>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("file")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              tab === "file"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                : "glass text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            File Grievance
          </button>
          <button
            onClick={() => setTab("track")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              tab === "track"
                ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25"
                : "glass text-slate-400 hover:text-white"
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Track Grievances
          </button>
        </div>

        {tab === "file" ? (
          submitResult?.success ? (
            /* === SUCCESS STATE === */
            <div className="glass rounded-2xl p-8 text-center animate-fade-in-up border border-emerald-500/20">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Grievance Filed Successfully!</h2>
              <p className="text-slate-400 text-sm mb-6">Your complaint has been registered and routed to the appropriate department.</p>

              <div className="glass rounded-xl p-4 text-left max-w-sm mx-auto space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Ticket ID</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{submitResult.ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Routed To</span>
                  <span className="text-sm text-white">{submitResult.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Status</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Expected Review</span>
                  <span className="text-sm text-slate-300">3 working days</span>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm"
              >
                File Another Grievance
              </button>
            </div>
          ) : (
            /* === FILE FORM === */
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
              {/* Category Selection */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-3 block">Select Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        category === cat.value
                          ? "bg-amber-500/15 border border-amber-500/30 text-white"
                          : "glass hover:bg-white/[0.03] text-slate-400"
                      }`}
                    >
                      <p className="text-sm font-medium">{cat.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{cat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  Describe Your Grievance
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your issue in detail. Include location, date, and any relevant details..."
                  rows={5}
                  className="w-full resize-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all"
                  required
                />
              </div>

              {/* Student ID (Optional) */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  Enrollment Number <span className="text-slate-600">(optional)</span>
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g., B.Tech-2027-045"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!category || !description.trim() || isSubmitting}
                className="w-full btn-primary py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Filing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Grievance
                  </>
                )}
              </button>

              {submitResult && !submitResult.success && (
                <p className="text-red-400 text-sm text-center">{submitResult.message}</p>
              )}
            </form>
          )
        ) : (
          /* === TRACK TAB === */
          <div className="space-y-4 animate-fade-in-up">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTicket}
                onChange={(e) => setSearchTicket(e.target.value)}
                placeholder="Search by ticket ID or description..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 transition-all"
              />
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-6 h-6 text-slate-500 animate-spin mx-auto" />
                <p className="text-xs text-slate-600 mt-2">Loading grievances...</p>
              </div>
            ) : filteredGrievances.length === 0 ? (
              <div className="text-center py-12 glass rounded-2xl">
                <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No grievances found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredGrievances.map((g) => {
                  const sc = statusConfig[g.status] || statusConfig.Open;
                  const StatusIcon = sc.icon;
                  return (
                    <div
                      key={g.id}
                      className="glass rounded-xl p-4 border border-white/5 hover:bg-white/[0.02] transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-400">{g.ticketId}</span>
                          <span className="text-[10px] text-slate-600 ml-2">
                            {new Date(g.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${sc.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {g.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2 line-clamp-2">{g.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span className="px-1.5 py-0.5 rounded bg-white/5">{g.category}</span>
                        <span>→ {g.department}</span>
                        <span className={`px-1.5 py-0.5 rounded ${
                          g.priority === "High" ? "bg-red-500/10 text-red-400" :
                          g.priority === "Critical" ? "bg-red-500/20 text-red-300" :
                          "bg-white/5"
                        }`}>
                          {g.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
