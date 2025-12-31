
import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';
import { BIRTHDAY_CONFIG } from '../constants';

interface CountdownProps {
  targetDate: string;
  onFinish: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, onFinish }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const nextValue = calculateTimeLeft();
      setTimeLeft(nextValue);

      if (Object.values(nextValue).every(v => v === 0)) {
        onFinish();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onFinish]);

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center glass p-4 md:p-6 rounded-[2.5rem] soft-shadow min-w-[85px] sm:min-w-[110px] transform hover:-translate-y-2 transition-all duration-500 border border-white/50">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-pink-300 mt-2 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-10 px-4">
      <div className="relative">
        <div className="animate-float-slow text-7xl md:text-9xl relative z-10">🎁</div>
        <div className="absolute -top-4 -right-4 text-3xl animate-pulse">✨</div>
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-cursive gradient-text drop-shadow-sm leading-tight">
          Counting the magic for
        </h1>
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-cursive text-pink-400">
          {BIRTHDAY_CONFIG.RECIPIENT_NAME}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
        <TimerBox value={timeLeft.days} label="Days" />
        <TimerBox value={timeLeft.hours} label="Hours" />
        <TimerBox value={timeLeft.minutes} label="Mins" />
        <TimerBox value={timeLeft.seconds} label="Secs" />
      </div>

      <div className="max-w-xs sm:max-w-md text-center py-4">
        <p className="text-pink-300 font-medium text-sm sm:text-base leading-relaxed tracking-wide italic">
          "Every second brings us closer to the day the world got a little brighter because of you."
        </p>
      </div>
    </div>
  );
};
