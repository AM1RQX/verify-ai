import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VerifyAI | Advanced AI Content Detection",
  description: "Professional grade forensic analysis to distinguish between human and AI generated visual content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#030303] text-zinc-200 selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Global background noise/texture if desired (optional) */}
        <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Global Footer (Simplified for Dashboards/Analysis) */}
        <footer className="py-8 border-t border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center font-bold text-[10px] text-white">V</div>
              <span className="text-sm font-semibold tracking-tight text-zinc-400">VerifyAI © 2024</span>
            </div>
            <div className="flex gap-6 text-xs font-medium text-zinc-500">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}