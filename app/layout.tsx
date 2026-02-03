import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Parking System",
  description: "Intelligent parking slot management with automatic allocation based on vehicle requirements",
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
