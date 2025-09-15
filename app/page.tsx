import IntroGate from '@/components/IntroGate';
import Section from '@/components/Section';
import PillarCard from '@/components/PillarCard';
import KPICounters from '@/components/KPICounters';
import SectionSeparator from '@/components/SectionSeparator';
import ScrollReveal from '@/components/ScrollReveal';
import MobileSwipe from '@/components/MobileSwipe';
import VideoHero from '@/components/VideoHero';
import InvestmentApproachSection from '@/components/InvestmentApproachSection';

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* Hero: replace title/subtitle with an embedded video block */}
      <VideoHero src="/media/aria%20video.mp4" />
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
        
        <InvestmentApproachSection />
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
