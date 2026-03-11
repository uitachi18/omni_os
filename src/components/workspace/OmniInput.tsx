"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import {
  Sparkles, Mic, Camera, Upload, Monitor, SendHorizonal
} from "lucide-react";

type InputMode = "text" | "voice" | "camera" | "file" | "screen";

// Pre-computed stable random values for voice bars
const VOICE_BARS = Array.from({ length: 24 }, () => ({
  max: 10 + Math.floor(Math.random() * 26),
  dur: parseFloat((0.4 + Math.random() * 0.3).toFixed(3)),
}));


const MODES: { id: InputMode; icon: React.ReactNode; label: string; color: string }[] = [
  { id: "text",   icon: <Sparkles size={15}/>, label: "Ask",    color: "var(--cyan)"    },
  { id: "voice",  icon: <Mic size={15}/>,       label: "Speak",  color: "var(--magenta)" },
  { id: "camera", icon: <Camera size={15}/>,    label: "Camera", color: "var(--blue)"    },
  { id: "file",   icon: <Upload size={15}/>,    label: "File",   color: "var(--green)"   },
  { id: "screen", icon: <Monitor size={15}/>,   label: "Screen", color: "var(--purple)"  },
];

const SUGGESTIONS = [
  { icon: <Sparkles size={12}/>, text: "Plan a 10-day Tokyo trip under $3,000", color: "var(--cyan)" },
  { icon: <Mic size={12}/>, text: "Create a relaxing lo-fi playlist for focus", color: "var(--purple)" },
  { icon: <Upload size={12}/>, text: "Summarize my Q2 report into key points", color: "var(--blue)" },
  { icon: <Camera size={12}/>, text: "Find the best hiking gear for Mt. Fuji", color: "var(--green)" },
];

interface Particle { id: number; x: number; y: number; color: string }

export default function OmniInput() {
  const [activeMode, setActiveMode] = useState<InputMode>("text");
  const [particles, setParticles] = useState<Particle[]>([]);
  const { inputText, setInputText, sendMessage } = useOmniStore();
  const activeColor = MODES.find(m => m.id === activeMode)?.color ?? "var(--cyan)";

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    const burst: Particle[] = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      color: ["var(--cyan)", "var(--magenta)", "var(--blue)", "var(--purple)"][Math.floor(Math.random() * 4)],
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 1200);
    const text = inputText;
    setInputText("");
    sendMessage(text);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  return (
    <div className="glass-panel p-4 relative overflow-hidden">
      {/* Particle burst */}
      {particles.map((p) => (
        <motion.div key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.color, boxShadow: `0 0 6px ${p.color}` }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0, y: -44 }}
          transition={{ duration: 0.95 }}
        />
      ))}

      {/* Mode pills */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {MODES.map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button key={m.id} onClick={() => setActiveMode(m.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={isActive
                ? { color: m.color, background: `color-mix(in srgb, ${m.color} 14%, transparent)`, border: `1.5px solid color-mix(in srgb, ${m.color} 40%, transparent)` }
                : { color: "var(--t2)", background: "var(--card-bg)", border: "1.5px solid var(--border)" }}>
              {m.icon}
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          );
        })}
        <span className="ml-auto text-[10px] tracking-widest self-center" style={{ color: "var(--t4)" }}>
          OMNI I/O
        </span>
      </div>

      {/* Input row */}
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <div className="absolute bottom-0 left-0 right-0 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)`, opacity: 0.5 }}/>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="What would you like to do today? Type freely..."
            rows={2}
            className="w-full bg-transparent placeholder-[color:var(--t4)] text-sm resize-none outline-none leading-relaxed pb-3"
            style={{ color: "var(--t1)", fontFamily: "JetBrains Mono, monospace" }}
          />
        </div>
        <motion.button onClick={handleSubmit}
          whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all"
          style={{ background: `color-mix(in srgb, ${activeColor} 18%, var(--bg-2))`, border: `1.5px solid color-mix(in srgb, ${activeColor} 45%, transparent)`, color: activeColor }}>
          <SendHorizonal size={15} />
          <span className="hidden sm:inline">Send</span>
        </motion.button>
      </div>

      {/* Voice waveform */}
      <AnimatePresence>
        {activeMode === "voice" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="mt-3 flex items-center justify-center gap-0.5">
            {VOICE_BARS.map((bar, i) => (
              <motion.div key={i} className="w-0.5 rounded-full"
                style={{ background: "var(--magenta)", boxShadow: "0 0 4px var(--magenta)" }}
                animate={{ height: [4, bar.max, 4] }}
                transition={{ duration: bar.dur, repeat: Infinity, delay: i * 0.04 }}
              />
            ))}
            <span className="ml-4 text-xs font-medium" style={{ color: "var(--magenta)" }}>Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick suggestions */}
      {!inputText && (
        <div className="mt-3 flex gap-2 flex-wrap items-center">
          <span className="text-xs" style={{ color: "var(--t4)" }}>Try:</span>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => setInputText(s.text)}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl transition-all hover:opacity-75"
              style={{ background: `color-mix(in srgb, ${s.color} 10%, var(--card-bg))`, border: `1px solid color-mix(in srgb, ${s.color} 22%, var(--border))`, color: `color-mix(in srgb, ${s.color} 80%, var(--t2))` }}>
              {s.icon} {s.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
