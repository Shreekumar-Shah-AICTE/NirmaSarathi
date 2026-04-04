"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LostFoundItem {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  location: string;
  contactInfo: string | null;
  studentId: string | null;
  status: string;
  createdAt: string;
}

const CATEGORIES = ["All", "ID Card", "Keys", "Bag", "Electronics", "Books", "Water Bottle", "Other"];
const TYPE_FILTERS = ["All", "lost", "found"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function LostFoundPage() {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"lost" | "found">("lost");
  const [formData, setFormData] = useState({ category: "", title: "", description: "", location: "", contactInfo: "", studentId: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (activeType !== "All") params.set("type", activeType);
      if (activeCategory !== "All") params.set("category", activeCategory);
      const res = await fetch(`/api/lost-found?${params}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch { /* fallback */ }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [activeType, activeCategory]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.location || !formData.category) return;
    setSubmitting(true);
    try {
      await fetch("/api/lost-found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: formType }),
      });
      setSubmitted(true);
      setTimeout(() => { setShowForm(false); setSubmitted(false); setFormData({ category: "", title: "", description: "", location: "", contactInfo: "", studentId: "" }); fetchItems(); }, 2000);
    } catch { /* */ }
    setSubmitting(false);
  };

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    open: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", label: "Open" },
    claimed: { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", label: "Claimed" },
    resolved: { color: "#10b981", bg: "rgba(16,185,129,0.15)", label: "Resolved" },
  };

  const typeConfig: Record<string, { color: string; bg: string; icon: string }> = {
    lost: { color: "#ef4444", bg: "rgba(239,68,68,0.15)", icon: "search_off" },
    found: { color: "#10b981", bg: "rgba(16,185,129,0.15)", icon: "where_to_vote" },
  };

  return (
    <div style={{ backgroundColor: "#06061a", color: "#e2e0fd", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <div className="nebula-blob" style={{ top: "-200px", left: "-100px", background: "#7c3aed" }}></div>
      <div className="nebula-blob" style={{ bottom: "-200px", right: "-100px", background: "#007184" }}></div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center" style={{ backgroundColor: "rgba(6,6,26,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(139,92,246,0.1)", boxShadow: "0px 20px 40px rgba(124,58,237,0.15)", padding: "16px 32px" }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to top right, #7c3aed, #007184)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
            <span className="material-symbols-outlined" style={{ color: "white", fontVariationSettings: "'FILL' 1" }}>search</span>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.05em", color: "#a78bfa" }}>NirmaSarathi</h1>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 600 }}>Lost & Found</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-all" style={{ padding: "8px 16px", borderRadius: "8px", backgroundColor: "rgba(139,92,246,0.1)", color: "#a78bfa", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chat</span> Oracle
          </Link>
          <Link href="/events" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Events</Link>
          <Link href="/community" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Community</Link>
          <Link href="/resources" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Resources</Link>
        </div>
      </nav>

      <main style={{ paddingTop: "128px", paddingBottom: "120px", paddingLeft: "16px", paddingRight: "16px", maxWidth: "72rem", margin: "0 auto" }} className="md:!px-8">
        {/* Hero */}
        <header className="animate-fade-in-up" style={{ marginBottom: "48px", textAlign: "center" }}>
          <span style={{ color: "#ef4444", fontWeight: 700, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>Campus Recovery Network</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "16px" }}>
            Lost Something? <span style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #ef4444, #f59e0b)" }}>Found Something?</span>
          </h1>
          <p style={{ color: "#ccc3d8", maxWidth: "42rem", margin: "0 auto", fontSize: "18px", lineHeight: 1.6 }}>Report lost items or help reunite found belongings with their owners. Our AI matches lost with found reports automatically.</p>
        </header>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px", maxWidth: "36rem", margin: "0 auto 40px" }}>
          {[
            { label: "Active Reports", value: items.filter(i => i.status === "open").length, icon: "pending", color: "#f59e0b" },
            { label: "Items Recovered", value: items.filter(i => i.status === "resolved").length, icon: "check_circle", color: "#10b981" },
            { label: "Total Reports", value: items.length, icon: "list_alt", color: "#a78bfa" },
          ].map((s, i) => (
            <div key={i} className="glass-panel" style={{ padding: "16px", borderRadius: "12px", textAlign: "center" }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: "24px", marginBottom: "8px", display: "block" }}>{s.icon}</span>
              <p style={{ fontSize: "24px", fontWeight: 900, color: "white" }}>{s.value}</p>
              <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 700 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "16px" }}>
          {TYPE_FILTERS.map((t) => (
            <button key={t} onClick={() => setActiveType(t)} style={{ padding: "8px 20px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", ...(activeType === t ? { backgroundColor: t === "lost" ? "rgba(239,68,68,0.2)" : t === "found" ? "rgba(16,185,129,0.2)" : "#7c3aed", color: t === "lost" ? "#ef4444" : t === "found" ? "#10b981" : "white" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>
              {t === "All" ? "All Items" : t === "lost" ? "🔴 Lost" : "🟢 Found"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "40px" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", ...(activeCategory === c ? { backgroundColor: "rgba(167,139,250,0.2)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid transparent" }) }}>
              {c}
            </button>
          ))}
        </div>

        {/* Feed */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div className="typing-indicator" style={{ display: "inline-flex", gap: "4px" }}><span></span><span></span><span></span></div>
          </div>
        ) : (
          <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "16px" }}>
            <style>{`@media (min-width: 768px) { .ns-lf-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
            <div className="ns-lf-grid" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "16px" }}>
              {items.map((item, i) => {
                const tc = typeConfig[item.type] || typeConfig.lost;
                const sc = statusConfig[item.status] || statusConfig.open;
                return (
                  <div key={item.id} className="glass-card animate-fade-in-up" style={{ borderRadius: "16px", padding: "24px", borderLeft: `3px solid ${tc.color}`, animationDelay: `${i * 60}ms` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", backgroundColor: tc.bg, color: tc.color }}>{item.type}</span>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", backgroundColor: sc.bg, color: sc.color }}>{sc.label}</span>
                      </div>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>{timeAgo(item.createdAt)}</span>
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "8px" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "#ccc3d8", lineHeight: 1.6, marginBottom: "12px" }}>{item.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#94a3b8" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span> {item.location}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#94a3b8" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>category</span> {item.category}
                      </span>
                      {item.contactInfo && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#4cd7f6" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>call</span> {item.contactInfo}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {items.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#4a4455", marginBottom: "16px", display: "block" }}>inventory_2</span>
                <p style={{ color: "#64748b", fontSize: "14px" }}>No items found matching your filters.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FAB — Report Button */}
      <button onClick={() => setShowForm(true)} className="active:scale-90 transition-transform" style={{ position: "fixed", bottom: "32px", right: "32px", width: "56px", height: "56px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(124,58,237,0.4)", zIndex: 50 }}>
        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>add</span>
      </button>

      {/* Report Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div onClick={() => { setShowForm(false); setSubmitted(false); }} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}></div>
          <div className="animate-fade-in-up" style={{ position: "relative", width: "100%", maxWidth: "32rem", maxHeight: "90vh", overflowY: "auto", backgroundColor: "rgba(17,17,38,0.95)", backdropFilter: "blur(48px)", borderRadius: "24px", border: "1px solid rgba(139,92,246,0.2)", padding: "32px", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(16,185,129,0.2)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <span className="material-symbols-outlined" style={{ color: "#34d399", fontSize: "32px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>Report Submitted!</h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "8px" }}>Our AI will try to match your report automatically.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Report an Item</h2>
                {/* Type Toggle */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                  <button onClick={() => setFormType("lost")} style={{ flex: 1, padding: "12px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "14px", ...(formType === "lost" ? { backgroundColor: "rgba(239,68,68,0.2)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid transparent" }) }}>🔴 I Lost Something</button>
                  <button onClick={() => setFormType("found")} style={{ flex: 1, padding: "12px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "14px", ...(formType === "found" ? { backgroundColor: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid transparent" }) }}>🟢 I Found Something</button>
                </div>
                {/* Category Chips */}
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", display: "block" }}>Category</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                  {CATEGORIES.filter(c => c !== "All").map(c => (
                    <button key={c} onClick={() => setFormData(p => ({ ...p, category: c }))} style={{ padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", ...(formData.category === c ? { backgroundColor: "rgba(167,139,250,0.2)", color: "#a78bfa" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>{c}</button>
                  ))}
                </div>
                {/* Fields */}
                {[
                  { label: "Title", placeholder: "e.g. Blue Milton Water Bottle", key: "title", type: "input" },
                  { label: "Description", placeholder: "Describe the item in detail...", key: "description", type: "textarea" },
                  { label: "Location", placeholder: "Where was it lost/found?", key: "location", type: "input" },
                  { label: "Contact Info (Optional)", placeholder: "How to reach you", key: "contactInfo", type: "input" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#ccc3d8" }}>{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea value={(formData as Record<string, string>)[f.key]} onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={3} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px", color: "#e2e0fd", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px", resize: "vertical" }} />
                    ) : (
                      <input value={(formData as Record<string, string>)[f.key]} onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", backgroundColor: "rgba(51,51,73,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px", color: "#e2e0fd", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px" }} />
                    )}
                  </div>
                ))}
                <button onClick={handleSubmit} disabled={submitting || !formData.title || !formData.description || !formData.location || !formData.category} className="active:scale-95 transition-all" style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "14px", opacity: (!formData.title || !formData.description || !formData.location || !formData.category) ? 0.4 : 1 }}>
                  {submitting ? "Submitting..." : `Report ${formType === "lost" ? "Lost" : "Found"} Item`}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
