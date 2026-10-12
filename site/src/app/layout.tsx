import type { Metadata } from "next";
import type React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { BRAND } from "@/lib/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name}: list what you have, look for what you want`,
  description:
    "You list what you have, and you choose who sees it. Looking is a saved search that watches. Matching starts with people you already know.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
