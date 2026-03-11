"use client";
import { useEffect } from "react";
import { useOmniStore } from "@/store/omniStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useOmniStore((s) => s.isDark);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Set initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <>{children}</>;
}
