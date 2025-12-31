
import React from 'react';

interface MessageCardProps {
  recipient: string;
  sender: string;
  message: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ recipient, sender, message }) => {
  return (
    <div className="relative group w-full max-w-lg">
      {/* Soft Layering for Depth */}
      <div className="absolute inset-0 bg-pink-50 rounded-[3rem] transform rotate-3 scale-105 opacity-50"></div>
      
      <div className="relative bg-[#fffdfa] p-10 sm:p-14 rounded-[2.5rem] soft-shadow border border-pink-50 flex flex-col items-center text-center">
        {/* Elegant Wax Seal style decoration */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-sm transform group-hover:scale-110 transition-transform">
          🎀
        </div>
        
        <div className="w-full space-y-10">
          <div className="space-y-2">
            <span className="text-rose-200 text-[10px] uppercase tracking-[0.5em] font-black">Dearest</span>
            <h2 className="text-4xl sm:text-5xl font-cursive gradient-text">{recipient}</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -left-4 top-0 text-pink-100 text-6xl font-serif">"</div>
            <p className="text-gray-600 leading-relaxed text-lg sm:text-xl font-medium px-4 relative z-10 italic">
              {message}
            </p>
            <div className="absolute -right-4 bottom-0 text-pink-100 text-6xl font-serif">"</div>
          </div>

          <div className="pt-10 flex flex-col items-center">
            <div className="w-8 h-px bg-rose-100 mb-6"></div>
            <span className="text-rose-200 text-[10px] uppercase tracking-[0.5em] font-black mb-2">Always Yours</span>
            <p className="text-3xl sm:text-4xl font-cursive text-pink-400">{sender}</p>
          </div>
        </div>

        {/* Delicate Heart Pattern in corner */}
        <div className="absolute bottom-6 right-8 text-pink-50 text-4xl select-none">❧</div>
      </div>
    </div>
  );
};
