import Section from '@/components/Section';
import WaveDivider from '@/components/WaveDivider';
import KPICounters from '@/components/KPICounters';
// import SectionSeparator from '@/components/SectionSeparator';
import MobileSwipe from '@/components/MobileSwipe';
import SimpleHeroIntro from '@/components/SimpleHeroIntro';
import SplashIntro from '@/components/SplashIntro';
import InvestmentApproachSection from '@/components/InvestmentApproachSection';
import JsonLd from '@/components/JsonLd';
import { PORTFOLIO } from '@/data/portfolio';

export default function HomePage() {
  return (
    <main className="relative z-10">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Aria',
        url: 'https://aria.capital',
        sameAs: [
          'https://www.linkedin.com/company/aria-capital'
        ]
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Portfolio',
        itemListElement: PORTFOLIO.map((p, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: p.url || 'https://aria.capital/portfolio',
          name: p.name,
          description: p.summary
        }))
      }} />
      {/* Fullscreen splash video once per session */}
      <SplashIntro
        src="/media/20250916_1644_ARIA Logo Animation_simple_compose_01k5ab6vf5eez9vjjd0qtnqqac.mp4"
        mobileSrc="/media/iphone.mp4"
      />
      {/* Hero: unified ARIA intro (mobile style) across all screen sizes */}
      <SimpleHeroIntro />
      {/* Wave Divider into Approach */}
      <WaveDivider className="mt-2" />
      
      {/* Investment Pillars Teaser */}
      <Section>
        <MobileSwipe>
          <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl t-strong mb-4">
            Our Investment Approach
          </h2>
          <p className="t-muted max-w-2xl mx-auto">
            We focus on four core pillars that drive long-term value creation across diverse market cycles.
          </p>
          </div>
        </MobileSwipe>
        
        <InvestmentApproachSection />
      </Section>

      {/* Section Separator */}
      {/* Removed decorative separator in favor of functional footer */}

      {/* KPI Counters */}
      <MobileSwipe>
        <KPICounters />
      </MobileSwipe>

    </main>
  );
}
