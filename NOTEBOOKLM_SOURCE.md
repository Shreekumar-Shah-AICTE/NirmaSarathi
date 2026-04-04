# NirmaSarathi — The Unified Campus Intelligence Platform

## Product Identity
- **Product Name**: NirmaSarathi (निरमा सारथी)
- **Tagline**: "One Platform. Ten Campus Problems. Zero Fragmentation."
- **Metaphor**: Just as Sarathi (the divine charioteer) guided Arjuna through the great battle, NirmaSarathi guides every Nirma University student through campus life.
- **Built For**: IEEE Nirma Nexus Ideathon 2026 — "Innovating the Campus of Tomorrow"
- **Team**: IEEE Student Branch Nirma University
- **University**: Nirma University, Ahmedabad, Gujarat (115-acre campus, 10,000+ students)

---

## The Problem — Campus Fragmentation

Students at Nirma University currently face a **fragmented digital experience**:

- **7+ separate portals**: ERP, Library OPAC, Exam Cell, Hostel Admin, Grievance Cell, Placement Cell, Club notice boards
- **12+ WhatsApp groups**: Department groups, hostel groups, club groups, placement groups, lost & found groups
- **3+ physical notice boards**: Academic, administrative, event announcements
- **Zero centralization**: No single source of truth for campus information
- **Zero intelligence**: No AI-powered answers, no proactive support, no pattern detection

### Impact on Students:
- Freshers get lost on the 115-acre campus
- Critical deadlines are missed due to scattered notifications
- Mental health concerns go undetected until academic collapse
- Lost items are never recovered — no centralized tracking
- Events suffer low turnout because students don't hear about them
- Study resources are hoarded or lost within the same institution
- Grievances go unresolved due to opaque filing processes
- Faculty feedback is avoided due to fear of identification

---

## The Solution — NirmaSarathi

NirmaSarathi is an **AI-native Unified Campus Intelligence Platform** powered by **Google Gemini AI** that replaces all fragmented campus systems with one intelligent, beautiful interface.

### What Makes NirmaSarathi Different:
1. **Agentic AI**: Not just a chatbot — it reasons, routes, and takes action
2. **Multi-Lingual**: English, Hindi (हिंदी), and Gujarati (ગુજરાતી) fluency
3. **Wellness-First**: AI detects stress/anxiety in student messages and proactively offers counseling resources
4. **Privacy-Protected**: Anonymous grievance filing, no identity exposure
5. **Real-Time Intelligence**: Admin dashboard with live analytics, sentiment analysis, and trend detection

---

## 10 Problem Statements Solved

| # | Campus Problem | NirmaSarathi Module | How It Solves |
|---|---|---|---|
| 1 | Information Overload on Campus | AI Oracle (Core Chat) | Single conversational interface for ALL campus queries — library, exams, navigation, events |
| 2 | Student Mental Health Early Warning | Wellness Detection Engine | AI detects stress/anxiety markers in chat messages, proactively offers counseling resources |
| 3 | Faculty Feedback Anonymity | Anonymous Grievance Portal | Students file feedback with identity protection; only necessary admins see details |
| 4 | Campus Navigation Crisis | Wayfinding Knowledge Base | "Where is the Library?" → instant directions with landmarks and walking times |
| 5 | The Lost & Found Black Hole | Lost & Found Portal | Centralized digital system to report, track, and recover lost items with AI matching |
| 6 | Club & Community Discovery | Community Hub | Browse clubs by interest, find mentors, discover communities beyond mainstream clubs |
| 7 | Campus Event Overload | Events & Announcements Hub | Unified event discovery with categories, dates, and "What's Today?" widget |
| 8 | Peer-to-Peer Study Resources | Resource Exchange Board | Share notes, previous year papers, verified study materials with upvote quality signal |
| 9 | Canteen Food Waste Awareness | Mess Menu Intelligence | Day-wise menu tracking, canteen specialties, timing awareness reduces food waste |
| 10 | Classroom Space Analytics | Admin Intelligence Dashboard | Real-time query volume, department-wise analytics, and campus mood index |

