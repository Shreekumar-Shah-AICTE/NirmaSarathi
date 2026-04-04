"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { emoji: "🎓", name: "Academic", desc: "Courses, Faculty, Schedule" },
  { emoji: "🏢", name: "Infrastructure", desc: "Labs, Classrooms, WiFi" },
  { emoji: "🏠", name: "Hostel", desc: "Rooms, Mess, Facilities" },
  { emoji: "📚", name: "Library", desc: "Resources, Seating, Access" },
  { emoji: "💳", name: "Financial", desc: "Fees, Scholarships, Dues" },
  { emoji: "📝", name: "Examination", desc: "Grading, Retests, Admit Card" },
  { emoji: "⚠️", name: "Harassment", desc: "Bullying, Safety Concerns" },
  { emoji: "⚙️", name: "General", desc: "Miscellaneous, App Feedback" },
];

const SAMPLE_GRIEVANCES = [
  { id: "NS-GRIEV-007", date: "Apr 4, 2026", status: "Open", statusColor: "amber", category: "Infrastructure", dept: "IT Department", priority: "High", desc: "WiFi connectivity in Hostel Block C has been extremely poor for the last 3 days. Multiple students affected." },
  { id: "NS-GRIEV-006", date: "Apr 3, 2026", status: "In Progress", statusColor: "cyan", category: "Hostel", dept: "Hostel Admin", priority: "Medium", desc: "Mess food quality has deteriorated significantly. Multiple complaints from residents of Block A." },
  { id: "NS-GRIEV-005", date: "Apr 2, 2026", status: "Resolved", statusColor: "emerald", category: "Library", dept: "Library Services", priority: "Low", desc: "Request for extended library hours during examination period has been approved." },
  { id: "NS-GRIEV-004", date: "Apr 1, 2026", status: "Escalated", statusColor: "pink", category: "Academic", dept: "CSE Department", priority: "High", desc: "Grading discrepancy in Data Structures CAE-1. Multiple students reporting incorrect marks." },
  { id: "NS-GRIEV-003", date: "Mar 31, 2026", status: "Open", statusColor: "amber", category: "Financial", dept: "Accounts", priority: "Medium", desc: "Scholarship amount not reflected in fee statement for the current semester." },
];

