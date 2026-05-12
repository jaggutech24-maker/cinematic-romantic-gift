import { useEffect, useRef } from 'react';
import type { Photo } from '../data/photos';

interface Props {
  photo: Photo | null;
  onClose: () => void;
}

export default function ExpandedPhoto({ photo, onClose }: Props) {
  const isVisible = photo !== null;
  const prevPhotoRef = useRef<Photo | null>(null);

  useEffect(() => {
    if (photo) {
      prevPhotoRef.current = photo;
    }
  }, [photo]);

  const displayPhoto = photo || prevPhotoRef.current;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop blur */}
      <div
        className={`expanded-bg-blur${isVisible ? ' visible' : ''}`}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 3, 8, 0.8)',
          backdropFilter: isVisible ? 'blur(18px) saturate(1.2)' : 'blur(0px)',
          WebkitBackdropFilter: isVisible ? 'blur(18px) saturate(1.2)' : 'blur(0px)',
          zIndex: 499,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.7s ease, backdrop-filter 0.7s ease',
          cursor: 'pointer',
          pointerEvents: isVisible ? 'all' : 'none',
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="close-btn"
        style={{
          position: 'fixed',
          top: 'clamp(16px, 3vh, 30px)',
          right: 'clamp(16px, 3vw, 30px)',
          zIndex: 502,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 200, 220, 0.3)',
          color: 'rgba(255, 220, 235, 0.9)',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s, background 0.3s ease',
          pointerEvents: isVisible ? 'all' : 'none',
        }}
      >
        ✕
      </button>

      {/* Main overlay */}
      <div
        className={`expanded-overlay${isVisible ? ' visible' : ''}`}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'none' : 'none',
          gap: 'clamp(20px, 4vw, 60px)',
          flexWrap: 'wrap',
          padding: '20px',
          transition: 'opacity 0.6s ease',
        }}
      >
        {displayPhoto && (
          <>
            {/* Polaroid */}
            <div
              style={{
                position: 'relative',
                background: '#fffbf5',
                padding: '14px 14px 52px 14px',
                boxShadow: isVisible
                  ? '0 30px 100px rgba(0,0,0,0.7), 0 0 80px rgba(255,150,190,0.4), 0 0 0 1px rgba(255,220,230,0.4)'
                  : '0 10px 40px rgba(0,0,0,0.4)',
                borderRadius: '2px',
                transform: isVisible
                  ? 'scale(1) rotate(-2deg)'
                  : 'scale(0.7) rotate(-3deg)',
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.8s ease',
                maxWidth: 'min(42vw, 360px)',
                width: '100%',
                animation: isVisible ? 'expandedFloat 4s ease-in-out infinite' : 'none',
                zIndex: 501,
              }}
            >
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                inset: '-30px',
                background: 'radial-gradient(ellipse at center, rgba(255, 150, 190, 0.25), transparent 65%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: 'glowPulse 3s ease-in-out infinite',
                zIndex: -1,
              }} />

              <img
                src={displayPhoto.src}
                alt={displayPhoto.label}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '1px',
                  filter: 'saturate(1.05) brightness(1.02)',
                }}
              />

              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(12px, 1.8vw, 16px)',
                color: '#7a5c6a',
                textAlign: 'center',
                paddingTop: '10px',
                letterSpacing: '0.03em',
              }}>
                {displayPhoto.label}
              </p>

              {/* Date stamp on back of photo */}
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '10px',
                color: 'rgba(120, 80, 95, 0.4)',
                textAlign: 'right',
                paddingTop: '4px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {displayPhoto.note.date}
              </p>
            </div>

            {/* Love Note */}
            <div
              style={{
                position: 'relative',
                zIndex: 501,
                maxWidth: 'min(38vw, 340px)',
                width: '100%',
                background: 'rgba(255, 248, 240, 0.08)',
                backdropFilter: 'blur(24px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                border: '1px solid rgba(255, 200, 220, 0.2)',
                borderRadius: '16px',
                padding: 'clamp(20px, 3vw, 36px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px rgba(255,150,190,0.1)',
                transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s, opacity 0.6s ease 0.3s',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: -1,
                left: 30,
                width: 60,
                height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(255, 180, 210, 0.6), transparent)',
                borderRadius: '2px',
              }} />

              <span style={{
                fontSize: '1.8rem',
                marginBottom: '12px',
                display: 'block',
                animation: 'heartbeat 1.5s ease-in-out infinite',
              }}>
                {displayPhoto.note.icon}
              </span>

              <h3 style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                color: '#ffd6e7',
                marginBottom: '14px',
                textShadow: '0 0 20px rgba(255,150,190,0.5)',
                lineHeight: 1.3,
              }}>
                {displayPhoto.note.title}
              </h3>

              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(0.9rem, 1.6vw, 1.08rem)',
                color: 'rgba(255, 220, 235, 0.9)',
                lineHeight: 1.9,
                fontWeight: 400,
              }}>
                {displayPhoto.note.text}
              </p>

              <div style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,180,210,0.3), transparent)',
                }} />
                <span style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 'clamp(0.6rem, 1vw, 0.72rem)',
                  color: 'rgba(255, 180, 210, 0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  fontWeight: 300,
                }}>
                  {displayPhoto.note.date}
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,180,210,0.3), transparent)',
                }} />
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes expandedFloat {
          0%, 100% { transform: scale(1) rotate(-2deg) translateY(0px); }
          50% { transform: scale(1) rotate(-2deg) translateY(-8px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }
        @keyframes fadeLineIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
