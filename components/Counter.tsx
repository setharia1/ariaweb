'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  className?: string;
}

export default function Counter({ value, duration = 1500, prefix = '', suffix = '', format, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // honor reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(value);
      return;
    }

    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [value, duration]);

  const display = format ? format(count) : count.toLocaleString();

  return <span className={className}>{`${prefix}${display}${suffix}`}</span>;
}


