
import React, { useState, useEffect } from 'react';
import { PhotoGallery } from './PhotoGallery';
import { CelebrationEffects } from './CelebrationEffects';
import { MusicPlayer } from './MusicPlayer';
import { BIRTHDAY_CONFIG } from '../constants';

type CelebrationStage = 'intro' | 'decorate' | 'curtain' | 'gallery';

export const Celebration: React.FC = () => {
  const [stage, setStage] = useState<CelebrationStage>('intro');
  const [introStep, setIntroStep] = useState(0);
  const [decoState, setDecoState] = useState({
    lights: false,
    cake: false,
    balloons: false,
    banners: false
  });
  const [curtainOpen, setCurtainOpen] = useState(false);

  const nextIntro = () => {
    if (introStep < BIRTHDAY_CONFIG.INTRO_STEPS.length - 1) {
      setIntroStep(introStep + 1);
    } else {
      setStage('decorate');
    }
  };

  const handleBack = () => {
    if (stage === 'gallery') setStage('curtain');
    else if (stage === 'curtain') setStage('decorate');
    else if (stage === 'decorate') setStage('intro');
  };

  if (stage === 'intro') {
    const currentIntro = BIRTHDAY_CONFIG.INTRO_STEPS[introStep];
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center p-6 bg-[#fff0f3] z-50">
        <CelebrationEffects />
        <MusicPlayer />
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] max-w-md w-full flex flex-col items-center text-center space-y-10 animate-in fade-in zoom-in duration-500 border border-white">
          <div className="text-7xl animate-pulse">✨</div>
          <h2 className="text-3xl font-bold text-gray-700 font-sans tracking-tight leading-snug">
            {currentIntro.text}
          </h2>
          <div className="flex flex-col gap-4 w-full px-4">
            {currentIntro.buttons ? (
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={nextIntro} 
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-pink-200 transition-all active:scale-95 text-lg"
                >
                  {currentIntro.buttons[0]}
                </button>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg opacity-80 cursor-not-allowed text-lg">
                  {currentIntro.buttons[1]}
                </button>
              </div>
            ) : (
              <button 
                onClick={nextIntro} 
                className="bg-[#f04a7c] hover:bg-[#d43d6a] text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 transition-all active:scale-95 text-xl"
              >
                {currentIntro.nextLabel || 'Next'}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === introStep ? 'bg-pink-500 w-6' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'decorate') {
    return (
      <div className={`fixed inset-0 transition-all duration-1000 flex flex-col items-center ${decoState.lights ? 'bg-[#1a0b2e]' : 'bg-[#fff0f3]'} p-6 z-50 overflow-hidden`}>
        <MusicPlayer />
        
        <button 
          onClick={handleBack} 
          className="absolute top-6 left-6 z-[60] bg-white border-2 border-pink-400 text-pink-500 px-5 py-2 rounded-full font-bold shadow-sm hover:bg-pink-50 transition-colors active:scale-95"
        >
          ← Back
        </button>
        
        <div className="text-center space-y-2 pt-20 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-500 drop-shadow-lg">Let's Celebrate! 🎉</h1>
          <p className="text-gray-400 font-medium tracking-wide">Click the buttons to decorate</p>
        </div>

        <div className="flex flex-col items-center mt-8 w-full max-w-sm space-y-4 z-20">
          {!decoState.lights && (
            <button onClick={() => setDecoState(prev => ({ ...prev, lights: true }))} className="w-full bg-[#ffda44] text-gray-800 font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(255,218,68,0.5)] hover:shadow-yellow-300 hover:scale-105 transition-all text-lg">
              💡 Turn On the Lights
            </button>
          )}

          {decoState.lights && !decoState.cake && (
            <button onClick={() => setDecoState(prev => ({ ...prev, cake: true, banners: true }))} className="w-full bg-[#f04a7c] text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-all animate-in slide-in-from-bottom duration-500 text-lg">
              🎨 Decorate
            </button>
          )}

          {decoState.lights && decoState.cake && !decoState.balloons && (
            <button onClick={() => setDecoState(prev => ({ ...prev, balloons: true }))} className="w-full bg-[#8c32c2] text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-all animate-in slide-in-from-bottom duration-500 text-lg">
              🎈 Fly the Balloons
            </button>
          )}

          {decoState.balloons && (
            <button onClick={() => setStage('curtain')} className="w-full bg-[#ff6b00] text-white font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(255,107,0,0.5)] transition-all animate-in slide-in-from-bottom duration-500 text-lg hover:scale-105 shadow-orange-500">
              💌 Well, I Have a Message for You Madam Ji
            </button>
          )}
        </div>

        {decoState.lights && (
          <div className="absolute top-48 flex justify-between w-full px-2 overflow-hidden pointer-events-none z-10">
            {[...Array(26)].map((_, i) => (
              <div key={i} className="w-3 h-3 md:w-4 md:h-4 rounded-full blur-[1px] animate-pulse" 
                style={{ 
                  backgroundColor: ['#ff4b5c', '#ffda44', '#44e0ff', '#4dff4d'][i % 4],
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: `0 0 15px 2px ${['#ff4b5c', '#ffda44', '#44e0ff', '#4dff4d'][i % 4]}`
                }} 
              />
            ))}
          </div>
        )}

        {decoState.banners && (
          <div className="mt-12 flex flex-col items-center gap-6 animate-in slide-in-from-top duration-700 pointer-events-none z-10">
            <div className="flex gap-1 md:gap-2">
              {["H", "a", "p", "p", "y"].map((char, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 ${['bg-cyan-400', 'bg-lime-400', 'bg-yellow-400'][i % 3]} rounded-sm shadow-md mb-2 flex items-center justify-center`}>
                    <div className="w-full h-full border-b-4 border-black/10 flex items-center justify-center"></div>
                  </div>
                  <span className="text-white font-black text-xs md:text-sm drop-shadow-sm">{char}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-1 md:gap-2">
              {["B", "i", "r", "t", "h", "d", "a", "y"].map((char, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 ${['bg-pink-400', 'bg-purple-400', 'bg-cyan-400'][i % 3]} rounded-sm shadow-md mb-2 flex items-center justify-center`}>
                     <div className="w-full h-full border-b-4 border-black/10 flex items-center justify-center"></div>
                  </div>
                  <span className="text-white font-black text-xs md:text-sm drop-shadow-sm">{char}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {decoState.balloons && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="balloon" style={{
                left: `${(i * 5) + Math.random() * 5}%`,
                backgroundColor: ['#ff4b5c', '#8c32c2', '#f04a7c', '#ffda44', '#44e0ff'][i % 5],
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${3.5 + Math.random() * 2}s`
              } as React.CSSProperties}>
                <div className="balloon-string" />
              </div>
            ))}
          </div>
        )}

        {decoState.cake && (
          <div className="mt-auto mb-10 flex flex-col items-center z-10 animate-in zoom-in duration-500">
            <div className="flex gap-2 mb-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-10 bg-orange-400 rounded-full animate-bounce relative shadow-sm" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_12px_#fbbf24] animate-pulse" />
                </div>
              ))}
            </div>
            <div className="w-48 md:w-64 h-12 md:h-14 bg-[#fffdfa] rounded-t-2xl shadow-xl border-b-[6px] border-[#fdeecf]" />
            <div className="w-40 md:w-56 h-10 md:h-12 bg-[#fdeecf] rounded-t-xl border-b-[6px] border-[#e0b98e]" />
            <div className="w-32 md:w-44 h-10 md:h-12 bg-[#e0b98e] rounded-t-lg shadow-2xl" />
          </div>
        )}

        <style>{`
          .balloon {
            position: absolute;
            bottom: -150px;
            width: 70px;
            height: 90px;
            border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
            animation: float-up linear infinite;
            box-shadow: inset -8px -8px 10px rgba(0,0,0,0.1);
          }
          .balloon::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 8px solid inherit;
            border-bottom-color: inherit;
          }
          .balloon-string {
            position: absolute;
            bottom: -50px;
            left: 50%;
            width: 2px;
            height: 50px;
            background: rgba(255,255,255,0.3);
          }
          @keyframes float-up {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-130vh) rotate(15deg); }
          }
        `}</style>
      </div>
    );
  }

  if (stage === 'curtain') {
    return (
      <div className="fixed inset-0 bg-[#fff0f3] flex flex-col items-center z-50 overflow-auto py-12 px-4">
        <MusicPlayer />
        <button 
          onClick={handleBack} 
          className="absolute top-6 left-6 z-[60] bg-white border-2 border-pink-400 text-pink-500 px-5 py-2 rounded-full font-bold shadow-sm hover:bg-pink-50 transition-colors active:scale-95"
        >
          ← Back
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-[#f04a7c] mb-12 flex items-center gap-2 mt-20 md:mt-0">
          <span>💌</span> A Message From My Heart
        </h2>

        <div className="relative w-full max-w-2xl mt-4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[105%] h-5 bg-[#8b4513] rounded-full z-40 flex justify-between px-2 items-center border-2 border-yellow-600 shadow-md">
            <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-yellow-300 shadow-inner" />
            <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-yellow-300 shadow-inner" />
          </div>

          <div className="relative w-full aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] flex flex-col p-8 md:p-12 border border-pink-50">
            <div className="flex-1 overflow-y-auto text-gray-600 space-y-6 font-medium text-lg scroll-smooth pr-2 custom-scrollbar">
              <p className="text-2xl font-bold text-gray-800 tracking-tight">{BIRTHDAY_CONFIG.RECIPIENT_NAME},</p>
              <div className="space-y-4 leading-relaxed whitespace-pre-line text-justify">
                {BIRTHDAY_CONFIG.MESSAGE}
              </div>
              <p className="pt-10 font-bold text-pink-500 text-xl">— {BIRTHDAY_CONFIG.SENDER_NAME}</p>
            </div>

            {!curtainOpen ? (
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full bg-[#b31b1b] relative border-r border-red-900 overflow-hidden shadow-inner flex">
                     <div className="absolute inset-y-0 right-0 w-2 bg-black/10" />
                     {[...Array(20)].map((_, i) => (
                       <div key={i} className="flex-1 h-full border-r border-red-900/20 bg-gradient-to-r from-red-700/50 to-transparent" />
                     ))}
                  </div>
                  <div className="w-1/2 h-full bg-[#b31b1b] relative border-l border-red-900 overflow-hidden shadow-inner flex">
                     <div className="absolute inset-y-0 left-0 w-2 bg-black/10" />
                     {[...Array(20)].map((_, i) => (
                       <div key={i} className="flex-1 h-full border-l border-red-900/20 bg-gradient-to-l from-red-700/50 to-transparent" />
                     ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setCurtainOpen(true)}
                  className="relative bg-white text-[#f04a7c] px-10 py-5 rounded-[2rem] font-bold shadow-[0_10px_30px_rgba(240,74,124,0.4)] border-4 border-pink-50 whitespace-nowrap animate-bounce hover:scale-110 transition-transform z-50 text-xl"
                >
                  ✨ Click to Open ✨
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <button 
          onClick={() => setStage('gallery')}
          className="mt-12 bg-[#f04a7c] text-white px-10 py-4 rounded-[2rem] font-bold shadow-xl hover:bg-[#d43d6a] transition-all flex items-center gap-3 text-lg hover:-translate-y-1"
        >
          <span>📸</span> View Our Memories
        </button>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #fff1f3; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #f04a7c; border-radius: 10px; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fff0f3] py-16 px-4 flex flex-col items-center z-50 overflow-auto">
      <MusicPlayer />
      <button 
        onClick={handleBack} 
        className="absolute top-6 left-6 z-[60] bg-white border-2 border-pink-400 text-pink-500 px-5 py-2 rounded-full font-bold shadow-sm hover:bg-pink-50 transition-colors active:scale-95"
      >
        ← Back
      </button>

      <div className="text-center space-y-4 mb-12 mt-16 md:mt-0 flex flex-col items-center">
        <div className="flex items-center gap-4">
           <span className="text-4xl">📸</span>
           <h1 className="text-4xl md:text-6xl font-cursive gradient-text drop-shadow-sm px-4">Our Beautiful Memories</h1>
           <span className="text-4xl">📸</span>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <PhotoGallery photos={BIRTHDAY_CONFIG.PHOTOS} />
      </div>

      <div className="mt-24 text-center space-y-2 pb-16">
        <p className="text-[#f04a7c] font-black text-2xl tracking-tight">💗 Yours — {BIRTHDAY_CONFIG.SENDER_NAME} 💗</p>
        <p className="text-pink-300 italic text-lg">Every moment with you is a gift ✨</p>
      </div>
    </div>
  );
};
