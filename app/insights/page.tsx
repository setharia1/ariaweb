import Section from '@/components/Section';

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
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="font-serif text-2xl t-strong mb-3">Coming soon</h2>
            <p className="t-muted mb-6">
              We’re curating our first set of insights. Check back shortly or get in touch if you’d like an early preview.
            </p>
            <a href="/contact" className="btn-primary inline-flex">Contact us</a>
          </div>
        </div>
      </Section>
    </>
  );
}
