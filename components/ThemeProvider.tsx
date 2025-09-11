'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  glowEnabled: boolean;
  toggleTheme: () => void;
  toggleGlow: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [glowEnabled, setGlowEnabled] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('aria-theme');
    const savedGlow = localStorage.getItem('aria-glow');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    if (savedGlow) {
      setGlowEnabled(savedGlow === 'true');
    }
  }, []);

  useEffect(() => {
    // Apply theme
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('aria-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Apply glow
    if (glowEnabled) {
      document.documentElement.classList.add('glow-on');
    } else {
      document.documentElement.classList.remove('glow-on');
    }
    localStorage.setItem('aria-glow', glowEnabled.toString());
  }, [glowEnabled]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleGlow = () => setGlowEnabled(!glowEnabled);

  return (
    <ThemeContext.Provider value={{ isDark, glowEnabled, toggleTheme, toggleGlow }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
