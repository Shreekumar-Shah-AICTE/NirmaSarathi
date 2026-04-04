"use client";

import { useState } from "react";
import Link from "next/link";

const CLUBS = [
  { name: "IEEE Student Branch (SBNU)", emoji: "⚡", category: "Technical", members: 180, desc: "The largest technical chapter at Nirma. Organizes hackathons, workshops, and the annual Nexus Ideathon.", meetDay: "Every Saturday", meetTime: "3:00 PM", venue: "IT Block Seminar Hall", tags: ["AI/ML", "IoT", "Web Dev", "Robotics"], socials: { website: "ieee-sbnu.nirmauni.ac.in" } },
  { name: "ACM Student Chapter", emoji: "💻", category: "Technical", members: 120, desc: "Competitive programming, coding contests, and software development workshops. Regular practice sessions for ICPC.", meetDay: "Wednesday & Friday", meetTime: "5:00 PM", venue: "IT Block Lab 4", tags: ["CP", "DSA", "Algorithms", "ICPC"], socials: {} },
  { name: "Robotics Club", emoji: "🤖", category: "Technical", members: 75, desc: "Build robots, drones, and autonomous systems. Participates in national-level competitions like Robocon and TechnXL.", meetDay: "Thursday", meetTime: "4:00 PM", venue: "Robotics Lab, ECE Block", tags: ["Robotics", "Arduino", "Drones", "IoT"], socials: {} },
  { name: "Entrepreneurship Cell (E-Cell)", emoji: "🚀", category: "Business", members: 90, desc: "Startup ecosystem at Nirma. Pitch nights, investor connects, Startup Weekend, and business plan competitions.", meetDay: "Alternate Saturdays", meetTime: "2:00 PM", venue: "Management Block Auditorium", tags: ["Startups", "Pitching", "Finance", "Innovation"], socials: {} },
  { name: "Literary Society — Quilluminati", emoji: "📖", category: "Cultural", members: 60, desc: "Creative writing, poetry slams, open mic nights, word games, and the annual literary festival 'Akshara'.", meetDay: "Tuesday", meetTime: "5:30 PM", venue: "Library Conference Room", tags: ["Writing", "Poetry", "Debate", "Public Speaking"], socials: {} },
  { name: "Photography Club — Aperture", emoji: "📸", category: "Cultural", members: 95, desc: "Campus photoshoots, photo walks, exhibitions, and workshop series on DSLR, mobile, and drone photography.", meetDay: "Sunday (Photo Walks)", meetTime: "7:00 AM", venue: "Architecture Gallery", tags: ["Photography", "Editing", "Videography", "Drones"], socials: {} },
  { name: "Music Club — Swarangan", emoji: "🎵", category: "Cultural", members: 85, desc: "Jamming sessions, band performances, classical recitals, and open mic events. Instruments and practice room available.", meetDay: "Monday & Thursday", meetTime: "6:00 PM", venue: "Cultural Block Music Room", tags: ["Vocals", "Guitar", "Piano", "Classical"], socials: {} },
  { name: "Drama Club — Rangmanch", emoji: "🎭", category: "Cultural", members: 55, desc: "Street plays (nukkad natak), stage plays, improv comedy, and annual theatre festival. No experience needed!", meetDay: "Wednesday", meetTime: "5:00 PM", venue: "Open Air Theatre", tags: ["Theatre", "Acting", "Direction", "Scriptwriting"], socials: {} },
  { name: "NSS Unit", emoji: "🤝", category: "Social", members: 200, desc: "National Service Scheme — blood donation camps, village visits, tree plantation drives, and awareness campaigns.", meetDay: "Saturday", meetTime: "9:00 AM", venue: "NSS Office, Admin Block", tags: ["Social Service", "Volunteering", "Community", "Health"], socials: {} },
  { name: "Sports Committee", emoji: "🏆", category: "Sports", members: 150, desc: "Coordinates all inter-department and inter-college sports events. Cricket, football, basketball, badminton, and athletics.", meetDay: "Daily Practices", meetTime: "6:00 AM / 5:00 PM", venue: "Sports Complex", tags: ["Cricket", "Football", "Basketball", "Athletics"], socials: {} },
  { name: "Coding Club — ByteForce", emoji: "🧑‍💻", category: "Technical", members: 110, desc: "Weekly coding challenges, hackathon prep, and mentorship for competitive programming. Open to all skill levels.", meetDay: "Friday", meetTime: "4:00 PM", venue: "IT Block Lab 3", tags: ["Python", "JavaScript", "C++", "Open Source"], socials: {} },
  { name: "Dance Club — Nrityam", emoji: "💃", category: "Cultural", members: 70, desc: "Classical, contemporary, hip-hop, and Bollywood dance. Performs at all major events and inter-college competitions.", meetDay: "Tuesday & Thursday", meetTime: "6:30 PM", venue: "Cultural Block Dance Studio", tags: ["Classical", "Hip-Hop", "Contemporary", "Bollywood"], socials: {} },
  { name: "Design Studio", emoji: "🎨", category: "Technical", members: 45, desc: "UI/UX design, graphic design, branding, and motion graphics. Hosts design sprints and portfolio reviews.", meetDay: "Saturday", meetTime: "11:00 AM", venue: "Design Block Studio", tags: ["Figma", "UI/UX", "Branding", "Motion"], socials: {} },
  { name: "Debate Society — Vichaar", emoji: "🎙️", category: "Cultural", members: 50, desc: "Parliamentary debate, Model UN preparation, and public speaking workshops. Regular mock sessions and tournaments.", meetDay: "Wednesday", meetTime: "5:00 PM", venue: "Law Block Moot Court", tags: ["Debate", "MUN", "Public Speaking", "Policy"], socials: {} },
  { name: "Environment Club — Vasundhara", emoji: "🌿", category: "Social", members: 65, desc: "Sustainability initiatives, campus greening projects, eco-awareness campaigns, and waste management drives.", meetDay: "Alternate Saturdays", meetTime: "10:00 AM", venue: "Botanical Garden", tags: ["Sustainability", "Planting", "Recycling", "Awareness"], socials: {} },
];

