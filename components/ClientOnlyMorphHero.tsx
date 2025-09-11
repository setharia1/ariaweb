"use client";

import { useEffect, useState } from "react";

export default function ClientOnlyMorphHero() {
  const [currentWord, setCurrentWord] = useState("ARIA");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const words = ["ARIA", "THOUGHTFUL", "INVESTMENT"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % words.length;
      setCurrentWord(words[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Show static content until client-side hydration
  if (!isClient) {
    return (
      <section
        aria-label="Hero"
        className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
      >
        <div className="relative z-10 text-center w-full">
          <h1 className="font-serif text-[88px] leading-[0.95] sm:text-[112px] md:text-[136px] tracking-tight text-white/90 transition-all duration-500">
            ARIA
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
    );
  }

  return (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
    >
      <div className="relative z-10 text-center w-full">
        <h1 className="font-serif text-[88px] leading-[0.95] sm:text-[112px] md:text-[136px] tracking-tight text-white/90 transition-all duration-500">
          {currentWord}
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
  );
}
