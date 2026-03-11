import { create } from "zustand";

export type WorkspaceMode = "CHAT" | "CODE" | "IMAGE" | "MUSIC" | "DOCUMENT";
export type AgentStatus = "IDLE" | "ACTIVE" | "SPAWNING" | "DONE";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  task: string;
  progress: number;
  color: string;
  icon: "plane" | "trending-up" | "shopping-cart" | "search";
}

export interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

export interface AmbientAlert {
  id: string;
  type: "meeting" | "battery" | "news" | "calendar" | "insight";
  title: string;
  description: string;
  action?: string;
  color: string;
}

interface OmniStore {
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;

  messages: Message[];
  sendMessage: (text: string) => Promise<void>;

  isThinking: boolean;
  setThinking: (v: boolean) => void;

  inputText: string;
  setInputText: (text: string) => void;

  activeCodeContent: string;
  setActiveCodeContent: (code: string) => void;

  activeDocumentContent: string;
  setActiveDocumentContent: (doc: string) => void;

  ambientAlerts: AmbientAlert[];
  dismissAlert: (id: string) => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  memoryGraphOpen: boolean;
  toggleMemoryGraph: () => void;

  isDark: boolean;
  toggleTheme: () => void;

  updateTelemetry: (
    battery: { level: number; charging: boolean } | null,
    network: { online: boolean; type?: string },
    time: Date
  ) => void;
}


const ALERT_PRESETS: AmbientAlert[] = [];

export const useOmniStore = create<OmniStore>((set, get) => ({
  workspaceMode: "CHAT",
  setWorkspaceMode: (mode) => set({ workspaceMode: mode }),

  messages: [],
  sendMessage: async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    set((state) => ({ 
      messages: [...state.messages, userMsg],
      isThinking: true
    }));

    try {
      const state = get();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: state.messages,
          context: {
            mode: state.workspaceMode,
            code: state.activeCodeContent,
            document: state.activeDocumentContent
          }
        })
      });

      if (!res.ok) throw new Error("Network error");
      
      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: data.text
      };

      set((state) => ({ 
        messages: [...state.messages, aiMsg],
        isThinking: false
      }));

    } catch (error) {
      console.error("Failed to send message:", error);
      set({ isThinking: false });
    }
  },

  isThinking: false,
  setThinking: (v) => set({ isThinking: v }),

  inputText: "",
  setInputText: (text) => set({ inputText: text }),

  activeCodeContent: "function analyzeSwarm(agents) {\n  return agents.filter(a => a.status === 'ACTIVE');\n}",
  setActiveCodeContent: (code) => set({ activeCodeContent: code }),

  activeDocumentContent: "Q2 Strategy Review:\n- AI integration complete.\n- 12% increase in efficiency.\n- Need to finalize deployment pipeline.",
  setActiveDocumentContent: (doc) => set({ activeDocumentContent: doc }),

  ambientAlerts: ALERT_PRESETS,
  dismissAlert: (id) =>
    set((state) => ({ ambientAlerts: state.ambientAlerts.filter((a) => a.id !== id) })),

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  memoryGraphOpen: false,
  toggleMemoryGraph: () => set((state) => ({ memoryGraphOpen: !state.memoryGraphOpen })),
  isDark: true,
  toggleTheme: () => {
    set((state) => {
      const next = !state.isDark;
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      }
      return { isDark: next };
    });
  },

  updateTelemetry: (battery, network, time) => {
    const alerts: AmbientAlert[] = [];
    
    alerts.push({
      id: "time",
      type: "calendar",
      title: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
      action: "View Calendar",
      color: "#4D79FF"
    });

    if (battery) {
      const pct = Math.round(battery.level * 100);
      const isLow = pct <= 20 && !battery.charging;
      alerts.push({
        id: "battery",
        type: "battery",
        title: battery.charging ? `Charging (${pct}%)` : (isLow ? `Low Battery (${pct}%)` : `Battery ${pct}%`),
        description: battery.charging ? "Connected to power" : (isLow ? "Plug in device soon" : "Running on battery power"),
        action: "Power Settings",
        color: isLow ? "#FF0055" : (battery.charging ? "#00FF66" : "#FF00FF")
      });
    }

    alerts.push({
      id: "network",
      type: "insight",
      title: network.online ? "System Online" : "System Offline",
      description: network.online ? `Connected (${network.type || 'browser'})` : "No internet connection detected",
      action: "Network Diag",
      color: network.online ? "#00F5FF" : "#FF4444"
    });

    set({ ambientAlerts: alerts });
  },
}));
