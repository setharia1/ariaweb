import Section from '@/components/Section';

export default function StewardshipPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-16">
          
          <h1 className="font-serif text-3xl md:text-5xl t-strong mb-6">
            Stewardship
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-base md:text-lg">
            We believe that responsible investment practices create 
            long-term value for all stakeholders and contribute to 
            a more sustainable future.
          </p>
        </div>
      </Section>

      <Section>
        <div className="-mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6 md:p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Environmental, Social & Governance
            </h2>
            <div className="space-y-4">
              <p className="t-muted">
                We apply a practical ESG lens that supports performance. We’re not
                an “ESG-only” fund; instead, we integrate material factors into
                underwriting and ownership so risks are managed and value can
                compound.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium t-strong mb-2">Environmental</h3>
                  <ul className="list-disc list-inside text-sm t-muted space-y-1">
                    <li>Prefer efficient cloud and infra; avoid needless spend/energy.</li>
                    <li>Encourage vendor sustainability where it lowers cost or risk.</li>
                    <li>Track product-level efficiencies (e.g., automation savings).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium t-strong mb-2">Social</h3>
                  <ul className="list-disc list-inside text-sm t-muted space-y-1">
                    <li>Data privacy and security as first‑order product requirements.</li>
                    <li>Fair employment practices and inclusive recruiting.</li>
                    <li>Customer safety and clear end‑user disclosures.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium t-strong mb-2">Governance</h3>
                  <ul className="list-disc list-inside text-sm t-muted space-y-1">
                    <li>Board/observer oversight with quarterly KPI reviews.</li>
                    <li>Simple policies: code of conduct, conflicts, disclosure.</li>
                    <li>Right‑sized reporting cadence for stage and scale.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 md:p-8 glowable">
            <h2 className="font-serif text-2xl t-strong mb-6">
              Impact Measurement
            </h2>
            <div className="space-y-4">
              <p className="t-muted">
                We keep measurement lightweight and decision‑useful. For each
                company we pick 3–5 metrics that tie directly to the investment
                thesis and stage, establish a baseline at investment, and update
                quarterly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium t-strong mb-2">Example metrics</h3>
                  <ul className="list-disc list-inside text-sm t-muted space-y-1">
                    <li>SMB revenue uplift or customer cost reduced by product.</li>
                    <li>Jobs created/retained; supplier diversity where relevant.</li>
                    <li>Energy saved or emissions avoided estimates (if applicable).</li>
                    <li>User safety/privacy incidents (target: zero).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium t-strong mb-2">Reporting</h3>
                  <ul className="list-disc list-inside text-sm t-muted space-y-1">
                    <li>Internal quarterly KPI pack; external annual summary.</li>
                    <li>Metrics evolve with scale—depth grows as data quality grows.</li>
                    <li>We prioritize signal over checkbox compliance.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
