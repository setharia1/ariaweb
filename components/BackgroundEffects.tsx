"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for reduced motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Listen for intro completion
  useEffect(() => {
    const handleIntroComplete = () => {
      setIntroComplete(true);
    };

    // Check if intro is already complete
    if (typeof window !== 'undefined') {
      const hasPlayed = sessionStorage.getItem('intro:played') === 'true';
      if (hasPlayed) {
        setIntroComplete(true);
      }
    }

    window.addEventListener('introComplete', handleIntroComplete);
    return () => window.removeEventListener('introComplete', handleIntroComplete);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    // Performance optimization
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let isHidden = false;

    // Throttle when tab is hidden or low battery
    const checkPerformance = () => {
      if (typeof document !== 'undefined') {
        isHidden = document.hidden;
      }
    };

    const animate = (currentTime: number) => {
      // Throttle to target FPS
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      // Skip frames when tab is hidden
      if (isHidden) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      time += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw subtle grid (reduced visibility, fade in after intro)
      ctx.save();
      const gridAlpha = introComplete ? 0.03 : 0.015; // charcoal grid, very subtle
      ctx.globalAlpha = gridAlpha;
      ctx.strokeStyle = "#2E2E2E"; // charcoal gray
      ctx.lineWidth = 1;

      const gridSize = 16;
      const offsetX = (time * 0.2) % gridSize;
      const offsetY = (time * 0.1) % gridSize;

      for (let x = -offsetX; x < rect.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }

      for (let y = -offsetY; y < rect.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Draw aurora waves (recolored to luxury hues)
      ctx.save();
      ctx.globalAlpha = 0.04;
      
      const gradient1 = ctx.createLinearGradient(0, 0, rect.width, 0);
      gradient1.addColorStop(0, "transparent");
      gradient1.addColorStop(0.25, "rgba(1, 50, 32, 0.10)"); // emerald
      gradient1.addColorStop(0.5, "rgba(201, 166, 53, 0.12)"); // gold
      gradient1.addColorStop(0.75, "rgba(10, 26, 60, 0.10)"); // navy
      gradient1.addColorStop(1, "transparent");

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, rect.height * 0.2 + Math.sin(time * 0.5) * 20, rect.width, 2);
      
      const gradient2 = ctx.createLinearGradient(0, 0, rect.width, 0);
      gradient2.addColorStop(0, "transparent");
      gradient2.addColorStop(0.33, "rgba(123, 17, 19, 0.09)"); // burgundy
      gradient2.addColorStop(0.66, "rgba(75, 0, 130, 0.09)"); // royal purple
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, rect.height * 0.6 + Math.sin(time * 0.3) * 15, rect.width, 1.5);
      ctx.fillRect(0, rect.height * 0.8 + Math.sin(time * 0.7) * 10, rect.width, 1);
      
      ctx.restore();

      // Draw parallax blobs with enhanced blur (luxury palette)
      const blobs = [
        { x: rect.width * 0.18, y: rect.height * 0.3, size: 90, speed: 0.28, color: "#013220" }, // emerald
        { x: rect.width * 0.72, y: rect.height * 0.62, size: 80, speed: 0.22, color: "#0A1A3C" }, // navy
        { x: rect.width * 0.42, y: rect.height * 0.82, size: 60, speed: 0.34, color: "#7B1113" }, // burgundy
        { x: rect.width * 0.82, y: rect.height * 0.22, size: 85, speed: 0.24, color: "#4B0082" }, // royal purple
        { x: rect.width * 0.58, y: rect.height * 0.18, size: 70, speed: 0.3, color: "#C9A635" }, // gold
      ];

      blobs.forEach((blob, index) => {
        const mouseInfluence = prefersReducedMotion ? 0 : 0.3;
        const mouseDx = (mousePosition.x - blob.x) * mouseInfluence;
        const mouseDy = (mousePosition.y - blob.y) * mouseInfluence;
        
        const x = blob.x + Math.sin(time * blob.speed) * 10 + mouseDx * 0.1;
        const y = blob.y + Math.cos(time * blob.speed) * 8 + mouseDy * 0.1;

        ctx.save();
        ctx.globalAlpha = 0.12;
        
        // Create radial gradient for blob
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.size);
        gradient.addColorStop(0, `${blob.color}40`);
        gradient.addColorStop(0.5, `${blob.color}20`);
        gradient.addColorStop(1, `${blob.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, blob.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", checkPerformance);

    const handleMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", checkPerformance);
      document.removeEventListener("mousemove", handleMouseMove);
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
      style={{ 
        zIndex: 0,
        filter: 'blur(32px) saturate(1.2) brightness(1.05)',
        willChange: 'transform'
      }}
    />
  );
}
