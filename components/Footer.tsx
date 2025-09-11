'use client';

import { Zap, ZapOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer({ className }: { className?: string }) {
  const [pulsePosition, setPulsePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePosition(prev => (prev + 1) % 100);
    }, 150); // 15s total duration (150ms * 100 = 15s)

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`relative bg-navy text-white py-8 overflow-hidden ${className}`}>
      {/* Neural pulse animation */}
      <div 
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-accent-a to-transparent transition-all duration-150"
        style={{ 
          width: '100%',
          transform: `translateX(${pulsePosition - 100}%)`,
          opacity: pulsePosition > 5 && pulsePosition < 95 ? 1 : 0
        }}
      />
      <div className="max-w-7xl mx-auto px-6 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-lg font-semibold mb-4">Aria</h3>
            <p className="text-white/60 text-sm max-w-md">
              Building the future through thoughtful investment across real assets, 
              private equity, venture, and public markets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-white/60 hover:text-accent-a transition-colors">About</a></li>
              <li><a href="/investment-approach" className="text-white/60 hover:text-accent-a transition-colors">Investment Approach</a></li>
              <li><a href="/portfolio" className="text-white/60 hover:text-accent-a transition-colors">Portfolio</a></li>
              <li><a href="/team" className="text-white/60 hover:text-accent-a transition-colors">Team</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/legal" className="text-white/60 hover:text-accent-a transition-colors">Legal</a></li>
              <li><a href="/privacy" className="text-white/60 hover:text-accent-a transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Aria. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Zap className="w-4 h-4 text-accent-a animate-pulse" />
            <span className="text-sm text-white/60">Powered by thoughtful investment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
