import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; 
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEEBZLENUZ | Official Website",
  description: "Official platform for DEEBZLENUZ - Music, Videos, and Exclusive Merchandise.",
  icons: {
    icon: "/images/icons/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}