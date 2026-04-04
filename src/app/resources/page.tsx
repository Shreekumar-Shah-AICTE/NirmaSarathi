"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface StudyResource {
  id: string;
  title: string;
  description: string;
  type: string;
  subject: string;
  branch: string;
  semester: number;
  uploadedBy: string;
  url: string | null;
  upvotes: number;
  downloads: number;
  createdAt: string;
}

const BRANCHES = ["All", "CSE", "ECE", "ME", "LAW", "PHARMA", "COM", "DES"];
const SEMESTERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const TYPE_FILTERS = ["All", "notes", "pyq", "video", "slides", "book"];

const typeConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  notes: { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", icon: "description", label: "Notes" },
  pyq: { color: "#ef4444", bg: "rgba(239,68,68,0.15)", icon: "quiz", label: "PYQ" },
  video: { color: "#4cd7f6", bg: "rgba(76,215,246,0.15)", icon: "play_circle", label: "Video" },
  slides: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: "slideshow", label: "Slides" },
  book: { color: "#10b981", bg: "rgba(16,185,129,0.15)", icon: "menu_book", label: "Book" },
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<StudyResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBranch, setActiveBranch] = useState("All");
  const [activeSemester, setActiveSemester] = useState(0);
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareForm, setShowShareForm] = useState(false);
  const [shareData, setShareData] = useState({ title: "", description: "", type: "notes", subject: "", branch: "CSE", semester: "3", uploadedBy: "", url: "" });
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

  const fetchResources = async () => {
    try {
      const params = new URLSearchParams();
      if (activeBranch !== "All") params.set("branch", activeBranch);
      if (activeSemester > 0) params.set("semester", activeSemester.toString());
      if (activeType !== "All") params.set("type", activeType);
      if (searchQuery) params.set("search", searchQuery);
      const res = await fetch(`/api/resources?${params}`);
      const data = await res.json();
      setResources(data.resources || []);
    } catch { /* */ }
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, [activeBranch, activeSemester, activeType, searchQuery]);

  const handleShare = async () => {
    if (!shareData.title || !shareData.description || !shareData.subject || !shareData.uploadedBy) return;
    setSharing(true);
    try {
      await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shareData),
      });
      setShared(true);
      setTimeout(() => { setShowShareForm(false); setShared(false); fetchResources(); }, 2000);
    } catch { /* */ }
    setSharing(false);
  };

  return (
    <div style={{ backgroundColor: "#06061a", color: "#e2e0fd", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <div className="nebula-blob" style={{ top: "-200px", right: "-100px", background: "#10b981" }}></div>
      <div className="nebula-blob" style={{ bottom: "-200px", left: "-100px", background: "#7c3aed" }}></div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center" style={{ backgroundColor: "rgba(6,6,26,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(139,92,246,0.1)", boxShadow: "0px 20px 40px rgba(124,58,237,0.15)", padding: "16px 32px" }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to top right, #10b981, #7c3aed)", boxShadow: "0 0 20px rgba(16,185,129,0.4)" }}>
            <span className="material-symbols-outlined" style={{ color: "white", fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.05em", color: "#a78bfa" }}>NirmaSarathi</h1>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 600 }}>Study Resources</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-all" style={{ padding: "8px 16px", borderRadius: "8px", backgroundColor: "rgba(139,92,246,0.1)", color: "#a78bfa", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chat</span> Oracle
          </Link>
          <Link href="/events" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Events</Link>
          <Link href="/community" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Community</Link>
          <Link href="/lost-found" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Lost & Found</Link>
        </div>
      </nav>

      <main style={{ paddingTop: "128px", paddingBottom: "120px", paddingLeft: "16px", paddingRight: "16px", maxWidth: "72rem", margin: "0 auto" }} className="md:!px-8">
        {/* Hero */}
        <header className="animate-fade-in-up" style={{ marginBottom: "48px", textAlign: "center" }}>
          <span style={{ color: "#10b981", fontWeight: 700, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>Peer-to-Peer Knowledge</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "16px" }}>
            Study{" "}
            <span style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #10b981, #4cd7f6)" }}>Resource Hub</span>
          </h1>
          <p style={{ color: "#ccc3d8", maxWidth: "42rem", margin: "0 auto", fontSize: "18px", lineHeight: 1.6 }}>Share notes, PYQs, videos, and slides with your peers. Crowd-verified quality through upvotes.</p>
        </header>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "42rem", margin: "0 auto 32px", width: "100%" }}>
          <span className="material-symbols-outlined" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>search</span>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by subject, title, or keyword..." style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", paddingLeft: "48px", paddingRight: "16px", paddingTop: "16px", paddingBottom: "16px", color: "#e2e0fd", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px" }} />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", display: "flex", alignItems: "center", marginRight: "4px" }}>Branch</span>
          {BRANCHES.map(b => (
            <button key={b} onClick={() => setActiveBranch(b)} style={{ padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", ...(activeBranch === b ? { backgroundColor: "#7c3aed", color: "white" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>{b}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", display: "flex", alignItems: "center", marginRight: "4px" }}>Sem</span>
          {SEMESTERS.map(s => (
            <button key={s} onClick={() => setActiveSemester(s)} style={{ padding: "6px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", minWidth: "32px", transition: "all 0.2s", ...(activeSemester === s ? { backgroundColor: "#4cd7f6", color: "#06061a" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>{s === 0 ? "All" : s}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "48px" }}>
          <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", display: "flex", alignItems: "center", marginRight: "4px" }}>Type</span>
          {TYPE_FILTERS.map(t => {
            const tc = typeConfig[t];
            return (
              <button key={t} onClick={() => setActiveType(t)} style={{ padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s", ...(activeType === t ? { backgroundColor: tc?.bg || "#7c3aed", color: tc?.color || "white" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>
                {tc && <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>{tc.icon}</span>}
                {tc?.label || "All"}
              </button>
            );
          })}
        </div>

        {/* Resource Cards */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div className="typing-indicator" style={{ display: "inline-flex", gap: "4px" }}><span></span><span></span><span></span></div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            <style>{`@media (min-width: 768px) { .ns-res-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
            <div className="ns-res-grid stagger" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
              {resources.map((r, i) => {
                const tc = typeConfig[r.type] || typeConfig.notes;
                return (
                  <div key={r.id} className="glass-card animate-fade-in-up" style={{ borderRadius: "16px", padding: "24px", animationDelay: `${i * 60}ms` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: tc.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span className="material-symbols-outlined" style={{ color: tc.color, fontSize: "20px" }}>{tc.icon}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", color: tc.color }}>{tc.label}</span>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)", color: "#94a3b8" }}>{r.branch}</span>
                            <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)", color: "#94a3b8" }}>Sem {r.semester}</span>
                          </div>
                        </div>
                      </div>
                      {/* Upvote Badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "rgba(16,185,129,0.1)", cursor: "pointer" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#10b981" }}>thumb_up</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#10b981" }}>{r.upvotes}</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white", marginBottom: "6px", lineHeight: 1.3 }}>{r.title}</h3>
                    <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>{r.subject}</p>
                    <p style={{ fontSize: "13px", color: "#ccc3d8", lineHeight: 1.5, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{r.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>person</span> {r.uploadedBy}
                      </span>
                      <span style={{ fontSize: "11px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>download</span> {r.downloads}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {resources.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#4a4455", marginBottom: "16px", display: "block" }}>search_off</span>
                <p style={{ color: "#64748b" }}>No resources found. Try different filters or share the first one!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FAB — Share Button */}
      <button onClick={() => setShowShareForm(true)} className="active:scale-90 transition-transform" style={{ position: "fixed", bottom: "32px", right: "32px", width: "56px", height: "56px", borderRadius: "9999px", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(16,185,129,0.4)", zIndex: 50 }}>
        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>upload</span>
      </button>

      {/* Share Modal */}
      {showShareForm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div onClick={() => { setShowShareForm(false); setShared(false); }} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}></div>
          <div className="animate-fade-in-up" style={{ position: "relative", width: "100%", maxWidth: "28rem", maxHeight: "90vh", overflowY: "auto", backgroundColor: "rgba(17,17,38,0.95)", backdropFilter: "blur(48px)", borderRadius: "24px", border: "1px solid rgba(16,185,129,0.2)", padding: "32px", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
            {shared ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(16,185,129,0.2)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <span className="material-symbols-outlined" style={{ color: "#34d399", fontSize: "32px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>Resource Shared!</h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "8px" }}>Thank you for contributing to the community.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Share a Resource</h2>
                {[
                  { label: "Title", key: "title", placeholder: "e.g. DSA Complete Notes" },
                  { label: "Subject", key: "subject", placeholder: "e.g. Data Structures" },
                  { label: "Description", key: "description", placeholder: "Describe the resource...", textarea: true },
                  { label: "Your Name / ID", key: "uploadedBy", placeholder: "e.g. Arjun P. (2024 Batch)" },
                  { label: "Link (Optional)", key: "url", placeholder: "https://..." },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#ccc3d8" }}>{f.label}</label>
                    {f.textarea ? (
                      <textarea value={(shareData as Record<string, string>)[f.key]} onChange={e => setShareData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={3} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px", color: "#e2e0fd", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px", resize: "vertical" }} />
                    ) : (
                      <input value={(shareData as Record<string, string>)[f.key]} onChange={e => setShareData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px", color: "#e2e0fd", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px" }} />
                    )}
                  </div>
                ))}
                {/* Type + Branch + Semester */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 700, marginBottom: "4px", color: "#94a3b8", textTransform: "uppercase" }}>Type</label>
                    <select value={shareData.type} onChange={e => setShareData(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px", color: "#e2e0fd", fontSize: "12px" }}>
                      <option value="notes">Notes</option><option value="pyq">PYQ</option><option value="video">Video</option><option value="slides">Slides</option><option value="book">Book</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 700, marginBottom: "4px", color: "#94a3b8", textTransform: "uppercase" }}>Branch</label>
                    <select value={shareData.branch} onChange={e => setShareData(p => ({ ...p, branch: e.target.value }))} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px", color: "#e2e0fd", fontSize: "12px" }}>
                      {BRANCHES.filter(b => b !== "All").map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 700, marginBottom: "4px", color: "#94a3b8", textTransform: "uppercase" }}>Semester</label>
                    <select value={shareData.semester} onChange={e => setShareData(p => ({ ...p, semester: e.target.value }))} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px", color: "#e2e0fd", fontSize: "12px" }}>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={handleShare} disabled={sharing || !shareData.title || !shareData.description || !shareData.subject || !shareData.uploadedBy} className="active:scale-95 transition-all" style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "14px", opacity: (!shareData.title || !shareData.description || !shareData.subject || !shareData.uploadedBy) ? 0.4 : 1 }}>
                  {sharing ? "Sharing..." : "Share Resource"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
