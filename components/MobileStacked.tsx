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
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobileEnabled());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !isInView || items.length <= 1) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
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
      <div
        className="relative min-h-[240px] overflow-hidden"
        onTouchStart={(e) => {
          if (!isMobile) return;
          const t = e.touches[0];
          touchStartX.current = t.clientX;
          touchStartY.current = t.clientY;
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }}
        onTouchEnd={(e) => {
          if (!isMobile) return;
          const startX = touchStartX.current;
          const startY = touchStartY.current;
          touchStartX.current = null;
          touchStartY.current = null;
          if (startX == null || startY == null) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - startX;
          const dy = t.clientY - startY;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
              setActiveIndex((prev) => (prev + 1) % items.length);
            } else {
              setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
            }
          }
          // restart autoplay
          if (isInView && items.length > 1) {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = window.setInterval(() => {
              setActiveIndex((prev) => (prev + 1) % items.length);
            }, intervalMs);
          }
        }}
      >
        {items.map((node, i) => {
          const total = items.length;
          if (total === 0) return null;
          const deltaRaw = (i - activeIndex + total) % total; // 0..total-1
          const role = deltaRaw === 0 ? 'center' : deltaRaw === 1 ? 'next' : deltaRaw === total - 1 ? 'prev' : 'hidden';
          if (role === 'hidden') return null;

          const variants = {
            prev: { x: '-100%', scale: 0.9, opacity: 0.35, filter: 'blur(1px)' },
            center: { x: '0%',   scale: 1.0, opacity: 1.0,  filter: 'blur(0px)' },
            next: { x: '100%',  scale: 0.9, opacity: 0.35, filter: 'blur(1px)' },
          } as const;

          return (
            <motion.div
              key={i}
              initial={variants[role as 'prev' | 'center' | 'next']}
              animate={variants[role as 'prev' | 'center' | 'next']}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-1/2 w-[86%] flex items-center"
              style={{ zIndex: role === 'center' ? 30 : 20, pointerEvents: role === 'center' ? 'auto' as const : 'none' as const }}
            >
              <div className="w-full -translate-x-1/2">
                {node}
              </div>
            </motion.div>
          );
        })}

        {/* Arrows to indicate more; also tap targets to move */}
        {items.length > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-white/10 text-white/80 backdrop-blur border border-white/15 active:scale-95"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-white/10 text-white/80 backdrop-blur border border-white/15 active:scale-95"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}


