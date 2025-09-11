"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type Phase = 0 | 1 | 2 | 3; // 0=ARIA, 1=THOUGHTFUL, 2=INVESTMENT, 3=final

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetX: number;
  targetY: number;
  isActive: boolean;
}

export default function HeroIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [phase, setPhase] = useState<Phase>(0);
  const [showFinalContent, setShowFinalContent] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const reduce = useMemo(
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    []
  );

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if intro has been seen this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("aria:introSeen");
      // For now, always show the intro animation
      // if (seen) {
      //   setHasSeenIntro(true);
      //   setPhase(3);
      //   setShowFinalContent(true);
      // }
    }
  }, []);

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const particleCount = Math.min(120, Math.floor((width * height) / 12000));

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 150 + Math.random() * 80;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 1 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.3,
        targetX: x,
        targetY: y,
        isActive: true,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Animate particles
  const animateParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const particles = particlesRef.current;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle) => {
      if (!particle.isActive) return;

      // Update position based on phase
      if (phase < 3) {
        // Morphing phase - particles converge to center
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 40) {
          particle.vx += dx * 0.0008;
          particle.vy += dy * 0.0008;
        }
        
        // Brighten during morph
        particle.opacity = Math.min(0.7, particle.opacity + 0.008);
      } else {
        // Final phase - particles drift gently
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;
        particle.opacity = Math.max(0.15, particle.opacity - 0.003);
      }

      // Apply velocity with damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Keep particles in bounds
      if (particle.x < 0 || particle.x > width) particle.vx *= -0.5;
      if (particle.y < 0 || particle.y > height) particle.vy *= -0.5;

      // Draw particle
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = phase < 3 ? "#33E1ED" : "#6AC8FF";
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw connections between nearby particles during morph
    if (phase < 3) {
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#33E1ED";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }
  }, [phase]);

  // Setup canvas
  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
      }

      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [initParticles, isClient]);

  // Animation loop
  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      animateParticles(ctx, rect.width, rect.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateParticles, isClient]);

  // Phase progression
  useEffect(() => {
    if (!isClient) return;
    if (reduce || hasSeenIntro) {
      setPhase(3);
      setShowFinalContent(true);
      return;
    }

    const timers: number[] = [];
    
    // Snappier morphing sequence: ARIA → THOUGHTFUL → INVESTMENT → final
    timers.push(window.setTimeout(() => setPhase(0), 0));
    timers.push(window.setTimeout(() => setPhase(1), 1800));
    timers.push(window.setTimeout(() => setPhase(2), 3600));
    timers.push(window.setTimeout(() => {
      setPhase(3);
      setShowFinalContent(true);
      localStorage.setItem("aria:introSeen", "true");
    }, 5400));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [reduce, hasSeenIntro, isClient]);

  // Pause animation when tab is hidden
  useEffect(() => {
    if (!isClient) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        // Restart animation
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const animate = () => {
              const rect = canvas.getBoundingClientRect();
              animateParticles(ctx, rect.width, rect.height);
              animationRef.current = requestAnimationFrame(animate);
            };
            animate();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [animateParticles, isClient]);

  const handleSkip = () => {
    setPhase(3);
    setShowFinalContent(true);
    localStorage.setItem("aria:introSeen", "true");
  };

  // Show loading state until client-side
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
      style={{ willChange: 'transform' }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, willChange: 'transform' }}
      />

      {/* Skip Intro Button */}
      {!showFinalContent && !hasSeenIntro && (
        <button
          onClick={handleSkip}
          className="absolute bottom-6 left-6 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-b/50 transition-all duration-200 backdrop-blur-sm"
        >
          Skip intro
        </button>
      )}

      {/* Word Morphing Sequence */}
      {!showFinalContent && (
        <div className="relative z-10 text-center select-none w-full">
          <h1 className="font-serif text-[88px] leading-[0.95] sm:text-[112px] md:text-[136px] tracking-tight text-white/90 transition-all duration-500">
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