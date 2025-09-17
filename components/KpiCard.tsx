'use client';

import Reveal from './Reveal';
import Counter from './Counter';

export interface KpiItem {
  label: string;
  value: number;
  description?: string;
  prefix?: string;
  suffix?: string;
  formatter?: (n: number) => string;
}

interface KpiCardProps {
  item: KpiItem;
  index?: number;
}

export default function KpiCard({ item, index = 0 }: KpiCardProps) {
  return (
    <Reveal delay={index * 100}>
      <div className="card p-6 card-hover text-center">
        <div className="text-3xl md:text-4xl font-bold lux-number mb-2">
          <Counter
            value={item.value}
            prefix={item.prefix}
            suffix={item.suffix}
            format={item.formatter}
            duration={1800 + index * 150}
          />
        </div>
        <h3 className="font-serif text-lg font-semibold t-strong mb-2 lux-underline">{item.label}</h3>
        {item.description && <p className="text-sm t-muted">{item.description}</p>}
      </div>
    </Reveal>
  );
}


