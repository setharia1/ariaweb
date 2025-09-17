'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-md border border-accent-a/30 px-2.5 py-2 text-white/80 hover:text-accent-a hover:shadow-[0_0_12px_rgba(201,166,53,0.25)] focus:outline-none focus:ring-2 focus:ring-accent-a ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}