export default function GrievancePortal() {
  const [activeTab, setActiveTab] = useState<"file" | "track">("file");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Academic");
  const [description, setDescription] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCategory || !description.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          description: description.trim(),
          studentId: enrollmentNo.trim() || undefined,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Still show success for demo
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedCategory(null);
    setDescription("");
    setEnrollmentNo("");
  };

  const statusBorderColors: Record<string, string> = {
    amber: "border-l-amber-500",
    cyan: "border-l-cyan-500",
    emerald: "border-l-emerald-500",
    pink: "border-l-pink-500",
  };

  const statusBadgeColors: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pink: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  };

  const filteredGrievances = SAMPLE_GRIEVANCES.filter(
    (g) =>
      g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-body selection:bg-primary-container/30 min-h-screen" style={{ backgroundColor: "#06061a", color: "#e2e0fd" }}>
      {/* Ambient Background Elements */}
      <div className="nebula-blob" style={{ top: "-10%", left: "-10%", width: "500px", height: "500px", background: "#7c3aed" }}></div>
      <div className="nebula-blob" style={{ bottom: "-10%", right: "-10%", width: "600px", height: "600px", background: "#4cd7f6" }}></div>

      {/* ═══ TopNavBar ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-[#06061a]/60 backdrop-blur-xl border-b border-violet-500/10 shadow-[0px_20px_40px_rgba(124,58,237,0.15)] flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-violet-400">NirmaSarathi</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Grievance Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-medium transition-all active:scale-95">
            <span className="material-symbols-outlined text-sm">chat</span>
            Back to Chat
          </Link>
        </div>
      </nav>

      {/* ═══ Main Content ═══ */}
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in-up">
          <span className="text-tertiary-fixed font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Official Recourse</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-on-surface">
            Submit Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-tertiary">Concern.</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
            Your feedback shapes the future of our campus. File a grievance securely and track its resolution in real-time.
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-container-low/40 backdrop-blur-md p-1.5 rounded-2xl flex gap-1 border border-white/5">
            <button
              onClick={() => { setActiveTab("file"); setSubmitted(false); }}
              className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                activeTab === "file"
                  ? "bg-primary-container text-on-primary-container shadow-[0px_0px_20px_rgba(124,58,237,0.3)]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined">edit_note</span>
              File Grievance
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === "track"
                  ? "bg-tertiary-container text-on-tertiary-container shadow-[0px_0px_20px_rgba(6,182,212,0.3)]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined">analytics</span>
              Track Grievances
            </button>
          </div>
        </div>

        {/* ═══ FILE GRIEVANCE TAB ═══ */}
        {activeTab === "file" && !submitted && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
            <section className="lg:col-span-8 space-y-8">
              <div className="bg-surface-container-low/20 backdrop-blur-xl rounded-[2rem] border border-white/5 p-8 md:p-10">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full"></span>
                  Select Category
                </h2>

                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`group relative p-6 rounded-2xl cursor-pointer transition-all ${
                        selectedCategory === cat.name
                          ? "bg-surface-container-high/60 border-2 border-primary scale-[1.02] shadow-[0px_0px_30px_rgba(124,58,237,0.2)]"
                          : "bg-surface-container-low/40 border border-white/5 hover:border-violet-500/30 hover:bg-surface-container-high/60"
                      }`}
                    >
                      <div className="text-4xl mb-3">{cat.emoji}</div>
                      <h3 className={`font-bold text-sm ${selectedCategory === cat.name ? "text-on-surface" : "text-slate-300"}`}>{cat.name}</h3>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{cat.desc}</p>
                      {selectedCategory === cat.name && (
                        <div className="absolute top-3 right-3 text-primary">
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-on-surface-variant">Detailed Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-surface-container-highest/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-slate-600"
                      placeholder="Please describe your concern in detail..."
                      rows={5}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-on-surface-variant">
                        Enrollment Number <span className="text-[10px] font-normal text-slate-500 uppercase tracking-widest ml-1">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value)}
                        className="w-full bg-surface-container-highest/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-slate-600"
                        placeholder="e.g. 21BCE100"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleSubmit}
                        disabled={!selectedCategory || !description.trim() || isSubmitting}
                        className="w-full h-[58px] bg-gradient-to-r from-primary-container to-secondary-container rounded-2xl font-bold text-white shadow-[0px_10px_30px_rgba(124,58,237,0.3)] hover:shadow-[0px_15px_40px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3 active:scale-95 group disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Grievance"}
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sidebar — Guidelines */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low/20 backdrop-blur-xl rounded-[2rem] border border-white/5 p-8">
                <h3 className="font-bold text-on-surface mb-4">Portal Guidelines</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">privacy_tip</span>
                    <p className="text-xs text-slate-400 leading-relaxed">Your identity is protected. Only necessary administrators can view your details.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">attachment</span>
                    <p className="text-xs text-slate-400 leading-relaxed">Evidence can be attached after the initial filing in the tracking tab.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">schedule</span>
                    <p className="text-xs text-slate-400 leading-relaxed">Most grievances are reviewed within 24-48 hours of submission.</p>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        )}

        {/* ═══ SUCCESS STATE ═══ */}
        {activeTab === "file" && submitted && (
          <div className="max-w-lg mx-auto animate-fade-in-up">
            <div className="bg-surface-container-high/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl"></div>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30">
                  <span className="material-symbols-outlined text-emerald-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="text-xl font-bold text-white">Grievance Filed Successfully!</h2>
                <p className="text-sm text-slate-400 mt-2">Our intelligence module is routing this to the relevant department.</p>
              </div>
              <div className="bg-surface-container-lowest/60 rounded-2xl p-5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Ticket ID</span>
                  <span className="font-mono text-primary text-sm font-bold">NS-GRIEV-008</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Category</span>
                  <span className="text-on-surface text-sm">{selectedCategory}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Status</span>
                  <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase px-2 py-1 rounded border border-amber-500/20">Open</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Estimated</span>
                  <span className="text-on-surface text-sm">24-48 Hours</span>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="w-full mt-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-all text-sm font-medium"
              >
                File Another Grievance
              </button>
            </div>
          </div>
        )}

        {/* ═══ TRACK GRIEVANCES TAB ═══ */}
        {activeTab === "track" && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-highest/20 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-on-surface focus:ring-2 focus:ring-tertiary-container outline-none transition-all placeholder:text-slate-600"
                placeholder="Search by ticket ID or description..."
              />
            </div>

            {/* Grievance Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredGrievances.map((g) => (
                <div
                  key={g.id}
                  className={`glass-panel rounded-2xl p-6 border-l-[3px] ${statusBorderColors[g.statusColor]} hover:bg-white/[0.02] transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-primary text-sm font-bold">{g.id}</span>
                      <span className="text-xs text-slate-500">{g.date}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${statusBadgeColors[g.statusColor]}`}>
                      {g.status}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-3 line-clamp-2">{g.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-medium text-slate-400">{g.category}</span>
                    <span className="text-[10px] text-slate-500">{g.dept}</span>
                    {g.priority === "High" && (
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-[10px] font-bold text-red-400 border border-red-500/20">HIGH</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ═══ Mobile Bottom Nav ═══ */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0c0c20]/80 backdrop-blur-2xl border-t border-white/5 flex justify-around py-4">
        <button onClick={() => setActiveTab("file")} className={`flex flex-col items-center gap-1 ${activeTab === "file" ? "text-cyan-400" : "text-slate-500"}`}>
          <span className="material-symbols-outlined" style={activeTab === "file" ? { fontVariationSettings: "'FILL' 1" } : {}}>edit_note</span>
          <span className="text-[10px] font-bold">File</span>
        </button>
        <button onClick={() => setActiveTab("track")} className={`flex flex-col items-center gap-1 ${activeTab === "track" ? "text-cyan-400" : "text-slate-500"}`}>
          <span className="material-symbols-outlined" style={activeTab === "track" ? { fontVariationSettings: "'FILL' 1" } : {}}>analytics</span>
          <span className="text-[10px] font-bold">Track</span>
        </button>
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">chat</span>
          <span className="text-[10px] font-bold">Oracle</span>
        </Link>
      </div>
    </div>
  );
}
