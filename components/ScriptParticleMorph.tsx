"use client";

export default function ScriptParticleMorph() {
  return (
    <section
      aria-label="Hero"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-28 lg:pt-32 min-h-[80vh] flex items-center"
    >
      {/* Particle Canvas */}
      <canvas
        id="particle-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Skip Intro Button */}
      <button
        id="skip-intro"
        className="absolute bottom-6 left-6 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-b/50 transition-all duration-200 backdrop-blur-sm"
        style={{ display: 'none' }}
      >
        Skip intro
      </button>

      {/* Final Hero Content */}
      <div
        id="final-content"
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
              const canvas = document.getElementById('particle-canvas');
              const skipBtn = document.getElementById('skip-intro');
              const finalContent = document.getElementById('final-content');
              
              if (!canvas) return;
              
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              
              let particles = [];
              let phase = 0;
              let animationId;
              
              // Initialize canvas
              const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
              };
              
              resizeCanvas();
              window.addEventListener('resize', resizeCanvas);
              
              // Initialize particles
              const initParticles = () => {
                particles = [];
                for (let i = 0; i < 150; i++) {
                  particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: 2 + Math.random() * 2,
                    opacity: 0.6 + Math.random() * 0.4,
                    targetX: canvas.width / 2,
                    targetY: canvas.height / 2,
                  });
                }
              };
              
              // Animation loop
              const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach((particle) => {
                  // Update targets based on phase
                  if (phase === 0) {
                    // ARIA
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    particle.targetX = centerX + (Math.random() - 0.5) * 200;
                    particle.targetY = centerY + (Math.random() - 0.5) * 100;
                  } else if (phase === 1) {
                    // THOUGHTFUL
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    particle.targetX = centerX + (Math.random() - 0.5) * 300;
                    particle.targetY = centerY + (Math.random() - 0.5) * 100;
                  } else if (phase === 2) {
                    // INVESTMENT
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    particle.targetX = centerX + (Math.random() - 0.5) * 350;
                    particle.targetY = centerY + (Math.random() - 0.5) * 100;
                  } else {
                    // Final - particles move to center and fade
                    particle.targetX = canvas.width / 2;
                    particle.targetY = canvas.height / 2;
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
                  ctx.fillStyle = \`rgba(51, 225, 237, \${particle.opacity})\`;
                  ctx.fill();
                });
                
                animationId = requestAnimationFrame(animate);
              };
              
              // Phase progression
              const startIntro = () => {
                initParticles();
                animate();
                
                skipBtn.style.display = 'block';
                
                setTimeout(() => phase = 1, 3000);
                setTimeout(() => phase = 2, 6000);
                setTimeout(() => {
                  phase = 3;
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
                finalContent.style.display = 'block';
                skipBtn.style.display = 'none';
                if (animationId) {
                  cancelAnimationFrame(animationId);
                }
              });
              
              // Start the intro
              startIntro();
            })();
          `,
        }}
      />
    </section>
  );
}
