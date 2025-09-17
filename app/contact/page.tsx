import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  // Show success state if redirected with ?sent=1
  const success = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('sent') === '1' : false;
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl t-strong mb-6">
            Contact
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-base md:text-lg">
            We welcome the opportunity to discuss potential partnerships 
            and investment opportunities with like-minded organizations.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="card p-6 md:p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Get in Touch
            </h2>
            <ContactForm />
            <p className="t-muted text-sm mt-4">Message us to set up a call.</p>
          </div>

          <div className="space-y-6">
            <div className="card p-6 glowable">
              <h3 className="font-serif text-xl t-strong mb-4">Spaces Office — Lehi, Utah</h3>
              <p className="t-muted">
                Lehi, UT<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
