"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";

interface BoardingScreenProps {
  onBoard: () => void;
}

export function BoardingScreen({ onBoard }: BoardingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBoarding, setIsBoarding] = useState(false);

  const handleBoard = () => {
    if (isBoarding) return;
    setIsBoarding(true);

    // Play engine start sound (one-shot, not looping — YouTube audio takes over)
    const idleAudio = new Audio("/sounds/putt_putt.mp3");
    idleAudio.loop = false;
    idleAudio.volume = 1.0;
    idleAudio.play().catch(e => console.log("Audio play failed:", e));

    // Smooth cinematic exit
    const tl = gsap.timeline();
    
    tl.to(containerRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.in",
    })
    .to(containerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        onBoard();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a3328] overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0" />
      <div className="texture-overlay z-0" />

      <div className="text-center space-y-6 z-10 relative px-4">
        {/* Rickshaw emoji */}
        <div className="text-6xl md:text-7xl mb-2 animate-float">🛺</div>

        {/* Main title in Hindi */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-[var(--font-yatra-one)] text-rickshaw-yellow tracking-wider leading-tight"
          style={{ fontFamily: "var(--font-yatra-one)" }}
        >
          ऑटो रिक्शा FM
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 tracking-wide"
          style={{ fontFamily: "var(--font-baloo-2)" }}
        >
          100% देसी Vibes · Zero AC · सवारी चालू है!
        </p>
        
        {/* CTA Button */}
        <button
          onClick={handleBoard}
          disabled={isBoarding}
          className="mt-8 md:mt-12 px-8 py-4 md:px-10 md:py-5 bg-rickshaw-yellow text-off-black text-2xl sm:text-3xl md:text-4xl rounded-2xl shadow-[0_8px_0_0_#b89900] active:shadow-[0_0px_0_0_#b89900] active:translate-y-[8px] transition-all hover:brightness-110 uppercase transform -rotate-1 hover:rotate-0 disabled:opacity-60"
          style={{ fontFamily: "var(--font-yatra-one)" }}
        >
          {isBoarding ? "चालू हो रहा..." : "🛺 मीटर गिराओ"}
        </button>

        <p className="text-sm text-white/40 mt-4" style={{ fontFamily: "var(--font-baloo-2)" }}>
          बैठो, बेल्ट बांधो (अगर हो तो), और सुनो
        </p>
      </div>
    </div>
  );
}
