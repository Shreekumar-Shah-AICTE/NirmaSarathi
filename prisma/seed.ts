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
