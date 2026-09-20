"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Tooltip from "./Tooltip";

const ThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const label = isDarkMode ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Tooltip label={label}>
      <button
        onClick={toggleTheme}
        aria-label={label}
        aria-pressed={isDarkMode}
        className={`w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      >
        {isDarkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
