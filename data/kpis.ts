export type { KpiItem } from '@/components/KpiCard';

import type { KpiItem } from '@/components/KpiCard';

// Helper to format USD in short notation
const formatUSDShort = (n: number) => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

export const KPI_ITEMS: KpiItem[] = [
  {
    label: 'Total AUM (as of 2025-08-05)',
    value: 100000,
    description: 'Target by 2027: $10.0M USD',
    formatter: formatUSDShort,
  },
  { label: 'Portfolio Companies', value: 2, description: 'Active investments' },
  { label: 'Years of Experience', value: 5, suffix: '+', description: 'Institutional investing' },
];

export const KPI_FOOTNOTE = 'Metrics are directional and updated periodically.';


