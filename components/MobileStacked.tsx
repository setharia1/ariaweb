'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

interface MobileStackedProps {
  items: ReactNode[];
  intervalMs?: number;
  className?: string;
  desktopClassName?: string;
}

function getIsMobileEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return coarse && narrow && !reduce;
}

export default function MobileStacked({ items, intervalMs = 2600, className = '', desktopClassName = '' }: MobileStackedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4, once: false });
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileEnabled);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobileEnabled());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !isInView || items.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [isMobile, isInView, items.length, intervalMs]);

  // Option A: single active card, no background preview, autoplay fade-and-swipe

  if (!isMobile) {
    return (
      <div className={desktopClassName}>
        {items.map((node, i) => (
          <div key={i}>{node}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {items[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


