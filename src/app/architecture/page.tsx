"use client";
import { motion } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";

interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number; // percent
  y: number;
  color: string;
  w: number;
  h: number;
}

interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  color?: string;
}

const NODES: ArchNode[] = [
  // Input bus (left)
  { id: "input", label: "Omnimodal I/O", sublabel: "Text · Voice · Camera · File · Screen", x: 2, y: 38, color: "#00F5FF", w: 14, h: 24 },
  // Core (center)
  { id: "llm", label: "LLM Core", sublabel: "Quantum Reasoning Engine", x: 22, y: 42, color: "#4D79FF", w: 13, h: 16 },
  { id: "orchestrator", label: "Orchestration Layer", sublabel: "Intent → Swarm Routing", x: 42, y: 42, color: "#8B5CF6", w: 14, h: 16 },
  // Memory (top center)
  { id: "memory", label: "Memory Graph", sublabel: "Pinecone · Local Encrypted", x: 34, y: 8, color: "#FF00FF", w: 13, h: 14 },
  // Agent swarm (right of orchestrator)
  { id: "travel", label: "TravelAgent", sublabel: "Logistics · Routes", x: 63, y: 20, color: "#00F5FF", w: 11, h: 12 },
  { id: "finance", label: "FinanceAgent", sublabel: "Budget · Payments", x: 63, y: 38, color: "#4D79FF", w: 11, h: 12 },
  { id: "shopper", label: "ShopperAgent", sublabel: "Gear · Commerce", x: 63, y: 56, color: "#00FF88", w: 11, h: 12 },
  { id: "creator", label: "CreatorAgent", sublabel: "Gen · Media", x: 63, y: 74, color: "#8B5CF6", w: 11, h: 12 },
  // Tool bus (far right top)
  { id: "tools", label: "Tool Bus", sublabel: "Web · Calendar · Payments · APIs", x: 80, y: 30, color: "#FF00FF", w: 13, h: 14 },
  // Generative sandbox (far right bottom)
  { id: "sandbox", label: "Generative Sandbox", sublabel: "Image · Code · Music · Video", x: 80, y: 60, color: "#00FF88", w: 13, h: 14 },
];

const EDGES: ArchEdge[] = [
  { from: "input", to: "llm", label: "raw input", color: "#00F5FF" },
  { from: "llm", to: "orchestrator", label: "intent map", color: "#4D79FF" },
  { from: "orchestrator", to: "travel", color: "#00F5FF" },
  { from: "orchestrator", to: "finance", color: "#4D79FF" },
  { from: "orchestrator", to: "shopper", color: "#00FF88" },
  { from: "orchestrator", to: "creator", color: "#8B5CF6" },
  { from: "llm", to: "memory", label: "read/write", color: "#FF00FF" },
  { from: "memory", to: "orchestrator", color: "#FF00FF" },
  { from: "travel", to: "tools", color: "#00F5FF" },
  { from: "finance", to: "tools", color: "#4D79FF" },
  { from: "creator", to: "sandbox", color: "#8B5CF6" },
  { from: "shopper", to: "sandbox", color: "#00FF88" },
];

function getCenter(node: ArchNode, svgW: number, svgH: number) {
  return {
    x: ((node.x + node.w / 2) / 100) * svgW,
    y: ((node.y + node.h / 2) / 100) * svgH,
  };
}

export default function ArchitecturePage() {
  const { sidebarCollapsed } = useOmniStore();
  const SVG_W = 900;
  const SVG_H = 480;

  return (
    <div
      className="h-full flex flex-col transition-all duration-300 overflow-auto"
      style={{ paddingLeft: sidebarCollapsed ? "0" : "256px" }}
    >
      <div className="flex-1 p-6 min-h-0">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-1">System Blueprint</p>
          <h1 className="text-2xl font-bold text-white/90">
            OmniOS Architecture <span className="shimmer-text">Diagram</span>
          </h1>
          <p className="text-sm text-white/40 mt-1">
            End-to-end data flow across LLM Core, Memory Graph, Agentic Swarm, Tool Bus, and Generative Sandbox
          </p>
        </motion.div>

        {/* Architecture SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="glass-panel p-5 overflow-auto"
        >
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="100%"
            style={{ maxHeight: "480px", overflow: "visible" }}
          >
            <defs>
              <marker id="arrow-arch" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 z" fill="rgba(0,245,255,0.5)" />
              </marker>
              {NODES.map((n) => (
                <radialGradient key={n.id} id={`arch-grd-${n.id}`} cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={n.color} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={n.color} stopOpacity="0.05" />
                </radialGradient>
              ))}
            </defs>

            {/* Flow edges */}
            {EDGES.map((edge, i) => {
              const fn = NODES.find((n) => n.id === edge.from);
              const tn = NODES.find((n) => n.id === edge.to);
              if (!fn || !tn) return null;
              const fc = getCenter(fn, SVG_W, SVG_H);
              const tc = getCenter(tn, SVG_W, SVG_H);
              const mx = (fc.x + tc.x) / 2;
              const my = Math.min(fc.y, tc.y) - 30;
              const d = `M${fc.x},${fc.y} Q${mx},${my} ${tc.x},${tc.y}`;
              const lineLen = Math.hypot(tc.x - fc.x, tc.y - fc.y) + 80;

              return (
                <g key={i}>
                  <path d={d} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                  <path
                    d={d}
                    fill="none"
                    stroke={edge.color || "#00F5FF"}
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    strokeDasharray={`${lineLen / 3} ${lineLen / 3}`}
                    markerEnd="url(#arrow-arch)"
                  >
                    <animate
                      attributeName="strokeDashoffset"
                      from={lineLen}
                      to="0"
                      dur={`${1.8 + i * 0.15}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                  {edge.label && (
                    <text
                      x={mx} y={my - 6}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.25)"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const x = (node.x / 100) * SVG_W;
              const y = (node.y / 100) * SVG_H;
              const w = (node.w / 100) * SVG_W;
              const h = (node.h / 100) * SVG_H;

              return (
                <g key={node.id}>
                  {/* Glow bg */}
                  <rect
                    x={x - 4} y={y - 4} width={w + 8} height={h + 8}
                    rx="12" fill={node.color} opacity="0.06"
                    filter={`blur(8px)`}
                  />
                  {/* Main rect */}
                  <rect
                    x={x} y={y} width={w} height={h}
                    rx="8"
                    fill={`url(#arch-grd-${node.id})`}
                    stroke={node.color}
                    strokeWidth="1.2"
                    strokeOpacity="0.6"
                  />
                  {/* Label */}
                  <text
                    x={x + w / 2} y={y + h / 2 - (node.sublabel ? 7 : 0)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                    opacity="0.9"
                  >
                    {node.label}
                  </text>
                  {node.sublabel && (
                    <text
                      x={x + w / 2} y={y + h / 2 + 8}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="rgba(255,255,255,0.35)"
                      fontSize="7.5"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Legend row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex flex-wrap gap-3"
        >
          {[
            { label: "Omnimodal I/O", color: "#00F5FF" },
            { label: "LLM Core", color: "#4D79FF" },
            { label: "Memory Graph", color: "#FF00FF" },
            { label: "Orchestration", color: "#8B5CF6" },
            { label: "Tool Bus", color: "#FF00FF" },
            { label: "Generative Sandbox", color: "#00FF88" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
              <span className="text-xs font-mono text-white/50">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
