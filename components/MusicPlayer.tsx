
import React, { useRef, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from '../constants';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // Try to play automatically
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play might be blocked by browser until first interaction
          console.log("Auto-play prevented. Music will start after interaction.");
        });
      }
    }
  }, []);

  // Returning the audio element without any UI button as requested
  return (
    <audio 
      ref={audioRef} 
      src={BIRTHDAY_CONFIG.MUSIC_URL} 
      loop 
      preload="auto" 
      className="hidden" 
    />
  );
};
