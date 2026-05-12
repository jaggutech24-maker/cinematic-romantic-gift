import { useRef, useState, useCallback } from 'react';
import OpeningScene from './components/OpeningScene';
import GalleryScene from './components/GalleryScene';
import CursorSparkle from './components/CursorSparkle';
import BackgroundParticles from './components/BackgroundParticles';

export type AppStage = 'opening' | 'blooming' | 'gallery' | 'heart' | 'finale';

export default function App() {
  const [stage, setStage] = useState<AppStage>('opening');
  const audioStarted = useRef(false);

  // Start ambient music using uploaded mp3
  const startMusic = useCallback(() => {
    if (audioStarted.current) return;
    audioStarted.current = true;

    try {
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.volume = 0.6; // Adjust volume if needed
      audio.play().catch(e => console.error("Audio playback failed:", e));
    } catch {
      // Audio not available
    }
  }, []);

  const handleGiftOpen = useCallback(() => {
    setStage('blooming');
    startMusic();
    setTimeout(() => setStage('gallery'), 2200);
  }, [startMusic]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: '#0d0608',
      }}
    >
      <CursorSparkle />
      {/* Vignette */}
      <div className="vignette-overlay" />
      <BackgroundParticles stage={stage} />

      <OpeningScene
        visible={stage === 'opening' || stage === 'blooming'}
        blooming={stage === 'blooming'}
        onGiftClick={handleGiftOpen}
      />

      <GalleryScene
        visible={stage === 'gallery' || stage === 'heart' || stage === 'finale'}
        setStage={(s) => setStage(s)}
      />
    </div>
  );
}
