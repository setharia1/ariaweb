import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import RequestDraft from '@/components/RequestDraft';
import Reveal from '@/components/Reveal';
import { INSIGHTS } from '@/data/insights';
import { Wrench, DollarSign, BarChart3, Search, Compass, Map } from 'lucide-react';

export default function InsightsPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl t-strong mb-6">
            Insights
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-base md:text-lg">
            Ideas, research, and commentary.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto">
          {/* Featured newest insight */}
          <Reveal>
            <div className="card p-6 md:p-8 glowable mb-8">
              <div className="text-xs uppercase tracking-wide text-white/60 mb-2">Featured</div>
              <h3 className="font-serif text-2xl t-strong mb-2">Pricing As A Product</h3>
              <div className="text-xs text-white/50 mb-4">Playbooks • 4 min read</div>
              <div className="flex gap-2">
                <a href="#posts" className="btn-primary">Read summary</a>
                <RequestDraft postTitle={'Pricing As A Product'} />
              </div>
            </div>
          </Reveal>
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs uppercase tracking-wide text-white/50 mr-2">Categories:</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Playbooks</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Case Studies</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Market Notes</span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-sm text-white/80">Resources</span>
            </div>
          </ScrollReveal>

          <div id="posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 scroll-mt-24 md:scroll-mt-28">
            {INSIGHTS.map((post) => (
              <ScrollReveal key={post.title}>
                <div className="card p-5 md:p-6 glowable h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 rounded-full border border-white/10 text-xs text-white/80">{post.category}</span>
                    <span className="text-xs text-white/60">{post.minutes} min read</span>
                  </div>
                  <div className="mb-3 text-white/80">
                    {post.category === 'Playbooks' && <Wrench className="w-5 h-5" />}
                    {post.category === 'Case Studies' && <Search className="w-5 h-5" />}
                    {post.category === 'Market Notes' && <Map className="w-5 h-5" />}
                    {post.category === 'Resources' && <BarChart3 className="w-5 h-5" />}
                  </div>
                  <h3 className="font-serif text-base md:text-lg t-strong mb-2">{post.title}</h3>
                  <p className="t-muted text-sm flex-1">{post.excerpt}</p>
                  <RequestDraft postTitle={post.title} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
