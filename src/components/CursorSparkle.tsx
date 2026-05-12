import { useEffect, useRef } from 'react';

const COLORS = [
  '#ffb3d1', '#ffd6e7', '#ff9abf', '#ffe4f0', '#ffcce0',
  '#ffc0cb', '#ff85ab', '#ffeef5', '#ff6fa8', '#ffdde8',
];

export default function CursorSparkle() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const trailCounter = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Create sparkle trail
      trailCounter.current++;
      if (trailCounter.current % 3 === 0) {
        const trail = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        trail.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 99997;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 ${size * 2}px ${color};
          animation: trailFade ${0.5 + Math.random() * 0.5}s ease forwards;
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
      }

      // Occasionally emit a heart
      if (trailCounter.current % 20 === 0) {
        const heart = document.createElement('div');
        const drift = (Math.random() - 0.5) * 60;
        heart.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          font-size: ${10 + Math.random() * 10}px;
          pointer-events: none;
          z-index: 99996;
          transform: translate(-50%, -50%);
          animation: cursorHeartFloat 1.2s ease forwards;
          color: #ff85ab;
          text-shadow: 0 0 8px rgba(255,133,171,0.8);
        `;
        heart.textContent = '♥';

        const styleId = 'cursor-heart-anim';
        if (!document.getElementById(styleId)) {
          const s = document.createElement('style');
          s.id = styleId;
          s.textContent = `
            @keyframes cursorHeartFloat {
              0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
              50% { opacity: 1; transform: translate(calc(-50% + ${drift}px), calc(-50% - 40px)) scale(1.2); }
              100% { transform: translate(calc(-50% + ${drift * 1.5}px), calc(-50% - 80px)) scale(0.5); opacity: 0; }
            }
          `;
          document.head.appendChild(s);
        }

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1300);
      }
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-sparkle"
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999 }}
    />
  );
}
