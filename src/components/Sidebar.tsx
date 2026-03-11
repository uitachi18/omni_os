"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import { useTelemetry } from "@/hooks/useTelemetry";
import {
  MessageSquare, Code2, Wand2, Music2, FileText,
  Brain, ChevronLeft, Activity
} from "lucide-react";
import type { WorkspaceMode } from "@/store/omniStore";

const MODES: {
  id: WorkspaceMode; icon: React.ReactNode; label: string; desc: string; color: string;
}[] = [
  { id: "CHAT",     icon: <MessageSquare size={17}/>, label: "Chat",         desc: "Ask me anything",      color: "var(--cyan)" },
  { id: "CODE",     icon: <Code2 size={17}/>,         label: "Code",         desc: "Write & review code",  color: "var(--blue)" },
  { id: "IMAGE",    icon: <Wand2 size={17}/>,          label: "Create Image", desc: "Generate pictures",    color: "var(--magenta)" },
  { id: "MUSIC",    icon: <Music2 size={17}/>,         label: "Make Music",   desc: "Compose a track",      color: "var(--green)" },
  { id: "DOCUMENT", icon: <FileText size={17}/>,       label: "Document",     desc: "Write & edit docs",    color: "var(--purple)" },
];

export default function Sidebar() {
  const {
    sidebarCollapsed, toggleSidebar,
    workspaceMode, setWorkspaceMode,
    toggleMemoryGraph, isThinking
  } = useOmniStore();

  // Initialize the live OS telemetry
  useTelemetry();

  return (
    <AnimatePresence>
      {!sidebarCollapsed && (
        <motion.aside
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed left-0 top-16 bottom-0 z-40 w-64 glass-panel rounded-none rounded-r-2xl border-l-0 border-t-0 border-b-0 flex flex-col overflow-hidden"
        >
          {/* Collapse */}
          <button onClick={toggleSidebar}
            className="absolute right-3 top-4 p-1.5 rounded-lg transition-colors"
            style={{ color: "var(--t3)" }}>
            <ChevronLeft size={14} />
          </button>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">

            {/* Mode selector */}
            <section>
              <p className="text-xs font-medium mb-2.5 px-1 tracking-wider uppercase" style={{ color: "var(--t3)" }}>
                What to do
              </p>
              <div className="space-y-1">
                {MODES.map((mode) => {
                  const isActive = workspaceMode === mode.id;
                  return (
                    <button key={mode.id} onClick={() => setWorkspaceMode(mode.id)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                      style={isActive
                        ? { background: `color-mix(in srgb, ${mode.color} 12%, transparent)`, border: `1.5px solid color-mix(in srgb, ${mode.color} 35%, transparent)` }
                        : { background: "var(--card-bg)", border: "1.5px solid var(--border)" }
                      }>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: isActive ? `color-mix(in srgb, ${mode.color} 20%, transparent)` : "color-mix(in srgb, var(--t4) 60%, transparent)",
                          color: isActive ? mode.color : "var(--t2)",
                        }}>
                        {mode.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight"
                          style={{ color: isActive ? mode.color : "var(--t1)" }}>
                          {mode.label}
                        </p>
                        <p className="text-xs leading-tight mt-0.5" style={{ color: "var(--t3)" }}>
                          {mode.desc}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-breathe"
                          style={{ background: mode.color, boxShadow: `0 0 6px ${mode.color}` }}/>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* AI Core Status */}
            {isThinking && (
              <section>
                <p className="text-xs font-medium mb-2 px-1 tracking-wider uppercase flex items-center gap-1.5" style={{ color: "var(--t3)" }}>
                  <Activity size={11} /> System Status
                </p>
                <div className="glass-card p-3 flex items-center gap-3 rounded-xl border" style={{ borderColor: "var(--cyan)" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[color:var(--bg-2)]">
                    <Brain size={16} className="text-[color:var(--cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--t1)" }}>AI Core Active</p>
                    <p className="text-[10px] text-[color:var(--cyan)] animate-pulse shadow-[0_0_8px_var(--cyan)]">Processing request...</p>
                  </div>
                </div>
              </section>
            )}

            {/* Memory graph */}
            <section>
              <p className="text-xs font-medium mb-2 px-1 tracking-wider uppercase" style={{ color: "var(--t3)" }}>AI Memory</p>
              <button onClick={toggleMemoryGraph}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl glass-card hover:brightness-110 transition-all">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "color-mix(in srgb, var(--purple) 18%, transparent)", color: "var(--purple)" }}>
                  <Brain size={17} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>Knowledge Graph</p>
                  <p className="text-xs" style={{ color: "var(--t3)" }}>OmniOS remembers everything</p>
                </div>
              </button>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="glass-card flex items-center gap-2 px-3 py-2 rounded-xl">
              <div className="w-2 h-2 rounded-full dot-active" />
              <span className="text-xs" style={{ color: "var(--t2)" }}>OmniOS is online</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
