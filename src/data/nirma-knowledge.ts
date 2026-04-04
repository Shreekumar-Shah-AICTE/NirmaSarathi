// NirmaSarathi — Curated Knowledge Base for Nirma University
// This is the RAG "ground truth" — SAATHI only answers from this verified data.

export const NIRMA_KNOWLEDGE = {
  university: {
    name: "Nirma University",
    established: 2003,
    founder: "Dr. Karsanbhai Patel",
    location: "S.G. Highway, Ahmedabad, Gujarat 382481",
    campus: "115-acre integrated campus",
    accreditation: "NAAC A+ Grade",
    website: "https://nirmauni.ac.in",
    motto: "In Pursuit of Excellence",
    totalStudents: "10,000+",
    chancellor: "Dr. Karsanbhai Patel",
  },

  institutes: [
    { name: "Institute of Technology", code: "IT", departments: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Instrumentation & Control"], programs: ["B.Tech", "M.Tech", "Ph.D"], building: "Main Technology Block" },
    { name: "Institute of Management", code: "IM", departments: ["Business Administration", "Finance", "Marketing", "Human Resources", "Operations"], programs: ["MBA", "Ph.D"], building: "Management Block" },
    { name: "Institute of Pharmacy", code: "IP", departments: ["Pharmaceutical Sciences", "Pharmacology", "Pharmaceutical Chemistry"], programs: ["B.Pharm", "M.Pharm", "Ph.D"], building: "Pharmacy Block" },
    { name: "Institute of Science", code: "IS", departments: ["Mathematics", "Physics", "Chemistry", "Biological Sciences"], programs: ["B.Sc", "M.Sc", "MCA", "BCA", "Ph.D"], building: "Science Block" },
    { name: "Institute of Law", code: "IL", departments: ["Constitutional Law", "Criminal Law", "Corporate Law", "Intellectual Property"], programs: ["B.A. LL.B (Hons)", "LL.M", "Ph.D"], building: "Law Block" },
    { name: "Institute of Architecture & Planning", code: "IAP", departments: ["Architecture", "Urban Planning", "Interior Design"], programs: ["B.Arch", "M.Arch", "Ph.D"], building: "Architecture Block" },
    { name: "Institute of Commerce", code: "IC", departments: ["Commerce", "Accountancy", "Business Studies"], programs: ["B.Com", "M.Com"], building: "Commerce Block" },
    { name: "Institute of Design", code: "ID", departments: ["Communication Design", "Industrial Design", "Textile & Fashion Design"], programs: ["B.Des", "M.Des"], building: "Design Block" },
    { name: "Institute of International Studies", code: "IIS", departments: ["International Relations", "Global Affairs"], programs: ["Certificate Programs", "Diploma Programs"], building: "International Studies Block" },
  ],

  library: {
    name: "NIMA Knowledge Centre",
    system: "KOHA (Open-Source Integrated Library System)",
    digitalRepository: "DSpace",
    features: [
      "RFID-based book tracking",
      "Online Public Access Catalogue (OPAC) — search books from anywhere",
      "24/7 remote access to e-resources",
      "Inter-library loan facility",
      "Reading rooms with Wi-Fi",
      "Digital Library section with 50+ computers",
      "Subscriptions to IEEE, Springer, Elsevier, JSTOR, and more",
    ],
    timings: {
      weekdays: "8:00 AM – 10:00 PM",
      weekends: "9:00 AM – 5:00 PM",
      examPeriod: "8:00 AM – 12:00 AM (Midnight)",
    },
    borrowingRules: {
      undergraduate: { maxBooks: 4, durationDays: 14 },
      postgraduate: { maxBooks: 6, durationDays: 21 },
      faculty: { maxBooks: 10, durationDays: 30 },
    },
    contacts: {
      librarian: "Central Library Help Desk",
      email: "library@nirmauni.ac.in",
      phone: "+91 2717 241911",
    },
  },

  examSchedule: {
    structure: {
      CAE1: { name: "Continuous Assessment Exam 1", weight: "15%", timing: "Week 5-6 of semester" },
      CAE2: { name: "Continuous Assessment Exam 2", weight: "15%", timing: "Week 10-11 of semester" },
      MidSem: { name: "Mid-Semester Examination", weight: "20%", timing: "Week 7-8 of semester" },
      EndSem: { name: "End-Semester Examination", weight: "50%", timing: "Last 2 weeks of semester" },
    },
    currentSemester: {
      name: "Even Semester 2025-26",
      startDate: "January 2026",
      endDate: "May 2026",
      upcomingExams: [
        { name: "CAE-2", tentativeDate: "April 14-18, 2026", status: "Upcoming" },
        { name: "End-Semester Exams", tentativeDate: "May 12-24, 2026", status: "Scheduled" },
      ],
    },
    importantNotes: [
      "Exam timetables are published on the institute notice boards and ERP portal 2 weeks before exams",
      "Students must carry their ID card to the exam hall",
      "Minimum 75% attendance is required to sit for exams",
      "Re-examination facility available for failed subjects",
    ],
  },

  grievance: {
    types: [
      { category: "Academic", examples: ["Unfair grading", "Attendance discrepancy", "Course registration issue", "Faculty complaint"], department: "Academic Affairs" },
      { category: "Infrastructure", examples: ["Broken furniture", "AC not working", "Wi-Fi issues", "Water/electricity problem"], department: "Campus Maintenance" },
      { category: "Hostel", examples: ["Room maintenance", "Food quality", "Security concern", "Roommate conflict"], department: "Hostel Administration" },
      { category: "Library", examples: ["Book not available", "Fine dispute", "Access issue"], department: "NIMA Knowledge Centre" },
      { category: "Financial", examples: ["Fee refund", "Scholarship query", "Payment issue"], department: "Finance Office" },
      { category: "Examination", examples: ["Result discrepancy", "Re-evaluation request", "Hall ticket issue"], department: "Examination Cell" },
      { category: "Harassment/Safety", examples: ["Bullying", "Discrimination", "Safety threat"], department: "Internal Complaints Committee (ICC)" },
      { category: "General", examples: ["Event permission", "Certificate request", "Transport issue"], department: "Student Affairs" },
    ],
    process: [
      "Step 1: Submit grievance through NirmaSarathi with details",
      "Step 2: AI auto-categorizes and routes to the relevant department",
      "Step 3: Receive a unique ticket number for tracking",
      "Step 4: Department reviews within 3 working days",
      "Step 5: Resolution communicated via NirmaSarathi notification",
      "Step 6: Student can escalate if unsatisfied",
    ],
    escalation: "Unresolved grievances can be escalated to the Grievance Redressal Committee (GRC) at the institute level, and further to the university-level GRC.",
    committees: [
      "Department-level Grievance Committee",
      "Institute-level Grievance Redressal Committee",
      "University Grievance Redressal Committee",
      "Internal Complaints Committee (ICC) — for harassment cases",
      "Equal Opportunity Cell — for disadvantaged groups",
    ],
  },

  campusFacilities: {
    hostels: {
      boys: "Separate hostel complex with recreation facilities",
      girls: "Separate hostel complex with enhanced security",
      capacity: "2000+ students",
      facilities: ["Wi-Fi", "Mess/Cafeteria", "Gym", "Recreation Room", "Laundry", "24/7 Security"],
    },
    sports: ["Cricket Ground", "Football Field", "Basketball Court", "Tennis Court", "Volleyball Court", "Badminton Court", "Table Tennis", "Gymnasium", "Swimming Pool", "Athletics Track"],
    dining: [
      { name: "Main Canteen (Block A)", speciality: "North & South Indian", timings: "8 AM – 8 PM" },
      { name: "Food Court", speciality: "Multi-cuisine", timings: "9 AM – 9 PM" },
      { name: "Tea & Snacks Corner", speciality: "Quick bites", timings: "7 AM – 10 PM" },
      { name: "Hostel Mess", speciality: "Full meals", timings: "7:30 AM / 12:30 PM / 7:30 PM" },
    ],
    medical: {
      name: "Campus Health Center",
      services: ["General Consultation", "First Aid", "Ambulance Service", "Referral to Hospitals"],
      timings: "9:00 AM – 5:00 PM (Emergency: 24/7)",
      phone: "Emergency: 108 / Campus Security",
    },
    banking: "SBI ATM and Bank of Baroda ATM on campus",
    transport: "University buses from major locations in Ahmedabad",
    wifi: "Campus-wide Wi-Fi with high-speed internet",
  },

  // === NEW: Campus Navigation ===
  campusNavigation: {
    landmarks: [
      { name: "Main Gate", description: "Primary entrance on S.G. Highway. Security desk and visitor registration." },
      { name: "IT Block (Technology Building)", description: "Largest academic block. Houses CSE, IT, ECE departments. Labs on Ground and 1st floor. Seminar Hall on 3rd floor." },
      { name: "Management Block", description: "MBA classrooms, faculty offices, and auditorium. Adjacent to the parking area." },
      { name: "Pharmacy Block", description: "Labs, research center, and lecture halls for B.Pharm/M.Pharm." },
      { name: "Law Block", description: "Moot Court room, library annex, and seminar rooms." },
      { name: "Architecture Block", description: "Design studios, gallery space, and workshop area." },
      { name: "Science Block", description: "Physics/Chemistry/Bio labs and BCA/MCA computer labs." },
      { name: "NIMA Knowledge Centre (Library)", description: "Central library. 3 floors — Ground: Circulation, 1st: Reading Room, 2nd: Digital Library." },
      { name: "Admin Block", description: "Registrar office, Finance office, Placement Cell, and Director's office." },
      { name: "Sports Complex", description: "Cricket ground, football field, basketball court, gym, and swimming pool." },
      { name: "Hostel Complex", description: "Boys' and Girls' hostels with mess, recreation rooms, and laundry." },
      { name: "Food Court", description: "Multi-cuisine food zone between IT Block and Management Block." },
      { name: "Open Air Theatre", description: "Outdoor amphitheatre for cultural events, located near the garden." },
      { name: "Health Center", description: "Campus clinic near the Admin Block. Emergency services available 24/7." },
    ],
    commonRoutes: [
      { from: "Main Gate", to: "IT Block", walkTime: "5 minutes", direction: "Walk straight past the fountain, take left at the first junction" },
      { from: "IT Block", to: "Library", walkTime: "3 minutes", direction: "Exit IT Block from the back gate, library is directly ahead" },
      { from: "IT Block", to: "Food Court", walkTime: "2 minutes", direction: "Walk right from IT Block main entrance, Food Court is on your right" },
      { from: "Hostel", to: "IT Block", walkTime: "8 minutes", direction: "Exit hostel gate, follow the main road, IT Block is the large building on the left" },
      { from: "Main Gate", to: "Admin Block", walkTime: "4 minutes", direction: "Walk straight, Admin Block is the second building on the right" },
    ],
  },

  // === NEW: Clubs & Societies ===
  clubsAndSocieties: [
    { name: "IEEE Student Branch (SBNU)", type: "Technical", members: 180, activities: "Hackathons, workshops, Nexus Ideathon", meeting: "Every Saturday, 3 PM, IT Block Seminar Hall" },
    { name: "ACM Student Chapter", type: "Technical", members: 120, activities: "Coding contests, ICPC prep, workshops", meeting: "Wed & Fri, 5 PM, IT Block Lab 4" },
    { name: "Robotics Club", type: "Technical", members: 75, activities: "Robot building, Robocon prep, drone projects", meeting: "Thursday, 4 PM, Robotics Lab" },
    { name: "E-Cell (Entrepreneurship Cell)", type: "Business", members: 90, activities: "Startup Weekend, pitch nights, investor connects", meeting: "Alternate Saturdays, 2 PM, Management Block" },
    { name: "Literary Society (Quilluminati)", type: "Cultural", members: 60, activities: "Poetry slams, creative writing, open mic", meeting: "Tuesday, 5:30 PM, Library Conference Room" },
    { name: "Photography Club (Aperture)", type: "Cultural", members: 95, activities: "Photo walks, exhibitions, workshops", meeting: "Sunday, 7 AM (Photo Walks)" },
    { name: "Music Club (Swarangan)", type: "Cultural", members: 85, activities: "Jamming sessions, concerts, open mic", meeting: "Mon & Thu, 6 PM, Music Room" },
    { name: "Drama Club (Rangmanch)", type: "Cultural", members: 55, activities: "Street plays, stage plays, improv comedy", meeting: "Wednesday, 5 PM, Open Air Theatre" },
    { name: "NSS Unit", type: "Social", members: 200, activities: "Blood donation, tree planting, village visits", meeting: "Saturday, 9 AM, NSS Office" },
    { name: "Sports Committee", type: "Sports", members: 150, activities: "All inter-department and inter-college sports", meeting: "Daily, 6 AM / 5 PM, Sports Complex" },
    { name: "Coding Club (ByteForce)", type: "Technical", members: 110, activities: "Weekly challenges, hackathon prep, mentoring", meeting: "Friday, 4 PM, IT Block Lab 3" },
    { name: "Dance Club (Nrityam)", type: "Cultural", members: 70, activities: "Classical, hip-hop, Bollywood dance", meeting: "Tue & Thu, 6:30 PM, Dance Studio" },
    { name: "Design Studio", type: "Technical", members: 45, activities: "UI/UX workshops, design sprints, portfolio reviews", meeting: "Saturday, 11 AM, Design Block" },
    { name: "Debate Society (Vichaar)", type: "Cultural", members: 50, activities: "Parliamentary debate, MUN, public speaking", meeting: "Wednesday, 5 PM, Moot Court" },
    { name: "Environment Club (Vasundhara)", type: "Social", members: 65, activities: "Sustainability drives, campus greening, recycling", meeting: "Alternate Saturdays, 10 AM, Botanical Garden" },
  ],

  // === NEW: Upcoming Events ===
  eventsCalendar: [
    { title: "IEEE Nirma Nexus Ideathon 2026", date: "April 5, 2026", category: "Technical", venue: "IT Block Seminar Hall", organizer: "IEEE SBNU" },
    { title: "Workshop: Full-Stack Web Development", date: "April 7, 2026", category: "Technical", venue: "IT Block Lab 4", organizer: "ACM Student Chapter" },
    { title: "Guest Lecture: AI in Healthcare", date: "April 8, 2026", category: "Academic", venue: "Seminar Hall 2", organizer: "CSE Department" },
    { title: "NSS Blood Donation Camp", date: "April 9, 2026", category: "Social", venue: "Health Center Grounds", organizer: "NSS Unit" },
    { title: "Campus Recruitment Drive — TCS", date: "April 10, 2026", category: "Placement", venue: "Placement Cell", organizer: "Training & Placement Cell" },
    { title: "Photography Exhibition: Nirma Through Our Lens", date: "April 11-13, 2026", category: "Cultural", venue: "Architecture Gallery", organizer: "Photography Club" },
    { title: "Cultural Night — Rang Tarang", date: "April 12, 2026", category: "Cultural", venue: "Open Air Theatre", organizer: "Cultural Committee" },
    { title: "Inter-Department Cricket Tournament", date: "April 14-16, 2026", category: "Sports", venue: "Cricket Ground", organizer: "Sports Committee" },
    { title: "TechFest Nirma 2026", date: "April 18-20, 2026", category: "Technical", venue: "Entire Campus", organizer: "Institute of Technology" },
    { title: "Startup Weekend", date: "April 19-20, 2026", category: "Technical", venue: "Management Auditorium", organizer: "E-Cell" },
  ],

  // === NEW: Canteen Menus ===
  canteenMenus: {
    hostelMess: {
      monday: { breakfast: "Poha, Chai, Boiled Eggs", lunch: "Dal Tadka, Jeera Rice, Roti, Salad, Buttermilk", dinner: "Paneer Butter Masala, Rice, Roti, Sweet" },
      tuesday: { breakfast: "Idli Sambar, Chai", lunch: "Rajma, Rice, Roti, Pickle, Chaas", dinner: "Chole, Rice, Roti, Gulab Jamun" },
      wednesday: { breakfast: "Upma, Chai, Banana", lunch: "Mixed Veg, Dal, Rice, Roti, Curd", dinner: "Dal Makhani, Biryani, Raita" },
      thursday: { breakfast: "Paratha, Curd, Chai", lunch: "Kadhi Pakoda, Rice, Roti, Salad", dinner: "Matar Paneer, Rice, Roti, Ice Cream" },
      friday: { breakfast: "Sandwich, Chai, Sprouts", lunch: "Sambar Rice, Roti, Papad, Buttermilk", dinner: "Malai Kofta, Rice, Roti" },
      saturday: { breakfast: "Chole Bhature, Chai", lunch: "Special Thali (vendor rotation)", dinner: "Schezwan Noodles, Manchurian, Rice" },
      sunday: { breakfast: "Puri Sabzi, Chai", lunch: "Biryani, Raita, Salad, Sweet", dinner: "Light — Khichdi, Papad, Pickle, Chai" },
    },
    canteenSpecials: [
      { item: "Masala Dosa", price: "₹60", location: "Main Canteen" },
      { item: "Veg Thali", price: "₹80", location: "Main Canteen" },
      { item: "Paneer Roll", price: "₹50", location: "Food Court" },
      { item: "Cold Coffee", price: "₹40", location: "Tea Corner" },
      { item: "Maggi", price: "₹30", location: "Tea Corner" },
      { item: "Frankie", price: "₹45", location: "Food Court" },
    ],
  },

  // === NEW: Placement Cell ===
  placementCell: {
    name: "Training & Placement Cell",
    location: "Admin Block, Ground Floor",
    timing: "9:00 AM – 5:00 PM (Mon-Fri)",
    contact: "placement@nirmauni.ac.in",
    stats: {
      avgPackageBTech: "5.8 LPA",
      highestPackageBTech: "44 LPA",
      avgPackageMBA: "8.2 LPA",
      placementRate: "92%",
      totalRecruiters: "200+",
      topRecruiters: ["TCS", "Infosys", "Wipro", "Deloitte", "Ernst & Young", "Amazon", "Microsoft", "Goldman Sachs", "Flipkart", "Reliance"],
    },
    upcomingDrives: [
      { company: "TCS", date: "April 10, 2026", eligibility: "B.Tech CSE/IT/ECE, 60%+ throughout", package: "3.6-7 LPA" },
      { company: "Deloitte", date: "April 15, 2026", eligibility: "B.Tech all branches, 7+ CGPA", package: "7-12 LPA" },
      { company: "Amazon", date: "April 22, 2026", eligibility: "B.Tech CSE/IT, 8+ CGPA", package: "14-28 LPA" },
    ],
    preparationResources: [
      "Aptitude: IndiaBix, Placement Season app",
      "Coding: LeetCode (Top 150), HackerRank, CodeChef",
      "Interview: Glassdoor reviews, Mock interviews via Placement Cell",
      "Resume: Templates available at Placement Cell office",
    ],
  },

  // === NEW: Lost & Found System ===
  lostAndFound: {
    description: "NirmaSarathi's Lost & Found portal helps students report lost or found items and uses AI to match potential matches.",
    howToUse: [
      "Visit the Lost & Found page at /lost-found",
      "Report a lost or found item with description, category, and location",
      "Browse the feed to find your items or help others",
      "Our AI cross-references lost and found reports for potential matches",
    ],
    tip: "You can also ask the Oracle: 'Has anyone found a blue water bottle near the library?' and it will search the Lost & Found database.",
  },

  // === NEW: Study Resources ===
  studyResources: {
    description: "The Study Resource Hub at /resources is a peer-to-peer knowledge sharing platform where students share notes, PYQs, video playlists, and slides.",
    features: ["Filter by branch, semester, and resource type", "Upvote system for quality verification", "Share your own notes and help the community"],
    tip: "Ask the Oracle: 'Find me DSA notes for CSE Sem 3' and it will search the resource database for you.",
  },

  emergencyContacts: [
    { service: "Campus Security", number: "2717-241900", available: "24/7" },
    { service: "Health Center", number: "2717-241911", available: "9 AM – 5 PM / Emergency 24/7" },
    { service: "Ambulance", number: "108", available: "24/7" },
    { service: "Fire", number: "101", available: "24/7" },
    { service: "Women Helpline", number: "181", available: "24/7" },
    { service: "Police", number: "100 / 112", available: "24/7" },
    { service: "Anti-Ragging Helpline", number: "1800-180-5522", available: "24/7" },
  ],

  wellness: {
    counselingCell: {
      name: "Student Counseling Cell",
      services: ["Individual Counseling", "Group Sessions", "Stress Management Workshops", "Career Guidance"],
      timing: "10 AM – 5 PM (Mon–Fri)",
      note: "Completely confidential. No information shared with faculty or parents without consent.",
    },
    mentalHealthIndicators: [
      "Feeling overwhelmed with academics",
      "Difficulty sleeping or eating",
      "Loss of interest in activities",
      "Feeling isolated or lonely",
      "Anxiety about exams or future",
      "Experiencing bullying or harassment",
    ],
    resources: [
      "iCall (TISS Helpline): 9152987821",
      "Vandrevala Foundation: 1860-2662-345",
      "NIMHANS: 080-46110007",
    ],
  },

  erp: {
    name: "My Nirma (Student ERP Portal)",
    url: "ERP available via campus intranet",
    features: [
      "View semester results and internal marks",
      "Online fee payment and receipt download",
      "Student profile management",
      "Attendance tracking",
      "Course registration",
      "ID card generation",
      "Hostel allocation details",
    ],
    accessNote: "Login with your enrollment number and registered password. Contact IT Help Desk for password reset.",
  },
};

// Helper to format the knowledge base into a string for the system prompt
export function formatKnowledgeForPrompt(): string {
  const k = NIRMA_KNOWLEDGE;
  return `
## NIRMA UNIVERSITY — VERIFIED KNOWLEDGE BASE

### University Overview
- Name: ${k.university.name}
- Founded: ${k.university.established} by ${k.university.founder}
- Location: ${k.university.location}
- Campus: ${k.university.campus}
- Accreditation: ${k.university.accreditation}
- Total Students: ${k.university.totalStudents}
- Website: ${k.university.website}

### Institutes (${k.institutes.length} total)
${k.institutes.map(i => `- ${i.name} (${i.code}): Programs — ${i.programs.join(", ")}`).join("\n")}

### Library — ${k.library.name}
- System: ${k.library.system}
- Digital Repository: ${k.library.digitalRepository}
- Timings: Weekdays ${k.library.timings.weekdays}, Weekends ${k.library.timings.weekends}, Exam period ${k.library.timings.examPeriod}
- Borrowing: UG can borrow ${k.library.borrowingRules.undergraduate.maxBooks} books for ${k.library.borrowingRules.undergraduate.durationDays} days; PG can borrow ${k.library.borrowingRules.postgraduate.maxBooks} books for ${k.library.borrowingRules.postgraduate.durationDays} days
- Features: ${k.library.features.join("; ")}
- Contact: ${k.library.contacts.email}

### Exam Structure
${Object.entries(k.examSchedule.structure).map(([key, v]) => `- ${key} (${v.name}): Weight ${v.weight}, Timing: ${v.timing}`).join("\n")}
- Current Semester: ${k.examSchedule.currentSemester.name}
- Upcoming: ${k.examSchedule.currentSemester.upcomingExams.map(e => `${e.name}: ${e.tentativeDate} (${e.status})`).join("; ")}
- Important: ${k.examSchedule.importantNotes.join("; ")}

### Grievance System
Categories: ${k.grievance.types.map(t => `${t.category} → ${t.department}`).join("; ")}
Process: ${k.grievance.process.join(" → ")}
Escalation: ${k.grievance.escalation}

### Campus Facilities
- Dining: ${k.campusFacilities.dining.map(d => `${d.name} (${d.timings})`).join("; ")}
- Sports: ${k.campusFacilities.sports.join(", ")}
- Medical: ${k.campusFacilities.medical.name} — ${k.campusFacilities.medical.timings}
- Wi-Fi: ${k.campusFacilities.wifi}
- Banking: ${k.campusFacilities.banking}

### Campus Navigation
Key Landmarks: ${k.campusNavigation.landmarks.map(l => `${l.name}: ${l.description}`).join("; ")}
Common Routes: ${k.campusNavigation.commonRoutes.map(r => `${r.from} → ${r.to}: ${r.walkTime} (${r.direction})`).join("; ")}

### Clubs & Societies (${k.clubsAndSocieties.length} active)
${k.clubsAndSocieties.map(c => `- ${c.name} (${c.type}, ${c.members} members): ${c.activities}. Meeting: ${c.meeting}`).join("\n")}

### Upcoming Events
${k.eventsCalendar.map(e => `- ${e.title}: ${e.date} — ${e.venue} (by ${e.organizer})`).join("\n")}

### Hostel Mess Menu (Sample Monday)
- Breakfast: ${k.canteenMenus.hostelMess.monday.breakfast}
- Lunch: ${k.canteenMenus.hostelMess.monday.lunch}
- Dinner: ${k.canteenMenus.hostelMess.monday.dinner}
Canteen Specials: ${k.canteenMenus.canteenSpecials.map(s => `${s.item} (${s.price}, ${s.location})`).join("; ")}

### Placement Cell
- Location: ${k.placementCell.location}, Timing: ${k.placementCell.timing}
- Stats: Avg Package B.Tech ${k.placementCell.stats.avgPackageBTech}, Highest ${k.placementCell.stats.highestPackageBTech}, Placement Rate ${k.placementCell.stats.placementRate}
- Top Recruiters: ${k.placementCell.stats.topRecruiters.join(", ")}
- Upcoming Drives: ${k.placementCell.upcomingDrives.map(d => `${d.company} (${d.date}) — ${d.package}`).join("; ")}
- Prep: ${k.placementCell.preparationResources.join("; ")}

### Lost & Found System
${k.lostAndFound.howToUse.join(". ")}

### Study Resources Hub
${k.studyResources.features.join(". ")}

### Emergency Contacts
${k.emergencyContacts.map(c => `- ${c.service}: ${c.number} (${c.available})`).join("\n")}

### Student Wellness
- Counseling Cell: ${k.wellness.counselingCell.timing}
- Services: ${k.wellness.counselingCell.services.join(", ")}
- Note: ${k.wellness.counselingCell.note}
- External Helplines: ${k.wellness.resources.join("; ")}

### ERP Portal (My Nirma)
- Features: ${k.erp.features.join("; ")}
- Access: ${k.erp.accessNote}
  `.trim();
}
