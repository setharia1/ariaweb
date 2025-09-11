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
  originalX: number;
  originalY: number;
}

type Phase = 0 | 1 | 2 | 3; // 0=ARIA, 1=THOUGHTFUL, 2=INVESTMENT, 3=final

// Predefined letter shapes as coordinate arrays
const LETTER_SHAPES = {
  ARIA: [
    // A
    { x: 0.1, y: 0.8 }, { x: 0.15, y: 0.7 }, { x: 0.2, y: 0.6 }, { x: 0.25, y: 0.5 }, { x: 0.3, y: 0.4 }, { x: 0.35, y: 0.3 }, { x: 0.4, y: 0.2 },
    { x: 0.5, y: 0.2 }, { x: 0.55, y: 0.3 }, { x: 0.6, y: 0.4 }, { x: 0.65, y: 0.5 }, { x: 0.7, y: 0.6 }, { x: 0.75, y: 0.7 }, { x: 0.8, y: 0.8 },
    { x: 0.25, y: 0.5 }, { x: 0.3, y: 0.5 }, { x: 0.35, y: 0.5 }, { x: 0.4, y: 0.5 }, { x: 0.45, y: 0.5 }, { x: 0.5, y: 0.5 }, { x: 0.55, y: 0.5 }, { x: 0.6, y: 0.5 }, { x: 0.65, y: 0.5 },
    // R
    { x: 0.85, y: 0.2 }, { x: 0.85, y: 0.3 }, { x: 0.85, y: 0.4 }, { x: 0.85, y: 0.5 }, { x: 0.85, y: 0.6 }, { x: 0.85, y: 0.7 }, { x: 0.85, y: 0.8 },
    { x: 0.9, y: 0.2 }, { x: 0.95, y: 0.2 }, { x: 1.0, y: 0.2 }, { x: 1.05, y: 0.2 }, { x: 1.1, y: 0.2 },
    { x: 0.9, y: 0.5 }, { x: 0.95, y: 0.5 }, { x: 1.0, y: 0.5 }, { x: 1.05, y: 0.5 }, { x: 1.1, y: 0.5 },
    { x: 1.1, y: 0.6 }, { x: 1.1, y: 0.7 }, { x: 1.1, y: 0.8 },
    // I
    { x: 1.15, y: 0.2 }, { x: 1.2, y: 0.2 }, { x: 1.25, y: 0.2 }, { x: 1.3, y: 0.2 }, { x: 1.35, y: 0.2 },
    { x: 1.25, y: 0.3 }, { x: 1.25, y: 0.4 }, { x: 1.25, y: 0.5 }, { x: 1.25, y: 0.6 }, { x: 1.25, y: 0.7 },
    { x: 1.15, y: 0.8 }, { x: 1.2, y: 0.8 }, { x: 1.25, y: 0.8 }, { x: 1.3, y: 0.8 }, { x: 1.35, y: 0.8 },
    // A
    { x: 1.4, y: 0.8 }, { x: 1.45, y: 0.7 }, { x: 1.5, y: 0.6 }, { x: 1.55, y: 0.5 }, { x: 1.6, y: 0.4 }, { x: 1.65, y: 0.3 }, { x: 1.7, y: 0.2 },
    { x: 1.8, y: 0.2 }, { x: 1.85, y: 0.3 }, { x: 1.9, y: 0.4 }, { x: 1.95, y: 0.5 }, { x: 2.0, y: 0.6 }, { x: 2.05, y: 0.7 }, { x: 2.1, y: 0.8 },
    { x: 1.55, y: 0.5 }, { x: 1.6, y: 0.5 }, { x: 1.65, y: 0.5 }, { x: 1.7, y: 0.5 }, { x: 1.75, y: 0.5 }, { x: 1.8, y: 0.5 }, { x: 1.85, y: 0.5 }, { x: 1.9, y: 0.5 }, { x: 1.95, y: 0.5 }
  ],
  THOUGHTFUL: [
    // T
    { x: 0.1, y: 0.2 }, { x: 0.15, y: 0.2 }, { x: 0.2, y: 0.2 }, { x: 0.25, y: 0.2 }, { x: 0.3, y: 0.2 }, { x: 0.35, y: 0.2 }, { x: 0.4, y: 0.2 }, { x: 0.45, y: 0.2 }, { x: 0.5, y: 0.2 },
    { x: 0.3, y: 0.3 }, { x: 0.3, y: 0.4 }, { x: 0.3, y: 0.5 }, { x: 0.3, y: 0.6 }, { x: 0.3, y: 0.7 }, { x: 0.3, y: 0.8 },
    // H
    { x: 0.55, y: 0.2 }, { x: 0.55, y: 0.3 }, { x: 0.55, y: 0.4 }, { x: 0.55, y: 0.5 }, { x: 0.55, y: 0.6 }, { x: 0.55, y: 0.7 }, { x: 0.55, y: 0.8 },
    { x: 0.8, y: 0.2 }, { x: 0.8, y: 0.3 }, { x: 0.8, y: 0.4 }, { x: 0.8, y: 0.5 }, { x: 0.8, y: 0.6 }, { x: 0.8, y: 0.7 }, { x: 0.8, y: 0.8 },
    { x: 0.6, y: 0.5 }, { x: 0.65, y: 0.5 }, { x: 0.7, y: 0.5 }, { x: 0.75, y: 0.5 },
    // O
    { x: 0.85, y: 0.2 }, { x: 0.9, y: 0.2 }, { x: 0.95, y: 0.2 }, { x: 1.0, y: 0.2 }, { x: 1.05, y: 0.2 }, { x: 1.1, y: 0.2 },
    { x: 0.85, y: 0.3 }, { x: 0.85, y: 0.4 }, { x: 0.85, y: 0.5 }, { x: 0.85, y: 0.6 }, { x: 0.85, y: 0.7 }, { x: 0.85, y: 0.8 },
    { x: 1.1, y: 0.3 }, { x: 1.1, y: 0.4 }, { x: 1.1, y: 0.5 }, { x: 1.1, y: 0.6 }, { x: 1.1, y: 0.7 }, { x: 1.1, y: 0.8 },
    { x: 0.9, y: 0.8 }, { x: 0.95, y: 0.8 }, { x: 1.0, y: 0.8 }, { x: 1.05, y: 0.8 },
    // U
    { x: 1.15, y: 0.2 }, { x: 1.15, y: 0.3 }, { x: 1.15, y: 0.4 }, { x: 1.15, y: 0.5 }, { x: 1.15, y: 0.6 }, { x: 1.15, y: 0.7 },
    { x: 1.4, y: 0.2 }, { x: 1.4, y: 0.3 }, { x: 1.4, y: 0.4 }, { x: 1.4, y: 0.5 }, { x: 1.4, y: 0.6 }, { x: 1.4, y: 0.7 },
    { x: 1.2, y: 0.8 }, { x: 1.25, y: 0.8 }, { x: 1.3, y: 0.8 }, { x: 1.35, y: 0.8 }, { x: 1.4, y: 0.8 },
    // G
    { x: 1.45, y: 0.2 }, { x: 1.5, y: 0.2 }, { x: 1.55, y: 0.2 }, { x: 1.6, y: 0.2 }, { x: 1.65, y: 0.2 },
    { x: 1.45, y: 0.3 }, { x: 1.45, y: 0.4 }, { x: 1.45, y: 0.5 }, { x: 1.45, y: 0.6 }, { x: 1.45, y: 0.7 }, { x: 1.45, y: 0.8 },
    { x: 1.5, y: 0.8 }, { x: 1.55, y: 0.8 }, { x: 1.6, y: 0.8 }, { x: 1.65, y: 0.8 },
    { x: 1.65, y: 0.3 }, { x: 1.65, y: 0.4 }, { x: 1.65, y: 0.5 }, { x: 1.6, y: 0.5 }, { x: 1.55, y: 0.5 },
    // H
    { x: 1.7, y: 0.2 }, { x: 1.7, y: 0.3 }, { x: 1.7, y: 0.4 }, { x: 1.7, y: 0.5 }, { x: 1.7, y: 0.6 }, { x: 1.7, y: 0.7 }, { x: 1.7, y: 0.8 },
    { x: 1.95, y: 0.2 }, { x: 1.95, y: 0.3 }, { x: 1.95, y: 0.4 }, { x: 1.95, y: 0.5 }, { x: 1.95, y: 0.6 }, { x: 1.95, y: 0.7 }, { x: 1.95, y: 0.8 },
    { x: 1.75, y: 0.5 }, { x: 1.8, y: 0.5 }, { x: 1.85, y: 0.5 }, { x: 1.9, y: 0.5 },
    // T
    { x: 2.0, y: 0.2 }, { x: 2.05, y: 0.2 }, { x: 2.1, y: 0.2 }, { x: 2.15, y: 0.2 }, { x: 2.2, y: 0.2 }, { x: 2.25, y: 0.2 }, { x: 2.3, y: 0.2 }, { x: 2.35, y: 0.2 }, { x: 2.4, y: 0.2 },
    { x: 2.2, y: 0.3 }, { x: 2.2, y: 0.4 }, { x: 2.2, y: 0.5 }, { x: 2.2, y: 0.6 }, { x: 2.2, y: 0.7 }, { x: 2.2, y: 0.8 },
    // F
    { x: 2.45, y: 0.2 }, { x: 2.45, y: 0.3 }, { x: 2.45, y: 0.4 }, { x: 2.45, y: 0.5 }, { x: 2.45, y: 0.6 }, { x: 2.45, y: 0.7 }, { x: 2.45, y: 0.8 },
    { x: 2.5, y: 0.2 }, { x: 2.55, y: 0.2 }, { x: 2.6, y: 0.2 }, { x: 2.65, y: 0.2 }, { x: 2.7, y: 0.2 },
    { x: 2.5, y: 0.5 }, { x: 2.55, y: 0.5 }, { x: 2.6, y: 0.5 }, { x: 2.65, y: 0.5 },
    // U
    { x: 2.75, y: 0.2 }, { x: 2.75, y: 0.3 }, { x: 2.75, y: 0.4 }, { x: 2.75, y: 0.5 }, { x: 2.75, y: 0.6 }, { x: 2.75, y: 0.7 },
    { x: 3.0, y: 0.2 }, { x: 3.0, y: 0.3 }, { x: 3.0, y: 0.4 }, { x: 3.0, y: 0.5 }, { x: 3.0, y: 0.6 }, { x: 3.0, y: 0.7 },
    { x: 2.8, y: 0.8 }, { x: 2.85, y: 0.8 }, { x: 2.9, y: 0.8 }, { x: 2.95, y: 0.8 }, { x: 3.0, y: 0.8 },
    // L
    { x: 3.05, y: 0.2 }, { x: 3.05, y: 0.3 }, { x: 3.05, y: 0.4 }, { x: 3.05, y: 0.5 }, { x: 3.05, y: 0.6 }, { x: 3.05, y: 0.7 }, { x: 3.05, y: 0.8 },
    { x: 3.1, y: 0.8 }, { x: 3.15, y: 0.8 }, { x: 3.2, y: 0.8 }, { x: 3.25, y: 0.8 }, { x: 3.3, y: 0.8 }
  ],
  INVESTMENT: [
    // I
    { x: 0.1, y: 0.2 }, { x: 0.15, y: 0.2 }, { x: 0.2, y: 0.2 }, { x: 0.25, y: 0.2 }, { x: 0.3, y: 0.2 },
    { x: 0.2, y: 0.3 }, { x: 0.2, y: 0.4 }, { x: 0.2, y: 0.5 }, { x: 0.2, y: 0.6 }, { x: 0.2, y: 0.7 },
    { x: 0.1, y: 0.8 }, { x: 0.15, y: 0.8 }, { x: 0.2, y: 0.8 }, { x: 0.25, y: 0.8 }, { x: 0.3, y: 0.8 },
    // N
    { x: 0.35, y: 0.2 }, { x: 0.35, y: 0.3 }, { x: 0.35, y: 0.4 }, { x: 0.35, y: 0.5 }, { x: 0.35, y: 0.6 }, { x: 0.35, y: 0.7 }, { x: 0.35, y: 0.8 },
    { x: 0.6, y: 0.2 }, { x: 0.6, y: 0.3 }, { x: 0.6, y: 0.4 }, { x: 0.6, y: 0.5 }, { x: 0.6, y: 0.6 }, { x: 0.6, y: 0.7 }, { x: 0.6, y: 0.8 },
    { x: 0.4, y: 0.3 }, { x: 0.45, y: 0.4 }, { x: 0.5, y: 0.5 }, { x: 0.55, y: 0.6 },
    // V
    { x: 0.65, y: 0.2 }, { x: 0.7, y: 0.3 }, { x: 0.75, y: 0.4 }, { x: 0.8, y: 0.5 }, { x: 0.85, y: 0.6 }, { x: 0.9, y: 0.7 }, { x: 0.95, y: 0.8 },
    { x: 1.0, y: 0.2 }, { x: 0.95, y: 0.3 }, { x: 0.9, y: 0.4 }, { x: 0.85, y: 0.5 }, { x: 0.8, y: 0.6 }, { x: 0.75, y: 0.7 }, { x: 0.7, y: 0.8 },
    // E
    { x: 1.05, y: 0.2 }, { x: 1.05, y: 0.3 }, { x: 1.05, y: 0.4 }, { x: 1.05, y: 0.5 }, { x: 1.05, y: 0.6 }, { x: 1.05, y: 0.7 }, { x: 1.05, y: 0.8 },
    { x: 1.1, y: 0.2 }, { x: 1.15, y: 0.2 }, { x: 1.2, y: 0.2 }, { x: 1.25, y: 0.2 },
    { x: 1.1, y: 0.5 }, { x: 1.15, y: 0.5 }, { x: 1.2, y: 0.5 },
    { x: 1.1, y: 0.8 }, { x: 1.15, y: 0.8 }, { x: 1.2, y: 0.8 }, { x: 1.25, y: 0.8 },
    // S
    { x: 1.3, y: 0.2 }, { x: 1.35, y: 0.2 }, { x: 1.4, y: 0.2 }, { x: 1.45, y: 0.2 },
    { x: 1.3, y: 0.3 }, { x: 1.3, y: 0.4 }, { x: 1.3, y: 0.5 },
    { x: 1.35, y: 0.5 }, { x: 1.4, y: 0.5 }, { x: 1.45, y: 0.5 },
    { x: 1.45, y: 0.6 }, { x: 1.45, y: 0.7 },
    { x: 1.3, y: 0.8 }, { x: 1.35, y: 0.8 }, { x: 1.4, y: 0.8 }, { x: 1.45, y: 0.8 },
    // T
    { x: 1.5, y: 0.2 }, { x: 1.55, y: 0.2 }, { x: 1.6, y: 0.2 }, { x: 1.65, y: 0.2 }, { x: 1.7, y: 0.2 }, { x: 1.75, y: 0.2 }, { x: 1.8, y: 0.2 }, { x: 1.85, y: 0.2 }, { x: 1.9, y: 0.2 },
    { x: 1.7, y: 0.3 }, { x: 1.7, y: 0.4 }, { x: 1.7, y: 0.5 }, { x: 1.7, y: 0.6 }, { x: 1.7, y: 0.7 }, { x: 1.7, y: 0.8 },
    // M
    { x: 1.95, y: 0.2 }, { x: 1.95, y: 0.3 }, { x: 1.95, y: 0.4 }, { x: 1.95, y: 0.5 }, { x: 1.95, y: 0.6 }, { x: 1.95, y: 0.7 }, { x: 1.95, y: 0.8 },
    { x: 2.3, y: 0.2 }, { x: 2.3, y: 0.3 }, { x: 2.3, y: 0.4 }, { x: 2.3, y: 0.5 }, { x: 2.3, y: 0.6 }, { x: 2.3, y: 0.7 }, { x: 2.3, y: 0.8 },
    { x: 2.0, y: 0.3 }, { x: 2.05, y: 0.4 }, { x: 2.1, y: 0.5 }, { x: 2.15, y: 0.6 }, { x: 2.2, y: 0.7 }, { x: 2.25, y: 0.8 },
    // E
    { x: 2.35, y: 0.2 }, { x: 2.35, y: 0.3 }, { x: 2.35, y: 0.4 }, { x: 2.35, y: 0.5 }, { x: 2.35, y: 0.6 }, { x: 2.35, y: 0.7 }, { x: 2.35, y: 0.8 },
    { x: 2.4, y: 0.2 }, { x: 2.45, y: 0.2 }, { x: 2.5, y: 0.2 }, { x: 2.55, y: 0.2 },
    { x: 2.4, y: 0.5 }, { x: 2.45, y: 0.5 }, { x: 2.5, y: 0.5 },
    { x: 2.4, y: 0.8 }, { x: 2.45, y: 0.8 }, { x: 2.5, y: 0.8 }, { x: 2.55, y: 0.8 },
    // N
    { x: 2.6, y: 0.2 }, { x: 2.6, y: 0.3 }, { x: 2.6, y: 0.4 }, { x: 2.6, y: 0.5 }, { x: 2.6, y: 0.6 }, { x: 2.6, y: 0.7 }, { x: 2.6, y: 0.8 },
    { x: 2.85, y: 0.2 }, { x: 2.85, y: 0.3 }, { x: 2.85, y: 0.4 }, { x: 2.85, y: 0.5 }, { x: 2.85, y: 0.6 }, { x: 2.85, y: 0.7 }, { x: 2.85, y: 0.8 },
    { x: 2.65, y: 0.3 }, { x: 2.7, y: 0.4 }, { x: 2.75, y: 0.5 }, { x: 2.8, y: 0.6 },
    // T
    { x: 2.9, y: 0.2 }, { x: 2.95, y: 0.2 }, { x: 3.0, y: 0.2 }, { x: 3.05, y: 0.2 }, { x: 3.1, y: 0.2 }, { x: 3.15, y: 0.2 }, { x: 3.2, y: 0.2 }, { x: 3.25, y: 0.2 }, { x: 3.3, y: 0.2 },
    { x: 3.1, y: 0.3 }, { x: 3.1, y: 0.4 }, { x: 3.1, y: 0.5 }, { x: 3.1, y: 0.6 }, { x: 3.1, y: 0.7 }, { x: 3.1, y: 0.8 }
  ]
};

