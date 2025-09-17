import Section from '@/components/Section';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl t-strong mb-6">
            Our Heritage
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-base md:text-lg">
            Aria is an owner–operator investing platform led by Marcus Liassides (Founder & Investment Partner)
            and Seth Liassides (Co‑Founder & Investment Partner). We blend a builder’s mindset with disciplined
            investing—prioritizing durable cash flows, clear unit economics, and responsible growth.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          <div>
            <h2 className="font-serif text-3xl t-strong mb-6">
              Built by operators, guided by stewardship
            </h2>
            <p className="t-muted mb-6">
              We focus on thoughtful deployment of capital—where our product and operating experience
              can help teams compound value responsibly. Capital should improve products, protect
              customers, and strengthen the companies that use it—not just chase short‑term outcomes.
            </p>
            <p className="t-muted">
              Our portfolio today spans consumer experiences and monetization tooling. We aim to
              expand deliberately, maintaining a high bar for clarity of thesis, alignment with
              founders, and measurable progress.
            </p>
          </div>
          <div className="card p-6 md:p-8 glowable">
            <h3 className="font-serif text-xl t-strong mb-4">Our values</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><span className="text-accent-a mt-1">•</span><span className="t-muted">Performance with principles—cash flow, unit economics, and safeguards.</span></li>
              <li className="flex items-start gap-3"><span className="text-accent-a mt-1">•</span><span className="t-muted">Builder’s bias—ship, learn, and improve what matters for customers.</span></li>
              <li className="flex items-start gap-3"><span className="text-accent-a mt-1">•</span><span className="t-muted">Partnership—clear alignment, simple reporting, and steady support.</span></li>
              <li className="flex items-start gap-3"><span className="text-accent-a mt-1">•</span><span className="t-muted">Transparency—no drama, no games; data‑driven decisions.</span></li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium t-strong mb-2">What we look for</h4>
                <ul className="list-disc list-inside text-sm t-muted space-y-1">
                  <li>Products solving real pain with clear payback.</li>
                  <li>Resilient gross margins and path to durable cash flow.</li>
                  <li>Founders who value focus, integrity, and speed.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium t-strong mb-2">How we work</h4>
                <ul className="list-disc list-inside text-sm t-muted space-y-1">
                  <li>Hands‑on where it helps (pricing, go‑to‑market, ops).</li>
                  <li>Quarterly KPI reviews; lightweight, useful reporting.</li>
                  <li>Right‑sized governance; founder‑friendly terms.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl t-strong mb-8 text-center">Who we are</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 glowable text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <Image
                  src="/team/IMG_2093.jpg"
                  alt="Marcus Liassides headshot"
                  width={96}
                  height={96}
                  sizes="96px"
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h3 className="font-serif text-xl t-strong">Marcus Liassides</h3>
              <p className="text-accent-a text-sm mb-3">Founder & Investment Partner</p>
              <p className="t-muted text-sm">Operator‑led investor focused on durable cash flows, clear unit economics, and responsible growth.</p>
            </div>
            <div className="card p-6 glowable text-center">
              <div className="w-24 h-24 rounded-full object-cover mx-auto mb-4 bg-gradient-to-br from-accent-a/20 to-accent-b/20 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="font-serif text-xl t-strong">Seth Liassides</h3>
              <p className="text-accent-a text-sm mb-3">Co‑Founder & Investment Partner</p>
              <p className="t-muted text-sm">Builder and investor partnering with founders to ship faster, measure what matters, and compound value.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
