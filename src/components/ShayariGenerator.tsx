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
    <div className="w-full max-w-md mx-auto px-4 mt-2">
      <div className="glass-gold rounded-2xl p-4 sm:p-5 relative group overflow-hidden border border-rickshaw-yellow/30 shadow-[0_4px_20px_rgba(255,215,0,0.15)]">
        
        {/* Quote icon watermark */}
        <div className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif select-none pointer-events-none">
          "
        </div>

        <div className="flex flex-col items-center text-center gap-2 relative z-10">
          <div className="flex items-start sm:items-center justify-between gap-4 w-full">
            <p
              className={`text-lg sm:text-xl text-rickshaw-yellow/90 tracking-wide transition-opacity duration-200 text-left flex-1 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
              style={{ fontFamily: "var(--font-baloo-2)", lineHeight: "1.4" }}
            >
              "{currentShayari}"
            </p>

            <button
              onClick={generateRandomShayari}
              className="shrink-0 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-rickshaw-yellow/60 hover:text-rickshaw-yellow transition-all border border-white/10 active:scale-95"
              aria-label="और एक सुनाओ"
            >
              <RefreshCw size={20} className={`${isAnimating ? "animate-spin" : ""}`} />
            </button>
          </div>
          
          <p className="text-xs text-white/40 mt-1 w-full text-right pr-12" style={{ fontFamily: "var(--font-inter)" }}>
            और एक सुनाओ
          </p>
        </div>
      </div>
    </div>
  );
}
