import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MMH Standup Companion",
  description: "Modern standup meeting companion with Jira integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
