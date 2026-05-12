import { useEffect, useState } from 'react';

interface BloomParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  distance: number;
  type: 'circle' | 'petal' | 'heart' | 'sparkle';
}

const PETALS = ['🌸', '🌺', '🌼', '✿', '❀', '🌹'];
const COLORS = [
  '#ffb3d1', '#ffd6e7', '#ff9abf', '#ffe4f0', '#ffcce0',
  '#ffc4d0', '#ff6fa8', '#fff0f5', '#ffd1dc', '#ffaac8',
  '#fffacd', '#fff8dc', '#ffe4c4',
];

export default function BloomExplosion({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<BloomParticle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    
    setVisible(true);
    
    const newParticles: BloomParticle[] = [];
    const count = 120;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360 + Math.random() * 30;
      const distance = 80 + Math.random() * 300;
      const types: BloomParticle['type'][] = ['circle', 'circle', 'circle', 'petal', 'heart', 'sparkle'];
      
      newParticles.push({
        id: i,
        x: 50,
        y: 50,
        size: Math.random() * 20 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle,
        distance,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    
    setParticles(newParticles);
    
    const timer = setTimeout(() => {
      setVisible(false);
      setParticles([]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [active]);

  if (!visible) return null;

  return (
    <div className="bloom-container" style={{ zIndex: 200 }}>
      {/* Central glow */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,220,0.9), rgba(255,150,190,0.5), transparent)',
        animation: 'centralGlow 2s ease forwards',
        boxShadow: '0 0 100px rgba(255,150,190,0.8), 0 0 200px rgba(255,100,160,0.4)',
      }} />

      {particles.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        const duration = 1.5 + Math.random() * 1;
        const delay = Math.random() * 0.3;

        if (p.type === 'petal') {
          return (
            <div
              key={p.id}
              className="bloom-petal"
              style={{
                '--tx': `${tx}px`,
                '--ty': `${ty}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              } as React.CSSProperties & Record<string, string>}
            >
              {PETALS[Math.floor(Math.random() * PETALS.length)]}
            </div>
          );
        }

        if (p.type === 'heart') {
          return (
            <div
              key={p.id}
              className="bloom-heart"
              style={{
                '--tx': `${tx}px`,
                '--ty': `${ty}px`,
                animationDuration: `${duration + 0.5}s`,
                animationDelay: `${delay}s`,
                fontSize: `${p.size}px`,
              } as React.CSSProperties & Record<string, string>}
            >
              ♥
            </div>
          );
        }

        return (
          <div
            key={p.id}
            className="bloom-particle"
            style={{
              width: `${p.size}px`,
              height: p.type === 'sparkle' ? `${p.size * 4}px` : `${p.size}px`,
              background: p.type === 'sparkle'
                ? `linear-gradient(${p.angle}deg, transparent, ${p.color}, transparent)`
                : `radial-gradient(circle, white, ${p.color})`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              borderRadius: p.type === 'sparkle' ? '2px' : '50%',
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties & Record<string, string>}
          />
        );
      })}

      <style>{`
        @keyframes centralGlow {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(3); opacity: 0.8; }
          100% { transform: scale(5); opacity: 0; }
        }
        .bloom-particle { animation-fill-mode: forwards; }
        .bloom-petal { animation-fill-mode: forwards; }
        .bloom-heart { animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
}
