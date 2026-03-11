"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniStore } from "@/store/omniStore";
import { X, Zap, Calendar, BatteryLow, TrendingUp, Bell } from "lucide-react";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  meeting:  <Calendar size={15} />,
  battery:  <BatteryLow size={15} />,
  news:     <Bell size={15} />,
  calendar: <Calendar size={15} />,
  insight:  <TrendingUp size={15} />,
};

export default function AmbientStrip() {
  const { ambientAlerts, dismissAlert } = useOmniStore();
  if (ambientAlerts.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 px-1">
        <Zap size={11} style={{ color: "var(--cyan)" }} />
        <span className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "var(--t3)" }}>
          Ambient Intelligence
        </span>
      </div>

      <AnimatePresence>
        {ambientAlerts.map((alert) => (
          <motion.div key={alert.id}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="glass-card px-4 py-3 flex items-center gap-3 rounded-2xl"
            style={{ borderLeft: `2.5px solid ${alert.color}` }}>

            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `color-mix(in srgb, ${alert.color} 14%, var(--card-bg))`, color: alert.color }}>
              {TYPE_ICONS[alert.type] ?? <Bell size={15} />}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "var(--t1)" }}>{alert.title}</p>
              <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--t3)" }}>{alert.description}</p>
            </div>

            {/* Action */}
            {alert.action && (
              <button className="flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all hover:opacity-75"
                style={{ color: alert.color, border: `1px solid color-mix(in srgb, ${alert.color} 35%, transparent)`, background: `color-mix(in srgb, ${alert.color} 10%, transparent)` }}>
                {alert.action}
              </button>
            )}

            {/* Dismiss */}
            <button onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 p-1 rounded-lg transition-colors"
              style={{ color: "var(--t3)" }}>
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