---

## Core Feature Modules

### Module 1: AI Oracle (Core Chat Interface)
- Powered by Google Gemini 2.5 Flash
- Grounded in verified Nirma University knowledge base (300+ data points)
- Auto-detects language and responds in English, Hindi, or Gujarati
- Supports markdown formatting, emoji, and citation-linked accuracy
- Proactive assistance: suggests relevant info before being asked

### Module 2: Grievance Filing & Tracking Portal
- 8 grievance categories: Academic, Infrastructure, Hostel, Library, Financial, Examination, Harassment, General
- AI auto-categorization and department routing
- Unique ticket ID generation
- Real-time status tracking (Open → In Progress → Resolved → Escalated)
- Anonymous filing option — identity protected by design
- Expected resolution: 3 working days

### Module 3: Admin Intelligence Dashboard
- 6 KPI Cards: Total Queries, Active Students, Open Grievances, Satisfaction Rate, Avg Response Time, Wellness Flags
- Query Volume Area Chart — hourly distribution
- Query Categories Donut Chart — Library, Exams, Grievances, Campus Info, Wellness
- Trending Topics — real-time campus pulse
- Grievances by Department — Open vs Resolved across 5 departments
- Language Distribution — English (68%), Hindi (24%), Gujarati (8%)
- Campus Mood Index — Sentiment analysis (78% Positive)
- Recent Conversations Table — Live feed with status, category, and language indicators

### Module 4: Wellness Detection Engine
- AI scans every message for stress/anxiety indicators
- Keywords: overwhelmed, stressed, can't sleep, lonely, anxious, scared, depressed, failing, hopeless, bullied
- Empathetic response with zero diagnosis — "I can sense you might be going through a tough time..."
- Automatic routing to Student Counseling Cell (confidential, 10 AM – 5 PM)
- External helplines: iCall (TISS), Vandrevala Foundation, NIMHANS
- Emergency Protocol: Medical/safety threats → immediate emergency contacts

### Module 5: Lost & Found Portal (NEW)
- Report Lost or Found items with category, location, and description
- Categories: ID Card, Keys, Bag, Electronics, Books, Water Bottle, Other
- Live feed of recent reports with status badges
- AI-Powered Matching: Cross-references lost + found reports
- Chat Integration: "Has anyone found my blue bag near canteen?" → searches DB

### Module 6: Events & Announcements Hub (NEW)
- Bento grid of upcoming campus events
- Category filters: Academic, Cultural, Sports, Technical, Clubs
- "What's Happening Today?" highlighted section
- Countdown timer for next big event
- Chat Integration: "Any events this week?" → Oracle queries events data

### Module 7: Community & Clubs Discovery (NEW)
- Directory of 15+ clubs: IEEE SBNU, ACM Chapter, Robotics Club, E-Cell, Drama, Music, Photography, NSS, etc.
- Browse by interest tags: Robotics, Music, Debate, Coding, Photography, Social Service
- "Find Your Tribe" AI matching
- Alumni mentorship spotlight

### Module 8: Study Resource Exchange (NEW)
- Share notes, previous year papers, video links
- Subject/Semester filtering across all branches
- Crowd-verified quality (upvote system)
- Chat Integration: "Find me DSA notes for CSE Sem 3"

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                          │
│  Next.js 16 + Tailwind CSS v4 + Cosmic Glassmorphism UI    │
│  (AI Chat, Grievances, Admin, Lost&Found, Events, etc.)    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    API LAYER (Next.js Route Handlers)        │
│  /api/chat  /api/grievances  /api/feedback  /api/analytics  │
│  /api/lost-found  /api/events  /api/resources               │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
┌────────────┴────────────┐    ┌─────────────┴───────────────┐
│   GOOGLE GEMINI AI      │    │    PRISMA ORM + SQLite       │
│   (Gemini 2.5 Flash)    │    │    (Conversations, Feedback, │
│   • Chat Completion     │    │     Grievances, LostFound,   │
│   • Wellness Detection  │    │     Events, Resources)       │
│   • Language Detection  │    │                              │
│   • Smart Routing       │    │    Verified Knowledge Base   │
└─────────────────────────┘    │    (nirma-knowledge.ts)      │
                               └──────────────────────────────┘
