import { useState } from 'react';
import BloomExplosion from './BloomExplosion';

interface Props {
  visible: boolean;
  blooming: boolean;
  onGiftClick: () => void;
}

export default function OpeningScene({ visible, blooming, onGiftClick }: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    onGiftClick();
  };

  return (
    <>
      <div
        id="scene-opening"
        className={!visible ? 'fade-out' : ''}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #1a0510 0%, #0d0608 60%, #050203 100%)',
          transition: 'opacity 1.5s ease',
          opacity: !visible ? 0 : 1,
          pointerEvents: !visible ? 'none' : 'all',
        }}
      >
        {/* Gift box */}
        <div
          className={`gift-box-container${blooming ? ' opening' : ''}`}
          onClick={handleClick}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          {/* Pulse rings */}
          <div className="pulse-ring" />
          <div className="pulse-ring" />
          <div className="pulse-ring" />

          <GiftBoxSVG opening={blooming} />
        </div>

        <p className="for-you-text">For you ❤️</p>
        <p className="click-hint" style={{ opacity: blooming ? 0 : 1, transition: 'opacity 0.5s' }}>
          click to open
        </p>
      </div>

      <BloomExplosion active={blooming} />
    </>
  );
}

function GiftBoxSVG({ opening }: { opening: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c45c7e" />
          <stop offset="100%" stopColor="#a03060" />
        </linearGradient>
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4678a" />
          <stop offset="100%" stopColor="#b03d65" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe4f0" />
          <stop offset="100%" stopColor="#ffc0d0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow */}
      <ellipse cx="100" cy="160" rx="60" ry="10" fill="rgba(255,100,160,0.15)" />

      {/* Box body */}
      <rect
        x="30" y="105" width="140" height="85"
        rx="4" ry="4"
        fill="url(#boxGrad)"
        filter="url(#glow)"
      />
      {/* Box shine */}
      <rect x="30" y="105" width="140" height="12" rx="2" fill="rgba(255,255,255,0.1)" />

      {/* Ribbon horizontal on box */}
      <rect
        className="gift-ribbon-h"
        x="30" y="130" width="140" height="14"
        fill="url(#ribbonGrad)"
        opacity={opening ? 0 : 1}
        style={{ transition: 'opacity 0.3s ease' }}
      />

      {/* Lid */}
      <g
        className="gift-lid"
        style={{
          transform: opening ? 'translateY(-90px) rotate(-20deg) scale(0.8)' : 'translateY(0)',
          transformOrigin: '100px 105px',
          transition: 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
          opacity: opening ? 0 : 1,
        }}
      >
        <rect
          x="22" y="88" width="156" height="22"
          rx="4" ry="4"
          fill="url(#lidGrad)"
          filter="url(#glow)"
        />
        <rect x="22" y="88" width="156" height="8" rx="3" fill="rgba(255,255,255,0.15)" />
        {/* Ribbon on lid */}
        <rect
          className="gift-ribbon-h"
          x="22" y="90" width="156" height="10"
          fill="url(#ribbonGrad)"
          opacity={opening ? 0 : 1}
          style={{ transition: 'opacity 0.3s ease' }}
        />
      </g>

      {/* Ribbon vertical */}
      <rect
        className="gift-ribbon-v"
        x="91" y="88" width="18" height="102"
        fill="url(#ribbonGrad)"
        opacity={opening ? 0 : 1}
        style={{ transition: 'opacity 0.3s ease' }}
      />

      {/* Bow left loop */}
      <g
        className="gift-bow-left"
        style={{
          transform: opening ? 'translateX(-50px) rotate(-45deg)' : 'translateX(0)',
          transformOrigin: '100px 88px',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
          opacity: opening ? 0 : 1,
        }}
      >
        <path
          d="M 100 88 C 80 60, 50 55, 55 75 C 60 90, 90 88, 100 88"
          fill="url(#ribbonGrad)"
          filter="url(#softGlow)"
        />
      </g>

      {/* Bow right loop */}
      <g
        className="gift-bow-right"
        style={{
          transform: opening ? 'translateX(50px) rotate(45deg)' : 'translateX(0)',
          transformOrigin: '100px 88px',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
          opacity: opening ? 0 : 1,
        }}
      >
        <path
          d="M 100 88 C 120 60, 150 55, 145 75 C 140 90, 110 88, 100 88"
          fill="url(#ribbonGrad)"
          filter="url(#softGlow)"
        />
      </g>

      {/* Bow center knot */}
      <circle
        cx="100" cy="88" r="8"
        fill="#ffeef5"
        filter="url(#softGlow)"
        opacity={opening ? 0 : 1}
        style={{ transition: 'opacity 0.3s ease' }}
      />

      {/* Magic sparkles */}
      {!opening && (
        <>
          <circle cx="165" cy="70" r="3" fill="#ffcce0" opacity="0.8">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="35" cy="80" r="2" fill="#ffd6e7" opacity="0.7">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="155" cy="130" r="2.5" fill="#ffb3d1" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" begin="1s" repeatCount="indefinite" />
          </circle>
          <text x="168" y="62" fontSize="12" fill="#ffcce0" opacity="0.7" filter="url(#glow)">✦</text>
          <text x="25" y="100" fontSize="10" fill="#ffd6e7" opacity="0.6" filter="url(#glow)">✦</text>
        </>
      )}
    </svg>
  );
}
