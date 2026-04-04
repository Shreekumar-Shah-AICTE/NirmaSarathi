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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
