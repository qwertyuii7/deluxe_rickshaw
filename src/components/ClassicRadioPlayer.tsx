import React, { useRef } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { AudioController } from "@/components/AudioController";
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

interface ClassicRadioPlayerProps {
  currentTrack: Track | null;
  source: PlaybackSource;
  activeYoutubeIndex: number;
  status: PlaybackStatus;
  totalTracks: number;
  onNext: () => void;
  onPrev: () => void;
  onJioSaavnError: () => void;
  onYoutubeError: (code: number) => void;
  onStateChange: (state: PlaybackStatus) => void;
}

export function ClassicRadioPlayer({
  currentTrack,
  source,
  activeYoutubeIndex,
  status,
  totalTracks,
  onNext,
  onPrev,
  onJioSaavnError,
  onYoutubeError,
  onStateChange
}: ClassicRadioPlayerProps) {
  const audioRef = useRef<any>(null);
  const isPlaying = status === 'playing';

  return (
    <div className="w-full max-w-[460px] sm:max-w-[500px] mx-auto mt-12 sm:mt-16 relative transform scale-[0.85] sm:scale-100 origin-top transition-transform">
      {/* Retractable Antenna */}
      <div className="absolute -top-[120px] right-6 sm:right-8 w-2 h-[130px] z-0 origin-bottom" style={{ transform: 'rotate(15deg)' }}>
        <div className="w-full h-full bg-gradient-to-r from-[#e0e0e0] via-[#fff] to-[#888] shadow-[-2px_0_5px_rgba(0,0,0,0.3)] relative">
          {/* Antenna segments */}
          <div className="absolute bottom-0 w-2.5 -left-[1px] h-6 bg-gradient-to-r from-[#999] to-[#555] rounded-t-sm"></div>
          <div className="absolute bottom-6 w-2 h-10 bg-gradient-to-r from-[#dcdcdc] to-[#777]"></div>
          {/* Antenna tip */}
          <div className="absolute -top-1.5 -left-1 w-4 h-4 rounded-full bg-gradient-to-br from-[#fff] to-[#555] shadow-md"></div>
        </div>
      </div>

      {/* Hidden AudioController to keep playback without visual video/vinyl */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        {currentTrack && (
          <AudioController
            ref={audioRef}
            track={currentTrack}
            source={source}
            activeYoutubeIndex={activeYoutubeIndex}
            onJioSaavnError={onJioSaavnError}
            onYoutubeError={onYoutubeError}
            onStateChange={onStateChange}
          />
        )}
      </div>

      {/* Outer Casing */}
      <div className="wood-casing p-5 sm:p-6 select-none relative shadow-2xl z-10">
        {/* Screws */}
        <div className="screw absolute top-2 left-2 scale-75"></div>
        <div className="screw absolute top-2 right-2 scale-75" style={{ transform: 'rotate(20deg)' }}></div>
        <div className="screw absolute bottom-2 left-2 scale-75" style={{ transform: 'rotate(70deg)' }}></div>
        <div className="screw absolute bottom-2 right-2 scale-75" style={{ transform: 'rotate(-40deg)' }}></div>

        {/* LED Power Indicator - Absolute to save space */}
        <div className="absolute top-2.5 right-8 flex items-center gap-1 z-20 bg-[#111] px-1.5 py-0.5 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-black/50">
          <div className={`led-indicator ${isPlaying ? 'on' : ''} scale-[0.6]`}></div>
        </div>

        {/* Small Heading - Absolute positioned to not increase height */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span 
            className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f5d061] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] opacity-90"
            style={{ fontFamily: "var(--font-yatra-one)" }}
          >
            Radhe Radhe
          </span>
        </div>

        {currentTrack ? (
          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
            {/* Analog Display Section - Left Side */}
            <div className="analog-display p-2 flex flex-col justify-center min-h-[90px] flex-1 min-w-[200px]">
              {/* Frequency Scale Deco */}
              <div className="w-full h-2 mb-1.5 flex justify-between items-end border-b border-white/10 pb-1 opacity-50 px-2">
                {[88, 92, 96, 100, 104, 108].map(freq => (
                  <div key={freq} className="flex flex-col items-center">
                    <div className="h-1 w-[1px] bg-white/40"></div>
                    <span className="text-[6px] text-white/50 mt-[1px] font-digital">{freq}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center relative z-10 pt-0.5">
                <span className="text-[9px] text-white/40 uppercase tracking-[0.1em] block mb-0.5 font-digital">
                  Tuned To {currentTrack.id}/{totalTracks}
                </span>
                <h2 className="text-xl amber-glow-text font-bold truncate px-1" style={{ fontFamily: "var(--font-yatra-one)", letterSpacing: '0.02em' }}>
                  {currentTrack.titleHi}
                </h2>
                <p className="text-[10px] amber-glow-text opacity-80 mt-0.5 truncate px-1 font-digital tracking-widest">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls Panel - Right Side */}
            <div className="flex items-center justify-between px-2 py-2 bg-[#2a2a2a] rounded-xl border border-black shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)] shrink-0 gap-3 w-auto flex-none">
              
              {/* Decorative Volume Knob */}
              <div className="flex flex-col items-center gap-1">
                 <div className="w-8 h-8 rounded-full border border-black shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] bg-[radial-gradient(circle_at_30%_30%,#888,#333)] flex items-center justify-center relative transform -rotate-45">
                    <div className="absolute top-1 w-0.5 h-2 bg-black rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.3)]"></div>
                 </div>
                 <span className="text-[6px] font-bold text-[#aaa] uppercase tracking-widest font-digital">Vol</span>
              </div>

              {/* Physical Tactile Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onPrev}
                  className="w-7 h-7 tactile-btn"
                  aria-label="Previous track"
                >
                  <SkipBack size={12} />
                </button>

                <button
                  onClick={() => audioRef.current?.togglePlay()}
                  className="w-10 h-10 tactile-btn"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={18} className="fill-[#222]" /> : <Play size={18} className="fill-[#222] ml-0.5" />}
                </button>

                <button
                  onClick={onNext}
                  className="w-7 h-7 tactile-btn"
                  aria-label="Next track"
                >
                  <SkipForward size={12} />
                </button>
              </div>

              {/* Decorative Tuning Knob */}
              <div className="flex flex-col items-center gap-1">
                 <div className="w-8 h-8 rounded-full border border-black shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] bg-[radial-gradient(circle_at_30%_30%,#888,#333)] flex items-center justify-center relative transform rotate-12">
                    <div className="absolute top-1 w-0.5 h-2 bg-black rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.3)]"></div>
                 </div>
                 <span className="text-[6px] font-bold text-[#aaa] uppercase tracking-widest font-digital">Tune</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="analog-display p-4 flex flex-col items-center justify-center min-h-[90px]">
            <p className="text-xl amber-glow-text font-bold" style={{ fontFamily: "var(--font-yatra-one)" }}>
              NO SIGNAL
            </p>
            <p className="text-[10px] amber-glow-text opacity-70 mt-1.5 font-digital tracking-widest">
              Please Select A Track
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
