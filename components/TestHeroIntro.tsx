"use client";

import { useEffect, useState } from "react";

export default function TestHeroIntro() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log("TestHeroIntro: useEffect running");
    setIsClient(true);
  }, []);

  console.log("TestHeroIntro: render, isClient:", isClient);

  if (!isClient) {
    return (
      <section
        aria-label="Hero"
        className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
      >
        <div className="relative z-10 text-center w-full">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-text-1 dark:text-text-1-dark">
            Server Side Render
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
      <div className="relative z-10 text-center w-full">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-text-1 dark:text-text-1-dark">
          Client Side Render - ARIA
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-text-2 dark:text-text-2-dark">
          This should show after hydration.
        </p>
      </div>
    </section>
  );
}
