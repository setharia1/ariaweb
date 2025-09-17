export interface PortfolioItem {
  name: string;
  summary: string;
  logo: string;
  impact?: string;
}

export const PORTFOLIO: PortfolioItem[] = [
  { name: 'GOOAT', summary: 'Consumer platform focused on experiences and local discovery.', logo: '/logos/gooat.png', impact: '100K+ curated experiences' },
  { name: 'Aria Monetization', summary: 'Tools and infrastructure for revenue optimization and growth.', logo: '/logos/aria-monetization.png', impact: '2x ARPU lift playbooks' },
];


