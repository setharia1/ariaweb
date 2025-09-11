import Section from '@/components/Section';

export default function PortfolioPage() {
  const companies = [
    {
      name: 'GOOAT',
      summary: 'Consumer platform focused on experiences and local discovery.',
      logo: '/logos/gooat.png',
    },
    {
      name: 'Aria Monetization',
      summary: 'Tools and infrastructure for revenue optimization and growth.',
      logo: '/logos/aria-monetization.png',
    },
  ];
  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Portfolio
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            Our diverse portfolio spans multiple asset classes and sectors, 
            reflecting our commitment to thoughtful diversification and 
            long-term value creation.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          {companies.map((c) => (
            <div key={c.name} className="card p-6 glowable group h-full">
              <div className="relative aspect-video rounded-lg mb-4 flex items-center justify-center bg-black overflow-hidden">
                <img
                  src={(c as any).logo}
                  alt={`${c.name} logo`}
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <h3 className="font-serif text-lg t-strong mb-2">
                {c.name}
              </h3>
              <p className="t-muted text-sm">
                {c.summary}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