const CATEGORY_FILTERS = ["All", "Technical", "Cultural", "Sports", "Business", "Social"];
const INTEREST_TAGS = ["AI/ML", "Web Dev", "Robotics", "Photography", "Music", "CP", "DSA", "Debate", "Startups", "Volunteering", "Dance", "Design"];

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedClub, setExpandedClub] = useState<string | null>(null);

  const filteredClubs = CLUBS.filter(club => {
    if (activeCategory !== "All" && club.category !== activeCategory) return false;
    if (selectedTag && !club.tags.includes(selectedTag)) return false;
    return true;
  });

  return (
    <div style={{ backgroundColor: "#06061a", color: "#e2e0fd", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <div className="nebula-blob" style={{ top: "-200px", left: "30%", background: "#f59e0b" }}></div>
      <div className="nebula-blob" style={{ bottom: "-200px", right: "-100px", background: "#7c3aed" }}></div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center" style={{ backgroundColor: "rgba(6,6,26,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(139,92,246,0.1)", boxShadow: "0px 20px 40px rgba(124,58,237,0.15)", padding: "16px 32px" }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to top right, #f59e0b, #7c3aed)", boxShadow: "0 0 20px rgba(245,158,11,0.4)" }}>
            <span className="material-symbols-outlined" style={{ color: "white", fontVariationSettings: "'FILL' 1" }}>groups</span>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.05em", color: "#a78bfa" }}>NirmaSarathi</h1>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 600 }}>Community & Clubs</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-all" style={{ padding: "8px 16px", borderRadius: "8px", backgroundColor: "rgba(139,92,246,0.1)", color: "#a78bfa", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chat</span> Oracle
          </Link>
          <Link href="/events" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Events</Link>
          <Link href="/lost-found" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Lost & Found</Link>
          <Link href="/resources" style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "none" }} className="hidden md:block hover:text-violet-300 transition-colors">Resources</Link>
        </div>
      </nav>

      <main style={{ paddingTop: "128px", paddingBottom: "80px", paddingLeft: "16px", paddingRight: "16px", maxWidth: "72rem", margin: "0 auto" }} className="md:!px-8">
        {/* Hero */}
        <header className="animate-fade-in-up" style={{ marginBottom: "48px", textAlign: "center" }}>
          <span style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>Find Your Tribe</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "16px" }}>
            Clubs &{" "}
            <span style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #f59e0b, #a78bfa)" }}>Communities</span>
          </h1>
          <p style={{ color: "#ccc3d8", maxWidth: "42rem", margin: "0 auto", fontSize: "18px", lineHeight: 1.6 }}>15+ active clubs and societies at Nirma. Find the perfect community for your interests.</p>
        </header>

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px", maxWidth: "36rem", margin: "0 auto 40px" }}>
          {[
            { label: "Active Clubs", value: "15+", icon: "groups", color: "#f59e0b" },
            { label: "Total Members", value: "1,450+", icon: "people", color: "#a78bfa" },
            { label: "Events/Month", value: "30+", icon: "event", color: "#4cd7f6" },
          ].map((s, i) => (
            <div key={i} className="glass-panel" style={{ padding: "16px", borderRadius: "12px", textAlign: "center" }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: "24px", marginBottom: "8px", display: "block" }}>{s.icon}</span>
              <p style={{ fontSize: "24px", fontWeight: 900, color: "white" }}>{s.value}</p>
              <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: 700 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
          {CATEGORY_FILTERS.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "8px 20px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", ...(activeCategory === c ? { backgroundColor: "#7c3aed", color: "white" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8" }) }}>
              {c}
            </button>
          ))}
        </div>

        {/* Interest Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginBottom: "48px" }}>
          <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(167,139,250,0.6)", marginRight: "8px", display: "flex", alignItems: "center" }}>Interests</span>
          {INTEREST_TAGS.map(tag => (
            <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} style={{ padding: "4px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", ...(selectedTag === tag ? { backgroundColor: "rgba(76,215,246,0.2)", color: "#4cd7f6", border: "1px solid rgba(76,215,246,0.3)" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid transparent" }) }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Club Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <style>{`@media (min-width: 768px) { .ns-club-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (min-width: 1024px) { .ns-club-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
          <div className="ns-club-grid stagger" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            {filteredClubs.map((club, i) => (
              <div key={club.name} className="glass-card animate-fade-in-up" onClick={() => setExpandedClub(expandedClub === club.name ? null : club.name)} style={{ borderRadius: "16px", padding: "24px", cursor: "pointer", animationDelay: `${i * 60}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "32px" }}>{club.emoji}</span>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{club.name}</h3>
                      <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8" }}>{club.category}</span>
                    </div>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#a78bfa", fontWeight: 700 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>group</span> {club.members}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#ccc3d8", lineHeight: 1.5, marginBottom: "12px", ...(expandedClub !== club.name ? { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" } : {}) }}>{club.desc}</p>

                {expandedClub === club.name && (
                  <div className="animate-fade-in" style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#94a3b8", marginBottom: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="material-symbols-outlined" style={{ fontSize: "14px" }}>calendar_today</span> {club.meetDay}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="material-symbols-outlined" style={{ fontSize: "14px" }}>schedule</span> {club.meetTime}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span> {club.venue}</span>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {club.tags.map(tag => (
                    <span key={tag} style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, backgroundColor: "rgba(255,255,255,0.08)", color: "#94a3b8" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredClubs.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#4a4455", marginBottom: "16px", display: "block" }}>search_off</span>
            <p style={{ color: "#64748b" }}>No clubs match your filters. Try different criteria!</p>
          </div>
        )}

        {/* AI Recommendation Banner */}
        <div className="glass-panel" style={{ marginTop: "48px", padding: "32px", borderRadius: "20px", textAlign: "center", background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(76,215,246,0.08))" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#a78bfa", marginBottom: "12px", display: "block" }}>auto_awesome</span>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "8px" }}>Not sure which club is right for you?</h3>
          <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "16px" }}>Ask the NirmaSarathi Oracle! Tell us your interests and we&apos;ll find your perfect tribe.</p>
          <Link href="/" className="active:scale-95 transition-all" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 30px rgba(124,58,237,0.3)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chat</span> Ask the Oracle
          </Link>
        </div>
      </main>
    </div>
  );
}
