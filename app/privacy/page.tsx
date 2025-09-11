import Section from '@/components/Section';

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Privacy Policy
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            How we collect, use, and protect your personal information 
            in accordance with applicable privacy laws.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Information We Collect
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="t-muted mb-4">
                We collect information you provide directly to us, such as 
                when you contact us through our website or engage with our services.
              </p>
              <p className="t-muted mb-4">
                We may also collect information automatically when you visit 
                our website, including your IP address, browser type, and 
                pages you visit.
              </p>
              <p className="t-muted">
                We use this information to provide and improve our services, 
                communicate with you, and comply with legal obligations.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
