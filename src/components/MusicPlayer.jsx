import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiShuffle,
  FiRepeat,
  FiChevronUp,
  FiChevronDown,
  FiMusic,
  FiAlertCircle,
} from "react-icons/fi";
import { useMusic } from "../context/MusicContext.jsx";
import SmartImage from "./SmartImage.jsx";

function useResetOnChange(value, setter) {
  const prev = React.useRef(value);
  if (prev.current !== value) {
    prev.current = value;
    setter(false);
  }
}

function formatTime(t) {
  if (!t || Number.isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function MusicPlayer() {
  const {
    playlist,
    track,
    trackIndex,
    isPlaying,
    hasStarted,
    progress,
    duration,
    toggle,
    next,
    prev,
    selectTrack,
    seek,
    volume,
    changeVolume,
    shuffle,
    setShuffle,
    repeatMode,
    cycleRepeat,
    trackError,
  } = useMusic();
  const [expanded, setExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [artFailed, setArtFailed] = useState(false);
  useResetOnChange(trackIndex, setArtFailed);

  // The pill is a permanent piece of the top nav, visible as soon as the
  // site unlocks, it just shows a "tap to play" state before that first
  // click, since browsers won't let audio start on its own.

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 left-4 sm:left-auto z-40"
    >
      <div className="pill rounded-card px-4 py-3 w-full sm:w-80 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex-shrink-0 bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center text-accent-rose overflow-hidden">
            {track.artName && !artFailed ? (
              <SmartImage
                folder="/images"
                name={track.artName}
                alt=""
                className="w-full h-full object-cover"
                onAllFailed={() => setArtFailed(true)}
              />
            ) : (
              <FiMusic size={15} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold truncate text-plum">{track.title}</p>
            <p className="text-[11px] text-mauve truncate flex items-center gap-1.5">
              {hasStarted ? track.artist : "Play this before you scroll ↴"}
              {trackError === track.id && (
                <span className="inline-flex items-center gap-1 text-accent-rose">
                  <FiAlertCircle size={10} /> unavailable
                </span>
              )}
            </p>
          </div>
          <div className="relative flex-shrink-0">
            {!hasStarted && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent-rose/50"
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <button
              onClick={toggle}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="relative w-8 h-8 rounded-full bg-gradient-to-br from-accent-pink to-accent-rose flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform text-white shadow-glow"
            >
              {isPlaying ? <FiPause size={13} /> : <FiPlay size={13} className="ml-0.5" />}
            </button>
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-label="Toggle player details"
            className="w-7 h-7 rounded-full flex items-center justify-center text-mauve hover:text-accent-rose flex-shrink-0"
          >
            {expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="w-full accent-[#B03D6E] h-1"
                  aria-label="Seek"
                />
                <div className="flex justify-between text-[10px] text-mauve mt-1">
                  <span>{formatTime(progress)}</span>
                  <span>-{formatTime(Math.max(duration - progress, 0))}</span>
                </div>

                <div className="flex items-center justify-center gap-5 mt-3">
                  <button
                    onClick={() => setShuffle(!shuffle)}
                    aria-label="Shuffle"
                    className={`transition-colors ${shuffle ? "text-accent-rose" : "text-mauve"}`}
                  >
                    <FiShuffle size={14} />
                  </button>
                  <button onClick={prev} aria-label="Previous track" className="text-mauve">
                    <FiSkipBack size={16} />
                  </button>
                  <button onClick={next} aria-label="Next track" className="text-mauve">
                    <FiSkipForward size={16} />
                  </button>
                  <button
                    onClick={cycleRepeat}
                    aria-label={`Repeat: ${repeatMode}`}
                    className={`relative transition-colors ${
                      repeatMode !== "off" ? "text-accent-rose" : "text-mauve"
                    }`}
                  >
                    <FiRepeat size={14} />
                    {repeatMode === "one" && (
                      <span className="absolute -top-1.5 -right-1.5 text-[8px] leading-none w-3 h-3 rounded-full bg-accent-rose text-white flex items-center justify-center font-semibold">
                        1
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] text-mauve">Vol</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                    className="flex-1 accent-[#B03D6E] h-1"
                    aria-label="Volume"
                  />
                </div>

                <button
                  onClick={() => setShowQueue((q) => !q)}
                  className="w-full text-[11px] text-mauve mt-3 text-left"
                >
                  {showQueue ? "Hide queue" : "Show queue"}
                </button>

                <AnimatePresence>
                  {showQueue && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-1"
                    >
                      {playlist.map((t, i) => (
                        <li key={t.id}>
                          <button
                            onClick={() => selectTrack(i)}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex justify-between items-center gap-2 ${
                              i === trackIndex
                                ? "text-accent-rose bg-accent-pink/10"
                                : "text-mauve hover:text-plum"
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              {i === trackIndex && isPlaying && (
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-rose animate-twinkle flex-shrink-0" />
                              )}
                              <span className="truncate">{t.title}</span>
                            </span>
                            <span className="text-mauve flex-shrink-0">{t.artist}</span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pill rounded-2xl px-3 py-2 mb-2 flex items-center gap-2 shadow-subtle animate-bob origin-top"
          >
            <span className="text-sm">🎧</span>
            <p className="text-[11px] leading-snug text-plum">
              Big Head, Pick a song before you start scrolling🌚.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
