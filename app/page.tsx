import IntroGate from '@/components/IntroGate';
import Section from '@/components/Section';
import PillarCard from '@/components/PillarCard';
import KPICounters from '@/components/KPICounters';
import SectionSeparator from '@/components/SectionSeparator';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <IntroGate />
      
      {/* Section Separator */}
      <SectionSeparator variant="bottom" />
      
      {/* Investment Pillars Teaser */}
      <Section>
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl t-strong mb-4">
            Our Investment Approach
          </h2>
          <p className="t-muted max-w-2xl mx-auto">
            We focus on four core pillars that drive long-term value creation across diverse market cycles.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal delay={0}>
            <PillarCard
              title="Real Assets"
              description="Infrastructure, real estate, and natural resources that provide stable, inflation-protected returns."
              icon="🏗️"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <PillarCard
              title="Private Equity"
              description="Growth capital and buyout investments in market-leading companies with strong fundamentals."
              icon="💼"
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <PillarCard
              title="Venture"
              description="Early-stage investments in innovative companies shaping the future of technology and society."
              icon="🚀"
            />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <PillarCard
              title="Long-Only"
              description="Public market strategies focused on high-conviction, long-term value creation."
              icon="📈"
            />
          </ScrollReveal>
        </div>
      </Section>

      {/* Section Separator */}
      <SectionSeparator variant="both" />

      {/* KPI Counters */}
      <KPICounters />
    </main>
  );
}
