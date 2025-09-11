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
        ink: '#07131F',
        navy: '#0C1E2F',
        'stone-1': '#F7F9FC',
        'stone-2': '#DBE2EA',
        'text-1': {
          DEFAULT: '#0A0F14',
          dark: '#EAF2FF'
        },
        'text-2': {
          DEFAULT: '#475569',
          dark: '#A7B3C2'
        },
        'accent-a': '#33E1ED',
        'accent-b': '#6AC8FF',
        'accent-c': '#FF4D9A',
      },
      boxShadow: {
        'lg/5': '0 10px 15px -3px rgb(0 0 0 / 0.05)',
        'lg/10': '0 10px 15px -3px rgb(0 0 0 / 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Fraunces', 'Newsreader', 'ui-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
