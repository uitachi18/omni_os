"use client";
import { motion } from "framer-motion";
import OmniInput from "@/components/workspace/OmniInput";
import AgentSwarmPanel from "@/components/workspace/AgentSwarmPanel";
import WorkspaceCanvas from "@/components/workspace/WorkspaceCanvas";
import AmbientStrip from "@/components/workspace/AmbientStrip";
import { useOmniStore } from "@/store/omniStore";
import {
  Plane, Coins, Paintbrush, PenLine, Terminal, Headphones,
  Activity, Cpu, Glasses
} from "lucide-react";

const QUICK_STATS = [
  { icon: <Activity size={14}/>, label: "Response",  value: "142ms",   color: "var(--cyan)"   },
  { icon: <Cpu size={14}/>,      label: "Memory",    value: "3.2k nodes", color: "var(--purple)" },
  { icon: <Activity size={14}/>, label: "AI Agents", value: "12 / 16", color: "var(--blue)"   },
  { icon: <Terminal size={14}/>, label: "Context",   value: "84k tok", color: "var(--green)"  },
];

const CAPABILITIES = [
  { icon: <Plane size={20}/>,      label: "Plan Trips",   desc: "Itineraries & flights",   color: "var(--cyan)"    },
  { icon: <Coins size={20}/>,      label: "Manage Budget",desc: "Find deals & compare",    color: "var(--green)"   },
  { icon: <Paintbrush size={20}/>, label: "Create Art",   desc: "Images, logos, art",      color: "var(--magenta)" },
  { icon: <PenLine size={20}/>,    label: "Write Anything",desc: "Emails, reports, docs",  color: "var(--purple)"  },
  { icon: <Terminal size={20}/>,   label: "Write Code",   desc: "Any language or stack",   color: "var(--blue)"    },
  { icon: <Headphones size={20}/>, label: "Make Music",   desc: "Beats, melodies, tracks", color: "var(--orange)"  },
];

export default function WorkspacePage() {
  const { sidebarCollapsed } = useOmniStore();

  return (
    <div className="h-full flex flex-col overflow-hidden transition-all duration-300"
      style={{ paddingLeft: sidebarCollapsed ? "0" : "256px" }}>
      <div className="flex-1 grid gap-3 p-4 overflow-hidden"
        style={{ gridTemplateColumns: "1fr 320px", gridTemplateRows: "auto 1fr auto" }}>

        {/* ── Welcome hero bar ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="col-span-1 glass-panel px-5 py-4 flex items-center gap-4 overflow-hidden">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold leading-tight" style={{ color: "var(--t1)" }}>
              Good evening! 👋  What can <span className="shimmer-text">OmniOS</span> do for you?
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--t3)" }}>
              Ask anything, upload a file, or pick a mode from the sidebar — it&apos;s that easy.
            </p>
          </div>
          {/* Stat pills */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {QUICK_STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-card">
                <span style={{ color: s.color }}>{s.icon}</span>
                <div>
                  <p className="text-xs font-bold leading-tight" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[9px] leading-tight tracking-wide" style={{ color: "var(--t3)" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Ambient alerts ── */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="overflow-y-auto no-scrollbar">
          <AmbientStrip />
        </motion.div>

        {/* ── Center: Main workspace ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="overflow-hidden" style={{ minHeight: 0 }}>
          <WorkspaceCanvas />
        </motion.div>

        {/* ── Right: Agent panel + capability cards ── */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col gap-3 overflow-y-auto no-scrollbar" style={{ minHeight: 0 }}>

          <AgentSwarmPanel />

          {/* Capability cards grid */}
          <div className="glass-panel p-4">
            <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--t3)" }}>
              What I Can Do
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CAPABILITIES.map((c) => (
                <button key={c.label}
                  className="p-3 rounded-xl glass-card flex flex-col gap-2 text-left hover:scale-[1.03] transition-transform cursor-default"
                  style={{ borderColor: `color-mix(in srgb, ${c.color} 15%, var(--border))` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${c.color} 14%, var(--card-bg))`, color: c.color }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: "var(--t1)" }}>{c.label}</p>
                    <p className="text-[10px] leading-tight mt-0.5" style={{ color: "var(--t3)" }}>{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AR / Spatial card */}
          <div className="glass-panel p-4 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 0% 100%, color-mix(in srgb, var(--cyan) 8%, transparent), transparent 60%)" }}/>
            <div className="relative flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--cyan) 14%, var(--card-bg))", color: "var(--cyan)" }}>
                <Glasses size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>See the world differently</p>
                <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--t3)" }}>
                  Point your camera at anything — OmniOS overlays live data, prices, and AI insights in real-time.
                </p>
                <button className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors hover:opacity-75"
                  style={{ color: "var(--cyan)", borderColor: "color-mix(in srgb, var(--cyan) 30%, var(--border))", background: "color-mix(in srgb, var(--cyan) 8%, var(--card-bg))" }}>
                  Launch AR Mode →
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom: Omni input ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="col-span-1">
          <OmniInput />
        </motion.div>
      </div>
    </div>
  );
}
