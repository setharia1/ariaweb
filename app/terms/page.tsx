export const metadata = {
  title: 'Terms & Conditions | Aria',
  description: 'Terms and conditions for using the Aria website',
};

export default function TermsPage() {
  return (
    <main className="relative z-10">
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 xl:px-8">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">Terms & Conditions</h1>
          <p className="t-muted mb-8">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-6 text-white/85 leading-relaxed">
            <p>
              The information provided on this site is for informational purposes only and does not
              constitute an offer to sell or a solicitation of an offer to buy any securities. Any
              such offering will be made only to qualified investors by means of definitive offering documents.
            </p>
            <p>
              While we strive for accuracy, content is provided “as is” without warranties of any kind.
              We are not responsible for any errors or omissions, or for results obtained from the use of this information.
            </p>
            <h2 className="font-serif text-2xl t-strong mt-8">Use of Site</h2>
            <p>
              You agree not to misuse this site, attempt to gain unauthorized access, or engage in any activity
              that disrupts or interferes with its operation.
            </p>
            <h2 className="font-serif text-2xl t-strong mt-8">Intellectual Property</h2>
            <p>
              All trademarks, logos, and content are the property of their respective owners and may not be used
              without prior written consent.
            </p>
            <h2 className="font-serif text-2xl t-strong mt-8">Contact</h2>
            <p>
              Questions about these Terms can be directed to <a className="text-accent-a hover:underline" href="mailto:invest@aria.capital">invest@aria.capital</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


