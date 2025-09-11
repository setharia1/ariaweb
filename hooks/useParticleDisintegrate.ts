import { useRef, useCallback, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
  originalX: number;
  originalY: number;
  type: 'explosive' | 'floating' | 'collapsing';
}

interface UseParticleDisintegrateOptions {
  text: string;
  fontFamily: string;
  letterSpacing: string;
  color: string;
  onComplete?: () => void;
}

export function useParticleDisintegrate({
  text,
  fontFamily,
  letterSpacing,
  color,
  onComplete
}: UseParticleDisintegrateOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const isAnimatingRef = useRef(false);
  const startTimeRef = useRef(0);
  const textImageDataRef = useRef<ImageData | null>(null);

  // Generate particles from text
  const generateParticlesFromText = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Set text properties
    const fontSize = Math.min(rect.width * 0.15, rect.height * 0.2, 120);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text to get dimensions
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;
    
    // Create offscreen canvas for text sampling
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d');
    if (!textCtx) return;
    
    textCanvas.width = textWidth + 40; // Add padding
    textCanvas.height = textHeight + 40;
    
    // Draw text on offscreen canvas
    textCtx.font = `${fontSize}px ${fontFamily}`;
    textCtx.fillStyle = '#FFFFFF';
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';
    textCtx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
    
    // Sample pixels and create particles
    const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
    textImageDataRef.current = imageData;
    
    const particles: Particle[] = [];
    const sampleRate = window.innerWidth < 768 ? 4 : 2; // More particles for dramatic effect
    const maxParticles = window.innerWidth < 768 ? 1200 : 4000;
    let particleCount = 0;
    
    for (let y = 0; y < imageData.height && particleCount < maxParticles; y += sampleRate) {
      for (let x = 0; x < imageData.width && particleCount < maxParticles; x += sampleRate) {
        const pixelIndex = (y * imageData.width + x) * 4;
        const alpha = imageData.data[pixelIndex + 3];
        
        if (alpha > 128) { // If pixel is not transparent
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const offsetX = x - textCanvas.width / 2;
          const offsetY = y - textCanvas.height / 2;
          
          // Create more varied particle types
          const particleType = Math.random();
          let vx, vy, size, maxLife;
          
          if (particleType < 0.3) {
            // Explosive particles - burst outward
            const angle = Math.atan2(offsetY, offsetX);
            const force = 6 + Math.random() * 4;
            vx = Math.cos(angle) * force;
            vy = Math.sin(angle) * force;
            size = 2 + Math.random() * 4;
            maxLife = 120 + Math.random() * 60;
          } else if (particleType < 0.6) {
            // Floating particles - gentle drift
            vx = (Math.random() - 0.5) * 2;
            vy = -1 - Math.random() * 2;
            size = 1 + Math.random() * 2;
            maxLife = 180 + Math.random() * 120;
          } else {
            // Collapsing particles - fall inward then burst
            vx = (Math.random() - 0.5) * 1;
            vy = (Math.random() - 0.5) * 1;
            size = 1.5 + Math.random() * 2.5;
            maxLife = 200 + Math.random() * 100;
          }
          
          particles.push({
            x: centerX + offsetX,
            y: centerY + offsetY,
            vx,
            vy,
            size,
            opacity: 0.9 + Math.random() * 0.1,
            life: 0,
            maxLife,
            color: color,
            originalX: centerX + offsetX,
            originalY: centerY + offsetY,
            type: particleType < 0.3 ? 'explosive' : particleType < 0.6 ? 'floating' : 'collapsing'
          });
          
          particleCount++;
        }
      }
    }
    
    particlesRef.current = particles;
  }, [text, fontFamily, color]);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isAnimatingRef.current) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const duration = window.innerWidth < 768 ? 1200 : 1800; // Optimized for 1.5-2.5 second sequence
    const progress = Math.min(elapsed / duration, 1);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr);
    ctx.scale(dpr, dpr);
    
    // Update and draw particles
    let activeParticles = 0;
    
    particlesRef.current.forEach((particle) => {
      if (particle.life >= particle.maxLife) return;
      
      activeParticles++;
      
      // Update particle
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply physics based on particle type
      if (particle.type === 'explosive') {
        // Explosive particles - strong initial burst, then fade
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vy += 0.02; // Light gravity
      } else if (particle.type === 'floating') {
        // Floating particles - gentle drift with curl noise
        particle.vy += 0.01; // Very light gravity
        particle.vx *= 0.998;
        particle.vy *= 0.998;
        
        // Add gentle curl noise
        const noiseX = Math.sin(particle.life * 0.02) * 0.5;
        const noiseY = Math.cos(particle.life * 0.015) * 0.3;
        particle.vx += noiseX * 0.01;
        particle.vy += noiseY * 0.01;
      } else if (particle.type === 'collapsing') {
        // Collapsing particles - fall inward, then burst outward
        if (particle.life < particle.maxLife * 0.3) {
          // Phase 1: Collapse inward
          const dx = particle.originalX - particle.x;
          const dy = particle.originalY - particle.y;
          particle.vx += dx * 0.01;
          particle.vy += dy * 0.01;
        } else {
          // Phase 2: Burst outward
          const angle = Math.atan2(particle.y - particle.originalY, particle.x - particle.originalX);
          const force = 0.1;
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        particle.vy += 0.025; // Gravity
      }
      
      // Calculate opacity based on life and progress
      const lifeProgress = particle.life / particle.maxLife;
      const fadeProgress = Math.max(0, (progress - 0.3) / 0.7); // Start fading after 30%
      particle.opacity = (1 - lifeProgress) * (1 - fadeProgress) * 0.8;
      
      // Draw particle with enhanced glow effect
      if (particle.opacity > 0.01) {
        ctx.save();
        
        // Outer glow layer - more dramatic
        ctx.shadowColor = color;
        ctx.shadowBlur = particle.size * 6;
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Middle glow layer
        ctx.shadowBlur = particle.size * 3;
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner glow layer
        ctx.shadowBlur = particle.size * 1.5;
        ctx.globalAlpha = particle.opacity * 0.7;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.shadowBlur = 0;
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#FFFFFF'; // Bright white core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    });
    
    // Check if animation is complete
    if (progress >= 1 || activeParticles === 0) {
      isAnimatingRef.current = false;
      onComplete?.();
      return;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [color, onComplete]);

  // Start particle animation
  const startParticleAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    isAnimatingRef.current = true;
    startTimeRef.current = 0;
    
    // Generate particles
    generateParticlesFromText(canvas, ctx);
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  }, [generateParticlesFromText, animate]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (isAnimatingRef.current) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Regenerate particles on resize
        generateParticlesFromText(canvas, ctx);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateParticlesFromText]);

  return {
    canvasRef,
    startParticleAnimation,
    isAnimating: isAnimatingRef.current
  };
}
