import { useMemo } from 'react';
import type { AppStage } from '../App';

interface Props {
  stage: AppStage;
}

export default function BackgroundParticles({ stage }: Props) {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      color: [
        'rgba(255, 150, 190, 0.6)',
        'rgba(255, 180, 210, 0.4)',
        'rgba(255, 220, 235, 0.5)',
        'rgba(255, 100, 160, 0.4)',
        'rgba(255, 200, 220, 0.6)',
      ][Math.floor(Math.random() * 5)],
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * -4,
    }));
  }, []);

  return (
    <>
      {/* Stars */}
      {stars.map(s => (
        <div
          key={`star-${s.id}`}
          className="star-particle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={`part-${p.id}`}
          className="bg-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: stage !== 'opening' ? 0.8 : 0.5,
          }}
        />
      ))}
    </>
  );
}
