export interface PortfolioItem {
  name: string;
  summary: string;
  logo: string;
  impact?: string;
  type?: 'Operator-Built' | 'Partner' | 'Public';
  sector?: string;
  status?: 'Active' | 'Exited' | 'Coming soon';
  year?: number;
  headline?: string;
  overview?: string;
  role?: string;
  metrics?: { label: string; value: string }[];
  url?: string;
}

export const PORTFOLIO: PortfolioItem[] = [
  { 
    name: 'GOOAT', 
    summary: 'Consumer platform focused on experiences and local discovery.', 
    logo: '/logos/gooat.png', 
    impact: '100K+ curated experiences',
    type: 'Partner',
    sector: 'Consumer',
    status: 'Active',
    year: 2024,
    headline: 'Local discovery for curated, high-quality experiences',
    overview: 'GOOAT connects users to curated local experiences through a streamlined marketplace. We support growth strategy and partner enablement across supply and demand.',
    role: 'Distribution and monetization support',
    metrics: [
      { label: 'Curated experiences', value: '100K+' },
      { label: 'Partner NPS', value: '62' },
    ],
    url: 'https://example.com'
  },
  { 
    name: 'Aria Monetization', 
    summary: 'Tools and infrastructure for revenue optimization and growth.', 
    logo: '/logos/aria-monetization.png', 
    impact: '2x ARPU lift playbooks',
    type: 'Operator-Built',
    sector: 'SaaS',
    status: 'Active',
    year: 2025,
    headline: 'Modern revenue ops for digital products',
    overview: 'In-house operator-built initiative focusing on pricing, funnel optimization, and performance distribution to unlock durable revenue gains.',
    role: 'Product, distribution, monetization',
    metrics: [
      { label: 'ARPU lift', value: '2x' },
      { label: 'Payback', value: '< 6 mo' },
    ],
    url: 'https://example.com'
  },
];


