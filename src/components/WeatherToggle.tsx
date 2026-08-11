import React from 'react';
import { CloudRain, Sun } from 'lucide-react';

interface WeatherToggleProps {
  isRainMode: boolean;
  onToggle: () => void;
}

export function WeatherToggle({ isRainMode, onToggle }: WeatherToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 rounded-full backdrop-blur-md border transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:scale-105 active:scale-95 ${
        isRainMode 
          ? 'bg-blue-900/60 border-blue-400/40 text-blue-100 hover:bg-blue-800/80 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
          : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-rickshaw-yellow/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]'
      }`}
      style={{ fontFamily: "var(--font-baloo-2)" }}
      aria-label="Toggle weather mode"
    >
      {isRainMode ? (
        <>
          <CloudRain size={20} className="animate-pulse sm:w-6 sm:h-6" />
          <span className="text-base sm:text-xl font-medium tracking-wide">बारिश</span>
        </>
      ) : (
        <>
          <Sun size={20} className="text-rickshaw-yellow sm:w-6 sm:h-6" />
          <span className="text-base sm:text-xl font-medium tracking-wide">मौसम साफ़</span>
        </>
      )}
    </button>
  );
}
