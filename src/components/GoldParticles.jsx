import { useEffect, useRef } from 'react';

export default function GoldParticles({ active }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        life: 1,
        decay: Math.random() * 0.008 + 0.003,
        color: Math.random() > 0.3
          ? `rgba(200, 164, 93, `
          : `rgba(232, 208, 144, `,
      });
    }
    particlesRef.current = particles;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.life * p.opacity;

        // Draw a star/diamond shape
        ctx.fillStyle = p.color + (p.life * p.opacity) + ')';
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.4, -s * 0.4);
        ctx.lineTo(s, 0);
        ctx.lineTo(s * 0.4, s * 0.4);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.4, s * 0.4);
        ctx.lineTo(-s, 0);
        ctx.lineTo(-s * 0.4, -s * 0.4);
        ctx.closePath();
        ctx.fill();

        // Glow effect
        ctx.shadowColor = 'rgba(200, 164, 93, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.restore();
      });

      if (alive) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    }

    animate();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
}
