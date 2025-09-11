"use client";

import dynamic from 'next/dynamic';

const LetterMorphHero = dynamic(() => import('./LetterMorphHero'), {
  ssr: false,
  loading: () => (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
    >
      <div className="relative z-10 text-center w-full">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-text-1 dark:text-text-1-dark">
          Building the Future Through{" "}
          <span className="text-accent-b">Thoughtful</span> Investment
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-text-2 dark:text-text-2-dark">
          Strategic investments across real assets, private equity, venture, and public
          markets.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/investment-approach"
            className="btn-primary"
          >
            Our Investment Approach
          </a>
          <a
            href="/contact"
            className="btn-ghost"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  ),
});

export default LetterMorphHero;
