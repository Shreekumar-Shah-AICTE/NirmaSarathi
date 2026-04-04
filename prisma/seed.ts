import { PrismaClient } from "./generated/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const adapter = new PrismaBetterSqlite3({
  url: `file:${path.join(process.cwd(), "prisma", "nirma-sarathi.db")}`,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding NirmaSarathi database...\n");

  // === SEED GRIEVANCES ===
  const grievances = [
    { ticketId: "GRV-INFR-30210401", category: "Infrastructure", department: "Campus Maintenance", description: "AC not working in IT Block Room 302 for the past 3 days. Students are unable to concentrate in class.", status: "Open", priority: "Medium", studentId: "B.Tech-2027-045" },
    { ticketId: "GRV-ACAD-30210402", category: "Academic", department: "Academic Affairs", description: "Attendance marked incorrectly for CSE Data Structures class on March 28. I was present but marked absent.", status: "In Progress", priority: "Medium", studentId: "B.Tech-2027-089" },
    { ticketId: "GRV-HOST-30210403", category: "Hostel", department: "Hostel Administration", description: "Food quality in boys hostel mess has deteriorated significantly. Multiple students have reported stomach issues.", status: "Open", priority: "High", studentId: "MBA-2025-112" },
    { ticketId: "GRV-LIBR-30210404", category: "Library", department: "NIMA Knowledge Centre", description: "The book 'Introduction to Algorithms by Cormen' has been unavailable for 2 weeks despite showing available in OPAC.", status: "Resolved", priority: "Low", studentId: "BCA-2026-043", resolvedAt: new Date("2026-04-02") },
    { ticketId: "GRV-FINA-30210405", category: "Financial", department: "Finance Office", description: "Scholarship amount for current semester has not been credited despite approval letter received in January.", status: "Open", priority: "High", studentId: "B.Pharm-2026-034" },
    { ticketId: "GRV-EXAM-30210406", category: "Examination", department: "Examination Cell", description: "CAE-1 marks for Engineering Mathematics not updated on ERP portal despite exam conducted 3 weeks ago.", status: "In Progress", priority: "Medium", studentId: "B.Tech-2027-067" },
    { ticketId: "GRV-INFR-30210407", category: "Infrastructure", department: "Campus Maintenance", description: "Wi-Fi connectivity in ECE Block is extremely poor. Can't even load Google Classroom during lectures.", status: "Open", priority: "High", studentId: "B.Tech-2027-112" },
    { ticketId: "GRV-GENE-30210408", category: "General", department: "Student Affairs", description: "Request for extended library access hours during examination preparation period starting April 7.", status: "Resolved", priority: "Low", resolvedAt: new Date("2026-04-01") },
  ];

  for (const g of grievances) {
    await prisma.grievance.upsert({
      where: { ticketId: g.ticketId },
      update: {},
      create: g,
    });
  }
  console.log(`✅ Seeded ${grievances.length} grievances`);

  // === SEED CONVERSATIONS ===
  const conversations = [
    { sessionId: "sess-001", query: "What are the library timings?", response: "The NIMA Knowledge Centre is open on weekdays from 8:00 AM to 10:00 PM...", category: "Library", language: "en", sentiment: "neutral" },
    { sessionId: "sess-002", query: "When is CAE-2 for BCA Semester 4?", response: "CAE-2 exams are tentatively scheduled for April 14-18, 2026...", category: "Exams", language: "en", sentiment: "neutral" },
    { sessionId: "sess-003", query: "मुझे कैंटीन में खाने की क्वालिटी के बारे में शिकायत करनी है", response: "मैं समझ सकता हूं कि यह परेशानी का विषय है...", category: "Grievance", language: "hi", sentiment: "negative" },
    { sessionId: "sess-004", query: "I can't sleep properly due to exam stress", response: "I can sense you might be going through a tough time...", category: "Wellness", language: "en", sentiment: "concern" },
    { sessionId: "sess-005", query: "How do I access Manupatra legal database?", response: "You can access Manupatra through the digital library...", category: "Library", language: "en", sentiment: "neutral" },
    { sessionId: "sess-006", query: "Is the digital library open on Sunday?", response: "Yes! The library is open on weekends from 9:00 AM to 5:00 PM...", category: "Library", language: "en", sentiment: "neutral" },
    { sessionId: "sess-007", query: "I want to file a grievance about broken furniture in classroom", response: "I'll help you file that grievance right away...", category: "Grievance", language: "en", sentiment: "negative" },
    { sessionId: "sess-008", query: "Where is the sports complex?", response: "The sports complex is located near the hostel area...", category: "Campus", language: "en", sentiment: "neutral" },
    { sessionId: "sess-009", query: "પુસ્તકાલય ક્યારે ખુલે છે?", response: "NIMA નોલેજ સેન્ટર અઠવાડિયાના દિવસોમાં સવારે 8:00 થી રાત્રે 10:00 સુધી ખુલ્લું છે...", category: "Library", language: "gu", sentiment: "neutral" },
    { sessionId: "sess-010", query: "What is the minimum attendance required?", response: "A minimum of 75% attendance is required to sit for examinations...", category: "Exams", language: "en", sentiment: "neutral" },
    { sessionId: "sess-011", query: "I'm feeling very lonely and anxious about my future", response: "I hear you, and please know that what you're feeling is completely valid...", category: "Wellness", language: "en", sentiment: "concern" },
    { sessionId: "sess-012", query: "How many books can I borrow?", response: "As an undergraduate student, you can borrow up to 4 books for 14 days...", category: "Library", language: "en", sentiment: "positive" },
    { sessionId: "sess-013", query: "Fee payment deadline kab hai?", response: "Fee payment details are available on the My Nirma ERP portal...", category: "Financial", language: "hi", sentiment: "neutral" },
    { sessionId: "sess-014", query: "Where can I get my ID card replaced?", response: "You can get a replacement ID card from the Student Affairs office...", category: "General", language: "en", sentiment: "neutral" },
    { sessionId: "sess-015", query: "Sports day registration kaise karein?", response: "Sports Day registration can be done at the Sports Complex counter...", category: "General", language: "hi", sentiment: "positive" },
  ];

  for (const c of conversations) {
    await prisma.conversation.create({ data: c });
  }
  console.log(`✅ Seeded ${conversations.length} conversations`);

  // === SEED FEEDBACK ===
  const feedbackData = [
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_down", comment: "Response was too generic" },
    { rating: "thumbs_up" },
    { rating: "thumbs_up" },
    { rating: "thumbs_down", comment: "Could not find exam timetable" },
    { rating: "thumbs_up" },
  ];

  for (const f of feedbackData) {
    await prisma.feedback.create({ data: f });
  }
  console.log(`✅ Seeded ${feedbackData.length} feedback entries`);

  // === SEED WELLNESS FLAGS ===
  const wellnessFlags = [
    { sessionId: "sess-004", triggerText: "can't sleep properly due to exam stress", severity: "medium", handled: true },
    { sessionId: "sess-011", triggerText: "feeling very lonely and anxious about my future", severity: "high", handled: false },
    { sessionId: "sess-020", triggerText: "I feel like nobody understands me here", severity: "medium", handled: false },
  ];

  for (const w of wellnessFlags) {
    await prisma.wellnessFlag.create({ data: w });
  }
  console.log(`✅ Seeded ${wellnessFlags.length} wellness flags`);

  // === SEED LOST & FOUND ITEMS ===
  const lostFoundItems = [
    { type: "lost", category: "ID Card", title: "Nirma University ID Card", description: "Blue ID card holder with student ID B.Tech 2027-045, name Arjun Patel. Last seen in IT Block Canteen area.", location: "IT Block Canteen", studentId: "B.Tech-2027-045", status: "open" },
    { type: "found", category: "Keys", title: "Set of 3 Keys with Red Keychain", description: "Found a set of 3 keys on a red carabiner keychain near the main library entrance. One appears to be a hostel room key.", location: "NIMA Knowledge Centre Entrance", status: "open", contactInfo: "Contact at IT Block Lab 3" },
    { type: "lost", category: "Electronics", title: "Black JBL Earbuds (Left Earbud)", description: "Lost the left earbud of JBL Wave 200 (black) somewhere between the Management Block and Food Court.", location: "Management Block → Food Court Path", studentId: "MBA-2025-089", status: "open" },
    { type: "found", category: "Water Bottle", title: "Blue Milton Water Bottle (500ml)", description: "Found a blue Milton steel water bottle in Lecture Hall C-204 after the 3 PM batch left. Has a Nirma sticker on it.", location: "Lecture Hall C-204", status: "open" },
    { type: "lost", category: "Bag", title: "Black Wildcraft Backpack", description: "Left my black Wildcraft backpack in the Food Court around 1:30 PM. Contains notebooks and a calculator. Urgent — has CAE-2 study notes!", location: "Food Court", studentId: "B.Tech-2027-112", status: "open" },
    { type: "found", category: "Books", title: "Engineering Mathematics Textbook (Kreyszig)", description: "Found a slightly worn copy of Advanced Engineering Mathematics by Kreyszig on the bench outside the Sports Complex. Name inside: 'Priya S.'", location: "Sports Complex Bench", status: "claimed" },
    { type: "lost", category: "Electronics", title: "Silver HP Laptop Charger", description: "Lost an HP laptop charger (65W, silver) in the Digital Library section. Was using Seat #14.", location: "Digital Library, Seat #14", studentId: "BCA-2026-021", status: "resolved" },
    { type: "found", category: "ID Card", title: "Nirma ID Card — 22BPH060", description: "Found a Nirma University ID card belonging to enrollment number 22BPH060 on the pathway near Pharmacy Block.", location: "Pharmacy Block Pathway", status: "open", contactInfo: "Dropped at Security Desk, Main Gate" },
    { type: "lost", category: "Other", title: "Prescription Spectacles (Black Frame)", description: "Lost my spectacles with black rectangular frame near the Basketball Court. I really need them for exams!", location: "Basketball Court Area", studentId: "B.Arch-2026-018", status: "open" },
    { type: "found", category: "Electronics", title: "White USB-C Charger Cable", description: "Found a white USB-C charging cable in Lab 5 of IT Block after the DSA practical session.", location: "IT Block Lab 5", status: "open" },
  ];

  for (const item of lostFoundItems) {
    await prisma.lostFoundItem.create({ data: item });
  }
  console.log(`✅ Seeded ${lostFoundItems.length} lost & found items`);

  // === SEED CAMPUS EVENTS ===
  const events = [
    { title: "IEEE Nirma Nexus Ideathon 2026", description: "24-hour innovation hackathon organized by IEEE SBNU. Build solutions for campus problems. Prizes worth ₹50,000!", category: "Technical", venue: "IT Block Seminar Hall", date: new Date("2026-04-05T09:30:00"), endDate: new Date("2026-04-05T17:00:00"), organizer: "IEEE Student Branch, Nirma University", isFeatured: true, isToday: true, registrationLink: "https://ieee-sbnu.nirmauni.ac.in" },
    { title: "TechFest Nirma 2026 — Registrations Open", description: "Annual technical festival featuring 15+ events: Hackathon, Robowar, Coding Contest, Paper Presentation, Startup Pitch, and more.", category: "Technical", venue: "Entire Campus", date: new Date("2026-04-18T09:00:00"), endDate: new Date("2026-04-20T18:00:00"), organizer: "Institute of Technology", isFeatured: true, registrationLink: "https://techfest.nirmauni.ac.in" },
    { title: "Cultural Night — Rang Tarang", description: "Annual cultural extravaganza with dance performances, music concerts, standup comedy, and fashion show. Open to all students.", category: "Cultural", venue: "Open Air Theatre", date: new Date("2026-04-12T17:00:00"), endDate: new Date("2026-04-12T22:00:00"), organizer: "Cultural Committee", isFeatured: true },
    { title: "Campus Recruitment Drive — TCS", description: "TCS is visiting campus for B.Tech (CSE, IT, ECE) final year students. Package: 3.6-7 LPA. Eligibility: 60%+ throughout.", category: "Placement", venue: "Placement Cell, Admin Block", date: new Date("2026-04-10T09:00:00"), endDate: new Date("2026-04-10T17:00:00"), organizer: "Training & Placement Cell" },
    { title: "Guest Lecture: AI in Healthcare", description: "Dr. Rajeev Kumar from IIT-Bombay delivers a guest lecture on 'Artificial Intelligence Applications in Modern Healthcare Systems'.", category: "Academic", venue: "Seminar Hall 2, IT Block", date: new Date("2026-04-08T14:00:00"), endDate: new Date("2026-04-08T16:00:00"), organizer: "CSE Department" },
    { title: "Inter-Department Cricket Tournament", description: "Annual cricket tournament between all departments. Groups of 4, knockout stages. Come support your department team!", category: "Sports", venue: "Cricket Ground", date: new Date("2026-04-14T07:00:00"), endDate: new Date("2026-04-16T18:00:00"), organizer: "Sports Committee" },
    { title: "Workshop: Full-Stack Web Development", description: "Hands-on workshop covering React, Node.js, and MongoDB. Build a complete project in 6 hours! Limited to 60 seats.", category: "Technical", venue: "IT Block Lab 4", date: new Date("2026-04-07T10:00:00"), endDate: new Date("2026-04-07T16:00:00"), organizer: "ACM Student Chapter", registrationLink: "https://acm.nirmauni.ac.in/workshop" },
    { title: "NSS Blood Donation Camp", description: "Organized in collaboration with Red Cross Society. Every donor receives a certificate and refreshments. Save lives!", category: "Clubs", venue: "Health Center Grounds", date: new Date("2026-04-09T09:00:00"), endDate: new Date("2026-04-09T15:00:00"), organizer: "NSS Unit, Nirma University" },
    { title: "Startup Weekend: Pitch Your Idea", description: "E-Cell presents Startup Weekend — a 2-day event where teams ideate, prototype, and pitch to a panel of investors.", category: "Technical", venue: "Management Block Auditorium", date: new Date("2026-04-19T09:00:00"), endDate: new Date("2026-04-20T18:00:00"), organizer: "Entrepreneurship Cell (E-Cell)" },
    { title: "Photography Exhibition: 'Nirma Through Our Lens'", description: "Annual exhibition by the Photography Club showcasing student captures of campus life, nature, and architecture.", category: "Cultural", venue: "Architecture Block Gallery", date: new Date("2026-04-11T10:00:00"), endDate: new Date("2026-04-13T18:00:00"), organizer: "Photography Club" },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }
  console.log(`✅ Seeded ${events.length} campus events`);

  // === SEED STUDY RESOURCES ===
  const resources = [
    { title: "Data Structures & Algorithms — Complete Notes", description: "Comprehensive handwritten notes covering arrays, linked lists, trees, graphs, sorting, DP. Includes diagrams and complexity analysis.", type: "notes", subject: "Data Structures", branch: "CSE", semester: 3, uploadedBy: "Arjun P. (2024 Batch)", upvotes: 142, downloads: 890 },
    { title: "Engineering Mathematics III — PYQ (2020-2025)", description: "Previous year question papers for Engineering Math III with solutions for all branches. CAE + MidSem + EndSem.", type: "pyq", subject: "Engineering Mathematics III", branch: "CSE", semester: 3, uploadedBy: "Library Study Group", upvotes: 198, downloads: 1240 },
    { title: "DBMS Video Lectures — YouTube Playlist", description: "Curated playlist of 40+ videos covering normalization, SQL, ER diagrams, transactions, from Neso Academy and Gate Smashers.", type: "video", subject: "Database Management Systems", branch: "CSE", semester: 4, uploadedBy: "Meera K. (2023 Batch)", url: "https://youtube.com/playlist", upvotes: 87, downloads: 450 },
    { title: "Computer Networks — Forouzan Summary Slides", description: "Concise PPT slides summarizing Forouzan's textbook chapter-wise. Great for quick revision before exams.", type: "slides", subject: "Computer Networks", branch: "CSE", semester: 5, uploadedBy: "CN Study Circle", upvotes: 112, downloads: 670 },
    { title: "Circuit Theory — Solved Numericals", description: "100+ solved numerical problems for Circuit Theory including KVL, KCL, Thevenin, Norton, and AC circuits.", type: "notes", subject: "Circuit Theory", branch: "ECE", semester: 3, uploadedBy: "Ravi M. (2024 Batch)", upvotes: 76, downloads: 390 },
    { title: "Thermodynamics — Quick Revision Notes", description: "One-page formula sheets and key concepts for each chapter. Perfect for last-minute revision.", type: "notes", subject: "Thermodynamics", branch: "ME", semester: 3, uploadedBy: "ME Toppers Club", upvotes: 94, downloads: 520 },
    { title: "Business Law — Case Study Compilation", description: "25 important case studies with analysis for Business Law exam. Covers contracts, partnership, and consumer protection.", type: "notes", subject: "Business Law", branch: "LAW", semester: 4, uploadedBy: "Legal Eagles Study Group", upvotes: 63, downloads: 280 },
    { title: "Organic Chemistry — Reaction Mechanisms Flowchart", description: "Visual flowchart of all major organic chemistry reaction mechanisms. Color-coded by reaction type.", type: "notes", subject: "Organic Chemistry", branch: "PHARMA", semester: 4, uploadedBy: "Chem Wizards", upvotes: 108, downloads: 610 },
    { title: "OOP with Java — Lab Programs (All Practicals)", description: "Complete set of 20 lab programs for OOP with Java practical exams. Includes output screenshots.", type: "notes", subject: "OOP with Java", branch: "CSE", semester: 4, uploadedBy: "Karan D. (2024 Batch)", upvotes: 156, downloads: 980 },
    { title: "Signals & Systems — GATE Prep Notes", description: "GATE-focused notes on Signals & Systems covering Fourier, Laplace, Z-transform with solved GATE questions.", type: "notes", subject: "Signals & Systems", branch: "ECE", semester: 4, uploadedBy: "GATE Aspirants Club", upvotes: 134, downloads: 750 },
    { title: "Financial Accounting — T-Account Cheatsheet", description: "Quick reference for T-accounts, journal entries, and trial balance preparation. With practice problems.", type: "notes", subject: "Financial Accounting", branch: "COM", semester: 2, uploadedBy: "Commerce Crew", upvotes: 45, downloads: 190 },
    { title: "Design Thinking — Process & Case Studies PDF", description: "Comprehensive guide to the 5-stage design thinking process with real-world case studies from IDEO and Stanford d.school.", type: "book", subject: "Design Thinking", branch: "DES", semester: 3, uploadedBy: "Design Studio Club", upvotes: 72, downloads: 310 },
  ];

  for (const r of resources) {
    await prisma.studyResource.create({ data: r });
  }
  console.log(`✅ Seeded ${resources.length} study resources`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("   Run 'npm run dev' to start NirmaSarathi\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
