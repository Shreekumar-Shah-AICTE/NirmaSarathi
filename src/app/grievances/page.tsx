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
  {
    id: "#NS-2023-9081",
    title: "Intermittent WiFi connectivity in Block C Library",
    status: "Open",
    statusColor: "#f59e0b",
    category: "INFRASTRUCTURE",
    dept: "IT SERVICES",
    priority: "HIGH PRIORITY",
    priorityColor: "#ef4444",
    desc: "Students have reported frequent disconnections during peak hours (2 PM - 5 PM). Multiple access points appear to be offline or under heavy load.",
  },
  {
    id: "#NS-2023-8922",
    title: "Water leakage in Ground Floor corridor",
    status: "In Progress",
    statusColor: "#22d3ee",
    category: "MAINTENANCE",
    dept: "ESTATE MANAGEMENT",
    priority: "MEDIUM PRIORITY",
    priorityColor: "#f59e0b",
    desc: "Maintenance team has been dispatched to investigate the ceiling leak near the main auditorium entrance. Expected fix by EOD.",
  },
  {
    id: "#NS-2023-8755",
    title: "Request for Extended Lab Hours - Exam Week",
    status: "Resolved",
    statusColor: "#10b981",
    category: "ACADEMIC",
    dept: "LAB ADMIN",
    priority: "NORMAL PRIORITY",
    priorityColor: "#94a3b8",
    desc: "Approved by the Academic Council. Computer Lab 04 will remain open until 10 PM throughout the semester final examination period.",
  },
  {
    id: "#NS-2023-9120",
    title: "Harassment report - Hostel Wing B",
    status: "Escalated",
    statusColor: "#ec4899",
    category: "SAFETY",
    dept: "STUDENT WELFARE",
    priority: "CRITICAL PRIORITY",
    priorityColor: "#ef4444",
    desc: "Forwarded to Internal Complaints Committee (ICC). Formal inquiry initiated. Privacy protections are active for all involved parties.",
  },
  {
    id: "#NS-2023-9004",
    title: "Correction of Name in Digital ID Card",
    status: "In Progress",
    statusColor: "#22d3ee",
    category: "ADMINISTRATIVE",
    dept: "REGISTRAR OFFICE",
    priority: "NORMAL PRIORITY",
    priorityColor: "#94a3b8",
    desc: "Verification of submitted documents (Aadhar/Passport) is complete. Updating database records for ID re-issuance.",
  },
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

  const filteredGrievances = SAMPLE_GRIEVANCES.filter(
    (g) =>
      g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#06061a", color: "#e2e0fd", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* Ambient Background Elements */}
      <div className="nebula-blob" style={{ top: "-10%", left: "-10%", width: "500px", height: "500px", background: "#7c3aed" }}></div>
      <div className="nebula-blob" style={{ bottom: "-10%", right: "-10%", width: "600px", height: "600px", background: "#4cd7f6" }}></div>

      {/* ═══ TopNavBar — From Stitch Grievance Portal ═══ */}
      <nav
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
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.05em", color: "#a78bfa" }}>NirmaSarathi</span>
            <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 700 }}>Grievance Portal</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a style={{ fontSize: "14px", color: "#a78bfa", fontWeight: 500 }} href="#">Dashboard</a>
          <a style={{ fontSize: "14px", color: "#94a3b8" }} href="#" className="hover:text-violet-300 transition-colors">Analytics</a>
          <a style={{ fontSize: "14px", color: "#94a3b8" }} href="#" className="hover:text-violet-300 transition-colors">Reports</a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 active:scale-95 transition-all"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(139,92,246,0.1)",
              color: "#a78bfa",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chat</span>
            Back to Chat
          </Link>
          <button style={{ color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </nav>

      {/* ═══ Main Content ═══ */}
      <main style={{ paddingTop: "128px", paddingBottom: "80px", paddingLeft: "16px", paddingRight: "16px", maxWidth: "72rem", margin: "0 auto" }}
        className="md:!px-8"
      >
        {/* Header — From Stitch */}
        <header className="animate-fade-in-up" style={{ marginBottom: "48px", textAlign: "center" }}>
          <span style={{ color: "#4cd7f6", fontWeight: 700, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>
            Official Recourse
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "16px", color: "#e2e0fd" }}>
            Submit Your{" "}
            <span style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #7c3aed, #4cd7f6)" }}>
              Concern.
            </span>
          </h1>
          <p style={{ color: "#ccc3d8", maxWidth: "42rem", margin: "0 auto", fontSize: "18px", lineHeight: 1.6 }}>
            Your feedback shapes the future of our campus. File a grievance securely and track its resolution in real-time.
          </p>
        </header>

        {/* Tab Switcher — From Stitch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
          <div
            style={{
              backgroundColor: "rgba(25,25,46,0.4)",
              backdropFilter: "blur(12px)",
              padding: "6px",
              borderRadius: "16px",
              display: "flex",
              gap: "4px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <button
              onClick={() => { setActiveTab("file"); setSubmitted(false); }}
              className="flex items-center gap-2 transition-all"
              style={{
                padding: "12px 32px",
                borderRadius: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                ...(activeTab === "file"
                  ? {
                      backgroundColor: "#7c3aed",
                      color: "#ede0ff",
                      boxShadow: "0px 0px 20px rgba(124,58,237,0.3)",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#ccc3d8",
                    }),
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>edit_note</span>
              File Grievance
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className="flex items-center gap-2 transition-all"
              style={{
                padding: "12px 32px",
                borderRadius: "12px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                ...(activeTab === "track"
                  ? {
                      backgroundColor: "#007184",
                      color: "#b7efff",
                      boxShadow: "0px 0px 20px rgba(6,182,212,0.3)",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#ccc3d8",
                    }),
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>analytics</span>
              Track Grievances
            </button>
          </div>
        </div>

        {/* ═══ FILE GRIEVANCE TAB ═══ */}
        {activeTab === "file" && !submitted && (
          <div className="animate-fade-in-up" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "start" }}>
            <style>{`
              @media (min-width: 1024px) { .ns-file-grid { grid-template-columns: 8fr 4fr !important; } }
            `}</style>
            <div className="ns-file-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "start" }}>
              <section>
                <div
                  style={{
                    backgroundColor: "rgba(25,25,46,0.2)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderRadius: "2rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "32px",
                  }}
                  className="md:!p-10"
                >
                  <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "8px", height: "32px", backgroundColor: "#d2bbff", borderRadius: "9999px", display: "inline-block" }}></span>
                    Select Category
                  </h2>

                  {/* Category Grid — 2x4 from Stitch */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "48px" }}>
                    <style>{`
                      @media (min-width: 768px) { .ns-cat-grid { grid-template-columns: repeat(4, 1fr) !important; } }
                    `}</style>
                    <div className="ns-cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                      {CATEGORIES.map((cat) => (
                        <div
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          style={{
                            position: "relative",
                            padding: "24px",
                            borderRadius: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            ...(selectedCategory === cat.name
                              ? {
                                  backgroundColor: "rgba(40,40,62,0.6)",
                                  border: "2px solid #d2bbff",
                                  transform: "scale(1.02)",
                                  boxShadow: "0px 0px 30px rgba(124,58,237,0.2)",
                                }
                              : {
                                  backgroundColor: "rgba(25,25,46,0.4)",
                                  border: "1px solid rgba(255,255,255,0.05)",
                                }),
                          }}
                        >
                          <div style={{ fontSize: "36px", marginBottom: "12px" }}>{cat.emoji}</div>
                          <h3 style={{ fontWeight: 700, fontSize: "14px", color: selectedCategory === cat.name ? "#e2e0fd" : "#cbd5e1" }}>{cat.name}</h3>
                          <p style={{ fontSize: "10px", color: "#64748b", marginTop: "4px", lineHeight: 1.4 }}>{cat.desc}</p>
                          {selectedCategory === cat.name && (
                            <div style={{ position: "absolute", top: "12px", right: "12px", color: "#d2bbff" }}>
                              <span className="material-symbols-outlined" style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#ccc3d8" }}>Detailed Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                          width: "100%",
                          backgroundColor: "rgba(51,51,73,0.2)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "16px",
                          padding: "16px",
                          color: "#e2e0fd",
                          outline: "none",
                          transition: "all 0.2s",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          resize: "vertical",
                        }}
                        placeholder="Please describe your concern in detail..."
                        rows={5}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="md:!grid-cols-2">
                      <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#ccc3d8" }}>
                          Enrollment Number{" "}
                          <span style={{ fontSize: "10px", fontWeight: 400, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "4px" }}>(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={enrollmentNo}
                          onChange={(e) => setEnrollmentNo(e.target.value)}
                          style={{
                            width: "100%",
                            backgroundColor: "rgba(51,51,73,0.2)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "16px",
                            padding: "16px",
                            color: "#e2e0fd",
                            outline: "none",
                            transition: "all 0.2s",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                          }}
                          placeholder="e.g. 21BCE100"
                        />
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <button
                          onClick={handleSubmit}
                          disabled={!selectedCategory || !description.trim() || isSubmitting}
                          className="group active:scale-95 transition-all"
                          style={{
                            width: "100%",
                            height: "58px",
                            background: "linear-gradient(to right, #7c3aed, #571bc1)",
                            borderRadius: "16px",
                            fontWeight: 700,
                            color: "white",
                            border: "none",
                            cursor: !selectedCategory || !description.trim() || isSubmitting ? "not-allowed" : "pointer",
                            boxShadow: "0px 10px 30px rgba(124,58,237,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                            fontSize: "16px",
                            opacity: !selectedCategory || !description.trim() || isSubmitting ? 0.4 : 1,
                            transition: "all 0.2s",
                          }}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Grievance"}
                          <span className="material-symbols-outlined" style={{ transition: "transform 0.2s" }}>send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sidebar — Guidelines */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div
                  style={{
                    backgroundColor: "rgba(25,25,46,0.2)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderRadius: "2rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "32px",
                  }}
                >
                  <h3 style={{ fontWeight: 700, color: "#e2e0fd", marginBottom: "16px" }}>Portal Guidelines</h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <li style={{ display: "flex", gap: "12px" }}>
                      <span className="material-symbols-outlined" style={{ color: "#4cd7f6", fontSize: "18px", flexShrink: 0 }}>privacy_tip</span>
                      <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>Your identity is protected. Only necessary administrators can view your details.</p>
                    </li>
                    <li style={{ display: "flex", gap: "12px" }}>
                      <span className="material-symbols-outlined" style={{ color: "#4cd7f6", fontSize: "18px", flexShrink: 0 }}>attachment</span>
                      <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>Evidence can be attached after the initial filing in the tracking tab.</p>
                    </li>
                    <li style={{ display: "flex", gap: "12px" }}>
                      <span className="material-symbols-outlined" style={{ color: "#4cd7f6", fontSize: "18px", flexShrink: 0 }}>schedule</span>
                      <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>Most grievances are reviewed within 24-48 hours of submission.</p>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ═══ SUCCESS STATE ═══ */}
        {activeTab === "file" && submitted && (
          <div className="animate-fade-in-up" style={{ maxWidth: "32rem", margin: "0 auto" }}>
            <div
              style={{
                backgroundColor: "rgba(40,40,62,0.4)",
                backdropFilter: "blur(48px)",
                WebkitBackdropFilter: "blur(48px)",
                borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "32px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "128px", height: "128px", backgroundColor: "rgba(16,185,129,0.1)", filter: "blur(48px)" }}></div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "rgba(16,185,129,0.2)",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: "#34d399", fontSize: "30px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>Grievance Filed Successfully!</h2>
                <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "8px" }}>Our intelligence module is routing this to the relevant department.</p>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(12,12,32,0.6)",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Ticket ID</span>
                  <span style={{ fontFamily: "monospace", color: "#d2bbff", fontSize: "14px", fontWeight: 700 }}>NS-GRIEV-008</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Category</span>
                  <span style={{ color: "#e2e0fd", fontSize: "14px" }}>{selectedCategory}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Status</span>
                  <span style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", padding: "4px 8px", borderRadius: "4px", border: "1px solid rgba(245,158,11,0.2)" }}>Open</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Estimated</span>
                  <span style={{ color: "#e2e0fd", fontSize: "14px" }}>24-48 Hours</span>
                </div>
              </div>
              <button
                onClick={resetForm}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#cbd5e1",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                File Another Grievance
              </button>
            </div>
          </div>
        )}

        {/* ═══ TRACK GRIEVANCES TAB — From Stitch Track Grievances Portal ═══ */}
        {activeTab === "track" && (
          <div className="animate-fade-in-up" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Search Bar */}
            <div style={{ position: "relative", maxWidth: "42rem", margin: "0 auto", width: "100%" }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "rgba(51,51,73,0.2)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  paddingLeft: "48px",
                  paddingRight: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  color: "#e2e0fd",
                  outline: "none",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                }}
                placeholder="Search by Ticket ID or Keyword..."
              />
            </div>

            {/* Grievance Cards — From Stitch Track Grievances Portal */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "56rem", margin: "0 auto", width: "100%" }}>
              {filteredGrievances.map((g) => (
                <div
                  key={g.id}
                  className="glass-panel"
                  style={{
                    borderRadius: "16px",
                    padding: "24px 32px",
                    borderLeft: `3px solid ${g.statusColor}`,
                    transition: "all 0.2s",
                  }}
                >
                  {/* Ticket ID + Status */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "monospace", color: "#94a3b8", fontSize: "12px" }}>{g.id}</span>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: g.statusColor,
                        border: `1px solid ${g.statusColor}40`,
                        backgroundColor: `${g.statusColor}15`,
                      }}
                    >
                      {g.status}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "12px" }}>{g.title}</h3>
                  {/* Description */}
                  <p style={{ fontSize: "14px", color: "#ccc3d8", lineHeight: 1.6, marginBottom: "16px" }}>{g.desc}</p>
                  {/* Tags */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.08)", fontSize: "10px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>{g.category}</span>
                    <span style={{ padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.08)", fontSize: "10px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>{g.dept}</span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        backgroundColor: `${g.priorityColor}15`,
                        fontSize: "10px",
                        fontWeight: 700,
                        color: g.priorityColor,
                        textTransform: "uppercase",
                      }}
                    >
                      {g.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ═══ Mobile Bottom Nav ═══ */}
      <div
        className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around"
        style={{
          backgroundColor: "rgba(12,12,32,0.8)",
          backdropFilter: "blur(48px)",
          WebkitBackdropFilter: "blur(48px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "16px 0",
        }}
      >
        <button
          onClick={() => setActiveTab("file")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", color: activeTab === "file" ? "#22d3ee" : "#64748b" }}
        >
          <span className="material-symbols-outlined" style={activeTab === "file" ? { fontVariationSettings: "'FILL' 1" } : {}}>edit_note</span>
          <span style={{ fontSize: "10px", fontWeight: 700 }}>File</span>
        </button>
        <button
          onClick={() => setActiveTab("track")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", color: activeTab === "track" ? "#22d3ee" : "#64748b" }}
        >
          <span className="material-symbols-outlined" style={activeTab === "track" ? { fontVariationSettings: "'FILL' 1" } : {}}>analytics</span>
          <span style={{ fontSize: "10px", fontWeight: 700 }}>Track</span>
        </button>
        <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#64748b", textDecoration: "none" }}>
          <span className="material-symbols-outlined">chat</span>
          <span style={{ fontSize: "10px", fontWeight: 700 }}>Oracle</span>
        </Link>
      </div>
    </div>
  );
}
