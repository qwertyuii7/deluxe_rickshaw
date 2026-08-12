"use client";
import React, { useEffect, useState } from "react";

interface MeterCounterProps {
  onHornClick: () => void;
  isShaking: boolean;
}

export function MeterCounter({ onHornClick, isShaking }: MeterCounterProps) {
  const [fare, setFare] = useState(23.50);

  useEffect(() => {
    const interval = setInterval(() => {
      setFare((prev) => prev + 0.50);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-2 sm:right-4 z-40 bg-black p-3 md:p-4 rounded border-4 border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex flex-col items-end transform rotate-1 scale-90 sm:scale-100 origin-top-right">
      <span className="text-[10px] md:text-xs text-gray-400 font-inter uppercase tracking-widest mb-1">
        Fare Meter
      </span>
      <div className="bg-[#1a0000] px-4 py-2 rounded-sm min-w-[120px] text-right mb-4">
        <span className="font-digital text-3xl md:text-4xl">
          ₹ {fare.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onHornClick}
        disabled={isShaking}
        className="bg-red-600/80 backdrop-blur-sm text-white px-4 py-2 rounded border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95 transition-all hover:bg-red-500/80 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] uppercase tracking-widest disabled:opacity-50 text-sm w-full"
        style={{ fontFamily: "var(--font-yatra-one)" }}
      >
        📯 Horn बजाओ!
      </button>
    </div>
  );
}
