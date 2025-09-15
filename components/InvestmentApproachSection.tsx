'use client';

import MobileStacked from '@/components/MobileStacked';
import MobileSwipe from '@/components/MobileSwipe';
import PillarCard from '@/components/PillarCard';
import { useEffect, useState } from 'react';

function getIsMobileEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return coarse && narrow && !reduce;
}

export default function InvestmentApproachSection() {
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobileEnabled);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobileEnabled());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const items = [
    <PillarCard
      key="p1"
      title="Operator‑Built Products"
      description="We design, build, and operate products in‑house; when traction hits, we spin them out."
      icon="🛠️"
    />,
    <PillarCard
      key="p2"
      title="Founder Partnerships"
      description="Pre‑seed and seed investments with builders we know, where we take an active, hands‑on role."
      icon="🤝"
    />,
    <PillarCard
      key="p3"
      title="Revenue & Monetization"
      description="We help products grow revenue through pricing, funnels, and performance distribution—and share upside."
      icon="💸"
    />,
    <PillarCard
      key="p4"
      title="Public Markets"
      description="Occasional concentrated long‑only positions where we have a durable edge and time horizon."
      icon="📈"
    />,
  ];

  if (isMobile) {
    return (
      <MobileStacked
        items={items}
        intervalMs={1600}
        className="px-1"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((node, i) => (
        <MobileSwipe key={i} index={i}>{node}</MobileSwipe>
      ))}
    </div>
  );
}


