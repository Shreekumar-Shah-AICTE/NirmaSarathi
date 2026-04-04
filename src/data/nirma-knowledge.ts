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
    {
      name: "Institute of Technology",
      code: "IT",
      departments: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Instrumentation & Control"],
      programs: ["B.Tech", "M.Tech", "Ph.D"],
      dean: "Institute of Technology",
      building: "Main Technology Block",
    },
    {
      name: "Institute of Management",
      code: "IM",
      departments: ["Business Administration", "Finance", "Marketing", "Human Resources", "Operations"],
      programs: ["MBA", "Ph.D"],
      building: "Management Block",
    },
    {
      name: "Institute of Pharmacy",
      code: "IP",
      departments: ["Pharmaceutical Sciences", "Pharmacology", "Pharmaceutical Chemistry"],
      programs: ["B.Pharm", "M.Pharm", "Ph.D"],
      building: "Pharmacy Block",
    },
    {
      name: "Institute of Science",
      code: "IS",
      departments: ["Mathematics", "Physics", "Chemistry", "Biological Sciences"],
      programs: ["B.Sc", "M.Sc", "MCA", "BCA", "Ph.D"],
      building: "Science Block",
    },
    {
      name: "Institute of Law",
      code: "IL",
      departments: ["Constitutional Law", "Criminal Law", "Corporate Law", "Intellectual Property"],
      programs: ["B.A. LL.B (Hons)", "LL.M", "Ph.D"],
      building: "Law Block",
    },
    {
      name: "Institute of Architecture & Planning",
      code: "IAP",
      departments: ["Architecture", "Urban Planning", "Interior Design"],
      programs: ["B.Arch", "M.Arch", "Ph.D"],
      building: "Architecture Block",
    },
    {
      name: "Institute of Commerce",
      code: "IC",
      departments: ["Commerce", "Accountancy", "Business Studies"],
      programs: ["B.Com", "M.Com"],
      building: "Commerce Block",
    },
    {
      name: "Institute of Design",
      code: "ID",
      departments: ["Communication Design", "Industrial Design", "Textile & Fashion Design"],
      programs: ["B.Des", "M.Des"],
      building: "Design Block",
    },
    {
      name: "Institute of International Studies",
      code: "IIS",
      departments: ["International Relations", "Global Affairs"],
      programs: ["Certificate Programs", "Diploma Programs"],
      building: "International Studies Block",
    },
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
    sports: [
      "Cricket Ground", "Football Field", "Basketball Court", "Tennis Court",
      "Volleyball Court", "Badminton Court", "Table Tennis", "Gymnasium",
      "Swimming Pool", "Athletics Track",
    ],
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
