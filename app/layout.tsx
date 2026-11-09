import MobileUiObserver from "../components/home/MobileUiObserver";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "../data/site";
import FloatingWhatsApp from "../components/home/FloatingWhatsApp";

const geistSans = Geist({ variable:"--font-geist-sans", subsets:["latin"] });
const geistMono = Geist_Mono({ variable:"--font-geist-mono", subsets:["latin"] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}><body>{children}<FloatingWhatsApp /><MobileUiObserver /></body></html>;
}
