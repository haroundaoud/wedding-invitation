import { useEffect, useState } from 'react';

function Petal({ delay, duration, left, size }) {
  return (
    <div
      className="floating-petal"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

function Bird({ top, delay, duration }) {
  return (
    <svg
      className="flying-bird"
      style={{
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      width="24"
      height="12"
      viewBox="0 0 24 12"
      fill="none"
    >
      <path
        d="M0 6 Q6 0 12 6 Q18 0 24 6"
        stroke="#2D2A24"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function PalmLeaf({ side, top }) {
  return (
    <svg
      className="floating-palm"
      style={{
        [side]: '-30px',
        top: `${top}%`,
        transform: side === 'right' ? 'scaleX(-1)' : 'none',
      }}
      width="120"
      height="200"
      viewBox="0 0 120 200"
      fill="none"
    >
      <path
        d="M60 200 Q40 150 10 100 Q30 120 60 110 Q30 80 5 30 Q35 70 60 60 Q40 30 30 0 Q55 40 65 60 Q70 30 80 0 Q75 40 70 60 Q90 30 110 10 Q85 50 70 70 Q100 60 120 50 Q90 80 70 85 Q100 100 115 130 Q85 110 65 100Z"
        fill="#7A8B5B"
        opacity="0.6"
      />
    </svg>
  );
}

export default function FloatingElements() {
  const [petals, setPetals] = useState([]);
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    // Generate random petals
    const newPetals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 10,
      left: Math.random() * 100,
      size: 8 + Math.random() * 10,
    }));
    setPetals(newPetals);

    // Generate random birds
    const newBirds = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: 5 + Math.random() * 20,
      delay: i * 8 + Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
    setBirds(newBirds);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 50 }}>
      {/* Floating petals */}
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} />
      ))}

      {/* Flying birds */}
      {birds.map((bird) => (
        <Bird key={bird.id} {...bird} />
      ))}

      {/* Palm leaves on edges */}
      <PalmLeaf side="left" top={15} />
      <PalmLeaf side="right" top={45} />
      <PalmLeaf side="left" top={75} />
    </div>
  );
}
