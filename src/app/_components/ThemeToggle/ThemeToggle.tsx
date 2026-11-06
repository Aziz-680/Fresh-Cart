"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed bottom-6 right-6 z-[60] flex size-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/25 transition hover:scale-105 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
            aria-label={label}
            title={label}
        >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
    );
}
