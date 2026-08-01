import React, { useMemo } from "react";

const GLOWS = {
  top: "50% 0%",
  bottom: "50% 100%",
  center: "50% 50%",
};

const SYMBOLS = ["♡", "✦", "・"];

function Drifters({ count = 14 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: Math.random() * 90,
        size: Math.random() * 10 + 12,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 4,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      })),
    [count]
  );
  return items.map((s) => (
    <span
      key={s.id}
      className="absolute text-accent-pink/25 animate-floatUp select-none"
      style={{
        left: `${s.left}%`,
        bottom: `${s.bottom}%`,
        fontSize: s.size,
        animationDelay: `${s.delay}s`,
        animationDuration: `${s.duration}s`,
      }}
    >
      {s.symbol}
    </span>
  ));
}

export default function Atmosphere({ glow = "top", accent = "pink", stars = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-cream" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 42% at ${GLOWS[glow]}, ${
            accent === "lavender" ? "rgba(201,168,232,0.28)" : "rgba(242,166,196,0.26)"
          }, transparent 72%)`,
        }}
      />
      {stars && <Drifters count={16} />}
    </div>
  );
}
