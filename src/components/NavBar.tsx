"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import {
  Bell, Menu, Moon, Sun, Bot, Home, Network, Layers
} from "lucide-react";

const NAV_LINKS = [
  { href: "/",             label: "Workspace",    icon: <Home size={14} /> },
  { href: "/architecture", label: "How It Works", icon: <Network size={14} /> },
  { href: "/stack",        label: "Tech Stack",   icon: <Layers size={14} /> },
];

export default function NavBar() {
  const pathname = usePathname();
  const { ambientAlerts, toggleSidebar, isThinking, isDark, toggleTheme } = useOmniStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="h-full glass-panel rounded-none border-l-0 border-r-0 border-t-0 border-b px-5 flex items-center justify-between"
        style={{ borderBottomColor: "var(--border)" }}>

        {/* ── Left ── */}
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} aria-label="Toggle sidebar"
            className="p-2 rounded-xl hover:bg-[color:var(--card-bg)] transition-colors"
            style={{ color: "var(--t2)" }}>
            <Menu size={18} />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ background: "color-mix(in srgb, var(--cyan) 15%, transparent)" }}/>
              <div className="relative w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: "color-mix(in srgb, var(--cyan) 50%, transparent)", background: "var(--bg-2)" }}>
                <Network size={14} style={{ color: "var(--cyan)" }} />
              </div>
            </div>
            <div>
              <p className="font-bold text-base leading-none" style={{ color: "var(--t1)" }}>
                Omni<span className="shimmer-text">OS</span>
              </p>
              <p className="text-[10px] leading-none mt-0.5" style={{ color: "var(--t3)" }}>Your AI Companion</p>
            </div>
          </Link>
        </div>

        {/* ── Center Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className="relative flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl transition-all"
                style={{ color: isActive ? "var(--cyan)" : "var(--t2)" }}>
                {isActive && (
                  <motion.div layoutId="nav-pill" transition={{ type: "spring", bounce: 0.2 }}
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "color-mix(in srgb, var(--cyan) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--cyan) 25%, transparent)" }}
                  />
                )}
                <span className="relative z-10">{link.icon}</span>
                <span className="relative z-10 font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Right ── */}
        <div className="flex items-center gap-2">

          {/* Thinking indicator */}
          <AnimatePresence>
            {isThinking && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card"
                style={{ borderColor: "color-mix(in srgb, var(--cyan) 30%, transparent)" }}>
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--cyan)" }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--cyan)" }}>Thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active indicator */}
          {isThinking && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-medium"
              style={{ color: "var(--blue)", borderColor: "color-mix(in srgb, var(--blue) 25%, transparent)" }}>
              <Bot size={13} />
              AI processing
            </div>
          )}

          {/* Notification bell */}
          <button className="relative p-2 rounded-xl hover:bg-[color:var(--card-bg)] transition-colors"
            style={{ color: "var(--t2)" }} aria-label="Notifications">
            <Bell size={18} />
            {ambientAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "var(--magenta)", boxShadow: "0 0 6px var(--magenta)" }}/>
            )}
          </button>

          {/* Dark / Light toggle */}
          <button onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-[color:var(--card-bg)] transition-all"
            style={{ color: isDark ? "var(--cyan)" : "var(--orange)" }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span key="moon" initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 30, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon size={18} />
                </motion.span>
              ) : (
                <motion.span key="sun" initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 30, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-xl border flex items-center justify-center"
            style={{ background: "color-mix(in srgb, var(--cyan) 12%, var(--bg-2))", borderColor: "color-mix(in srgb, var(--cyan) 30%, transparent)" }}>
            <Bot size={15} style={{ color: "var(--cyan)" }} />
          </div>
        </div>
      </div>
    </header>
  );
}
