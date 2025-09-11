"use client";

export default function ScriptLetterMorph() {
  return (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
    >
      {/* Particle Canvas */}
      <canvas
        id="letter-morph-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Skip Intro Button */}
      <button
        id="skip-letter-intro"
        className="absolute bottom-6 left-6 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-b/50 transition-all duration-200 backdrop-blur-sm"
        style={{ display: 'none' }}
        type="button"
      >
        Skip intro
      </button>

      {/* Final Hero Content */}
      <div
        id="final-hero-content"
        className="relative z-10 text-center transition-opacity duration-500 w-full"
        style={{ display: 'none' }}
      >
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
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const canvas = document.getElementById('letter-morph-canvas');
              const skipBtn = document.getElementById('skip-letter-intro');
              const finalContent = document.getElementById('final-hero-content');
              
              if (!canvas) return;
              
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              
              let particles = [];
              let phase = 0;
              let animationId;
              
              // Letter shapes as coordinate arrays
              const letterShapes = {
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
              
              // Initialize canvas
              const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.scale(dpr, dpr);
              };
              
              // Wait for DOM to be fully ready
              setTimeout(() => {
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
              }, 100);
              
              // Initialize particles
              const initParticles = () => {
                particles = [];
                const rect = canvas.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

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
              };
              
              // Update particle targets based on current phase
              const updateTargets = () => {
                let targetPoints = [];

                switch (phase) {
                  case 0:
                    targetPoints = letterShapes.ARIA;
                    break;
                  case 1:
                    targetPoints = letterShapes.THOUGHTFUL;
                    break;
                  case 2:
                    targetPoints = letterShapes.INVESTMENT;
                    break;
                  case 3:
                    // Final state - particles move to center and fade
                    const rect = canvas.getBoundingClientRect();
                    targetPoints = particles.map(() => ({
                      x: rect.width / 2,
                      y: rect.height / 2,
                    }));
                    break;
                }

                // Assign targets to particles
                particles.forEach((particle, index) => {
                  if (targetPoints[index]) {
                    const target = targetPoints[index];
                    const rect = canvas.getBoundingClientRect();
                    particle.targetX = (target.x * rect.width) / 3.5 + rect.width * 0.1;
                    particle.targetY = (target.y * rect.height) / 1.2 + rect.height * 0.1;
                  }
                });
              };
              
              // Animation loop
              const animate = () => {
                const rect = canvas.getBoundingClientRect();
                ctx.clearRect(0, 0, rect.width, rect.height);
                
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
                  ctx.fillStyle = \`rgba(51, 225, 237, \${particle.opacity})\`;
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
                      ctx.strokeStyle = \`rgba(51, 225, 237, \${0.1 * (1 - distance / 30)})\`;
                      ctx.lineWidth = 1;
                      ctx.stroke();
                    }
                  });
                });
                
                animationId = requestAnimationFrame(animate);
              };
              
              // Phase progression
              const startIntro = () => {
                // Ensure canvas is properly sized before starting
                resizeCanvas();
                initParticles();
                updateTargets();
                animate();
                
                skipBtn.style.display = 'block';
                
                setTimeout(() => {
                  phase = 1;
                  updateTargets();
                }, 3000);
                
                setTimeout(() => {
                  phase = 2;
                  updateTargets();
                }, 6000);
                
                setTimeout(() => {
                  phase = 3;
                  updateTargets();
                  setTimeout(() => {
                    finalContent.style.display = 'block';
                    skipBtn.style.display = 'none';
                    if (animationId) {
                      cancelAnimationFrame(animationId);
                    }
                  }, 1000);
                }, 9000);
              };
              
              // Skip button
              skipBtn.addEventListener('click', () => {
                phase = 3;
                updateTargets();
                setTimeout(() => {
                  finalContent.style.display = 'block';
                  skipBtn.style.display = 'none';
                  if (animationId) {
                    cancelAnimationFrame(animationId);
                  }
                }, 1000);
              });
              
              // Start the intro after a delay to ensure hydration is complete
              setTimeout(() => {
                startIntro();
              }, 200);
            })();
          `,
        }}
      />
    </section>
  );
}
