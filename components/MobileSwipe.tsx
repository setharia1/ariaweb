'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface MobileSwipeProps {
  children: ReactNode;
  index?: number;
  distance?: number;
  className?: string;
}

function getIsMobileEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return coarse && narrow && !reduce;
}

export default function MobileSwipe({ children, index = 0, distance = 48, className = '' }: MobileSwipeProps) {
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileEnabled);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobileEnabled());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const dir = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, x: dir * distance } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


