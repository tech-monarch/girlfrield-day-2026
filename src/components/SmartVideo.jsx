import React, { useEffect, useRef, useState } from "react";
import { FiPlay, FiFilm } from "react-icons/fi";
import SmartImage from "./SmartImage.jsx";

// Same idea as SmartImage, but for clips. Phones export video in whatever
// container and case they feel like that day, so this tries the common
// variants in order before giving up.
const EXTENSIONS = ["mp4", "MP4", "mov", "MOV", "webm", "WEBM"];

export default function SmartVideo({
  folder = "/videos",
  name,
  posterFolder = "/images",
  posterName,
  className,
  style,
  onReady,
  onAllFailed,
}) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [posterSrc, setPosterSrc] = useState(null);
  const [posterFailed, setPosterFailed] = useState(!posterName);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Plays itself, muted, as it scrolls into view, and pauses again once it
  // scrolls out, rather than every clip on the page firing at once on load.
  // Sound stays off unless the person taps the speaker icon in controls.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [failed, attempt]);

  if (!name) return null;

  // If nothing plays after every extension has been tried, show a clear
  // placeholder instead of a broken player, so an empty video slot never
  // looks like something went wrong.
  if (failed) {
    return (
      <div
        className={className}
        style={style}
        role="img"
        aria-label="Video coming soon"
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-plum text-cream/70">
          <FiFilm size={28} />
          <span className="text-[13px] tracking-wide">Video coming soon</span>
        </div>
      </div>
    );
  }

  const src = `${folder}/${name}.${EXTENSIONS[attempt]}`;

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {/* Hidden probe that reuses SmartImage's own extension tolerance to
          resolve a poster image, without duplicating that logic here. */}
      {posterName && !posterSrc && !posterFailed && (
        <SmartImage
          folder={posterFolder}
          name={posterName}
          style={{ display: "none" }}
          onReady={(e) => setPosterSrc(e.target.currentSrc || e.target.src)}
          onAllFailed={() => setPosterFailed(true)}
        />
      )}

      <video
        key={src}
        ref={videoRef}
        src={src}
        poster={posterSrc || undefined}
        controls
        preload="metadata"
        playsInline
        muted
        loop
        // Muted autoplay only, driven by the IntersectionObserver above,
        // and loops back to the start on its own once it ends. Sound with
        // autoplay is never allowed and never used here.
        className="w-full h-full object-cover bg-plum"
        onLoadedData={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          if (attempt + 1 < EXTENSIONS.length) {
            setAttempt((a) => a + 1);
          } else {
            setFailed(true);
            onAllFailed?.();
          }
        }}
      >
        Your browser does not support embedded video.
      </video>

      {/* A plain dark frame with a play glyph, shown whenever no poster
          image was provided (or the one given failed to load), so an
          un-thumbnailed clip never looks broken before it starts playing
          itself. Hides once playback starts, native controls take it from
          there. */}
      {!posterSrc && !isPlaying && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-plum/40">
          <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center shadow-subtle">
            <FiPlay size={20} className="text-accent-rose ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}
