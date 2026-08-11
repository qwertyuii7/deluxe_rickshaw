"use client";
import React, { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.log("Error attempting to enable fullscreen:", err);
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 rounded-full backdrop-blur-md border transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:scale-105 active:scale-95 bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-rickshaw-yellow/50"
      style={{ fontFamily: "var(--font-baloo-2)" }}
      aria-label="Toggle Fullscreen"
    >
      {isFullscreen ? (
        <>
          <Minimize size={20} className="text-rickshaw-yellow sm:w-6 sm:h-6" />
          <span className="text-base sm:text-xl font-medium tracking-wide">छोटा करें</span>
        </>
      ) : (
        <>
          <Maximize size={20} className="text-rickshaw-yellow sm:w-6 sm:h-6" />
          <span className="text-base sm:text-xl font-medium tracking-wide">फुल स्क्रीन</span>
        </>
      )}
    </button>
  );
}
