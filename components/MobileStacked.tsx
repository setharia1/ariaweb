'use client';

import { motion, useInView } from 'framer-motion';
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

export default function MobileStacked({ items, intervalMs = 4000, className = '', desktopClassName = '' }: MobileStackedProps) {
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

  // Peek carousel: one centered card, neighbors peek left/right, slide swap

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
      <div className="relative min-h-[240px] overflow-hidden">
        {items.map((node, i) => {
          const total = items.length;
          if (total === 0) return null;
          const deltaRaw = (i - activeIndex + total) % total; // 0..total-1
          const role = deltaRaw === 0 ? 'center' : deltaRaw === 1 ? 'next' : deltaRaw === total - 1 ? 'prev' : 'hidden';
          if (role === 'hidden') return null;

          const variants = {
            prev: { x: '-60%', scale: 0.92, opacity: 0.65, filter: 'blur(0px)' },
            center: { x: '0%', scale: 1, opacity: 1, filter: 'blur(0px)' },
            next: { x: '60%', scale: 0.92, opacity: 0.65, filter: 'blur(0px)' },
          } as const;

          return (
            <motion.div
              key={i}
              initial={variants[role as 'prev' | 'center' | 'next']}
              animate={variants[role as 'prev' | 'center' | 'next']}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 -translate-x-1/2 w-[92%]"
              style={{ zIndex: role === 'center' ? 30 : 20, pointerEvents: role === 'center' ? 'auto' as const : 'none' as const }}
            >
              {node}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


