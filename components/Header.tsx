'use client';

import clsx from 'clsx';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/investment-approach', label: 'Investment Approach' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/stewardship', label: 'Stewardship' },
    { href: '/insights', label: 'Insights' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={clsx(
      "sticky top-0 z-50 text-white transition-all duration-300",
      isScrolled 
        ? "backdrop-blur-md bg-navy/90 border-b border-accent-a/20" 
        : "backdrop-blur supports-[backdrop-filter]:bg-navy/60 bg-navy/80"
    )}>
      {/* Scroll progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-a to-accent-b transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      
      <nav className="mx-auto max-w-7xl px-6 xl:px-8 h-16 flex items-center">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-semibold hover:text-accent-a transition-colors">
          Aria
        </Link>

        {/* Centered Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 text-sm">
          {navItems.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <Link
                href={item.href}
                className="relative hover:text-accent-a transition-all duration-200 group px-3"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-accent-a transition-all duration-200 group-hover:w-full" />
              </Link>
              {/* Vertical divider - don't show after the last item */}
              {index < navItems.length - 1 && (
                <span className="text-white/30 mx-2">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-md border-t border-accent-a/20">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white/80 hover:text-accent-a transition-colors py-2 border-b border-white/10 last:border-b-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
