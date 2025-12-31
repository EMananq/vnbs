
import React, { useState } from 'react';

interface PhotoGalleryProps {
  photos: string[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setErrorImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((url, index) => (
          <div 
            key={index}
            onClick={() => !errorImages[index] && setSelectedPhoto(url)}
            className={`aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer group relative border-4 border-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl ${errorImages[index] ? 'cursor-default' : ''}`}
          >
            {errorImages[index] ? (
              <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center space-y-3 p-6 text-center">
                <span className="text-5xl animate-bounce">💖</span>
                <p className="text-pink-300 font-bold text-sm">Memory Loading...</p>
                <p className="text-[10px] text-pink-200 uppercase tracking-tighter">Add {url.split('/').pop()} to your images folder!</p>
              </div>
            ) : (
              <img 
                src={url} 
                alt={`Birthday Memory ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={() => handleImageError(index)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button 
              className="absolute -top-16 right-0 text-white text-6xl hover:text-pink-400 focus:outline-none transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              ×
            </button>
            <img 
              src={selectedPhoto} 
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border-8 border-white shadow-[0_0_50px_rgba(255,182,193,0.3)]" 
              alt="Preview"
            />
            <p className="text-white mt-6 font-cursive text-3xl">Beautiful Memory ✨</p>
          </div>
        </div>
      )}
    </div>
  );
};
