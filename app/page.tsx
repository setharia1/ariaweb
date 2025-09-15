import IntroGate from '@/components/IntroGate';
import Section from '@/components/Section';
import PillarCard from '@/components/PillarCard';
import KPICounters from '@/components/KPICounters';
import SectionSeparator from '@/components/SectionSeparator';
import ScrollReveal from '@/components/ScrollReveal';
import MobileSwipe from '@/components/MobileSwipe';

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <IntroGate />
      
      {/* Section Separator */}
      <SectionSeparator variant="bottom" />
      
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MobileSwipe index={0}>
            <PillarCard
              title="Operator‑Built Products"
              description="We design, build, and operate products in‑house; when traction hits, we spin them out."
              icon="🛠️"
            />
          </MobileSwipe>
          <MobileSwipe index={1}>
            <PillarCard
              title="Founder Partnerships"
              description="Pre‑seed and seed investments with builders we know, where we take an active, hands‑on role."
              icon="🤝"
            />
          </MobileSwipe>
          <MobileSwipe index={2}>
            <PillarCard
              title="Revenue & Monetization"
              description="We help products grow revenue through pricing, funnels, and performance distribution—and share upside."
              icon="💸"
            />
          </MobileSwipe>
          <MobileSwipe index={3}>
            <PillarCard
              title="Public Markets"
              description="Occasional concentrated long‑only positions where we have a durable edge and time horizon."
              icon="📈"
            />
          </MobileSwipe>
        </div>
      </Section>

      {/* Section Separator */}
      <SectionSeparator variant="both" />

      {/* KPI Counters */}
      <MobileSwipe>
        <KPICounters />
      </MobileSwipe>
    </main>
  );
}
