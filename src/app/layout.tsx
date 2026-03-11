import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import MemoryGraph from "@/components/workspace/MemoryGraph";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "OmniOS — Next-Gen AI Ecosystem",
  description: "OmniOS is a unified omnimodal AI platform featuring agentic swarm intelligence, infinite memory graph, generative sandbox, and predictive ambient intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="overflow-hidden h-screen">
        <ThemeProvider>
          <ParticleBackground />
          <NavBar />
          <Sidebar />
          <MemoryGraph />
          <main className="relative z-10 pt-16 h-screen overflow-hidden">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
