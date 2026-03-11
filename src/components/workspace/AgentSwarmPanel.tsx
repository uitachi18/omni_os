"use client";
import { motion } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import { Brain, Cpu, Search, MessagesSquare } from "lucide-react";

export default function AgentSwarmPanel() {
  const { isThinking } = useOmniStore();

  const thinkingPhases = [
    { text: "Parsing Context", icon: <Search size={14}/>, delay: 0 },
    { text: "Querying LLM Core", icon: <Cpu size={14}/>, delay: 0.2 },
    { text: "Synthesizing Response", icon: <MessagesSquare size={14}/>, delay: 0.4 },
  ];

  if (!isThinking) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="glass-panel p-5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[color:var(--magenta)] opacity-[0.03] pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center relative bg-[color:var(--bg-2)] border border-[color:var(--magenta)] text-[color:var(--magenta)]">
          <Brain size={20} />
          <motion.div className="absolute inset-0 rounded-xl border border-[color:var(--magenta)]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--t1)]">OmniOS AI Core</h3>
          <p className="text-[11px] uppercase tracking-wider text-[color:var(--magenta)] flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--magenta)] animate-pulse shadow-[0_0_6px_var(--magenta)]" />
            PROCESSING REQUEST
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {thinkingPhases.map((phase, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: phase.delay, duration: 0.4 }}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-[color:var(--bg-3)] border border-[color:var(--border)]"
          >
            <div className="text-[color:var(--t3)]">
              {phase.icon}
            </div>
            <span className="text-xs text-[color:var(--t2)] flex-1">{phase.text}</span>
            <motion.div className="w-4 h-1 rounded-full bg-[color:var(--t4)] overflow-hidden">
              <motion.div className="h-full bg-[color:var(--magenta)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: phase.delay }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
