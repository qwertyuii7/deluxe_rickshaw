"use client";
import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import shayariList from "../../data/shayari.json";

export function ShayariGenerator() {
  const [currentShayari, setCurrentShayari] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomShayari = () => {
    setIsAnimating(true);
    // Add a tiny delay so the fade out animation plays
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * shayariList.length);
      setCurrentShayari(shayariList[randomIndex]);
      setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    // Pick an initial shayari on mount
    generateRandomShayari();
  }, []);

  if (!currentShayari) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-8">
      <div className="glass-gold rounded-2xl p-4 sm:p-5 relative group overflow-hidden border border-rickshaw-yellow/30 shadow-[0_4px_20px_rgba(255,215,0,0.15)]">
        
        {/* Quote icon watermark */}
        <div className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif select-none pointer-events-none">
          "
        </div>

        <div className="flex flex-col items-center text-center gap-3 relative z-10">
          <p
            className={`text-lg sm:text-xl text-rickshaw-yellow/90 tracking-wide transition-opacity duration-200 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
            style={{ fontFamily: "var(--font-baloo-2)", lineHeight: "1.4" }}
          >
            "{currentShayari}"
          </p>

          <button
            onClick={generateRandomShayari}
            className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10 text-sm active:scale-95"
          >
            <RefreshCw size={14} className={`${isAnimating ? "animate-spin" : ""}`} />
            <span>और एक सुनाओ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