```

### Tech Stack:
- **Frontend**: Next.js 16.2, React 19, Tailwind CSS v4
- **AI Engine**: Google Gemini 2.5 Flash (via Vercel AI SDK v6)
- **Database**: Prisma 7 ORM + SQLite
- **Design System**: Custom "Aetheric Nebula" — Cosmic Glassmorphism (built with Google Stitch 2.0)
- **Deployment**: Ready for Vercel/Netlify
- **Languages**: TypeScript (100%)

### Design Philosophy — "Aetheric Nebula":
- Deep purple void backgrounds (#06061a)
- Multi-layer glassmorphism with backdrop-blur
- Aurora accent colors: Violet (#7c3aed), Cyan (#4cd7f6), Pink (#ec4899), Emerald (#10b981)
- Nebula blob ambient effects
- Animated gradient text
- Pulsing orb effects
- Material Symbols icons

---

## Impact Metrics

| Metric | Value |
|---|---|
| Problem Statements Addressed | 10 out of 18+ |
| Feature Modules | 8 |
| Languages Supported | 3 (EN, HI, GU) |
| Knowledge Data Points | 300+ verified |
| Grievance Categories | 8 |
| Club/Society Listings | 15+ |
| API Endpoints | 7 |
| Design System | Custom Cosmic Glassmorphism |
| AI Model | Google Gemini 2.5 Flash |
| Response Time | <2 seconds average |

---

## Future Vision — The Roadmap

### Phase 1: TODAY (What We Built) ✅
- AI Oracle Chat with multi-lingual support (EN, HI, GU)
- Grievance Filing & Tracking Portal with anonymous filing
- Admin Intelligence Dashboard with 6 KPI cards and analytics
- Lost & Found Portal with AI-powered matching
- Events & Announcements Hub with category filtering
- Community & Clubs Discovery with interest-based matching
- Study Resource Exchange with upvote quality verification
- Wellness Detection Engine with proactive mental health support

### Phase 2: NEXT SEMESTER (Planned Features) 🔜
- **Progressive Web App (PWA)**: Install NirmaSarathi on phone like a native app — works offline for campus navigation
- **Push Notifications**: "Your grievance #GR-2026-0042 has been resolved" — real-time status updates
- **AI Peer Mentorship Matching**: AI pairs senior students with juniors by interest + department. "I want to learn ML" → matched with 3rd-year AI/ML club member
- **Predictive Analytics**: AI predicts exam stress peaks based on query patterns, library congestion forecasts, canteen footfall predictions
- **Digital Event Tickets**: RSVP + QR-code entry for campus events, automatic certificates
- **Role-Based Access Control**: Students, Faculty, Admin, Club Leads — each sees their relevant dashboard and permissions
- **Smart Exam Stress Predictor**: If a student suddenly searches "exam schedule" + "library hours" + sends stress signals → AI proactively sends wellness resources BEFORE breakdown

### Phase 3: THE VISION (Campus of Tomorrow) 🚀
- **CampusSarathi — Multi-University Platform**: Any Indian university plugs in their knowledge base → instant campus AI. Nirma is the pilot campus. Vision: 1000+ universities.
- **WhatsApp Bot Integration**: Students text NirmaSarathi on WhatsApp, get the same AI intelligence without opening a browser
- **IoT Smart Classroom Sensors**: "Is Lab 4 free right now?" → occupancy sensors feed real-time data into NirmaSarathi
- **Learning Analytics Engine**: Correlate study resource downloads with exam performance → recommend optimal study paths
- **Campus Karma Gamification**: Earn points for sharing notes (+10), reporting found items (+15), filing grievances (+5). Leaderboard visible in Community Hub
- **Blockchain Digital Certificates**: Tamper-proof digital certificates for events, workshops, and courses — verifiable anywhere
- **Alumni Intelligence Network**: NirmaSarathi for alumni: job referrals, mentorship, campus nostalgia, giving back
- **Multi-Language Expansion**: Beyond English/Hindi/Gujarati — add 10+ Indian regional languages (Tamil, Telugu, Bengali, Marathi, etc.)

---

## Interdisciplinary Impact — All 9 Institutes Served

| Institute | How NirmaSarathi Helps |
|-----------|----------------------|
| **Institute of Technology** | Study resources, coding club discovery, placement drives, lab scheduling |
| **Institute of Management** | Admin analytics dashboard, entrepreneurship events, MBA placement data |
| **Institute of Pharmacy** | Lab scheduling, research resource sharing, pharmaceutical study notes |
| **Institute of Science** | BCA/MCA study resources, science club discovery, research paper access |
| **Institute of Law** | Grievance committee compliance, Moot Court event scheduling, legal resource sharing |
| **Institute of Architecture** | Campus wayfinding design feedback, design studio club, gallery events |
| **Institute of Commerce** | Financial literacy events, commerce study materials, career guidance |
| **Institute of Design** | UI/UX design clubs, portfolio review events, design sprint workshops |
| **Institute of International Studies** | Cross-cultural events, global affairs discussions, certificate programs |

**Key Insight**: NirmaSarathi is the ONLY platform that serves every student across every institute. It doesn't matter if you're a CSE student or a Law student — you still lose things, eat at the canteen, attend events, need exam schedules, and sometimes feel overwhelmed. NirmaSarathi serves the HUMAN needs that cut across all disciplines.

---

## Why NirmaSarathi Wins

1. **Breadth**: Addresses 10 problem statements through ONE unified platform — more than any other team
2. **Depth**: Each module is production-quality with real data, not wireframes or mockups
3. **Intelligence**: Gemini AI isn't just answering — it's detecting mental health signals, routing to modules, and protecting student identity
4. **Inclusivity**: Hindi and Gujarati support ensures no student is left behind — including first-gen students from rural Gujarat
5. **Aesthetics**: Cosmic Glassmorphism UI ("Aetheric Nebula" design system) creates an emotional, premium experience — designed with Google Stitch 2.0
6. **Feasibility**: Zero infrastructure cost. Clone → install → run in 30 seconds. Built on industry-standard Next.js + Prisma + SQLite
7. **Scalability**: Architecture scales from SQLite → PostgreSQL → multi-university with zero code changes
8. **Impact**: Directly applicable to Nirma University — uses REAL campus data, REAL club names, REAL event dates, REAL canteen menus
9. **Vision**: From hackathon prototype → university infrastructure → national platform (CampusSarathi)
10. **One Platform, Zero Fragmentation**: Replaces 12+ WhatsApp groups, 7+ portals, and 3+ notice boards with ONE intelligent interface

---

## Student Pain Points (Real Quotes)

> "I spent my entire first week asking random seniors for directions. There's no map, no way to know where anything is." — Fresher, CSE

> "I lost my calculator before the CAE-1. I posted in 4 WhatsApp groups. Nobody responded. Found it in the library lost drawer 3 weeks later." — 2nd Year, ECE

> "I was going through a really tough time during exams. I didn't know the counseling cell existed until a friend told me in 3rd year." — Graduate, IT

> "There's a robotics club?! I've been here 2 years and nobody told me." — 2nd Year, Mechanical

> "Filing a grievance is like shouting into the void. You email the grievance cell and pray." — 3rd Year, Management

These quotes represent REAL patterns of campus fragmentation. NirmaSarathi addresses EVERY one of these pain points.

---

## Team & Credits
- Built for IEEE Nirma Nexus Ideathon 2026
- Theme: "Innovating the Campus of Tomorrow"
- Powered by Google Gemini AI
- Designed with Google Stitch 2.0
- © 2026 Nirma University
