
import React, { useState, useEffect, useCallback } from 'react';
import { Countdown } from './components/Countdown';
import { Celebration } from './components/Celebration';
import { BIRTHDAY_CONFIG, STORAGE_KEYS } from './constants';

const App: React.FC = () => {
  const [isCelebration, setIsCelebration] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.CELEBRATION_STARTED) === 'true';
  });

  const [hasInteracted, setHasInteracted] = useState(false);

  // Check if birthday has passed
  useEffect(() => {
    const checkBirthday = () => {
      const target = new Date(BIRTHDAY_CONFIG.TARGET_DATE).getTime();
      const now = new Date().getTime();
      if (now >= target) {
        startCelebration();
      }
    };

    const interval = setInterval(checkBirthday, 1000);
    checkBirthday();
    return () => clearInterval(interval);
  }, []);

  const startCelebration = useCallback(() => {
    setIsCelebration(true);
    localStorage.setItem(STORAGE_KEYS.CELEBRATION_STARTED, 'true');
  }, []);

  const resetCelebration = () => {
    setIsCelebration(false);
    localStorage.removeItem(STORAGE_KEYS.CELEBRATION_STARTED);
  };

  const handleManualEnter = () => {
    setHasInteracted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background hearts */}
      <div className="fixed top-10 left-10 text-pink-200 text-6xl opacity-20 animate-float pointer-events-none">❤️</div>
      <div className="fixed bottom-20 right-10 text-pink-200 text-8xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>💖</div>
      <div className="fixed top-1/2 left-20 text-pink-200 text-4xl opacity-10 animate-float pointer-events-none" style={{ animationDelay: '4s' }}>✨</div>

      {!isCelebration ? (
        <div className="w-full max-w-2xl text-center">
          <Countdown 
            targetDate={BIRTHDAY_CONFIG.TARGET_DATE} 
            onFinish={startCelebration} 
          />
          
          {/* Dev/Test Trigger Button */}
          <div className="mt-12 p-4 border border-dashed border-pink-300 rounded-lg bg-pink-50/50">
            <p className="text-pink-400 text-xs mb-2 uppercase tracking-widest font-bold">Preview Controls</p>
            <button 
              onClick={startCelebration}
              className="bg-white hover:bg-pink-100 text-pink-500 px-6 py-2 rounded-full border border-pink-200 transition-all shadow-sm active:scale-95 text-sm font-semibold"
            >
              🎉 Test Celebration Mode
            </button>
          </div>
        </div>
      ) : (
        <>
          {!hasInteracted ? (
            <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-center flex-col items-center justify-center p-6 text-center">
              <h2 className="text-4xl font-cursive text-pink-500 mb-6">Surprise is ready!</h2>
              <button 
                onClick={handleManualEnter}
                className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              >
                Open Gift 🎁
              </button>
            </div>
          ) : (
            <Celebration />
          )}

          {/* Hidden Reset for testing */}
          <button 
            onClick={resetCelebration}
            className="fixed bottom-4 right-4 text-xs text-pink-200 hover:text-pink-400 transition-colors z-50"
          >
            Reset Site
          </button>
        </>
      )}
    </div>
  );
};

export default App;
