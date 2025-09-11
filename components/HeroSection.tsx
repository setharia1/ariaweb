"use client";

import { useEffect, useState, useRef } from "react";
import AriaIntro from "./AriaIntro";

export default function HeroSection() {
  const [showIntro, setShowIntro] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false);
    // Quicker reveal for snappier UX
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  };

  // Handle scroll to fade intro and apply parallax
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!heroRef.current) return;
          
          const scrollY = window.scrollY;
          
          // Fade intro when user starts scrolling
          if (scrollY > 10 && !hasScrolled) {
            setHasScrolled(true);
            setShowIntro(false);
            setIsVisible(true);
          }
          
          const parallaxFactor = 0.3; // Reduced for smoother effect
          
          // Apply smooth parallax to hero content
          const heroContent = heroRef.current.querySelector('.hero-content');
          if (heroContent) {
            (heroContent as HTMLElement).style.transform = `translateY(${scrollY * parallaxFactor}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <>
      {/* Aria Intro Animation */}
      {showIntro && (
        <AriaIntro
          text="ARIA"
          mode="auto"
          fontFamily="serif"
          letterSpacing="0.08em"
          color="#EAF2F6"
          onComplete={handleIntroComplete}
          skipIntro={hasScrolled}
          forcePlay={false}
        />
      )}

      {/* Continuous Animation Container */}
      <div className="relative min-h-[100vh]">


        {/* Main Hero Section - Cinematic Transition */}
        <section
          ref={heroRef}
          aria-label="Hero"
          className={`relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative z-10 text-center w-full hero-content will-change-transform">
            
            {/* Title */}
            <div className={`mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl t-strong">
                ARIA
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`mb-8 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
              <p className="text-xl md:text-2xl t-muted max-w-3xl mx-auto">
                Building the Future Through Thoughtful Investment
              </p>
            </div>

            {/* Buttons */}
            <div className={`flex items-center justify-center gap-4 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}>
              <a href="/investment-approach" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10">Explore Our Approach</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-a to-accent-b opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a href="/about" className="btn-ghost group relative overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-accent-b/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-b/30 rounded-full animate-float"></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent-c/40 rounded-full animate-float" style={{ animationDelay: '1s', animationDirection: 'reverse' }}></div>
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent-a/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </>
  );
}