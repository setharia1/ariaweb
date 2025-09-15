"use client";

import { useEffect, useState } from "react";

export default function SimpleHeroIntro() {
  const [phase, setPhase] = useState(0);
  const [showFinalContent, setShowFinalContent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timers: number[] = [];
    
    // Morphing sequence: ARIA → THOUGHTFUL → INVESTMENT → final
    timers.push(window.setTimeout(() => setPhase(0), 0));
    timers.push(window.setTimeout(() => setPhase(1), 1800));
    timers.push(window.setTimeout(() => setPhase(2), 3600));
    timers.push(window.setTimeout(() => {
      setPhase(3);
      setShowFinalContent(true);
    }, 5400));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <section
        aria-label="Hero"
        className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
      >
        <div className="relative z-10 text-center w-full">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-text-1 dark:text-text-1-dark">
            Loading...
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
    >
      {/* Skip Intro Button */}
      {!showFinalContent && (
        <button
          onClick={() => {
            setPhase(3);
            setShowFinalContent(true);
          }}
          className="absolute bottom-6 left-6 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-b/50 transition-all duration-200 backdrop-blur-sm"
        >
          Skip intro
        </button>
      )}

      {/* Word Morphing Sequence */}
      {!showFinalContent && (
        <div className="relative z-10 text-center select-none w-full">
          {/* Use viewport-based sizing on mobile so long words fit */}
          <h1 className="font-serif text-[11vw] sm:text-[9vw] md:text-[120px] leading-[0.95] tracking-tight text-white/90 transition-all duration-500">
            <span
              className={`inline-block transition-all duration-500 ${
                phase === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              ARIA
            </span>
            <span className="mx-3 opacity-0">·</span>
            <span
              className={`inline-block transition-all duration-500 ${
                phase === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              } text-accent-b`}
            >
              THOUGHTFUL
            </span>
            <span className="mx-3 opacity-0">·</span>
            <span
              className={`inline-block transition-all duration-500 ${
                phase === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              } text-accent-a`}
            >
              INVESTMENT
            </span>
          </h1>
        </div>
      )}

      {/* Final Hero Content */}
      {showFinalContent && (
        <div className="relative z-10 text-center transition-opacity duration-500 w-full">
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
      )}
    </section>
  );
}