export default function LetterMorphHero() {
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

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create particles scattered around
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 600,
          y: centerY + (Math.random() - 0.5) * 300,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: 2 + Math.random() * 2,
          opacity: 0.6 + Math.random() * 0.4,
          targetX: centerX,
          targetY: centerY,
          originalX: centerX + (Math.random() - 0.5) * 600,
          originalY: centerY + (Math.random() - 0.5) * 300,
        });
      }

      particlesRef.current = particles;
    };

    // Update particle targets based on current phase
    const updateTargets = () => {
      const particles = particlesRef.current;
      if (!particles.length) return;

      let targetPoints: { x: number; y: number }[] = [];

      switch (phase) {
        case 0:
          targetPoints = LETTER_SHAPES.ARIA;
          break;
        case 1:
          targetPoints = LETTER_SHAPES.THOUGHTFUL;
          break;
        case 2:
          targetPoints = LETTER_SHAPES.INVESTMENT;
          break;
        case 3:
          // Final state - particles move to center and fade
          targetPoints = particles.map(() => ({
            x: canvas.width / 2,
            y: canvas.height / 2,
          }));
          break;
      }

      // Assign targets to particles
      particles.forEach((particle, index) => {
        if (targetPoints[index]) {
          const target = targetPoints[index];
          particle.targetX = (target.x * canvas.width) / 3.5 + canvas.width * 0.1;
          particle.targetY = (target.y * canvas.height) / 1.2 + canvas.height * 0.1;
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      particles.forEach((particle) => {
        // Calculate distance to target
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply attraction to target
        if (distance > 2) {
          particle.vx += (dx / distance) * 0.02;
          particle.vy += (dy / distance) * 0.02;
        }

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
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 30) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(51, 225, 237, ${0.1 * (1 - distance / 30)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    updateTargets();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, phase]);

  // Phase progression
  useEffect(() => {
    if (!mounted) return;

    const timers: number[] = [];
    
    // Morphing sequence: ARIA → THOUGHTFUL → INVESTMENT → final
    timers.push(window.setTimeout(() => setPhase(0), 0));
    timers.push(window.setTimeout(() => setPhase(1), 3000));
    timers.push(window.setTimeout(() => setPhase(2), 6000));
    timers.push(window.setTimeout(() => {
      setPhase(3);
      setTimeout(() => {
        setShowFinalContent(true);
      }, 1000);
    }, 9000));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [mounted]);

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
            setTimeout(() => {
              setShowFinalContent(true);
            }, 1000);
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
