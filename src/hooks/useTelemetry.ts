/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { useOmniStore } from "@/store/omniStore";

export function useTelemetry() {
  const { updateTelemetry } = useOmniStore();

  useEffect(() => {
    let batteryManager: any = null;

    const tick = () => {
      const network = {
        online: navigator.onLine,
        type: (navigator as any).connection?.effectiveType || undefined
      };
      
      let battery = null;
      if (batteryManager) {
        battery = {
          level: batteryManager.level,
          charging: batteryManager.charging
        };
      }

      updateTelemetry(battery, network, new Date());
    };

    // 1. Initial Tick
    tick();

    // 2. Setup Battery API if supported
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((bm: any) => {
        batteryManager = bm;
        tick(); // Retick with initial battery
        
        bm.addEventListener('levelchange', tick);
        bm.addEventListener('chargingchange', tick);
      }).catch((e: Error) => {
        console.log("Battery API not supported or secure context missing.", e);
      });
    }

    // 3. Setup Network Listeners
    window.addEventListener('online', tick);
    window.addEventListener('offline', tick);
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', tick);
    }

    // 4. Time Interval (update every 30s to keep clock fresh)
    const interval = setInterval(tick, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', tick);
      window.removeEventListener('offline', tick);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', tick);
      }
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', tick);
        batteryManager.removeEventListener('chargingchange', tick);
      }
    };
  }, [updateTelemetry]);
}
