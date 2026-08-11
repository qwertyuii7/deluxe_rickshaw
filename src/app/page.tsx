"use client";
import React, { useState } from "react";
import { BoardingScreen } from "@/components/BoardingScreen";
import { TasselDecoration } from "@/components/TasselDecoration";
import { MeterCounter } from "@/components/MeterCounter";
import { HeroSection } from "@/components/HeroSection";
import { PlaylistTuner } from "@/components/PlaylistTuner";
import { FAQSection } from "@/components/FAQSection";
import { RideFooter } from "@/components/RideFooter";
import { usePlayer } from "@/hooks/usePlayer";
import { BackgroundSlider } from "@/components/BackgroundSlider";
import { WeatherToggle } from "@/components/WeatherToggle";
import { ListMusic, X } from "lucide-react";

export default function Home() {
  const [isBoarded, setIsBoarded] = useState(false);
  const [isRainMode, setIsRainMode] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleHorn = () => {
    if (isShaking) return;
    const horn = new Audio("/sounds/horn.mp3");
    horn.volume = 1.0;
    horn.play().catch(e => console.log("Horn play failed:", e));
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const {
    currentTrack,
    currentTrackIndex,
    source,
    activeYoutubeIndex,
    playTrack,
    playNext,
    playPrev,
    boardAndPlay,
    handleJioSaavnError,
    handleYoutubeError,
    setStatus
  } = usePlayer();

  const handleBoard = () => {
    setIsBoarded(true);
    boardAndPlay();
  };

  const handlePlayTrack = (id: number) => {
    import("../../data/playlist.json").then((module) => {
      const playlist = module.default;
      const index = playlist.findIndex((t: any) => t.id === id);
      if (index !== -1) {
        playTrack(index);
        setIsPlaylistOpen(false); // Auto-close playlist after selection
      }
    });
  };

  return (
    <main className={`relative min-h-screen flex flex-col text-white overflow-hidden ${isShaking ? "animate-horn-shake" : ""}`}>
      <BackgroundSlider isRainMode={isRainMode} />

      {/* Floating Control Bar - Top Left */}
      <div className="fixed top-8 left-4 z-50 flex flex-col gap-4 items-start">
        <WeatherToggle isRainMode={isRainMode} onToggle={() => setIsRainMode(!isRainMode)} />
        
        {/* Playlist Toggle Button */}
        <button
          onClick={() => setIsPlaylistOpen(true)}
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-full backdrop-blur-md border bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-rickshaw-yellow/50 shadow-[0_0_30px_rgba(255,215,0,0.1)] transition-all duration-500 transform hover:scale-105 active:scale-95"
          style={{ fontFamily: "var(--font-baloo-2)" }}
        >
          <ListMusic size={24} className="text-rickshaw-yellow" />
          <span className="text-xl font-medium tracking-wide">गाना चुनो</span>
        </button>
      </div>

      {/* Boarding splash */}
      {!isBoarded && <BoardingScreen onBoard={handleBoard} />}

      {/* Overlays */}
      <TasselDecoration />
      {isBoarded && <MeterCounter onHornClick={handleHorn} isShaking={isShaking} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-20">
        <HeroSection
          currentTrack={currentTrack as any}
          source={source}
          activeYoutubeIndex={activeYoutubeIndex}
          onNext={playNext}
          onPrev={playPrev}
          onJioSaavnError={handleJioSaavnError}
          onYoutubeError={handleYoutubeError}
          onStateChange={setStatus}
        />
      </div>

      {isBoarded && <FAQSection />}

      <RideFooter />

      {/* Playlist Modal */}
      {isPlaylistOpen && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-xl relative">
            <PlaylistTuner activeId={currentTrack?.id ?? null} onPlay={handlePlayTrack} onClose={() => setIsPlaylistOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
