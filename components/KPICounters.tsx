'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

const kpiData = [
  {
    label: 'Total AUM (as of 2025-08-05)',
    value: 100000,
    description: 'Target by 2027: $10.0M USD',
    formatter: formatUSDShort,
  },
  {
    label: 'Portfolio Companies',
    value: 2,
    description: 'Active investments'
  },
  {
    label: 'Years of Experience',
    value: 5,
    suffix: '+',
    description: 'Institutional investing'
  }
];

export default function KPICounters() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-navy/20">
      <div className="mx-auto max-w-7xl px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl t-strong mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="t-muted max-w-2xl mx-auto">
            Measurable results across our investment strategies and portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-center group"
            >
              <div className="card p-6 card-hover">
                <div className="text-3xl md:text-4xl font-bold text-accent-a mb-2">
                  <KPICounter 
                    value={kpi.value}
                    prefix={(kpi as any).prefix}
                    suffix={(kpi as any).suffix}
                    format={(kpi as any).formatter}
                    duration={2000 + index * 200}
                  />
                </div>
                <h3 className="font-serif text-lg font-semibold t-strong mb-2">
                  {kpi.label}
                </h3>
                <p className="text-sm t-muted">
                  {kpi.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
