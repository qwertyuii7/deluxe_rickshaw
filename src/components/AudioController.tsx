"use client";
import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { PlaybackSource, PlaybackStatus } from "@/hooks/usePlayer";

interface Track {
  jiosaavnId: string;
  youtubeCandidates: string[];
}

interface AudioControllerProps {
  track: Track;
  source: PlaybackSource;
  activeYoutubeIndex: number;
  onJioSaavnError: () => void;
  onYoutubeError: (code: number) => void;
  onStateChange: (status: PlaybackStatus) => void;
}

export function AudioController({
  track,
  source,
  activeYoutubeIndex,
  onJioSaavnError,
  onYoutubeError,
  onStateChange
}: AudioControllerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Handle JioSaavn iframe timeout
  useEffect(() => {
    if (source !== 'jiosaavn') return;

    setIframeLoaded(false);
    
    // 3 second timeout for adblockers / blocked iframes
    const timeoutId = setTimeout(() => {
      if (!iframeLoaded) {
        onJioSaavnError();
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [track.jiosaavnId, source, iframeLoaded, onJioSaavnError]);

  const handleYoutubeReady = (event: YouTubeEvent) => {
    try {
      event.target.unMute();
      event.target.setVolume(100);
      event.target.playVideo();
    } catch (e) {
      console.log("Autoplay blocked:", e);
    }
  };

  const handleYoutubeStateChange = (event: YouTubeEvent) => {
    const state = event.data;
    if (state === 1) onStateChange('playing');
    else if (state === 3) onStateChange('loading');
  };

  const handleYoutubeErrorInternal = (event: YouTubeEvent) => {
    onYoutubeError(event.data);
  };

  if (source === 'external') {
    return (
      <div className="w-full aspect-video rounded-xl bg-black/80 flex flex-col items-center justify-center border border-white/5 p-4 text-center">
        <p className="text-sm text-white/50 mb-3 font-[var(--font-inter)]">
          Playback restricted by platform.
        </p>
        <a 
          href={`https://www.youtube.com/watch?v=${track.youtubeCandidates[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-rickshaw-yellow text-black font-bold rounded-full text-sm hover:brightness-110 transition-all font-[var(--font-baloo-2)]"
        >
          Open in YouTube ↗
        </a>
      </div>
    );
  }

  if (source === 'youtube') {
    const activeId = track.youtubeCandidates[activeYoutubeIndex];
    if (!activeId) return null;

    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5">
        <YouTube
          key={activeId}
          videoId={activeId}
          className="w-full h-full"
          iframeClassName="w-full h-full"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              fs: 0,
            },
          }}
          onReady={handleYoutubeReady}
          onStateChange={handleYoutubeStateChange}
          onError={handleYoutubeErrorInternal}
        />
      </div>
    );
  }

  // Default: JioSaavn
  return (
    <div className="w-full h-[150px] rounded-xl overflow-hidden bg-black/50 border border-white/5">
      <iframe
        ref={iframeRef}
        key={track.jiosaavnId}
        src={`https://www.jiosaavn.com/embed/song/${track.jiosaavnId}`}
        width="100%"
        height="100%"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        onLoad={() => {
          setIframeLoaded(true);
          onStateChange('playing'); // We assume it plays or is ready to play
        }}
        className="w-full h-full"
      />
    </div>
  );
}
