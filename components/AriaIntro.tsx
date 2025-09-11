'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface AriaIntroProps {
  text?: string;
  mode?: 'particles' | 'stagger' | 'auto';
  fontFamily?: string;
  letterSpacing?: string;
  color?: string;
  onComplete?: () => void;
  skipIntro?: boolean;
  forcePlay?: boolean;
}

type IntroState = 'idle' | 'playing' | 'revealing' | 'done';

export default function AriaIntro({
  text = 'ARIA',
  mode = 'auto',
  fontFamily = 'serif',
  letterSpacing = '0.08em',
  color = '#EAF2F6',
  onComplete,
  skipIntro = false,
  forcePlay = false
}: AriaIntroProps) {
  // State machine for intro phases
  const [introState, setIntroState] = useState<IntroState>('idle');
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [detectedMode, setDetectedMode] = useState<'particles' | 'stagger'>('stagger');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [backgroundScale, setBackgroundScale] = useState(1.0);
  
  // Animation control refs
  const hasStartedRef = useRef(false);
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Array<{ element: HTMLSpanElement; index: number }>>([]);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; opacity: number }>>([]);
  const animationStartTime = useRef<number>(0);
  
  // Type-safe state checks
  const isIdle = introState === 'idle';
  const isPlaying = introState === 'playing';
  const isRevealing = introState === 'revealing';
  const isDone = introState === 'done';

  // Timer management
  const addTimer = useCallback((timer: NodeJS.Timeout) => {
    timersRef.current.add(timer);
    return timer;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Check if intro should be shown
  const shouldShowIntro = useCallback(() => {
    if (typeof window === 'undefined') return false;
    // URL override: ?intro=1 forces intro, ?intro=0 disables
    try {
      const params = new URLSearchParams(window.location.search);
      const introParam = params.get('intro');
      if (introParam === 'reset') {
        try {
          sessionStorage.removeItem('intro:played');
          localStorage.removeItem('intro:lastPlayedAt');
        } catch {}
      }
      if (introParam === '1' || introParam === 'true') return true;
      if (introParam === '0' || introParam === 'false') return false;
    } catch {}
    if (forcePlay) return true;
    if (skipIntro) return false;
    
    // In development, default to showing (still respect per-tab session)
    if (process.env.NODE_ENV === 'development') {
      const hasPlayedDev = sessionStorage.getItem('intro:played') === 'true';
      if (hasPlayedDev) return false;
      return window.location.pathname === '/';
    }

    // Check session storage (same-tab repeat visits)
    const hasPlayed = sessionStorage.getItem('intro:played') === 'true';
    if (hasPlayed) return false;

    // Check localStorage window (24h persistence)
    try {
      const lastPlayedAt = localStorage.getItem('intro:lastPlayedAt');
      if (lastPlayedAt) {
        const last = Number(lastPlayedAt);
        const now = Date.now();
        const twentyFourHoursMs = 24 * 60 * 60 * 1000;
        if (!Number.isNaN(last) && now - last < twentyFourHoursMs) {
          return false;
        }
      }
    } catch {}
    
    // Only show on homepage
    return window.location.pathname === '/';
  }, [forcePlay, skipIntro]);

  // Set client state and detect preferences
  useEffect(() => {
    setIsClient(true);
    
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

  // Mouse tracking for parallax
  useEffect(() => {
    if (!isClient || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position (-1 to 1)
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isClient, prefersReducedMotion]);

  // Main initialization
  useEffect(() => {
    if (!isClient) return;
    if (hasStartedRef.current) return;
    
    // Check if intro should be shown
    if (!shouldShowIntro()) {
      setIntroState('done');
      onComplete?.();
      return;
    }
    
    // Mark as started
    hasStartedRef.current = true;
    setIntroState('playing');
    animationStartTime.current = performance.now();
    
    // Set up mode detection (prefer particles on capable devices)
    if (mode === 'auto') {
      const coreCount = typeof navigator !== 'undefined' && (navigator as any).hardwareConcurrency ? (navigator as any).hardwareConcurrency as number : 4;
      const isWide = window.innerWidth >= 768;
      const dpr = window.devicePixelRatio || 1;
      const capable = coreCount >= 6 && isWide && dpr <= 2 && !prefersReducedMotion;
      setDetectedMode(capable ? 'particles' : 'stagger');
    } else {
      setDetectedMode(mode);
    }
    
    return () => {
      clearAllTimers();
    };
  }, [isClient, shouldShowIntro, mode, prefersReducedMotion, onComplete, clearAllTimers]);

  // Initialize letters
  const initializeLetters = useCallback(() => {
    if (!containerRef.current) return;
    
    const letterElements = containerRef.current.querySelectorAll('.intro-letter');
    lettersRef.current = Array.from(letterElements).map((element, index) => ({
      element: element as HTMLSpanElement,
      index
    }));
  }, []);

  // Enhanced letter build animation with tighter/faster timing
  const startLetterBuild = useCallback(() => {
    if (!isPlaying || !isClient) return;
    
    // Ensure letters are hidden initially
    lettersRef.current.forEach((letter) => {
      if (letter.element) {
        letter.element.style.visibility = 'hidden';
        letter.element.style.opacity = '0';
        letter.element.style.transform = 'translateY(12px) scale(0.94)';
        letter.element.style.filter = 'blur(8px)';
        letter.element.style.transition = 'none';
      }
    });
    
    // Animate letters in with 60ms stagger
    lettersRef.current.forEach((letter, index) => {
      const element = letter.element;
      if (!element) return;
      
      const delay = index * 60;
      
      const timer = addTimer(setTimeout(() => {
        element.style.visibility = 'visible';
        element.style.transition = 'all 360ms cubic-bezier(0.16, 1, 0.3, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0px) scale(1.01)';
        element.style.filter = 'blur(0px)';
        
        // Add subtle glow effect
        element.style.textShadow = '0 0 20px rgba(234, 242, 246, 0.3)';
        
        // Scale settle after entrance
        const settleTimer = addTimer(setTimeout(() => {
          element.style.transition = 'all 120ms cubic-bezier(0.16, 1, 0.3, 1)';
          element.style.transform = 'translateY(0px) scale(1.00)';
          element.style.textShadow = 'none';
        }, 240));
      }, delay));
    });
    
    // Start background scaling
    const backgroundTimer = addTimer(setTimeout(() => {
      setBackgroundScale(1.02);
    }, 80));
    
    // Start disperse animation after brief hold
    const totalBuildTime = lettersRef.current.length * 60 + 360 + 200;
    const disperseTimer = addTimer(setTimeout(() => {
      startDisperseAnimation();
    }, totalBuildTime));
  }, [isPlaying, isClient, addTimer]);

  // Disperse animation
  const startDisperseAnimation = useCallback(() => {
    if (!isPlaying || !isClient) return;
    
    if (prefersReducedMotion) {
      // Quick fade for reduced motion
      setIntroState('revealing');
      return;
    }
    
    if (detectedMode === 'particles') {
      startParticleDisperse();
    } else {
      startStaggerDisperse();
    }
  }, [isPlaying, isClient, prefersReducedMotion, detectedMode]);

  // Particle dissolve: render text to offscreen, sample, then animate outward
  const startParticleDisperse = useCallback(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return setIntroState('revealing');

    // Hide the DOM letters so particles take over
    lettersRef.current.forEach(l => { if (l.element) l.element.style.opacity = '0'; });

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const ctx = canvas.getContext('2d');
    if (!ctx) return setIntroState('revealing');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Prepare offscreen for sampling
    let sampleCanvas: HTMLCanvasElement | null = null;
    let sampleCtx: CanvasRenderingContext2D | null = null;
    try {
      sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = width;
      sampleCanvas.height = height;
      sampleCtx = sampleCanvas.getContext('2d');
    } catch {}

    if (!sampleCtx) {
      return setIntroState('revealing');
    }

    sampleCtx.clearRect(0, 0, width, height);
    const fontSize = Math.max(60, Math.min(Math.floor(width * 0.12), 140));
    sampleCtx.fillStyle = '#ffffff';
    sampleCtx.textAlign = 'center';
    sampleCtx.textBaseline = 'middle';
    sampleCtx.font = `300 ${fontSize}px ${fontFamily}`;
    sampleCtx.fillText(text, width / 2, height / 2);

    const imageData = sampleCtx.getImageData(0, 0, width, height).data;
    const step = Math.floor(Math.max(5, Math.min(8, Math.floor(fontSize / 18))));
    const maxParticles = 900;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; opacity: number }> = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4 + 3; // alpha channel
        const alpha = imageData[idx];
        if (alpha > 128) {
          if (particles.length >= maxParticles) break;
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 2.5;
          particles.push({
            x: x + (Math.random() - 0.5) * 2,
            y: y + (Math.random() - 0.5) * 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.5,
            life: 0,
            maxLife: 36 + Math.floor(Math.random() * 20),
            size: 1 + Math.random() * 1.6,
            opacity: 1,
          });
        }
      }
      if (particles.length >= maxParticles) break;
    }
    particlesRef.current = particles;

    const animate = () => {
      const ctx2 = ctx;
      const parts = particlesRef.current;
      ctx2.clearRect(0, 0, width, height);
      let alive = 0;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (p.life < p.maxLife) {
          alive++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.06; // gravity
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.life++;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);
          ctx2.globalAlpha = p.opacity;
          ctx2.fillStyle = color;
          ctx2.beginPath();
          ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx2.fill();
        }
      }
      ctx2.globalAlpha = 1;

      if (alive > 0) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Finish
        setIntroState('revealing');
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [isClient, text, fontFamily, color]);

  // Stagger disperse animation (brief, subtle)
  const startStaggerDisperse = useCallback(() => {
    if (!isPlaying || !isClient) return;
    
    lettersRef.current.forEach((letter, index) => {
      const element = letter.element;
      if (!element) return;
      
      const delay = index * 40;
      
      const timer = addTimer(setTimeout(() => {
        element.style.transition = 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-16px) scale(0.98)';
        element.style.filter = 'blur(2px)';
      }, delay));
    });
    
    // Move to revealing state after all letters animate
    const totalTime = lettersRef.current.length * 40 + 240;
    const revealTimer = addTimer(setTimeout(() => {
      setIntroState('revealing');
    }, totalTime));
  }, [isPlaying, isClient, addTimer]);

  // Start letter build when playing
  useEffect(() => {
    if (isPlaying && isClient) {
      const startTimer = addTimer(setTimeout(() => {
        initializeLetters();
        startLetterBuild();
      }, 200)); // Slightly longer delay to ensure proper initialization
    }
  }, [isPlaying, isClient, initializeLetters, startLetterBuild, addTimer]);

  // Handle revealing state with crossfade
  useEffect(() => {
    if (isRevealing) {
      const revealTimer = addTimer(setTimeout(() => {
        setIntroState('done');
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('intro:played', 'true');
          try { localStorage.setItem('intro:lastPlayedAt', String(Date.now())); } catch {}
          // Dispatch event for background effects
          window.dispatchEvent(new CustomEvent('introComplete'));
        }
        onComplete?.();
      }, 250));
    }
  }, [isRevealing, onComplete, addTimer]);

  // Skip button handler
  const handleSkip = useCallback(() => {
    clearAllTimers();
    setIntroState('done');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intro:played', 'true');
      // Dispatch event for background effects
      window.dispatchEvent(new CustomEvent('introComplete'));
    }
    onComplete?.();
  }, [clearAllTimers, onComplete]);

  // Keyboard support: allow Esc to skip
  useEffect(() => {
    if (!isPlaying) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPlaying, handleSkip]);

  // Don't render if not on client or done
  if (!isClient || isDone) return null;

  // Calculate parallax transforms
  const parallaxX = prefersReducedMotion ? 0 : mousePosition.x * 16;
  const parallaxY = prefersReducedMotion ? 0 : mousePosition.y * 16;
  const parallaxRotate = prefersReducedMotion ? 0 : mousePosition.x * 2;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        willChange: 'opacity, transform, filter',
        background: `
          /* Dark blue radial vignette matching hero */
          radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(7, 19, 31, 0.95) 0%, rgba(7, 19, 31, 0.98) 70%, rgba(7, 19, 31, 1) 100%),
          /* Soft center glow */
          radial-gradient(ellipse 400px 300px at 50% 50%, rgba(51, 225, 237, 0.08) 0%, transparent 60%)
        `,
        opacity: isRevealing ? 0 : 1,
        transition: 'opacity 500ms ease-out',
        transform: `scale(${backgroundScale}) translate(${parallaxX}px, ${parallaxY}px) rotate(${parallaxRotate}deg)`
      }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Masked radial glow behind wordmark */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse 400px 300px at 50% 50%, rgba(51, 225, 237, 0.08) 0%, transparent 60%)',
          mask: 'radial-gradient(ellipse 400px 300px at 50% 50%, black 0%, transparent 60%)',
          WebkitMask: 'radial-gradient(ellipse 400px 300px at 50% 50%, black 0%, transparent 60%)'
        }}
      />

      {/* Specks that ping occasionally */}
      {isPlaying && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full spec-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}

      {/* Particle dissolve canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Text container */}
      <div className="relative text-center">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className="intro-letter inline-block"
            style={{
              fontFamily,
              letterSpacing,
              color,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '300',
              lineHeight: '1',
              transformOrigin: 'center bottom',
              willChange: 'transform, opacity, filter',
              visibility: 'hidden'
            }}
            aria-hidden="true"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Skip button with enhanced accessibility */}
      {isPlaying && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 left-8 px-4 py-2 text-white/40 hover:text-white/60 text-sm transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent rounded-md button-lift"
          style={{ transitionDelay: '0.3s' }}
          aria-label="Skip intro animation"
        >
          Skip
        </button>
      )}
    </div>
  );
}