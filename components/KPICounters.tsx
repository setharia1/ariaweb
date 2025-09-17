'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import KpiCard from './KpiCard';
import { Banknote, Building2, Clock3 } from 'lucide-react';
import { KPI_ITEMS, KPI_FOOTNOTE } from '@/data/kpis';
import MobileStacked from '@/components/MobileStacked';

interface KPICounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  format?: (n: number) => string;
}

function KPICounter({ value, suffix = '', prefix = '', duration = 2000, format }: KPICounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {format ? format(count) : `${prefix ?? ''}${count.toLocaleString()}${suffix ?? ''}`}
    </span>
  );
}

// Helper to format USD in short notation (rounded)
const formatUSDShort = (n: number) => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

const kpiData = KPI_ITEMS;

export default function KPICounters() {
  const getIsMobileEnabled = () => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.matchMedia('(max-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return coarse && narrow && !reduce;
  };
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileEnabled);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobileEnabled());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const renderCard = (kpi: any, index: number, useMotion: boolean) => {
    if (!useMotion) return <div className="text-center group" key={kpi.label}><KpiCard item={kpi} index={index} /></div>;
    return (
      <motion.div
        key={kpi.label}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center group"
      >
        <KpiCard item={kpi} index={index} />
      </motion.div>
    );
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-transparent to-navy/20 glow-on" aria-labelledby="impact-heading">
      <div className="mx-auto max-w-7xl px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 id="impact-heading" className="font-serif text-3xl md:text-4xl t-strong mb-4">Our Impact by the Numbers</h2>
          <p className="t-muted max-w-2xl mx-auto">
            Measurable results across our investment strategies and portfolio.
          </p>
        </motion.div>

        {isMobile ? (
          <MobileStacked
            items={kpiData.map((kpi, index) => renderCard(kpi as any, index, false))}
            intervalMs={4000}
            className="mt-2 -mx-6"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {kpiData.map((kpi, index) => (
              <div key={(kpi as any).label} className="relative">
                {/* Thin line icons above each stat */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-accent-a/80">
                  {index === 0 && <Banknote className="w-5 h-5" aria-hidden />}
                  {index === 1 && <Building2 className="w-5 h-5" aria-hidden />}
                  {index === 2 && <Clock3 className="w-5 h-5" aria-hidden />}
                </div>
                {renderCard(kpi as any, index, true)}
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-white/50 text-center mt-6">{KPI_FOOTNOTE}</p>
      </div>
    </section>
  );
}
