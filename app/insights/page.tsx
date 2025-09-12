import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import RequestDraft from '@/components/RequestDraft';

export default function InsightsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Insights
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            Ideas, research, and commentary.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs uppercase tracking-wide text-white/50 mr-2">Categories:</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Playbooks</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Case Studies</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Market Notes</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Resources</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛠️', title: 'Pricing As A Product', excerpt: 'A practical approach to packaging, ladders, and willingness‑to‑pay tests.' },
              { icon: '💰', title: 'Monetization Funnels', excerpt: 'Designing upgrade paths that compound ARPU without hurting activation.' },
              { icon: '📊', title: 'KPI Scorecards That Matter', excerpt: 'A lightweight set of metrics for operators: input, output, and guardrails.' },
              { icon: '🔍', title: 'Founder–Market Fit', excerpt: 'How we evaluate fit and decide where to be hands‑on vs. hands‑off.' },
              { icon: '🧭', title: 'Operator Diligence', excerpt: 'Red flags, fast signals, and a 90‑minute working session we run pre‑term sheet.' },
              { icon: '🗺️', title: 'Quarterly Market Notes', excerpt: 'What changed this quarter: distribution, infra, and consumer behavior shifts.' },
            ].map((p) => (
              <ScrollReveal key={p.title}>
                <div className="card p-6 glowable h-full flex flex-col">
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <h3 className="font-serif text-lg t-strong mb-2">{p.title}</h3>
                  <p className="t-muted text-sm flex-1">{p.excerpt}</p>
                  <RequestDraft postTitle={p.title} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="card p-6 glowable">
              <h3 className="font-serif text-xl t-strong mb-2">Templates & Tools</h3>
              <p className="t-muted text-sm mb-4">KPI tracker, board pack, pricing test matrix. Simple, operator‑friendly formats.</p>
              <a href="/contact" className="btn-primary">Get templates</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="card p-6 glowable">
              <h3 className="font-serif text-xl t-strong mb-2">Newsletter</h3>
              <p className="t-muted text-sm mb-4">Operator Notes—occasional emails on building, monetization, and stewardship.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="input flex-1"
                  disabled
                />
                <button className="btn-ghost" disabled>Coming soon</button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
