import React, { createContext, useContext, useState, useEffect } from "react";
import { getGlobalSettings } from "@/lib/api";

interface SettingsContextType {
  settings: any;
  loading: boolean;
  reloadSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const reloadSettings = async () => {
    try {
      const data = await getGlobalSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, reloadSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    return {
      settings: null,
      loading: true,
      reloadSettings: async () => {},
    };
  }
  return context;
}
