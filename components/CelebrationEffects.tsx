
import React, { useEffect, useState } from 'react';

export const CelebrationEffects: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate constant particles
    const items = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 15 + 10}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 6 + 4}s`,
      content: ['✨', '🌸', '💖', '🕊️'][Math.floor(Math.random() * 4)]
    }));
    setParticles(items);

    // Continuous soft confetti
    const interval = setInterval(() => {
      // @ts-ignore
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 40,
        origin: { x: 0, y: 0.8 },
        colors: ['#ffb7c5', '#ffffff'],
        ticks: 200
      });
      // @ts-ignore
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 40,
        origin: { x: 1, y: 0.8 },
        colors: ['#ffb7c5', '#ffffff'],
        ticks: 200
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div 
          key={p.id}
          className="absolute animate-float-slow opacity-20 transition-opacity duration-1000"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        >
          {p.content}
        </div>
      ))}
    </div>
  );
};
