"use client";
import React from "react";
import { SkipBack, SkipForward } from "lucide-react";
import { AudioController } from "@/components/AudioController";
import { ShayariGenerator } from "@/components/ShayariGenerator";
import { PlaybackSource, PlaybackStatus } from "@/hooks/usePlayer";

interface Track {
  id: number;
  title: string;
  titleHi: string;
  artist: string;
  vibe: string;
  jiosaavnId: string;
  youtubeCandidates: string[];
}

interface HeroSectionProps {
  currentTrack: Track | null;
  source: PlaybackSource;
  activeYoutubeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onJioSaavnError: () => void;
  onYoutubeError: (code: number) => void;
  onStateChange: (state: PlaybackStatus) => void;
}

export function HeroSection({ 
  currentTrack, 
  source, 
  activeYoutubeIndex, 
  onNext, 
  onPrev, 
  onJioSaavnError, 
  onYoutubeError, 
  onStateChange
}: HeroSectionProps) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-between relative px-4 pt-24 pb-8">
      
      {/* Spacer to push content to middle */}
      <div className="flex-1" />

      {/* Main Content (Title + Player) */}
      <div className="relative z-10 flex flex-col items-center w-full animate-fade-in-up">
        
        {/* Title */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-rickshaw-yellow leading-none text-center mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex flex-col items-center"
          style={{ fontFamily: "var(--font-yatra-one)" }}
        >
          <span>डीलक्स ऑटो</span>
          <span>रिक्शा</span>
        </h1>
        <p
          className="text-xs sm:text-sm text-white/40 tracking-widest uppercase mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          देसी धुन · Zero AC
        </p>

        {/* Compact glass player card */}
        <div className="w-full max-w-[240px] sm:max-w-[260px]">
          {currentTrack ? (
          <div className="w-full glass rounded-2xl p-4 space-y-3">
            
            {/* Track info */}
            <div className="text-center">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.15em] block mb-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                अभी बज रहा है
              </span>
              <h2
                className="text-lg sm:text-xl text-rickshaw-yellow leading-snug"
                style={{ fontFamily: "var(--font-yatra-one)" }}
              >
                {currentTrack.titleHi}
              </h2>
              <p className="text-[11px] text-white/40 mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                {currentTrack.artist}
              </p>
            </div>

            {/* Playback module */}
            <div className="relative w-full">
              <AudioController
                track={currentTrack}
                source={source}
                activeYoutubeIndex={activeYoutubeIndex}
                onJioSaavnError={onJioSaavnError}
                onYoutubeError={onYoutubeError}
                onStateChange={onStateChange}
              />
            </div>

            {/* Playlist Controls - Keep these to switch tracks regardless of iframe state */}
            <div className="flex items-center justify-center gap-8 pt-3 border-t border-white/5">
              <button
                onClick={onPrev}
                className="text-white/30 hover:text-white transition-colors p-2"
                aria-label="Previous track"
              >
                <SkipBack size={18} />
              </button>

              <span className="text-[10px] text-white/20 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {currentTrack.id} / 8
              </span>

              <button
                onClick={onNext}
                className="text-white/30 hover:text-white transition-colors p-2"
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full glass rounded-2xl px-5 py-6 text-center">
            <p
              className="text-lg text-white/30"
              style={{ fontFamily: "var(--font-yatra-one)" }}
            >
              गाना चुनो 🎶
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Spacer to push generator to bottom */}
      <div className="flex-1" />

      {/* Shayari Generator at Bottom */}
      <div className="w-full mt-auto">
        <ShayariGenerator />
      </div>
    </section>
  );
}
