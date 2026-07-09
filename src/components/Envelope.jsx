import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);
  
  // Custom styles for 3D and effects
  const styleBlock = `
    .preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .text-shadow-gold {
      text-shadow: 0 2px 4px rgba(200, 164, 93, 0.4), 0 0 10px rgba(200, 164, 93, 0.2);
    }
    .text-shadow-navy {
      text-shadow: 0 1px 2px rgba(11, 22, 44, 0.8);
    }
    
    @keyframes waveMove {
      0% { transform: translateX(0) translateY(0); }
      50% { transform: translateX(-15px) translateY(-4px); }
      100% { transform: translateX(-30px) translateY(0); }
    }
    @keyframes waveMoveSlow {
      0% { transform: translateX(0) translateY(0); }
      50% { transform: translateX(10px) translateY(-2px); }
      100% { transform: translateX(20px) translateY(0); }
    }
    @keyframes boatRock {
      0% { transform: rotate(-2deg) translateY(0); }
      50% { transform: rotate(3deg) translateY(-2px); }
      100% { transform: rotate(-2deg) translateY(0); }
    }
    @keyframes fogDrift {
      0% { transform: translateX(-20%); }
      100% { transform: translateX(20%); }
    }
    @keyframes sunGlow {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.08); opacity: 0.95; }
    }
    @keyframes palmSwayLeft {
      0%, 100% { transform: rotate(15deg) scaleX(1); }
      50% { transform: rotate(18deg) scaleX(1.02); }
    }
    @keyframes palmSwayRight {
      0%, 100% { transform: rotate(-15deg) scaleX(-1); }
      50% { transform: rotate(-18deg) scaleX(-1.02); }
    }
    @keyframes birdFly {
      0% { transform: translate(-100px, 100px) scale(0.6); opacity: 0; }
      10% { opacity: 0.7; }
      90% { opacity: 0.7; }
      100% { transform: translate(calc(100vw + 100px), -100px) scale(0.8); opacity: 0; }
    }
    @keyframes pulseGlow {
      0%, 100% { text-shadow: 0 0 10px rgba(212, 183, 106, 0.4); opacity: 0.6; }
      50% { text-shadow: 0 0 25px rgba(212, 183, 106, 0.9); opacity: 1; }
    }
    
    .animate-wave-fast {
      animation: waveMove 8s infinite ease-in-out;
    }
    .animate-wave-slow {
      animation: waveMoveSlow 12s infinite ease-in-out;
    }
    .animate-boat {
      animation: boatRock 6s infinite ease-in-out;
    }
    .animate-fog-slow {
      animation: fogDrift 45s infinite alternate linear;
    }
    .animate-fog-fast {
      animation: fogDrift 30s infinite alternate linear;
    }
    .animate-sun {
      animation: sunGlow 8s infinite ease-in-out;
    }
    .animate-palm-left {
      animation: palmSwayLeft 7s infinite ease-in-out;
    }
    .animate-palm-right {
      animation: palmSwayRight 9s infinite ease-in-out;
    }
    .animate-bird {
      animation: birdFly 20s infinite linear;
    }
    .animate-pulse-glow {
      animation: pulseGlow 2.5s infinite ease-in-out;
    }
  `;

  // Start Opening Event
  const handleOpenBook = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // Spawn Wax shattered pieces and Golden Starburst
    spawnGoldBurst();
    spawnWaxFragments();
    
    // Spawning rose petals continuously after a brief delay
    setTimeout(() => {
      startSpawningRosePetals();
    }, 400);

    // Call onOpen to trigger parent music playback and delayed screen transition
    if (onOpen) {
      onOpen();
    }
  };

  // Canvas particle handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize ambient golden dust (background ambient particles)
    const initialParticles = [];
    for (let i = 0; i < 40; i++) {
      initialParticles.push(createAmbientDust(canvas.width, canvas.height));
    }
    particlesRef.current = initialParticles;
    
    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentParticles = particlesRef.current;
      const nextParticles = [];
      
      currentParticles.forEach(p => {
        // Update physics based on particle type
        if (p.type === 'dust') {
          p.x += p.vx;
          p.y += p.vy;
          // Sway motion
          p.x += Math.sin(p.swaySeed + p.y * 0.01) * 0.2;
          
          // Recycle if out of bounds
          if (p.y < -10 || p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) {
            nextParticles.push(createAmbientDust(canvas.width, canvas.height, true));
          } else {
            nextParticles.push(p);
          }
          
          // Draw dust
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 183, 106, ${p.opacity})`;
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = 'rgba(212, 183, 106, 0.4)';
          ctx.fill();
          ctx.restore();
          
        } else if (p.type === 'gold') {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity; // Gravity
          p.vx *= p.drag;    // Friction
          p.vy *= p.drag;
          p.rotation += p.rotationSpeed;
          p.life -= p.decay;
          
          if (p.life > 0) {
            nextParticles.push(p);
            
            // Draw diamond gold particle
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.life * p.opacity;
            
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
            
            ctx.fillStyle = p.color;
            ctx.shadowBlur = s * 2;
            ctx.shadowColor = 'rgba(232, 208, 144, 0.8)';
            ctx.fill();
            ctx.restore();
          }
          
        } else if (p.type === 'wax') {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity; // Heavy gravity
          p.vx *= p.drag;
          p.rotation += p.rotationSpeed;
          p.life -= p.decay;
          
          if (p.life > 0 && p.y < canvas.height + 20) {
            nextParticles.push(p);
            
            // Draw wax flake
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.life;
            
            ctx.beginPath();
            const s = p.size;
            // Irregular wax shards shape
            ctx.moveTo(-s, -s);
            ctx.lineTo(s * 0.8, -s);
            ctx.lineTo(s, s * 0.6);
            ctx.lineTo(-s * 0.4, s);
            ctx.closePath();
            
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.fill();
            ctx.restore();
          }
          
        } else if (p.type === 'petal') {
          p.x += p.vx;
          p.y += p.vy; // Rising up
          // Flutter back and forth
          p.x += Math.sin(p.swaySeed + p.y * 0.03) * p.swayWidth;
          p.rotation += p.rotationSpeed;
          
          // Fade in at bottom, fade out near top
          if (p.y > -20) {
            nextParticles.push(p);
            
            // Draw rose petal
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            
            ctx.beginPath();
            const s = p.size;
            // Draw elegant oval rose petal shape
            ctx.ellipse(0, 0, s, s * 0.6, 0, 0, Math.PI * 2);
            
            // Rich rose gradient shading
            const grad = ctx.createRadialGradient(-s/3, -s/3, 0, 0, 0, s);
            grad.addColorStop(0, '#ffa4b9'); // Highlight pink
            grad.addColorStop(0.5, '#d41c5c'); // Vivid crimson
            grad.addColorStop(1, '#830830'); // Deep shadow burgundy
            ctx.fillStyle = grad;
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(131, 8, 48, 0.3)';
            ctx.fill();
            ctx.restore();
          }
        }
      });
      
      particlesRef.current = nextParticles;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isOpening]);

  // Ambient Dust Creator
  const createAmbientDust = (width, height, spawnAtBottom = false) => {
    return {
      type: 'dust',
      x: Math.random() * width,
      y: spawnAtBottom ? height + 10 : Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.4 + 0.1,
      swaySeed: Math.random() * 100,
    };
  };

  // Explosion of gold particles when wax seal clicked
  const spawnGoldBurst = () => {
    const burstCount = 90;
    const newParticles = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      
      newParticles.push({
        type: 'gold',
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // Initial upward pop
        gravity: 0.12,
        drag: 0.98,
        size: Math.random() * 5 + 2,
        opacity: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 1.0,
        decay: Math.random() * 0.012 + 0.005,
        color: Math.random() > 0.3 ? '#D4B76A' : '#F5E6BE', // Gold variation
      });
    }
    
    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  // Shattering red wax seal fragments
  const spawnWaxFragments = () => {
    const fragmentCount = 18;
    const newParticles = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < fragmentCount; i++) {
      const angle = (Math.random() * 180 + 270) * (Math.PI / 180); // Upward semi-circle
      const speed = Math.random() * 6 + 2;
      
      newParticles.push({
        type: 'wax',
        x: centerX + (Math.random() - 0.5) * 10,
        y: centerY + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.25, // heavy fall
        drag: 0.99,
        size: Math.random() * 4 + 2.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        life: 1.0,
        decay: 0.005, // last longer while falling
        color: Math.random() > 0.5 ? '#B83A30' : '#8B2020', // red wax tones
      });
    }
    
    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  // Rose petals floating up when book is open
  const startSpawningRosePetals = () => {
    const interval = setInterval(() => {
      // Exit if page unmounted
      if (!canvasRef.current) {
        clearInterval(interval);
        return;
      }
      
      const petal = {
        type: 'petal',
        x: (window.innerWidth / 2) + (Math.random() - 0.5) * 350,
        y: window.innerHeight + 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1.2 - Math.random() * 2.2, // rising
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        swaySeed: Math.random() * 100,
        swayWidth: Math.random() * 0.8 + 0.3,
      };
      
      particlesRef.current = [...particlesRef.current, petal];
    }, 90);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center font-display z-[100] preserve-3d">
      <style>{styleBlock}</style>
      
      {/* --------------------------------------
          CINEMATIC LAYERING BACKGROUND
          -------------------------------------- */}
      
      {/* Sunset Horizon sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d21] via-[#1b223c] via-[#8c3a5c] via-[#d45d55] to-[#f4be71] z-0" />
      
      {/* Volumetric Sunlight Rays Overlay (from horizon) */}
      <div 
        className="absolute w-[200vmax] h-[200vmax] -bottom-[50vmax] left-1/2 -translate-x-1/2 z-1 pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(244, 190, 113, 0.4) 0%, rgba(140, 58, 92, 0) 60%)',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Sun disk set in the horizon */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[26%] w-[20vw] h-[20vw] min-w-[120px] min-h-[120px] rounded-full bg-gradient-to-b from-[#fff6d6] to-[#ffab5c] shadow-[0_0_80px_rgba(255,214,112,0.6)] z-1 opacity-90 animate-sun" />

      {/* Atmospheric Soft Fog */}
      <div 
        className="absolute -left-1/2 bottom-[15%] w-[200%] h-[15%] pointer-events-none z-2 animate-fog-slow opacity-15 filter blur-xl"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 235, 200, 0.6) 30%, rgba(255, 235, 200, 0.6) 70%, transparent 100%)',
        }}
      />
      <div 
        className="absolute -right-1/2 bottom-[10%] w-[200%] h-[20%] pointer-events-none z-3 animate-fog-fast opacity-10 filter blur-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent 100%)',
        }}
      />

      {/* Mediterranean Sea horizon box */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[28%] z-2 shadow-[inset_0_10px_20px_-10px_rgba(0,0,0,0.5)]"
        style={{
          background: 'linear-gradient(to bottom, #2b708d 0%, #153c58 60%, #0a1f33 100%)',
        }}
      >
        {/* Animated Sea Waves */}
        <svg className="absolute top-0 left-0 w-[200%] h-6 opacity-30 text-[#4ca6c6] animate-wave-fast pointer-events-none" viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none">
          <path d="M0,10 C150,0 250,20 400,10 C550,0 650,20 800,10 C950,0 1050,20 1200,10 C1350,0 1450,20 1600,10 L1600,24 L0,24 Z" fill="currentColor" />
        </svg>
        <svg className="absolute top-1 left-[-20%] w-[200%] h-6 opacity-20 text-[#216d8a] animate-wave-slow pointer-events-none" viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none">
          <path d="M0,12 C120,4 280,20 400,12 C520,4 680,20 800,12 C920,4 1080,20 1200,12 C1320,4 1480,20 1600,12 L1600,24 L0,24 Z" fill="currentColor" />
        </svg>

        {/* Small Fishing Boat Rocking */}
        <div className="absolute left-[38%] top-[-8px] z-3 animate-boat">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {/* Hull */}
            <path d="M5,25 L10,32 L30,32 L35,25 Z" fill="#1b1815" />
            <path d="M3,25 C10,25 30,25 37,25 L34,28 C28,29 12,29 6,28 Z" fill="#c8a45d" />
            {/* Mast & Sails */}
            <line x1="20" y1="5" x2="20" y2="25" stroke="#1b1815" strokeWidth="1.5" />
            <path d="M20,6 L10,22 L20,22 Z" fill="#FAF6EE" opacity="0.9" />
            <path d="M21,8 L29,22 L21,22 Z" fill="#E8D7B9" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Djerba Island Architecture Silhouettes on Edges */}
      {/* Left side houses */}
      <div className="absolute left-[-20px] bottom-[18%] w-[280px] h-[150px] z-3 opacity-30 hidden md:block select-none pointer-events-none">
        <svg viewBox="0 0 200 100" fill="#fff" className="filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          {/* Domed Houch outline */}
          <rect x="10" y="40" width="70" height="60" rx="3" fill="#ffffff" />
          <path d="M10,40 Q45,15 80,40 Z" fill="#ffffff" />
          {/* Blue door */}
          <path d="M35,100 L35,80 A10,10 0 0,1 55,80 L55,100 Z" fill="#1D5FA7" />
          {/* Mini house adjoining */}
          <rect x="80" y="55" width="50" height="45" rx="2" fill="#f8f4ec" />
          <path d="M80,55 Q105,35 130,55 Z" fill="#f8f4ec" />
        </svg>
      </div>
      
      {/* Right side houses */}
      <div className="absolute right-[-40px] bottom-[16%] w-[260px] h-[140px] z-3 opacity-25 hidden md:block select-none pointer-events-none">
        <svg viewBox="0 0 200 100" fill="#fff" className="filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          <rect x="90" y="30" width="80" height="70" rx="3" fill="#ffffff" />
          <path d="M90,30 Q130,0 170,30 Z" fill="#ffffff" />
          <path d="M120,100 L120,75 A12,12 0 0,1 144,75 L144,100 Z" fill="#1D5FA7" />
          <rect x="40" y="50" width="50" height="50" rx="2" fill="#f8f4ec" />
        </svg>
      </div>

      {/* Swaying Palm Trees framing the sunset */}
      {/* Left Palm tree */}
      <div className="absolute left-[-50px] bottom-0 w-[220px] h-[75vh] z-4 pointer-events-none origin-bottom animate-palm-left">
        <svg width="100%" height="100%" viewBox="0 0 200 600" fill="none">
          <path d="M50,600 Q90,350 150,50" stroke="#322216" strokeWidth="18" strokeLinecap="round" />
          <path d="M50,600 Q90,350 150,50" stroke="#4a3b2c" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
          {/* Fronds */}
          <path d="M150,50 Q100,60 10,120" fill="#697b48" opacity="0.95" />
          <path d="M150,50 Q120,10 50,-40" fill="#7A8B5B" opacity="0.9" />
          <path d="M150,50 Q170,0 220,-20" fill="#697b48" opacity="0.95" />
          <path d="M150,50 Q190,80 260,90" fill="#7A8B5B" opacity="0.9" />
          <path d="M150,50 Q160,110 130,220" fill="#697b48" opacity="0.9" />
          <path d="M150,50 Q130,80 80,160" fill="#546339" opacity="0.95" />
        </svg>
      </div>

      {/* Right Palm tree */}
      <div className="absolute right-[-50px] bottom-0 w-[220px] h-[75vh] z-4 pointer-events-none origin-bottom animate-palm-right">
        <svg width="100%" height="100%" viewBox="0 0 200 600" fill="none">
          <path d="M50,600 Q90,350 150,50" stroke="#322216" strokeWidth="18" strokeLinecap="round" />
          <path d="M50,600 Q90,350 150,50" stroke="#4a3b2c" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
          <path d="M150,50 Q100,60 10,120" fill="#697b48" opacity="0.95" />
          <path d="M150,50 Q120,10 50,-40" fill="#7A8B5B" opacity="0.9" />
          <path d="M150,50 Q170,0 220,-20" fill="#697b48" opacity="0.95" />
          <path d="M150,50 Q190,80 260,90" fill="#7A8B5B" opacity="0.9" />
          <path d="M150,50 Q160,110 130,220" fill="#697b48" opacity="0.9" />
          <path d="M150,50 Q130,80 80,160" fill="#546339" opacity="0.95" />
        </svg>
      </div>

      {/* Framing Bougainvillea Vines in the top corners */}
      {/* Top Left Vine */}
      <div className="absolute left-0 top-0 w-[250px] h-[250px] z-5 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M0,0 Q60,20 120,60 Q150,90 130,130" stroke="#4a3b2c" strokeWidth="2.5" />
          <path d="M0,20 Q40,35 80,80" stroke="#4a3b2c" strokeWidth="1.5" />
          {/* Bougainvillea Flowers (Vibrant Pink leaf shapes) */}
          <g fill="#C44B8B">
            <path d="M40,20 Q35,5 30,22 Z" /> <path d="M32,24 Q50,15 45,35 Z" />
            <path d="M60,35 Q50,20 70,18 Z" /> <path d="M68,22 Q90,30 82,45 Z" fill="#E77BB5" />
            <path d="M100,50 Q90,65 110,65 Z" /> <path d="M112,58 Q125,40 130,55 Z" />
            <path d="M125,90 Q110,95 130,110 Z" /> <path d="M122,108 Q145,120 140,100 Z" fill="#C44B8B" />
          </g>
        </svg>
      </div>
      
      {/* Top Right Vine */}
      <div className="absolute right-0 top-0 w-[250px] h-[250px] z-5 pointer-events-none select-none transform scale-x-[-1]">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M0,0 Q60,20 120,60 Q150,90 130,130" stroke="#4a3b2c" strokeWidth="2.5" />
          <path d="M0,20 Q40,35 80,80" stroke="#4a3b2c" strokeWidth="1.5" />
          <g fill="#C44B8B">
            <path d="M40,20 Q35,5 30,22 Z" /> <path d="M32,24 Q50,15 45,35 Z" />
            <path d="M60,35 Q50,20 70,18 Z" /> <path d="M68,22 Q90,30 82,45 Z" fill="#E77BB5" />
            <path d="M100,50 Q90,65 110,65 Z" /> <path d="M112,58 Q125,40 130,55 Z" />
            <path d="M125,90 Q110,95 130,110 Z" /> <path d="M122,108 Q145,120 140,100 Z" fill="#C44B8B" />
          </g>
        </svg>
      </div>

      {/* Flying Birds in Sky */}
      <div className="animate-bird absolute z-2 pointer-events-none select-none">
        <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
          <path d="M0,8 Q8,0 16,8 Q24,0 32,8" stroke="#1d1610" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="animate-bird absolute z-2 pointer-events-none select-none" style={{ animationDelay: '6s', animationDuration: '24s', top: '15%' }}>
        <svg width="24" height="12" viewBox="0 0 32 16" fill="none">
          <path d="M0,8 Q8,0 16,8 Q24,0 32,8" stroke="#1d1610" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Canvas for Particle System Overlay (Dust, Exploding Gold, falling Wax, Rose Petals) */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[40]" />


      {/* --------------------------------------
          CENTRAL 3D BOOK & EXPERIENCE
          -------------------------------------- */}
      
      <div className="flex flex-col items-center justify-center z-30 select-none">
        <motion.div 
          className="relative flex items-center justify-center preserve-3d pointer-events-auto"
          style={{ 
            perspective: '1500px',
            transformStyle: 'preserve-3d'
          }}
          animate={isOpening ? { scale: 1.2, y: 15 } : { scale: 1, y: 0 }}
          transition={{ duration: 3.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Main Book Frame */}
          <div className="relative w-[90vw] max-w-[500px] h-[60vw] max-h-[350px] min-h-[260px] preserve-3d">
            
            {/* 1. Inside Pages Base (The Revealed Paper Card background) */}
            <div 
              className="absolute inset-1 rounded-xl bg-[#FAF6EE] z-10 flex border-2 border-[#e8d7b9] overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 30px rgba(200, 164, 93, 0.25), 0 10px 40px rgba(0, 0, 0, 0.4)',
                transform: 'translateZ(-2px)'
              }}
            >
              {/* Paper textured backdrop overlay */}
              <div className="absolute inset-0 pattern-ceramic opacity-[0.04] pointer-events-none" />
              
              {/* Book central fold shadow line */}
              <div 
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-12 opacity-40 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                }}
              />
              
              {/* Inside Left Page */}
              <div className="w-1/2 h-full flex flex-col justify-center items-center p-4 md:p-6 text-center z-11 border-r border-[#ebd7b4]/40">
                <span className="font-arabic text-[#c4923e] text-xs font-bold leading-none mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                
                <p className="font-arabic text-[#8b6527] text-[10px] sm:text-[11px] leading-relaxed max-w-[190px] mb-3 opacity-90">
                  ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجاً لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾
                </p>
                <div className="h-[0.5px] w-12 bg-[#c8a45d]/40 my-1" />
                <p className="font-arabic text-[#222] text-[9px] sm:text-[10px] leading-normal max-w-[180px] opacity-80 mt-1">
                  تدعوكم عائلاتنا لمشاركتنا فرحة العمر وميثاق الرباط المقدس في جزيرة الأحلام جربة.
                </p>
              </div>
              
              {/* Inside Right Page */}
              <div className="w-1/2 h-full flex flex-col justify-center items-center p-4 md:p-6 text-center z-11">
                <h3 className="font-calligraphy text-xl md:text-2xl text-[#8b6b30] font-bold leading-none"> Hichem & Wided</h3>
                <span className="font-calligraphy text-xs italic text-[#c8a45d] block mt-1">Together Forever</span>
                
                <div className="h-[0.5px] w-12 bg-[#c8a45d]/40 my-2" />
                
                <p className="font-display text-[9px] sm:text-[10px] text-[#444] leading-relaxed uppercase tracking-wider">
                  Le mariage royal
                  <br />
                  <span className="text-[#1D5FA7] font-semibold">8 Août 2026</span>
                  <br />
                  Radisson Blu, Djerba
                </p>
              </div>

              {/* Emerging Warm Glow Light Overlay when book opens */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div 
                    className="absolute inset-0 z-12 mix-blend-color-dodge pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 230, 160, 0.8) 0%, rgba(200, 164, 93, 0) 70%)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* --------------------------------------
                POP-UP SHADOWBOX 3D EFFECTS (Center Crease)
                -------------------------------------- */}
            
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] z-15 flex items-end justify-center pointer-events-none">
              
              {/* Layer 1: Sunset Sea backdrop (Z: -25px) */}
              <motion.div
                className="absolute bottom-6 w-[240px] h-[120px] origin-bottom flex items-end justify-center preserve-3d"
                style={{
                  transform: 'translateZ(-25px)',
                  filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.1))',
                }}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={isOpening ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 12, delay: 0.7 }}
              >
                <svg width="220" height="110" viewBox="0 0 220 110" className="opacity-90">
                  <defs>
                    <linearGradient id="popSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffd480" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#ff9980" stopOpacity="0.9"/>
                    </linearGradient>
                  </defs>
                  {/* Backdrop horizon */}
                  <path d="M0,110 Q110,30 220,110 Z" fill="url(#popSky)" />
                  <circle cx="110" cy="75" r="20" fill="#ffea9f" opacity="0.95" />
                  
                  {/* Sea waves silhouettes */}
                  <path d="M0,95 Q55,88 110,95 Q165,88 220,95 L220,110 L0,110 Z" fill="#2d87a7" opacity="0.6" />
                  <path d="M0,102 Q55,98 110,102 Q165,98 220,102 L220,110 L0,110 Z" fill="#154970" />
                </svg>
              </motion.div>

              {/* Layer 2: White Djerba House & Palm Trees (Z: -5px) */}
              <motion.div
                className="absolute bottom-6 w-[200px] h-[100px] origin-bottom flex items-end justify-center preserve-3d"
                style={{
                  transform: 'translateZ(-5px)',
                  filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))',
                }}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={isOpening ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 10, delay: 0.85 }}
              >
                <svg width="180" height="90" viewBox="0 0 180 90">
                  {/* Left Palm tree */}
                  <g transform="translate(10, 10) scale(0.55)">
                    <path d="M20,90 Q15,45 30,10" stroke="#523c2a" strokeWidth="5.5" fill="none" />
                    <path d="M30,10 Q5,-5 -15,15" fill="#758852" />
                    <path d="M30,10 Q15,-15 25,-25" fill="#8ca064" />
                    <path d="M30,10 Q45,-15 65,0" fill="#758852" />
                    <path d="M30,10 Q55,20 60,40" fill="#8ca064" />
                  </g>
                  {/* Right Palm tree */}
                  <g transform="translate(150, 15) scale(0.5) scaleX(-1)">
                    <path d="M20,90 Q15,45 30,10" stroke="#523c2a" strokeWidth="5.5" fill="none" />
                    <path d="M30,10 Q5,-5 -15,15" fill="#758852" />
                    <path d="M30,10 Q15,-15 25,-25" fill="#8ca064" />
                    <path d="M30,10 Q45,-15 65,0" fill="#758852" />
                  </g>
                  
                  {/* White Djerba House */}
                  <rect x="55" y="35" width="70" height="55" rx="3" fill="#ffffff" stroke="#ebd6b8" strokeWidth="0.8" />
                  {/* Dome roof */}
                  <path d="M55,35 Q90,5 125,35 Z" fill="#ffffff" stroke="#ebd6b8" strokeWidth="0.8" />
                  <path d="M72,35 Q90,15 108,35 Z" fill="#fcf9f2" opacity="0.9" />
                  {/* Blue Door */}
                  <path d="M82,90 L82,72 A8,8 0 0,1 98,72 L98,90 Z" fill="#1D5FA7" />
                  {/* Blue Windows */}
                  <path d="M64,58 L64,50 A4,4 0 0,1 72,50 L72,58 Z" fill="#1D5FA7" />
                  <path d="M108,58 L108,50 A4,4 0 0,1 116,50 L116,58 Z" fill="#1D5FA7" />
                </svg>
              </motion.div>

              {/* Layer 3: Gold Arch, Bougainvillea & Silhouette (Z: 20px) */}
              <motion.div
                className="absolute bottom-6 w-[170px] h-[90px] origin-bottom flex items-end justify-center preserve-3d"
                style={{
                  transform: 'translateZ(20px)',
                  filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.25))',
                }}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={isOpening ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 70, damping: 9, delay: 1.0 }}
              >
                <svg width="150" height="80" viewBox="0 0 150 80">
                  {/* Golden Islamic Arch */}
                  <path d="M20,80 L20,32 A55,55 0 0,1 130,32 L130,80" fill="none" stroke="#C8A45D" strokeWidth="3" />
                  <path d="M15,80 L15,32 A60,60 0 0,1 135,32 L135,80" fill="none" stroke="#C8A45D" strokeWidth="1" opacity="0.4" />
                  
                  {/* Hanging Bougainvillea Flowers (Vibrant Pink leaf clusters) */}
                  <g fill="#C44B8B">
                    <circle cx="18" cy="40" r="3.2" />
                    <circle cx="14" cy="35" r="2.5" />
                    <circle cx="22" cy="30" r="3" />
                    <circle cx="28" cy="22" r="3.5" />
                    <circle cx="36" cy="18" r="2.8" />
                    
                    <circle cx="50" cy="13" r="3.2" fill="#E77BB5" />
                    <circle cx="75" cy="8" r="3.8" />
                    <circle cx="100" cy="13" r="3.2" />
                    
                    <circle cx="114" cy="18" r="2.8" />
                    <circle cx="122" cy="22" r="3.5" />
                    <circle cx="128" cy="30" r="3" fill="#E77BB5" />
                    <circle cx="136" cy="35" r="2.5" />
                    <circle cx="132" cy="40" r="3.2" />
                  </g>
                  
                  {/* Silhouette of Groom & Bride */}
                  <g fill="#1a1815">
                    {/* Groom */}
                    <path d="M64,80 L64,57 L62,53 L64,48 L61,48 L61,44 L68,44 L68,48 L65,48 L67,53 L65,57 L65,80 Z" />
                    <circle cx="64.5" cy="41" r="3.2" />
                    {/* Bride (flowing gown representation) */}
                    <path d="M86,80 L74,80 L77,54 L80,50 L78,48 L77,48 L77,44 L84,44 L84,48 L83,48 L81,50 L84,54 Z" />
                    <circle cx="81" cy="41" r="3" />
                    {/* Floating pink veil detail */}
                    <path d="M81.5,39 Q87,41 85,47 Q82,50 81.5,46 Z" fill="#E77BB5" opacity="0.3" />
                  </g>
                </svg>
              </motion.div>
            </div>

            {/* 2. 3D LEFT COVER PANEL */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-1/2 origin-left z-20 cursor-pointer border-r border-[#ebd090]/25 shadow-[-15px_15px_40px_rgba(0,0,0,0.6)] preserve-3d"
              style={{
                borderRadius: '12px 0 0 12px',
              }}
              animate={isOpening ? { rotateY: -145 } : { rotateY: 0 }}
              transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              onClick={handleOpenBook}
            >
              {/* LEFT COVER FRONT PANEL (Outer Face) */}
              <div 
                className="absolute inset-0 backface-hidden flex flex-col justify-between p-6 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0e1b36 0%, #060e1f 100%)',
                  boxShadow: 'inset 0 0 25px rgba(200, 164, 93, 0.15)',
                  borderRadius: '12px 0 0 12px',
                }}
              >
                {/* Navy Leather texture overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Left side book spine representation */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-5 rounded-l-lg border-r border-gold/10"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.5) 100%)',
                  }}
                />

                {/* Gold Foil corner decorations (Top Left) */}
                <div className="absolute top-4 left-6 w-8 h-8 opacity-90 select-none">
                  <svg viewBox="0 0 30 30" fill="none">
                    <path d="M2,2 L28,2 L28,4 L4,4 L4,28 L2,28 Z" fill="#C8A45D" />
                    <path d="M6,6 L20,6 L20,7 L7,7 L7,20 L6,20 Z" fill="#C8A45D" opacity="0.6" />
                    <circle cx="5" cy="5" r="1.5" fill="#C8A45D" />
                  </svg>
                </div>
                
                {/* Gold Foil corner decorations (Bottom Left) */}
                <div className="absolute bottom-4 left-6 w-8 h-8 opacity-90 select-none transform scale-y-[-1]">
                  <svg viewBox="0 0 30 30" fill="none">
                    <path d="M2,2 L28,2 L28,4 L4,4 L4,28 L2,28 Z" fill="#C8A45D" />
                    <path d="M6,6 L20,6 L20,7 L7,7 L7,20 L6,20 Z" fill="#C8A45D" opacity="0.6" />
                    <circle cx="5" cy="5" r="1.5" fill="#C8A45D" />
                  </svg>
                </div>

                {/* Border filigree */}
                <div className="absolute left-7 right-2 top-3 h-[1px] bg-gradient-to-r from-[#C8A45D] to-transparent opacity-45" />
                <div className="absolute left-7 right-2 bottom-3 h-[1px] bg-gradient-to-r from-[#C8A45D] to-transparent opacity-45" />
                <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-[#C8A45D] opacity-45" />

                {/* Name "Wided" Calligraphy - Right aligned to seam */}
                <div className="absolute right-9 top-1/2 -translate-y-1/2 flex flex-col items-end pr-3">
                  <span className="font-arabic text-[#c8a45d]/40 text-[20px] tracking-widest block mb-0.5 select-none uppercase"> العريس</span>
                  <h2 className="font-calligraphy text-3xl sm:text-3xl lg:text-4xl text-gold font-bold leading-none tracking-wide text-shadow-gold">
                     Hichem
                  </h2>
                  <span className="font-arabic text-gold/75 text-xl font-semibold mt-1"> هشام</span>
                  <div className="h-[0.5px] w-12 bg-gradient-to-l from-gold/50 to-transparent mt-2" />
                </div>

                {/* Left Half Wax Seal (Visible when open) */}
                <AnimatePresence>
                  {isOpening && (
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-22 select-none"
                      style={{
                        width: '32px',
                        height: '64px',
                        borderRadius: '64px 0 0 64px',
                        background: 'radial-gradient(circle at 100% 50%, #d4564a, #8b2020)',
                        boxShadow: '-4px 4px 12px rgba(139, 32, 32, 0.4)',
                        border: '1.5px solid #8b2020',
                        borderRight: 'none',
                      }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Left portion of text inside seal */}
                      <span className="absolute right-1 top-[22px] font-calligraphy text-white text-xs font-bold leading-none">
                        W
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LEFT COVER BACK PANEL (Inside Page Face) */}
              <div 
                className="absolute inset-0 bg-[#FAF6EE] p-5 rounded-l-lg border-2 border-[#e8d7b9] flex flex-col justify-center backface-hidden"
                style={{ 
                  transform: 'rotateY(180deg)',
                  boxShadow: 'inset 0 0 20px rgba(232, 215, 185, 0.5)'
                }}
              >
                {/* Decorative border */}
                <div className="absolute inset-2 border border-[#e8d7b9]/60 pointer-events-none rounded" />
                <span className="font-arabic text-[#1D5FA7]/40 text-xs block text-center mb-1">دعوة زفاف ملكية</span>
                <div className="h-[0.5px] w-16 bg-[#C8A45D]/40 mx-auto my-2" />
                <p className="font-arabic text-[#6B5D4A] text-[9px] leading-relaxed text-center opacity-85">
                  بكل حب وترحاب، يسعدنا أن نفتح كتاب عهدنا الملكي بمشاركتكم الفرحة.
                </p>
              </div>
            </motion.div>

            {/* 3. 3D RIGHT COVER PANEL */}
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-1/2 origin-right z-20 cursor-pointer border-l border-[#ebd090]/25 shadow-[15px_15px_40px_rgba(0,0,0,0.6)] preserve-3d"
              style={{
                borderRadius: '0 12px 12px 0',
              }}
              animate={isOpening ? { rotateY: 145 } : { rotateY: 0 }}
              transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              onClick={handleOpenBook}
            >
              {/* RIGHT COVER FRONT PANEL (Outer Face) */}
              <div 
                className="absolute inset-0 backface-hidden flex flex-col justify-between p-6 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0e1b36 0%, #060e1f 100%)',
                  boxShadow: 'inset 0 0 25px rgba(200, 164, 93, 0.15)',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Right side book spine representation */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-5 rounded-r-lg border-l border-gold/10"
                  style={{
                    background: 'linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.5) 100%)',
                  }}
                />

                {/* Gold Foil corner decorations (Top Right) */}
                <div className="absolute top-4 right-6 w-8 h-8 opacity-90 select-none transform scale-x-[-1]">
                  <svg viewBox="0 0 30 30" fill="none">
                    <path d="M2,2 L28,2 L28,4 L4,4 L4,28 L2,28 Z" fill="#C8A45D" />
                    <path d="M6,6 L20,6 L20,7 L7,7 L7,20 L6,20 Z" fill="#C8A45D" opacity="0.6" />
                    <circle cx="5" cy="5" r="1.5" fill="#C8A45D" />
                  </svg>
                </div>
                
                {/* Gold Foil corner decorations (Bottom Right) */}
                <div className="absolute bottom-4 right-6 w-8 h-8 opacity-90 select-none transform scale-y-[-1] scale-x-[-1]">
                  <svg viewBox="0 0 30 30" fill="none">
                    <path d="M2,2 L28,2 L28,4 L4,4 L4,28 L2,28 Z" fill="#C8A45D" />
                    <path d="M6,6 L20,6 L20,7 L7,7 L7,20 L6,20 Z" fill="#C8A45D" opacity="0.6" />
                    <circle cx="5" cy="5" r="1.5" fill="#C8A45D" />
                  </svg>
                </div>

                {/* Border filigree */}
                <div className="absolute right-7 left-2 top-3 h-[1px] bg-gradient-to-l from-[#C8A45D] to-transparent opacity-45" />
                <div className="absolute right-7 left-2 bottom-3 h-[1px] bg-gradient-to-l from-[#C8A45D] to-transparent opacity-45" />
                <div className="absolute right-6 top-4 bottom-4 w-[1px] bg-[#C8A45D] opacity-45" />

                {/* Name "Hichem" Calligraphy - Left aligned to seam */}
                <div className="absolute left-9 top-1/2 -translate-y-1/2 flex flex-col items-start pl-3">
                  <span className="font-arabic text-[#c8a45d]/40 text-[20px] tracking-widest block mb-0.5 select-none uppercase">العروس </span>
                  <h2 className=" font-calligraphy text-2xl sm:text-3xl lg:text-4xl text-gold font-bold leading-none tracking-wide text-shadow-gold">
                       Wided
                  </h2>
                  <span className="font-arabic text-gold/75 text-xl font-semibold mt-1">وداد</span>
                  <div className="h-[0.5px] w-12 bg-gradient-to-r from-gold/50 to-transparent mt-2" />
                
                </div>

                {/* Right Half Wax Seal (Visible when open) */}
                <AnimatePresence>
                  {isOpening && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-22 select-none"
                      style={{
                        width: '32px',
                        height: '64px',
                        borderRadius: '0 64px 64px 0',
                        background: 'radial-gradient(circle at 0% 50%, #d4564a, #8b2020)',
                        boxShadow: '4px 4px 12px rgba(139, 32, 32, 0.4)',
                        border: '1.5px solid #8b2020',
                        borderLeft: 'none',
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Right portion of text inside seal */}
                      <span className="absolute left-1.5 top-[22px] font-calligraphy text-white text-xs font-bold leading-none">
                        H
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT COVER BACK PANEL (Inside Page Face) */}
              <div 
                className="absolute inset-0 bg-[#FAF6EE] p-5 rounded-r-lg border-2 border-[#e8d7b9] flex flex-col justify-center backface-hidden"
                style={{ 
                  transform: 'rotateY(180deg)',
                  boxShadow: 'inset 0 0 20px rgba(232, 215, 185, 0.5)'
                }}
              >
                <div className="absolute inset-2 border border-[#e8d7b9]/60 pointer-events-none rounded" />
                <span className="font-display text-[#1D5FA7]/40 text-xs block text-center mb-1">WEDDING INVITATION</span>
                <div className="h-[0.5px] w-16 bg-[#C8A45D]/40 mx-auto my-2" />
                <p className="font-display text-[#6B5D4A] text-[9px] leading-relaxed text-center tracking-wider opacity-85">
                  C'est avec une joie immense que nous vous convions à célébrer notre union sacrée.
                </p>
              </div>
            </motion.div>

            {/* 4. CLOSED STATE WAX SEAL (Centered Overlay, zIndex 30) */}
            {!isOpening && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex items-center justify-center select-none"
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #e85a4f 0%, #b83a30 40%, #8b2020 80%, #5c1010 100%)',
                  boxShadow: '0 8px 25px rgba(139, 32, 32, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
                  border: '1.5px solid #8b2020',
                }}
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenBook}
              >
                {/* Stamp monogram initials in seal */}
                <span className="font-calligraphy text-white text-base font-bold tracking-tight text-shadow-navy">
                  H & W
                </span>
                
                {/* Subtle gold stamp border rim */}
                <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />
              </motion.div>
            )}

          </div>
        </motion.div>

        {/* Glow-pulsing Call-To-Action below the book */}
        {!isOpening && (
          <motion.div
            className="mt-8 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
            onClick={handleOpenBook}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-arabic text-sm tracking-widest text-[#f5ebd7] font-semibold animate-pulse-glow">
              اضغط لفتح الكتاب الملكي
            </p>
            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-[#c8a45d] animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
              Click to Open
            </p>
            
            {/* Soft gold down-chevron */}
            <motion.div
              className="mt-1"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8A45D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
      
    </div>
  );
}
