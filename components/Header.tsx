'use client';

import clsx from 'clsx';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 40);
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
      
      <nav className={clsx("mx-auto max-w-7xl px-6 xl:px-8 flex items-center gap-3 transition-all duration-300", isScrolled ? 'h-14' : 'h-16')}>
        {/* Logo */}
        <Link
          href="/"
          className={clsx("font-serif font-semibold tracking-[0.06em] bg-gradient-to-r from-gold via-royal to-gold bg-clip-text text-transparent hover:opacity-90 transition-all", isScrolled ? 'text-xl' : 'text-2xl')}
        >
          ARIA
        </Link>

        {/* Centered Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 text-sm">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'relative group rounded-md px-4 py-2 uppercase tracking-[0.08em] transition-all duration-200',
                    isActive
                      ? 'text-accent-a ring-1 ring-accent-a/25 bg-accent-a/[0.06] shadow-[0_0_12px_rgba(201,166,53,0.15)]'
                      : 'text-white/80 hover:text-accent-a'
                  )}
                >
                  {item.label}
                  <span
                    className={clsx(
                      'pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-accent-a transition-all duration-200',
                      isActive ? 'w-full' : 'w-0 group-hover:w-8'
                    )}
                  />
                </Link>
                {index < navItems.length - 1 && (
                  <span className="text-white/20 mx-1">|</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right side spacer */}
        <div className="hidden md:flex items-center gap-2" />

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
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'block rounded-md px-3 py-2 uppercase tracking-[0.07em] transition-colors',
                    isActive
                      ? 'text-accent-a ring-1 ring-accent-a/25 bg-accent-a/[0.06]'
                      : 'text-white/85 hover:text-accent-a'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
