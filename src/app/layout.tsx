import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEEBZLENÜZ | Official Website",
  description: "Official platform for DEEBZLENÜZ - Music, Videos, and Exclusive Merchandise.",
  icons: {
    icon: "/logo/logo2.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white min-h-screen flex flex-col selection:bg-[#FF2E2E] selection:text-white`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#121212',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 'bold',
            },
          }}
        />

        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}