import Section from '@/components/Section';
import Image from 'next/image';
import { PORTFOLIO } from '@/data/portfolio';

export default function PortfolioPage() {
  const companies = PORTFOLIO.length >= 4
    ? PORTFOLIO
    : [
        ...PORTFOLIO,
        {
          name: 'Coming soon',
          summary: 'New partnership in progress.',
          logo:
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"><rect width="400" height="225" fill="%23000000"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23C9A635" font-family="Inter,Arial" font-size="18">Coming soon</text></svg>',
          impact: 'Confidential',
        },
      ];
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl t-strong mb-6">
            Portfolio
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-base md:text-lg">
            Our diverse portfolio spans multiple asset classes and sectors, 
            reflecting our commitment to thoughtful diversification and 
            long-term value creation.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {companies.map((c) => (
            <div key={c.name} className="card p-5 md:p-6 glowable group h-full will-change-transform" style={{ perspective: 1000 }}>
              <div className="relative aspect-video rounded-lg mb-3 md:mb-4 bg-black overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-[0.25deg]">
                <Image src={c.logo} alt={`${c.name} logo`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain p-4" />
              </div>
              <h3 className="font-serif text-base md:text-lg t-strong mb-1 md:mb-2">{c.name}</h3>
              <p className="t-muted text-sm">{c.summary}</p>
              {(c as any).impact && <p className="text-xs text-accent-a mt-2">{(c as any).impact}</p>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
