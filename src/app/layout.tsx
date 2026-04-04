import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NirmaSarathi — AI-Powered Campus Assistant | Nirma University",
  description:
    "NirmaSarathi is the Smart Academic Resource & Administrative Tool for Holistic Interaction at Nirma University. Get instant help with library queries, exam schedules, grievance filing, and campus navigation.",
  keywords: [
    "Nirma University",
    "AI Campus Assistant",
    "NirmaSarathi",
    "Library",
    "Exam Schedule",
    "Grievance",
    "Student Help",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
