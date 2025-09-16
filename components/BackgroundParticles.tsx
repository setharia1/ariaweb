"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -(Math.random() * 0.25 + 0.05), // drift upward slowly
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          life: 0,
          maxLife: Math.random() * 200 + 100
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch draw operations for better performance
      ctx.save();
      ctx.fillStyle = "#C9A635"; // gold particles by default
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(201,166,53,0.8)";

      particlesRef.current.forEach((particle, index) => {
        // Update position with smoother movement
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Wrap around screen
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
        
        if (particle.x < 0) particle.x = canvasWidth;
        if (particle.x > canvasWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvasHeight;
        if (particle.y > canvasHeight) particle.y = 0;

        // Smoother fade in/out based on life
        const lifeRatio = particle.life / particle.maxLife;
        let currentOpacity = particle.opacity;
        
        if (lifeRatio < 0.2) {
          currentOpacity = particle.opacity * (lifeRatio / 0.2);
        } else if (lifeRatio > 0.8) {
          currentOpacity = particle.opacity * ((1 - lifeRatio) / 0.2);
        }

        // Alternate colors subtly for depth: gold, purple, navy
        const colorIndex = index % 4;
        if (colorIndex === 0) {
          ctx.fillStyle = "#C9A635";
          ctx.shadowColor = "rgba(201,166,53,0.8)";
        } else if (colorIndex === 1) {
          ctx.fillStyle = "#4B0082"; // royal purple
          ctx.shadowColor = "rgba(75,0,130,0.6)";
        } else if (colorIndex === 2) {
          ctx.fillStyle = "#013220"; // emerald
          ctx.shadowColor = "rgba(1,50,32,0.6)";
        } else {
          ctx.fillStyle = "#0A1A3C"; // navy
          ctx.shadowColor = "rgba(10,26,60,0.5)";
        }

        // Draw particle with optimized rendering
        ctx.globalAlpha = currentOpacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Reset particle if it's lived too long
        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * canvasWidth;
          particle.y = Math.random() * canvasHeight;
          particle.life = 0;
          particle.maxLife = Math.random() * 300 + 200; // Longer life for smoother effect
        }
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
