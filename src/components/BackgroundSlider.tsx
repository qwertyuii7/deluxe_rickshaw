import React, { useState, useEffect } from 'react';

interface BackgroundSliderProps {
  isRainMode: boolean;
}

export function BackgroundSlider({ isRainMode }: BackgroundSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const normalImages = Array.from({ length: 6 }, (_, i) => `/images/backgrounds/normal/${i + 1}.jpg`);
  const rainImages = Array.from({ length: 4 }, (_, i) => `/images/backgrounds/rain/${i + 1}.jpg`);
  
  const images = isRainMode ? rainImages : normalImages;

  // Reset to first image when toggling mode to avoid index out of bounds
  useEffect(() => {
    setActiveIndex(0);
  }, [isRainMode]);

  // Handle slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-black pointer-events-none">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: index === activeIndex ? 1 : 0,
          }}
        />
      ))}
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
    </div>
  );
}
