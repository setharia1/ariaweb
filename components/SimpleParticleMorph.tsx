"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetX: number;
  targetY: number;
}

type Phase = 0 | 1 | 2 | 3; // 0=ARIA, 1=THOUGHTFUL, 2=INVESTMENT, 3=final

export default function SimpleParticleMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [phase, setPhase] = useState<Phase>(0);
  const [showFinalContent, setShowFinalContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4,
        targetX: width / 2,
        targetY: height / 2,
      });
    }
    particlesRef.current = particles;

    // Phase progression
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(0), 0));
    timers.push(window.setTimeout(() => setPhase(1), 3000));
    timers.push(window.setTimeout(() => setPhase(2), 6000));
    timers.push(window.setTimeout(() => {
      setPhase(3);
      setShowFinalContent(true);
    }, 9000));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((particle) => {
        // Simple target assignment based on phase
        if (phase === 0) {
          // ARIA - particles form "ARIA"
          const centerX = width / 2;
          const centerY = height / 2;
          particle.targetX = centerX + (Math.random() - 0.5) * 200;
          particle.targetY = centerY + (Math.random() - 0.5) * 100;
        } else if (phase === 1) {
          // THOUGHTFUL - particles form "THOUGHTFUL"
          const centerX = width / 2;
          const centerY = height / 2;
          particle.targetX = centerX + (Math.random() - 0.5) * 300;
          particle.targetY = centerY + (Math.random() - 0.5) * 100;
        } else if (phase === 2) {
          // INVESTMENT - particles form "INVESTMENT"
          const centerX = width / 2;
          const centerY = height / 2;
          particle.targetX = centerX + (Math.random() - 0.5) * 350;
          particle.targetY = centerY + (Math.random() - 0.5) * 100;
        } else {
          // Final - particles move to center and fade
          particle.targetX = width / 2;
          particle.targetY = height / 2;
          particle.opacity *= 0.98;
        }

        // Move towards target
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        particle.vx += dx * 0.01;
        particle.vy += dy * 0.01;
        
        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(51, 225, 237, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      timers.forEach(clearTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, phase]);

  if (!mounted) {
    return (
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
    );
  }

  return (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

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
