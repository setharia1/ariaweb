import Section from '@/components/Section';
import PillarCard from '@/components/PillarCard';

export default function InvestmentApproachPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Investment Approach
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            Our disciplined approach combines deep fundamental analysis with 
            long-term thinking to identify and capitalize on opportunities 
            across diverse asset classes and market cycles.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <PillarCard
            title="Real Assets"
            description="Infrastructure, real estate, and natural resources that provide stable, inflation-protected returns."
            icon="🏗️"
          />
          <PillarCard
            title="Private Equity"
            description="Growth capital and buyout investments in market-leading companies with strong fundamentals."
            icon="💼"
          />
          <PillarCard
            title="Venture"
            description="Early-stage investments in innovative companies shaping the future of technology and society."
            icon="🚀"
          />
          <PillarCard
            title="Long-Only"
            description="Public market strategies focused on high-conviction, long-term value creation."
            icon="📈"
          />
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Our Process
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold t-strong mb-2">1. Research & Analysis</h3>
                <p className="t-muted text-sm">
                  Deep fundamental analysis of market opportunities, 
                  competitive dynamics, and long-term value drivers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold t-strong mb-2">2. Due Diligence</h3>
                <p className="t-muted text-sm">
                  Comprehensive evaluation of management teams, 
                  financials, and operational capabilities.
                </p>
              </div>
              <div>
                <h3 className="font-semibold t-strong mb-2">3. Investment Decision</h3>
                <p className="t-muted text-sm">
                  Disciplined capital allocation based on risk-adjusted 
                  return potential and portfolio fit.
                </p>
              </div>
              <div>
                <h3 className="font-semibold t-strong mb-2">4. Active Management</h3>
                <p className="t-muted text-sm">
                  Ongoing partnership with portfolio companies to 
                  drive value creation and operational excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Investment Philosophy
            </h2>
            <div className="space-y-4">
              <p className="t-muted">
                We believe that the best investments are those that create 
                sustainable value over time, benefiting all stakeholders 
                including investors, employees, customers, and communities.
              </p>
              <p className="t-muted">
                Our approach emphasizes quality over quantity, focusing on 
                a select number of high-conviction investments where we can 
                add meaningful value through our expertise and network.
              </p>
              <p className="t-muted">
                We maintain a long-term perspective, recognizing that 
                true value creation requires patience, discipline, and 
                a commitment to fundamental principles.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
