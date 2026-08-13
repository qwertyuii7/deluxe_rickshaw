"use client";
import React, { useRef } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { AudioController } from "@/components/AudioController";
import { ShayariGenerator } from "@/components/ShayariGenerator";
import { ClassicRadioPlayer } from "@/components/ClassicRadioPlayer";
import { PlaybackSource, PlaybackStatus } from "@/hooks/usePlayer";
import playlist from "../../data/playlist.json";

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
  status: PlaybackStatus;
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
  status,
  onNext, 
  onPrev, 
  onJioSaavnError, 
  onYoutubeError, 
  onStateChange
}: HeroSectionProps) {
  const audioRef = useRef<any>(null);

  return (
    <section className="w-full min-h-[100svh] flex flex-col items-center relative px-4 pt-[220px] sm:pt-[240px] md:pt-32 lg:pt-28 pb-8">
      
      {/* Main Content (Title + Player) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full animate-fade-in-up flex-1">
        
        {/* Title */}
        <h1
          className="text-6xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] text-rickshaw-yellow leading-[1.1] text-center mb-3 sm:mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex flex-col items-center"
          style={{ fontFamily: "var(--font-yatra-one)" }}
        >
          <span>डीलक्स ऑटो</span>
          <span>रिक्शा</span>
        </h1>
        <p
          className="text-xs sm:text-sm md:text-base text-white/50 tracking-[0.25em] sm:tracking-widest uppercase mb-8 sm:mb-8 font-bold"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          देसी धुन · Zero AC
        </p>

        {/* Elite Skeuomorphic Classic Radio */}
        <div className="w-full">
          <ClassicRadioPlayer
            currentTrack={currentTrack}
            source={source}
            activeYoutubeIndex={activeYoutubeIndex}
            status={status}
            totalTracks={playlist.length}
            onNext={onNext}
            onPrev={onPrev}
            onJioSaavnError={onJioSaavnError}
            onYoutubeError={onYoutubeError}
            onStateChange={onStateChange}
          />
        </div>
      </div>

      {/* Shayari Generator at Bottom */}
      <div className="w-full mt-10 max-w-4xl px-2 sm:px-4">
        <ShayariGenerator />
      </div>
    </section>
  );
}
