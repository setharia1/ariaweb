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
  isActive: boolean;
}

type Phase = 0 | 1 | 2 | 3; // 0=ARIA, 1=THOUGHTFUL, 2=INVESTMENT, 3=final

const PARTICLE_CONFIG = {
  count: 200,
  size: 2,
  speed: 0.5,
  attraction: 0.02,
  repulsion: 0.01,
  maxDistance: 100,
};

export default function ParticleMorphHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [phase, setPhase] = useState<Phase>(0);
  const [showFinalContent, setShowFinalContent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
      particles.push({
        x: centerX + (Math.random() - 0.5) * 400,
        y: centerY + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: PARTICLE_CONFIG.size + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4,
        targetX: centerX,
        targetY: centerY,
        isActive: true,
      });
    }

    particlesRef.current = particles;
  };

  // Get target points for text
  const getTargetPoints = (text: string, width: number, height: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    canvas.width = width;
    canvas.height = height;

    ctx.font = `${Math.min(width * 0.15, 120)}px serif`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const points: { x: number; y: number }[] = [];
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Sample points from the text
    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        const index = (y * width + x) * 4;
        if (data[index + 3] > 128) { // If pixel is not transparent
          points.push({ x, y });
        }
      }
    }

    return points;
  };

  // Update particle targets based on current phase
  const updateParticleTargets = (width: number, height: number) => {
    const particles = particlesRef.current;
    if (!particles.length) return;

    let targetPoints: { x: number; y: number }[] = [];

    switch (phase) {
      case 0:
        targetPoints = getTargetPoints("ARIA", width, height);
        break;
      case 1:
        targetPoints = getTargetPoints("THOUGHTFUL", width, height);
        break;
      case 2:
        targetPoints = getTargetPoints("INVESTMENT", width, height);
        break;
      case 3:
        // Final state - particles move to center and fade out
        targetPoints = particles.map(() => ({
          x: width / 2,
          y: height / 2,
        }));
        break;
    }

    // Assign targets to particles
    particles.forEach((particle, index) => {
      if (targetPoints[index]) {
        particle.targetX = targetPoints[index].x;
        particle.targetY = targetPoints[index].y;
      }
    });
  };

  // Animate particles
  const animateParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const particles = particlesRef.current;
    if (!particles.length) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update particles
    particles.forEach((particle) => {
      if (!particle.isActive) return;

      // Calculate distance to target
      const dx = particle.targetX - particle.x;
      const dy = particle.targetY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply attraction to target
      if (distance > 5) {
        particle.vx += (dx / distance) * PARTICLE_CONFIG.attraction;
        particle.vy += (dy / distance) * PARTICLE_CONFIG.attraction;
      }

      // Apply repulsion from other particles
      particles.forEach((other) => {
        if (other === particle || !other.isActive) return;
        
        const odx = particle.x - other.x;
        const ody = particle.y - other.y;
        const odistance = Math.sqrt(odx * odx + ody * ody);
        
        if (odistance < PARTICLE_CONFIG.maxDistance && odistance > 0) {
          particle.vx += (odx / odistance) * PARTICLE_CONFIG.repulsion;
          particle.vy += (ody / odistance) * PARTICLE_CONFIG.repulsion;
        }
      });

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

    // Draw connections between nearby particles
    particles.forEach((particle, i) => {
      if (!particle.isActive) return;
      
      particles.slice(i + 1).forEach((other) => {
        if (!other.isActive) return;
        
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(51, 225, 237, ${0.1 * (1 - distance / 50)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
  };

  // Animation loop
  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      initParticles(rect.width, rect.height);
      updateParticleTargets(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      animateParticles(ctx, rect.width, rect.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  // Phase progression
  useEffect(() => {
    if (!isClient) return;

    const timers: number[] = [];
    
    // Morphing sequence: ARIA → THOUGHTFUL → INVESTMENT → final
    timers.push(window.setTimeout(() => setPhase(0), 0));
    timers.push(window.setTimeout(() => setPhase(1), 3000));
    timers.push(window.setTimeout(() => setPhase(2), 6000));
    timers.push(window.setTimeout(() => {
      setPhase(3);
      setShowFinalContent(true);
    }, 9000));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isClient]);

  // Update particle targets when phase changes
  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    updateParticleTargets(rect.width, rect.height);
  }, [phase, isClient]);

  if (!isClient) {
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
