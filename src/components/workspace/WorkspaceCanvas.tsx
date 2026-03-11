"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import type { WorkspaceMode } from "@/store/omniStore";
import {
  MessageSquare, Code2, Wand2, Music2, FileText,
  Bot, UserCircle, TrendingUp
} from "lucide-react";

// Pre-computed stable random values for animated elements
const EQ_DATA = Array.from({ length: 32 }, () => ({
  lo: `${15 + Math.floor(Math.random() * 20)}%`,
  hi: `${50 + Math.floor(Math.random() * 50)}%`,
  lo2: `${12 + Math.floor(Math.random() * 18)}%`,
  dur: parseFloat((0.45 + Math.random() * 0.38).toFixed(3)),
}));
const MINI_DATA = Array.from({ length: 4 }, () =>
  Array.from({ length: 8 }, () => Math.floor(3 + Math.random() * 10))
);


// ─── CHAT MODE ───────────────────────────────────────────────────────────────
function ChatMode() {
  const { messages, isThinking } = useOmniStore();

  return (
    <div className="flex flex-col gap-4 p-5 h-full overflow-y-auto no-scrollbar">
      {messages.length === 0 && !isThinking && (
        <div className="h-full flex flex-col items-center justify-center text-[color:var(--t4)]">
          <MessageSquare size={32} className="opacity-20 mb-3" />
          <p className="text-sm">What can I help you with today?</p>
        </div>
      )}
      {messages.map((msg) => (
        <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
          <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={msg.role === "ai"
              ? { background: "color-mix(in srgb, var(--cyan) 14%, var(--bg-2))", border: "1px solid color-mix(in srgb, var(--cyan) 25%, var(--border))", color: "var(--cyan)" }
              : { background: "color-mix(in srgb, var(--blue) 14%, var(--bg-2))", border: "1px solid color-mix(in srgb, var(--blue) 25%, var(--border))", color: "var(--blue)" }}>
            {msg.role === "ai" ? <Bot size={15} /> : <UserCircle size={15} />}
          </div>
          <div className="max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
            style={msg.role === "ai"
              ? { background: "color-mix(in srgb, var(--cyan) 6%, var(--card-bg))", borderLeft: "2.5px solid color-mix(in srgb, var(--cyan) 40%, transparent)", color: "var(--t1)" }
              : { background: "color-mix(in srgb, var(--blue) 10%, var(--card-bg))", border: "1px solid color-mix(in srgb, var(--blue) 20%, var(--border))", color: "var(--t1)" }}>
            {msg.text}
          </div>
        </motion.div>
      ))}
      {isThinking && (
        <div className="flex gap-3 items-end">
          <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{ background: "color-mix(in srgb, var(--cyan) 14%, var(--bg-2))", border: "1px solid color-mix(in srgb, var(--cyan) 25%, var(--border))", color: "var(--cyan)" }}>
            <Bot size={15} />
          </div>
          <div className="px-4 py-3 rounded-2xl inline-flex gap-1.5 items-center"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
            {[0,1,2].map(i => (
              <motion.div key={i} className="w-2 h-2 rounded-full"
                style={{ background: "var(--cyan)" }}
                animate={{ y: [0, -5, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CODE MODE ───────────────────────────────────────────────────────────────
const CODE = `// OmniOS Orchestration Engine
import { AgentSwarm, LLMCore, MemoryGraph } from '@omnios/core';

interface TaskContext {
  intent: string;
  priority: 'LOW' | 'HIGH' | 'CRITICAL';
}

export class OrchestratorEngine {
  private swarm: AgentSwarm;
  private memory: MemoryGraph;

  async dispatch(ctx: TaskContext): Promise<SwarmResult> {
    const context = await this.memory.query({
      intent: ctx.intent,
      topK: 12,
    });
    const agents = await this.swarm.spawn([
      new TravelAgent({ context }),
      new FinanceAgent({ context }),
      new ShopperAgent({ context }),
    ]);
    return this.synthesize(
      await Promise.allSettled(agents.map(a => a.run(ctx)))
    );
  }
}`;

function CodeMode() {
  const { setActiveCodeContent } = useOmniStore();
  
  useEffect(() => {
    setActiveCodeContent(CODE);
  }, [setActiveCodeContent]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-3)" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/60"/>
          <div className="w-3 h-3 rounded-full bg-yellow-400/60"/>
          <div className="w-3 h-3 rounded-full bg-green-400/60"/>
        </div>
        <Code2 size={13} style={{ color: "var(--t3)", marginLeft: "8px" }}/>
        <span className="text-xs" style={{ color: "var(--t3)" }}>orchestrator.ts — OmniOS Core</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar" style={{ background: "var(--bg-3)" }}>
        {CODE.split("\n").map((line, i) => (
          <div key={i} className="flex gap-4 px-1 rounded hover:bg-[color:var(--card-bg)]">
            <span className="w-6 text-right flex-shrink-0 select-none text-xs leading-6" style={{ color: "var(--t4)" }}>
              {i + 1}
            </span>
            <span className="text-xs leading-6" style={{ color: "var(--t2)" }}
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\/\/.*/g, m => `<span class="tok-comment">${m}</span>`)
                  .replace(/'[^']*'/g, m => `<span class="tok-string">${m}</span>`)
                  .replace(/\b(import|export|class|interface|const|async|await|new|return|private)\b/g,
                    m => `<span class="tok-keyword">${m}</span>`)
                  .replace(/\b(string|number|Promise|SwarmResult|TaskContext)\b/g,
                    m => `<span class="tok-type">${m}</span>`)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── IMAGE MODE ───────────────────────────────────────────────────────────────
const IMAGES = [
  { label: "Neon Tokyo at Dusk",          pct: 100, color: "var(--cyan)",    done: true  },
  { label: "Mt. Fuji — Golden Hour",       pct: 100, color: "var(--blue)",    done: true  },
  { label: "Cyberpunk Shibuya Crossing",   pct: 67,  color: "var(--magenta)", done: false },
  { label: "Cherry Blossom Portal",        pct: 0,   color: "var(--purple)",  done: false },
];

function ImageMode() {
  return (
    <div className="p-4 h-full overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-2 gap-3">
        {IMAGES.map((img, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative aspect-video rounded-2xl overflow-hidden glass-card cursor-pointer"
            style={{ borderColor: img.done ? `color-mix(in srgb, ${img.color} 30%, transparent)` : "var(--border)" }}>
            {img.done && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: `radial-gradient(ellipse at center, color-mix(in srgb, ${img.color} 18%, transparent), var(--bg-3))` }}>
                <Wand2 size={28} style={{ color: img.color, opacity: 0.3 }} />
              </div>
            )}
            {!img.done && img.pct > 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{ background: "var(--bg-2)" }}>
                <motion.div className="w-8 h-8 rounded-full"
                  style={{ border: `2px solid ${img.color}`, borderTopColor: "transparent" }}
                  animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-xs font-semibold" style={{ color: img.color }}>{img.pct}% generating</span>
              </div>
            )}
            {img.pct === 0 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--bg-2)" }}>
                <span className="text-xs" style={{ color: "var(--t4)" }}>In queue...</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2"
              style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}>
              <span className="text-[11px] font-medium" style={{ color: "var(--t2)" }}>{img.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── MUSIC MODE ───────────────────────────────────────────────────────────────
function MusicMode() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-5">
      {/* Spinning disc */}
      <motion.div className="relative w-28 h-28" animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: "conic-gradient(from 0deg, var(--blue), var(--cyan), var(--magenta), var(--green), var(--blue))", opacity: 0.3 }}/>
        <div className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{ background: "var(--bg-2)" }}>
          <Music2 size={26} style={{ color: "var(--cyan)" }} />
        </div>
      </motion.div>
      <div className="text-center">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--t3)" }}>Now Composing</p>
        <p className="font-bold text-base" style={{ color: "var(--t1)" }}>Deep Space Lo-Fi</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--t3)" }}>BPM 78 · Key F♯m · 3:42</p>
      </div>
      {/* EQ bars */}
      <div className="flex items-end justify-center gap-0.5 h-20 w-full max-w-xs">
        {EQ_DATA.map((bar, i) => (
          <motion.div key={i} className="flex-1 rounded-full min-w-[3px]"
            style={{ background: "linear-gradient(to top, var(--blue), var(--cyan))", opacity: 0.85 }}
            animate={{ height: [bar.lo, bar.hi, bar.lo2] }}
            transition={{ duration: bar.dur, repeat: Infinity, ease: "easeInOut", delay: (i / 32) * 0.28 }}
          />
        ))}
      </div>
      {/* Transport */}
      <div className="flex items-center gap-3">
        {["⏮", "⏸", "⏭"].map((c, i) => (
          <button key={i} className="w-11 h-11 rounded-2xl glass-card flex items-center justify-center text-xl hover:brightness-110 transition-all">
            {c}
          </button>
        ))}
      </div>
      {/* Tracks */}
      <div className="w-full max-w-sm space-y-2">
        {[
          { icon: <Code2 size={13}/>, name: "Piano · Reverb",      color: "var(--blue)" },
          { icon: <Music2 size={13}/>, name: "Bass · Sub 808",      color: "var(--magenta)" },
          { icon: <Wand2 size={13}/>, name: "Drums · Vinyl Texture", color: "var(--green)" },
          { icon: <FileText size={13}/>, name: "Ambient Pad · Delay", color: "var(--purple)" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 glass-card rounded-xl">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `color-mix(in srgb, ${t.color} 15%, var(--card-bg))`, color: t.color }}>
              {t.icon}
            </div>
            <span className="text-xs flex-1" style={{ color: "var(--t2)" }}>{t.name}</span>
            <div className="flex gap-0.5 items-end h-4">
              {Array.from({ length: 8 }).map((_, j) => (
                <motion.div key={j} className="w-0.5 rounded-sm" style={{ background: t.color }}
                  animate={{ height: [3, 3 + (MINI_DATA[i]?.[j] || 6), 3] }}
                  transition={{ duration: 0.35, repeat: Infinity, delay: j * 0.06 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DOCUMENT MODE ────────────────────────────────────────────────────────────
function DocumentMode() {
  const { setActiveDocumentContent } = useOmniStore();

  useEffect(() => {
    const docText = `
Q2 Strategy Review Briefing
AI-Generated · 10 Mar 2026

Key Objectives:
Drive 40% year-over-year growth. Launch OmniOS Pro in Asia-Pacific markets. Improve AI accuracy to 99.7% via continuous learning.

Market Intelligence:
We lead competitors by 6 weeks in multimodal AI. Customer score: 78/100 (↑12 pts). Memory technology is 3× better than alternatives.

Watch Out For:
EU data privacy rules may delay rollout by 6–8 weeks. GPU supply may limit performance scaling. Mitigation plans approved.
    `.trim();
    setActiveDocumentContent(docText);
  }, [setActiveDocumentContent]);

  return (
    <div className="p-6 h-full overflow-y-auto no-scrollbar">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "color-mix(in srgb, var(--purple) 15%, var(--card-bg))", color: "var(--purple)" }}>
            <FileText size={18} />
          </div>
          <div>
            <p className="text-[10px] tracking-wider uppercase" style={{ color: "var(--t3)" }}>AI-Generated · 10 Mar 2026</p>
            <h2 className="text-base font-bold" style={{ color: "var(--t1)" }}>Q2 Strategy Review Briefing</h2>
          </div>
        </div>
        <div className="h-px w-20 rounded-full" style={{ background: "linear-gradient(90deg, var(--cyan), transparent)" }}/>

        {[
          { icon: <Wand2 size={15}/>, heading: "Key Objectives", color: "var(--cyan)",
            text: "Drive 40% year-over-year growth. Launch OmniOS Pro in Asia-Pacific markets. Improve AI accuracy to 99.7% via continuous learning." },
          { icon: <TrendingUp size={15}/>, heading: "Market Intelligence", color: "var(--green)",
            text: "We lead competitors by 6 weeks in multimodal AI. Customer score: 78/100 (↑12 pts). Memory technology is 3× better than alternatives." },
          { icon: <MessageSquare size={15}/>, heading: "Watch Out For", color: "var(--magenta)",
            text: "EU data privacy rules may delay rollout by 6–8 weeks. GPU supply may limit performance scaling. Mitigation plans approved." },
        ].map((s) => (
          <div key={s.heading} className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `color-mix(in srgb, ${s.color} 14%, var(--card-bg))`, color: s.color }}>
                {s.icon}
              </div>
              <h3 className="text-sm font-semibold" style={{ color: s.color }}>{s.heading}</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN CANVAS ──────────────────────────────────────────────────────────────
const MODE_META: Record<WorkspaceMode, { icon: React.ReactNode; label: string; color: string; hint: string }> = {
  CHAT:     { icon: <MessageSquare size={16}/>, label: "Chat",         color: "var(--cyan)",    hint: "Ask me anything — I understand plain English!" },
  CODE:     { icon: <Code2 size={16}/>,         label: "Code",         color: "var(--blue)",    hint: "I can write, explain, and review any code." },
  IMAGE:    { icon: <Wand2 size={16}/>,          label: "Create Image", color: "var(--magenta)", hint: "Describe what you want — I'll paint it for you." },
  MUSIC:    { icon: <Music2 size={16}/>,         label: "Make Music",   color: "var(--green)",   hint: "Tell me a mood — I'll compose a track." },
  DOCUMENT: { icon: <FileText size={16}/>,       label: "Document",     color: "var(--purple)",  hint: "I can write, summarize, or translate any document." },
};

export default function WorkspaceCanvas() {
  const { workspaceMode } = useOmniStore();
  const meta = MODE_META[workspaceMode];

  return (
    <div className="glass-panel overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "var(--border)", background: `color-mix(in srgb, ${meta.color} 5%, transparent)` }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: `color-mix(in srgb, ${meta.color} 15%, var(--card-bg))`, color: meta.color }}>
          {meta.icon}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{meta.label}</p>
          <p className="text-[11px]" style={{ color: "var(--t3)" }}>{meta.hint}</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full animate-breathe"
          style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}/>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={workspaceMode} className="h-full"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {workspaceMode === "CHAT"     && <ChatMode />}
            {workspaceMode === "CODE"     && <CodeMode />}
            {workspaceMode === "IMAGE"    && <ImageMode />}
            {workspaceMode === "MUSIC"    && <MusicMode />}
            {workspaceMode === "DOCUMENT" && <DocumentMode />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
