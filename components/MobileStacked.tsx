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

export default function MobileStacked({ items, intervalMs = 1600, className = '', desktopClassName = '' }: MobileStackedProps) {
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

  const visibleItems: Array<{ key: number; node: ReactNode }> = useMemo(() => {
    if (!isMobile) return [] as Array<{ key: number; node: ReactNode }>;
    const ordered: Array<{ key: number; node: ReactNode } > = [];
    for (let i = 0; i < Math.min(items.length, 3); i++) {
      const idx = (activeIndex + i) % items.length;
      ordered.push({ key: idx, node: items[idx] });
    }
    return ordered;
  }, [isMobile, items, activeIndex]);

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
      <div className="relative min-h-[220px]">
        {visibleItems.map((entry, layer) => {
          const isActive = layer === 0;
          const zIndex = 30 - layer;
          const translateY = layer * 8;
          const scale = 1 - layer * 0.02;
          return (
            <motion.div
              key={entry.key}
              initial={{ opacity: isActive ? 1 : 0.9, x: isActive ? 0 : 0, y: translateY, scale }}
              animate={{ opacity: isActive ? 1 : 0.9, x: 0, y: translateY, scale }}
              exit={{ opacity: 0, x: -120, rotate: -2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
              style={{ zIndex }}
            >
              <div className="h-full">
                {entry.node}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


