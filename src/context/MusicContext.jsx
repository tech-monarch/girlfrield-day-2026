import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const MusicContext = createContext(null);

// Add or reorder tracks here, the player detects the playlist automatically.
export const PLAYLIST = [
  { id: "perfect", title: "Perfect", artist: "Ed Sheeran", file: "/music/perfect.mp3", artName: "album-perfect" },
  { id: "photograph", title: "Photograph", artist: "Ed Sheeran", file: "/music/photograph.mp3", artName: "album-photograph" },
  { id: "lost-stars", title: "Lost Stars", artist: "Adam Levine", file: "/music/lost-stars.mp3", artName: "album-lost-stars" },
  { id: "shivers", title: "Shivers", artist: "Ed Sheeran", file: "/music/shivers.mp3", artName: "album-shivers" },
  {
    id: "gone-gone-gone",
    title: "Gone, Gone, Gone",
    artist: "Phillip Phillips",
    file: "/music/gone-gone-gone.mp3",
    artName: "album-gone-gone-gone",
  },
];

// "off" -> play through once and stop looping the queue
// "all" -> loop the whole playlist (default)
// "one" -> loop the current track
const REPEAT_MODES = ["off", "all", "one"];

export function MusicProvider({ children }) {
  // A single, persistent Audio element for the whole app lifetime. We only
  // ever change its .src, so playback is never torn down and rebuilt just
  // because a component re-rendered or the person navigated sections.
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("all");
  const [trackError, setTrackError] = useState(null);

  const shuffleRef = useRef(shuffle);
  const repeatRef = useRef(repeatMode);
  const trackIndexRef = useRef(trackIndex);
  shuffleRef.current = shuffle;
  repeatRef.current = repeatMode;
  trackIndexRef.current = trackIndex;

  const goTo = useCallback((index, { autoplay = true } = {}) => {
    setTrackIndex(index);
    setTrackError(null);
    if (autoplay) {
      setIsPlaying(true);
      setHasStarted(true);
    }
  }, []);

  const next = useCallback(() => {
    const i = trackIndexRef.current;
    if (shuffleRef.current && PLAYLIST.length > 1) {
      let r = Math.floor(Math.random() * PLAYLIST.length);
      if (r === i) r = (r + 1) % PLAYLIST.length;
      goTo(r);
      return;
    }
    goTo((i + 1) % PLAYLIST.length);
  }, [goTo]);

  const prev = useCallback(() => {
    const i = trackIndexRef.current;
    goTo((i - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, [goTo]);

  const handleEnd = useCallback(() => {
    const mode = repeatRef.current;
    const audio = audioRef.current;
    if (mode === "one") {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    const i = trackIndexRef.current;
    const isLast = !shuffleRef.current && i === PLAYLIST.length - 1;
    if (isLast && mode === "off") {
      setIsPlaying(false);
      return;
    }
    next();
  }, [next]);

  // Create the audio element exactly once.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => handleEnd();
    const onError = () => {
      setTrackError(PLAYLIST[trackIndexRef.current]?.id ?? true);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap the source whenever the track changes, without recreating the
  // element. This is what keeps playback seamless across the whole site.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = PLAYLIST[trackIndex];
    setTrackError(null);
    setProgress(0);
    setDuration(0);

    const absoluteSrc = new URL(track.file, window.location.origin).href;
    if (audio.src !== absoluteSrc) {
      audio.src = track.file;
      audio.load();
    }
    if (isPlaying) {
      audio.play().catch(() => {
        setTrackError(track.id);
        setIsPlaying(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    const audio = audioRef.current;
    setHasStarted(true);
    if (!audio) return;
    if (!audio.src) audio.src = PLAYLIST[trackIndex].file;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setTrackError(PLAYLIST[trackIndex].id);
        setIsPlaying(false);
      });
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  const selectTrack = (index) => {
    if (index === trackIndex) {
      play();
      return;
    }
    goTo(index);
  };

  const seek = (time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const changeVolume = (v) => setVolume(v);

  const cycleRepeat = () => {
    setRepeatMode((m) => {
      const i = REPEAT_MODES.indexOf(m);
      return REPEAT_MODES[(i + 1) % REPEAT_MODES.length];
    });
  };

  return (
    <MusicContext.Provider
      value={{
        playlist: PLAYLIST,
        track: PLAYLIST[trackIndex],
        trackIndex,
        isPlaying,
        hasStarted,
        progress,
        duration,
        volume,
        shuffle,
        repeatMode,
        trackError,
        play,
        pause,
        toggle,
        next,
        prev,
        selectTrack,
        seek,
        changeVolume,
        setShuffle,
        cycleRepeat,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
