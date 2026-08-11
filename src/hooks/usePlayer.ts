import { useState, useEffect, useRef, useCallback } from 'react';
import playlist from '../../data/playlist.json';

export type PlaybackSource = 'jiosaavn' | 'youtube' | 'external';
export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'error';

export function usePlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [source, setSource] = useState<PlaybackSource>('youtube');
  const [activeYoutubeIndex, setActiveYoutubeIndex] = useState(0);
  
  // Track debounce ref
  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = playlist[currentTrackIndex];

  const playTrack = useCallback((index: number) => {
    // Clear any pending changes
    if (changeTimeoutRef.current) {
      clearTimeout(changeTimeoutRef.current);
    }

    // Debounce track change to avoid iframe spam
    changeTimeoutRef.current = setTimeout(() => {
      setCurrentTrackIndex(index);
      setSource('youtube');
      setActiveYoutubeIndex(0);
      setStatus('loading');
    }, 400);
  }, []);

  const playNext = useCallback(() => {
    playTrack((currentTrackIndex + 1) % playlist.length);
  }, [currentTrackIndex, playTrack]);

  const playPrev = useCallback(() => {
    playTrack((currentTrackIndex - 1 + playlist.length) % playlist.length);
  }, [currentTrackIndex, playTrack]);

  const handleJioSaavnError = useCallback(() => {
    console.warn('JioSaavn iframe failed to load or timed out. Falling back to YouTube.');
    setSource('youtube');
    setActiveYoutubeIndex(0);
  }, []);

  const handleYoutubeError = useCallback((errorCode: number) => {
    // 101 / 150 = embedding disabled by owner
    const candidates = currentTrack.youtubeCandidates;
    const nextIndex = activeYoutubeIndex + 1;
    
    if (nextIndex < candidates.length) {
      console.warn(`YouTube embed blocked (error ${errorCode}). Trying fallback ${nextIndex + 1}/${candidates.length}...`);
      setActiveYoutubeIndex(nextIndex);
    } else {
      console.warn(`All YouTube candidates failed. Falling back to external link.`);
      setSource('external');
      setStatus('error');
    }
  }, [activeYoutubeIndex, currentTrack]);

  // Expose immediate set function for initial boarding action (no debounce)
  const boardAndPlay = useCallback(() => {
    setCurrentTrackIndex(0);
    setSource('youtube');
    setActiveYoutubeIndex(0);
    setStatus('loading');
  }, []);

  return {
    currentTrack,
    currentTrackIndex,
    status,
    setStatus,
    source,
    activeYoutubeIndex,
    playTrack,
    playNext,
    playPrev,
    boardAndPlay,
    handleJioSaavnError,
    handleYoutubeError
  };
}
