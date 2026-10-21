"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) {
    return <div className="w-11 h-11" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-11 h-11 rounded-lg flex items-center justify-center bg-muted hover:bg-card-hover border border-border transition-all duration-300 hover:scale-110 cursor-pointer"
      aria-label={label}
      title={label}
      id="theme-toggle"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-foreground" />
      ) : (
        <Moon className="w-4 h-4 text-foreground" />
      )}
    </button>
  );
}
