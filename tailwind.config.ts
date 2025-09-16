import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand bases (remapped to luxury palette)
        ink: '#000000', // Luxe black for dark surfaces
        navy: '#0A1A3C', // Midnight navy for headers/sections
        'stone-1': '#F7F9FC',
        'stone-2': '#DBE2EA',
        'text-1': {
          DEFAULT: '#0A0F14',
          dark: '#F5F2E9' // Warm ivory for high-contrast on dark
        },
        'text-2': {
          DEFAULT: '#475569',
          dark: '#B8B2A6' // Muted warm gray for dark
        },
        // Luxury accents
        'accent-a': '#C9A635', // Rich metallic gold
        'accent-b': '#7B1113', // Burgundy / oxblood
        'accent-c': '#4B0082', // Royal purple
        // Additional luxury tones
        forest: '#013220',
        burgundy: '#7B1113',
        gold: '#C9A635',
        royal: '#4B0082',
        charcoal: '#2E2E2E',
        'luxe-black': '#000000',
      },
      boxShadow: {
        'lg/5': '0 10px 15px -3px rgb(0 0 0 / 0.05)',
        'lg/10': '0 10px 15px -3px rgb(0 0 0 / 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['"Playfair Display"', 'Fraunces', 'Newsreader', 'ui-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
