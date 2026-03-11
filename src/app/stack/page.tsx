"use client";
import { motion } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";

const STACK_CATEGORIES = [
  {
    category: "Frontend & 3D",
    color: "#00F5FF",
    items: [
      { name: "Next.js 15", version: "App Router", desc: "React full-stack framework with RSC" },
      { name: "React", version: "19", desc: "Component-based UI library" },
      { name: "Three.js", version: "r170", desc: "WebGL 3D engine for particle effects" },
      { name: "@react-three/fiber", version: "9.x", desc: "React renderer for Three.js" },
      { name: "Framer Motion", version: "11", desc: "Production animation library" },
      { name: "GSAP", version: "3.x", desc: "High-performance animation toolkit" },
    ],
  },
  {
    category: "Styling & Design",
    color: "#4D79FF",
    items: [
      { name: "Tailwind CSS", version: "v4", desc: "Utility-first CSS framework" },
      { name: "Inter", version: "Variable", desc: "Primary UI typeface by Rasmus" },
      { name: "JetBrains Mono", version: "Variable", desc: "Monospace for code/data readout" },
      { name: "PostCSS", version: "8", desc: "CSS transform pipeline" },
    ],
  },
  {
    category: "State & Data",
    color: "#8B5CF6",
    items: [
      { name: "Zustand", version: "5", desc: "Minimalist global state management" },
      { name: "Recharts", version: "2.x", desc: "Composable chart library for metrics" },
      { name: "Zod", version: "3.x", desc: "Schema validation for agent payloads" },
    ],
  },
  {
    category: "AI / LLM Layer",
    color: "#FF00FF",
    items: [
      { name: "LangChain", version: "0.3", desc: "LLM orchestration & chain primitives" },
      { name: "LangGraph", version: "0.2", desc: "Stateful multi-agent workflow graphs" },
      { name: "OpenAI API", version: "GPT-4o", desc: "Foundation model for reasoning" },
      { name: "Gemini Ultra", version: "2.0", desc: "Multimodal understanding & generation" },
      { name: "Whisper", version: "v3", desc: "Real-time speech-to-text transcription" },
    ],
  },
  {
    category: "Memory & Vector DB",
    color: "#00FF88",
    items: [
      { name: "Pinecone", version: "3.x", desc: "Managed vector database for embeddings" },
      { name: "LanceDB", version: "0.5", desc: "Local on-device vector storage" },
      { name: "text-embedding-3-large", version: "1536d", desc: "OpenAI embeddings for memory nodes" },
      { name: "Neo4j", version: "5.x", desc: "Graph DB for relationship mapping" },
    ],
  },
  {
    category: "Creative Generation",
    color: "#FF7C3A",
    items: [
      { name: "DALL·E 3", version: "API", desc: "Photorealistic image generation" },
      { name: "Stable Diffusion XL", version: "1.0", desc: "Local image generation pipeline" },
      { name: "Suno AI", version: "API", desc: "Music & audio composition" },
      { name: "Runway ML", version: "Gen-3", desc: "Video generation from text/image" },
    ],
  },
  {
    category: "Infrastructure",
    color: "#94A3B8",
    items: [
      { name: "Vercel", version: "Edge", desc: "Zero-config deployment & edge functions" },
      { name: "Turbo Repo", version: "2.x", desc: "Monorepo build system" },
      { name: "WebSockets", version: "WS API", desc: "Real-time agent status streaming" },
      { name: "IndexedDB", version: "Browser", desc: "Client-side encrypted memory cache" },
    ],
  },
];

export default function StackPage() {
  const { sidebarCollapsed } = useOmniStore();

  return (
    <div
      className="h-full flex flex-col transition-all duration-300 overflow-auto"
      style={{ paddingLeft: sidebarCollapsed ? "0" : "256px" }}
    >
      <div className="p-6 pb-12">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-1">Technical Reference</p>
          <h1 className="text-2xl font-bold text-white/90">
            OmniOS <span className="shimmer-text">Tech Stack</span>
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Complete catalog of technologies powering the next-generation AI ecosystem
          </p>
        </motion.div>

        {/* Stack cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {STACK_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.08 }}
              className="glass-panel p-4"
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <h2 className="text-sm font-semibold" style={{ color: cat.color }}>
                  {cat.category}
                </h2>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg group hover:bg-white/3 transition-colors cursor-default"
                    style={{ borderLeft: `2px solid ${cat.color}25` }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-white/85">{item.name}</span>
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                          style={{ color: cat.color, background: `${cat.color}15` }}
                        >
                          {item.version}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/35 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Item count badge */}
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-end">
                <span className="text-[10px] text-white/20 font-mono">{cat.items.length} packages</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 glass-panel p-4 flex flex-wrap gap-6 items-center"
        >
          {[
            { label: "Total Packages", value: STACK_CATEGORIES.reduce((s, c) => s + c.items.length, 0).toString() },
            { label: "Categories", value: STACK_CATEGORIES.length.toString() },
            { label: "Primary Language", value: "TypeScript" },
            { label: "Runtime Target", value: "Edge + Browser + Node" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold shimmer-text">{stat.value}</p>
              <p className="text-xs text-white/30 font-mono">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
