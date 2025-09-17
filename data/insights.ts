export interface InsightItem {
  title: string;
  category: 'Playbooks' | 'Case Studies' | 'Market Notes' | 'Resources';
  minutes: number;
  excerpt: string;
}

export const INSIGHTS: InsightItem[] = [
  { title: 'Pricing As A Product', category: 'Playbooks', minutes: 4, excerpt: 'A practical approach to packaging, ladders, and willingness‑to‑pay tests.' },
  { title: 'Monetization Funnels', category: 'Playbooks', minutes: 5, excerpt: 'Designing upgrade paths that compound ARPU without hurting activation.' },
  { title: 'KPI Scorecards That Matter', category: 'Resources', minutes: 3, excerpt: 'A lightweight set of metrics for operators: input, output, and guardrails.' },
  { title: 'Founder–Market Fit', category: 'Case Studies', minutes: 6, excerpt: 'How we evaluate fit and decide where to be hands‑on vs. hands‑off.' },
  { title: 'Operator Diligence', category: 'Playbooks', minutes: 5, excerpt: 'Red flags, fast signals, and a 90‑minute working session we run pre‑term sheet.' },
  { title: 'Quarterly Market Notes', category: 'Market Notes', minutes: 7, excerpt: 'What changed this quarter: distribution, infra, and consumer behavior shifts.' },
];


