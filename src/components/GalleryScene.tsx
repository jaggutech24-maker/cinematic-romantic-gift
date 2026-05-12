import { useState, useEffect, useRef, useCallback } from 'react';
import type { MouseEvent } from 'react';
import type { AppStage } from '../App';
import { photos } from '../data/photos';
import ExpandedPhoto from './ExpandedPhoto';

interface Props {
  visible: boolean;
  setStage: (s: AppStage) => void;
}

// Heart shape points (parametric)
function getHeartPositions(count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const step = (Math.PI * 2) / count;
  for (let i = 0; i < count; i++) {
    const t = i * step - Math.PI;
    const scale = 36;
    const cx = 50;
    const cy = 45; // Moved slightly up since bottom extends more
    const x = cx + scale * 16 * Math.pow(Math.sin(t), 3) / 17;
    const y = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17;
    positions.push({ x, y });
  }
  return positions;
}

const GALLERY_PETALS = ['🌸', '🌺', '🌼', '❀', '✿'];

export default function GalleryScene({ visible, setStage }: Props) {
  const [openedPhotos, setOpenedPhotos] = useState<Set<number>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [heartMode, setHeartMode] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [cardPositions, setCardPositions] = useState<{ [id: number]: { x: string; y: string; rot: number } }>({});
  const [appeared, setAppeared] = useState<Set<number>>(new Set());
  const [showIntroText, setShowIntroText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevUnlockedCount = useRef(0);

  // Staggered appearance of polaroids
  useEffect(() => {
    if (!visible) return;

    // Show intro text briefly
    setShowIntroText(true);
    setTimeout(() => setShowIntroText(false), 3000);

    photos.forEach((photo, i) => {
      const delay = photo.locked ? 1500 : i * 180 + 400;
      setTimeout(() => {
        setAppeared(prev => new Set([...prev, photo.id]));
      }, delay);
    });
  }, [visible]);

  // Check if all non-locked photos are opened → trigger heart arrangement
  useEffect(() => {
    const nonLockedPhotos = photos.filter(p => !p.locked);
    const allOpened = nonLockedPhotos.every(p => openedPhotos.has(p.id));
    const currentCount = openedPhotos.size;

    if (allOpened && currentCount >= nonLockedPhotos.length && prevUnlockedCount.current < nonLockedPhotos.length) {
      prevUnlockedCount.current = currentCount;
      setTimeout(() => {
        setSelectedPhoto(null);
        setHeartMode(true);
        setStage('heart');
        
        // Unlock the last photo
        setTimeout(() => {
          setAppeared(prev => new Set([...prev, photos[photos.length - 1].id]));
        }, 1000);
        
        // Show final message
        setTimeout(() => {
          setShowFinal(true);
          setStage('finale');
        }, 3500);
      }, 800);
    }
  }, [openedPhotos, setStage]);

  // Heart arrangement positions
  useEffect(() => {
    if (!heartMode) return;
    const heartPositions = getHeartPositions(photos.length);
    const newPositions: typeof cardPositions = {};
    photos.forEach((photo, i) => {
      const hp = heartPositions[i % heartPositions.length];
      newPositions[photo.id] = {
        x: `${hp.x}%`,
        y: `${hp.y}%`,
        rot: (Math.random() - 0.5) * 10,
      };
    });
    setCardPositions(newPositions);
  }, [heartMode]);

  const handlePhotoClick = useCallback((photoId: number, locked: boolean, e?: MouseEvent<HTMLDivElement>) => {
    if (locked || heartMode) return;
    setOpenedPhotos(prev => new Set([...prev, photoId]));
    setSelectedPhoto(photoId);

    // Mini sparkle burst at click point
    if (e) {
      const x = e.clientX;
      const y = e.clientY;
      for (let i = 0; i < 10; i++) {
        const spark = document.createElement('div');
        const angle = (i / 10) * 360;
        const dist = 40 + Math.random() * 40;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * dist;
        const ty = Math.sin(rad) * dist;
        spark.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff0f5, #ff9abf);
          box-shadow: 0 0 8px #ff9abf;
          pointer-events: none;
          z-index: 9999;
          animation: sparkBurst 0.8s ease forwards;
          --tx: ${tx}px;
          --ty: ${ty}px;
          transform: translate(-50%, -50%);
        `;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 900);
      }
      // Inject keyframe once
      const styleId = 'spark-burst-style';
      if (!document.getElementById(styleId)) {
        const s = document.createElement('style');
        s.id = styleId;
        s.textContent = `
          @keyframes sparkBurst {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            60% { opacity: 1; }
            100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.3); opacity: 0; }
          }
        `;
        document.head.appendChild(s);
      }
    }
  }, [heartMode]);

  const handleClose = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const selectedPhotoData = selectedPhoto !== null
    ? photos.find(p => p.id === selectedPhoto) ?? null
    : null;

  // Floating petals
  const petals = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: GALLERY_PETALS[i % GALLERY_PETALS.length],
      left: `${5 + (i / 14) * 90}%`,
      duration: 8 + Math.random() * 12,
      delay: -Math.random() * 10,
      size: 14 + Math.random() * 14,
    }))
  );

  // Cute floating emojis
  const cuteEmojis = ['♥', '✨', '🦋', '🧸', '💖', '🎀'];
  const hiddenHearts = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * -20,
      duration: 8 + Math.random() * 12,
      size: 16 + Math.random() * 16,
    }))
  );

  // Calculate static initial heart positions for the blooming phase
  const initialHeartPositions = useRef(getHeartPositions(photos.length));

  return (
    <>
      <div
        id="scene-gallery"
        ref={containerRef}
        className={visible ? 'visible' : ''}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'all' : 'none',
          transition: 'opacity 1.5s ease',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        {/* Floating petals */}
        {petals.current.map(p => (
          <div
            key={`petal-${p.id}`}
            className="gallery-petal"
            style={{
              left: p.left,
              fontSize: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        {/* Hidden hearts and cute emojis */}
        {hiddenHearts.current.map(h => (
          <div
            key={`hh-${h.id}`}
            className="hidden-heart"
            style={{
              left: h.left,
              fontSize: h.size,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            {h.emoji}
          </div>
        ))}

        {/* Intro text overlay */}
        {showIntroText && !heartMode && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 95,
            textAlign: 'center',
            pointerEvents: 'none',
            animation: 'introTextAnim 3s ease forwards',
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              color: 'rgba(255, 214, 231, 0.9)',
              textShadow: '0 0 40px rgba(255,150,190,0.8)',
              letterSpacing: '0.05em',
            }}>
              Our memories...
            </p>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)',
              color: 'rgba(255, 180, 210, 0.6)',
              marginTop: '8px',
              letterSpacing: '0.2em',
            }}>
              click each photo to open
            </p>
          </div>
        )}

        {/* Progress hint */}
        {visible && !heartMode && (
          <div
            className="progress-hint"
            style={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 90,
            }}
          >
            {openedPhotos.size} / {photos.filter(p => !p.locked).length} memories opened
          </div>
        )}

        {/* Polaroid Cards */}
        {photos.map((photo, index) => {
          const isInHeart = heartMode;
          const heartPos = cardPositions[photo.id];
          const isLocked = photo.locked && !heartMode;

          const initPos = initialHeartPositions.current[index % initialHeartPositions.current.length];

          const posStyle = isInHeart && heartPos
            ? {
                left: heartPos.x,
                top: heartPos.y,
                transform: `translate(-50%, -50%) rotate(${heartPos.rot}deg)`,
              }
            : {
                left: `${initPos.x}%`,
                top: `${initPos.y}%`,
                transform: `translate(-50%, -50%) rotate(${photo.initialRotation}deg)`,
              };

          const cardWidth = photo.width;

          return (
            <div
              key={photo.id}
              className={`polaroid-card polaroid-float-${photo.id % 5}${appeared.has(photo.id) ? ' appeared' : ''}${isLocked ? ' locked' : ''}${isInHeart ? ' heart-arrangement' : ''}${openedPhotos.has(photo.id) && !isInHeart ? ' opened' : ''}`}
              style={{
                ...posStyle,
                width: `calc(${cardWidth}px * var(--scale-factor, 1))`,
                position: 'absolute',
                zIndex: isInHeart ? 65 : 60,
                transition: isInHeart
                  ? 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease, opacity 1s ease',
                animationDelay: `${photo.id * 0.3}s`,
                boxShadow: openedPhotos.has(photo.id) && !isInHeart
                  ? '0 6px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,150,190,0.3)'
                  : '0 4px 20px rgba(0,0,0,0.5)',
              }}
              onClick={(e) => handlePhotoClick(photo.id, !!photo.locked, e)}
            >
              {photo.locked && !isInHeart ? (
                <>
                  <div style={{
                    width: '100%',
                    aspectRatio: '1',
                    background: 'linear-gradient(135deg, #1a0510, #2d0a17)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    <span>🔒</span>
                  </div>
                  <p className="photo-label" style={{ color: '#7a5c6a', opacity: 0.5 }}>
                    {photo.label}
                  </p>
                </>
              ) : (
                <>
                  {openedPhotos.has(photo.id) && !isInHeart && (
                    <div style={{
                      position: 'absolute',
                      top: 6,
                      right: 8,
                      fontSize: '10px',
                      color: '#c0808a',
                      fontFamily: 'Dancing Script, cursive',
                    }}>✓ opened</div>
                  )}
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="photo-img"
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
                  />
                  <p className="photo-label">{photo.label}</p>
                </>
              )}
            </div>
          );
        })}

        {/* Final message */}
        {showFinal && (
          <div
            className="final-message visible"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              background: 'rgba(10, 3, 8, 0.55)',
              backdropFilter: 'blur(4px)',
              transition: 'opacity 2s ease',
            }}
          >
            <div style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
              color: 'rgba(255, 200, 220, 0.5)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              animation: 'fadeLineIn 1.5s ease 0.2s both',
            }}>
              ✦ ✦ ✦
            </div>
            <p
              className="final-message-text"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 1.8,
              }}
            >
              <span
                className="line1"
                style={{
                  display: 'block',
                  fontSize: 'clamp(1rem, 2.8vw, 1.9rem)',
                  color: '#ffd6e7',
                  textShadow: '0 0 40px rgba(255,150,190,0.7)',
                  marginBottom: '0.5rem',
                  opacity: 0,
                  animation: 'fadeLineIn 1.5s ease 0.5s forwards',
                }}
              >
                No matter how many memories we make,
              </span>
              <span
                className="line2"
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.1rem, 3.2vw, 2.2rem)',
                  color: '#ff9abf',
                  textShadow: '0 0 50px rgba(255,120,180,0.9)',
                  fontWeight: 600,
                  opacity: 0,
                  animation: 'fadeLineIn 1.5s ease 1.8s forwards',
                }}
              >
                my favorite part will always be you.
              </span>
            </p>
            <div style={{
              marginTop: '2rem',
              fontSize: '2rem',
              animation: 'heartbeat 1.5s ease-in-out infinite, fadeLineIn 1s ease 3s both',
              opacity: 0,
            }}>
              ❤️
            </div>
          </div>
        )}
      </div>

      {/* Expanded photo overlay */}
      <ExpandedPhoto
        photo={selectedPhotoData}
        onClose={handleClose}
      />
    </>
  );
}
