"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface GlowBlob {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  color: { h: number; s: number; l: number };
  pulsePhase: number;
  driftPhase: number;
}

interface Star {
  x: number;
  y: number;
  brightness: number;
  twinkleOffset: number;
}

interface LangtonsAntProps {
  intensity?: number;
}

export default function LangtonsAnt({ intensity = 0.3 }: LangtonsAntProps) {
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const resizeObserverRef = useRef<ResizeObserver>();
  const [isClient, setIsClient] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // Canvas state
  const dprRef = useRef(1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  // Glow blobs and stars state
  const glowBlobsRef = useRef<GlowBlob[]>([]);
  const starsRef = useRef<Star[]>([]);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const scrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // Tron-inspired color palette
  const colorPalette = [
    { h: 185, s: 80, l: 55 }, // Teal
    { h: 198, s: 85, l: 58 }, // Cyan
    { h: 230, s: 70, l: 55 }, // Indigo
    { h: 300, s: 65, l: 60 }, // Magenta
  ];

  // Resize canvas function with ResizeObserver
  const resizeCanvas = useCallback(() => {
    const glowCanvas = glowCanvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    
    if (!glowCanvas || !gridCanvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const width = window.innerWidth;
    const height = window.innerHeight;
    widthRef.current = width;
    heightRef.current = height;

    // Size both canvases for HiDPI
    glowCanvas.width = width * dpr;
    glowCanvas.height = height * dpr;
    gridCanvas.width = width * dpr;
    gridCanvas.height = height * dpr;
    
    const glowCtx = glowCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');
    
    if (glowCtx && gridCtx) {
      glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Initialize glow blobs and stars
    initGlowBlobs(width, height);
    initStars(width, height);
    
    // console.debug(`TronGlow: ${width}x${height}, blobs: ${glowBlobsRef.current.length}, stars: ${starsRef.current.length}`);
  }, []);

  // Initialize glow blobs
  const initGlowBlobs = useCallback((width: number, height: number) => {
    const blobCount = 6; // Fewer blobs for less distraction
    glowBlobsRef.current = [];

    for (let i = 0; i < blobCount; i++) {
      const color = colorPalette[i % colorPalette.length];
      glowBlobsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 100 + Math.random() * 80, // 100-180px radius
        velocityX: (Math.random() - 0.5) * 0.3, // Slower drift
        velocityY: (Math.random() - 0.5) * 0.3,
        color: { ...color },
        pulsePhase: Math.random() * Math.PI * 2,
        driftPhase: Math.random() * Math.PI * 2,
      });
    }
  }, []);

  // Initialize starfield
  const initStars = useCallback((width: number, height: number) => {
    const starCount = Math.min(30, Math.floor((width * height) / 20000));
    starsRef.current = [];

    for (let i = 0; i < starCount; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        brightness: Math.random() * 0.6 + 0.2,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }, []);

  // HSL to RGB conversion
  const hslToRgb = useCallback((h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 1/6) { r = c; g = x; b = 0; }
    else if (h < 2/6) { r = x; g = c; b = 0; }
    else if (h < 3/6) { r = 0; g = c; b = x; }
    else if (h < 4/6) { r = 0; g = x; b = c; }
    else if (h < 5/6) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }, []);

  // Draw glow canvas (subtle animated color blobs)
  const drawGlow = useCallback(() => {
    const glowCanvas = glowCanvasRef.current;
    const ctx = glowCanvas?.getContext('2d');
    if (!ctx) return;

    const width = widthRef.current;
    const height = heightRef.current;
    const time = timeRef.current;

    // Clear canvas with smooth trails
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, width, height);

    // Set up subtle blending
    ctx.globalCompositeOperation = 'source-over';

    // Draw each glow blob
    glowBlobsRef.current.forEach((blob, index) => {
      // Calculate scroll-based movement (different for each blob)
      const scrollDelta = scrollYRef.current - lastScrollYRef.current;
      const scrollInfluence = (index % 3 + 1) * 0.3; // Different influence per blob
      
      // Update blob position with smooth drift + scroll movement
      blob.x += blob.velocityX + Math.sin(time * 0.0003 + blob.driftPhase) * 0.1;
      blob.y += blob.velocityY + Math.cos(time * 0.0002 + blob.driftPhase) * 0.1 + (scrollDelta * scrollInfluence);

      // Wrap around screen edges
      if (blob.x < -blob.radius) blob.x = width + blob.radius;
      if (blob.x > width + blob.radius) blob.x = -blob.radius;
      if (blob.y < -blob.radius) blob.y = height + blob.radius;
      if (blob.y > height + blob.radius) blob.y = -blob.radius;

      // Pulsing radius
      const pulse = Math.sin(time * 0.0005 + blob.pulsePhase) * 0.2 + 0.8;
      const currentRadius = blob.radius * pulse;

      // Create radial gradient with much lower opacity
      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, currentRadius
      );
      
      const { h, s, l } = blob.color;
      gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, 0.15)`);
      gradient.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, 0.08)`);
      gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  // Draw grid canvas (subtle grid + vignette)
  const drawGrid = useCallback(() => {
    const gridCanvas = gridCanvasRef.current;
    const ctx = gridCanvas?.getContext('2d');
    if (!ctx) return;

    const width = widthRef.current;
    const height = heightRef.current;
    const time = timeRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    const gridSize = 50;
    
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw tiny starfield
    starsRef.current.forEach(star => {
      const twinkle = Math.sin(time * 0.0008 + star.twinkleOffset) * 0.2 + 0.8;
      const alpha = star.brightness * twinkle * 0.2;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(star.x, star.y, 1, 1);
    });

    // Add radial vignette
    const gradient = ctx.createRadialGradient(
      width / 2, height * 0.5, width * 0.2,
      width / 2, height * 0.5, width * 0.75
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const now = performance.now();
    const deltaTime = Math.min(now - lastFrameTimeRef.current, 16.67);
    lastFrameTimeRef.current = now;
    timeRef.current += deltaTime * 0.001;

    // Always draw - no pausing for smooth tab transitions
    drawGlow();
    drawGrid();

    // Update last scroll position for next frame
    lastScrollYRef.current = scrollYRef.current;

    animationRef.current = requestAnimationFrame(animate);
  }, [drawGlow, drawGrid]);

  // Remove visibility change handling to eliminate tab switch delays
  // Animation will run continuously for smooth transitions

  // Handle scroll for blob movement
  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
  }, []);

  // Initialize component
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Gate to desktop/non-coarse pointer devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse || window.innerWidth < 1024) return;

    // Initialize canvases
    resizeCanvas();
    
    // Start immediately
    setOpacity(1);

    // Start animation
    animate();

    // Set up ResizeObserver for crisp resizing
    resizeObserverRef.current = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserverRef.current.observe(document.body);

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, resizeCanvas, animate, handleScroll]);

  if (!isClient) return null;

  return (
    <div className="tron-glow-bg" style={{ opacity }}>
      <canvas
        ref={glowCanvasRef}
        id="glowCanvas"
        className="pointer-events-none"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          filter: 'blur(16px) saturate(1.1) brightness(1.02)'
        }}
      />
      <canvas
        ref={gridCanvasRef}
        id="gridCanvas"
        className="pointer-events-none"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          filter: 'none'
        }}
      />
    </div>
  );
}