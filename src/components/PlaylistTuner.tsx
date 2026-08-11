"use client";
import React, { useState, useRef } from "react";
import playlist from "../../data/playlist.json";

interface PlaylistTunerProps {
  activeId: number | null;
  onPlay: (id: number) => void;
  onClose?: () => void;
}

export function PlaylistTuner({ activeId, onPlay, onClose }: PlaylistTunerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-lg mx-auto mt-8 mb-16 px-4 z-30"
    >
      {/* Header with Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h2
          className="text-3xl sm:text-4xl text-rickshaw-yellow uppercase tracking-wider m-0"
          style={{ fontFamily: "var(--font-yatra-one)" }}
        >
          🎵 देसी Tracks
        </h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors border border-white/10"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>

      {/* Track list - Scrollable container */}
      <div className="space-y-3 relative z-10 max-h-[75vh] overflow-y-auto pr-2 pb-4 custom-scrollbar touch-pan-y overscroll-contain">
        {playlist.map((track, index) => {
          const isActive = activeId === track.id;
          return (
            <button
              key={track.id}
              onClick={() => onPlay(track.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
                isActive
                  ? "glass-gold border-rickshaw-yellow/40"
                  : "glass border-white/5 hover:border-rickshaw-yellow/20"
              }`}
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {/* Track number */}
                  <span className={`text-xs font-mono w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive ? "bg-rickshaw-yellow text-black" : "bg-white/10 text-white/40"
                  }`}>
                    {String(track.id).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className={`text-base sm:text-lg ${isActive ? "text-rickshaw-yellow" : "text-white/90"}`}
                      style={{ fontFamily: "var(--font-baloo-2)" }}
                    >
                      {track.titleHi}
                    </h3>
                    <p className={`text-xs sm:text-sm ${isActive ? "text-rickshaw-yellow/60" : "text-white/40"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {track.artist}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="flex items-end gap-[2px] h-5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-[3px] bg-rickshaw-yellow rounded-full"
                        style={{
                          animation: `eq-bar ${0.3 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className={`text-xs mt-2 italic ${isActive ? "text-rickshaw-yellow/40" : "text-white/25"}`}>
                {track.vibe}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
