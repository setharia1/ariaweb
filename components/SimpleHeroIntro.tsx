"use client";

export default function SimpleHeroIntro() {
  return (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[70vh] flex items-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orb purple w-48 h-48 top-10 left-4" />
        <div className="hero-orb gold w-56 h-56 bottom-6 right-10" />
        <div className="hero-orb purple w-40 h-40 bottom-16 left-12" />
      </div>
      <div className="relative z-10 text-center w-full">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-text-1 dark:text-text-1-dark">
          Building the Future Through <span className="text-royal">Thoughtful</span> Investment
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-text-2 dark:text-text-2-dark">
          Strategic investments across real assets, private equity, venture, and public markets.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="/investment-approach" className="btn-primary">Our Investment Approach</a>
          <a href="/contact" className="btn-ghost">Get in Touch</a>
        </div>
      </div>
    </section>
  );
}
