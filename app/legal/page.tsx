import Section from '@/components/Section';

export default function LegalPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Legal
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            Important legal information and terms governing our services 
            and investment activities.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Terms of Service
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="t-muted mb-4">
                These terms govern your use of our website and services. 
                By accessing our site, you agree to be bound by these terms.
              </p>
              <p className="t-muted mb-4">
                Aria is a private investment firm and does not provide 
                investment advice to the general public. All information 
                on this website is for informational purposes only.
              </p>
              <p className="t-muted">
                Past performance is not indicative of future results. 
                All investments carry risk, and you should consult with 
                qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
