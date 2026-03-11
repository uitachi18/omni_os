"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import { X, Brain } from "lucide-react";

interface MemNode {
  id: string;
  label: string;
  type: "concept" | "person" | "task" | "preference";
  x: number;
  y: number;
  color: string;
}

interface MemEdge {
  from: string;
  to: string;
}

const NODES: MemNode[] = [
  { id: "n1", label: "Tokyo Trip", type: "task", x: 50, y: 50, color: "#00F5FF" },
  { id: "n2", label: "User Preferences", type: "preference", x: 75, y: 25, color: "#8B5CF6" },
  { id: "n3", label: "Mt. Fuji", type: "concept", x: 25, y: 30, color: "#4D79FF" },
  { id: "n4", label: "Budget ¥450k", type: "concept", x: 80, y: 60, color: "#00FF88" },
  { id: "n5", label: "Sarah Chen", type: "person", x: 30, y: 70, color: "#FF00FF" },
  { id: "n6", label: "Hiking Gear", type: "task", x: 60, y: 80, color: "#00F5FF" },
  { id: "n7", label: "JRPASS", type: "concept", x: 55, y: 20, color: "#4D79FF" },
  { id: "n8", label: "Q2 Review", type: "task", x: 15, y: 50, color: "#FF00FF" },
];

const EDGES: MemEdge[] = [
  { from: "n1", to: "n3" },
  { from: "n1", to: "n4" },
  { from: "n1", to: "n7" },
  { from: "n1", to: "n6" },
  { from: "n2", to: "n1" },
  { from: "n2", to: "n4" },
  { from: "n5", to: "n1" },
  { from: "n5", to: "n8" },
  { from: "n6", to: "n3" },
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

const TYPE_ICONS: Record<string, string> = {
  concept: "◆",
  person: "●",
  task: "▲",
  preference: "★",
};

export default function MemoryGraph() {
  const { memoryGraphOpen, toggleMemoryGraph } = useOmniStore();

  if (!memoryGraphOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ background: "rgba(11,12,16,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && toggleMemoryGraph()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel w-full max-w-3xl h-[520px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-neon-purple" />
            <span className="font-mono text-sm text-white/80">Infinite Memory Graph</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple font-mono">
              {NODES.length} nodes · {EDGES.length} edges
            </span>
          </div>
          <button onClick={toggleMemoryGraph} className="p-1 rounded hover:bg-white/5 text-white/30">
            <X size={14} />
          </button>
        </div>

        {/* Graph SVG */}
        <div className="flex-1 relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,245,255,0.3)" />
              </marker>
              {NODES.map((n) => (
                <radialGradient key={`grd-${n.id}`} id={`grd-${n.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={n.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={n.color} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>

            {/* Edges */}
            {EDGES.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              if (!from || !to) return null;
              const x1 = `${from.x}%`, y1 = `${from.y}%`, x2 = `${to.x}%`, y2 = `${to.y}%`;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={from.color}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    markerEnd="url(#arrow)"
                  >
                    <animate attributeName="strokeDashoffset" from="200" to="0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                  </line>
                </g>
              );
            })}

            {/* Node glow halos */}
            {NODES.map((n) => (
              <ellipse
                key={`halo-${n.id}`}
                cx={`${n.x}%`} cy={`${n.y}%`}
                rx="5%" ry="5%"
                fill={`url(#grd-${n.id})`}
              />
            ))}

            {/* Nodes */}
            {NODES.map((n, i) => (
              <g key={n.id} style={{ cursor: "pointer" }}>
                <circle
                  cx={`${n.x}%`} cy={`${n.y}%`} r="18"
                  fill={`${n.color}18`}
                  stroke={n.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                <text
                  x={`${n.x}%`} y={`${n.y}%`}
                  textAnchor="middle" dominantBaseline="central"
                  fill={n.color} fontSize="10" fontFamily="JetBrains Mono, monospace"
                >
                  {TYPE_ICONS[n.type]}
                </text>
                <text
                  x={`${n.x}%`} y={`${n.y + 6}%`}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter, sans-serif"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-white/5 flex gap-6">
          {(["concept", "person", "task", "preference"] as const).map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: NODES.find(n => n.type === t)?.color }}>
                {TYPE_ICONS[t]}
              </span>
              <span className="text-[10px] text-white/30 capitalize font-mono">{t}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
