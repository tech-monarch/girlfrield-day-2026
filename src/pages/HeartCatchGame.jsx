import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";

const HEART_TYPES = [
  { icon: "💗", points: 10 },
  { icon: "✨", points: 20 },
  { icon: "💫", points: 15 },
];

const GAME_LENGTH = 30;

export default function HeartCatchGame() {
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_LENGTH);
  const [hearts, setHearts] = useState([]);
  const areaRef = useRef(null);
  const idCounter = useRef(0);

  const spawnHeart = useCallback(() => {
    const type = HEART_TYPES[Math.floor(Math.random() * HEART_TYPES.length)];
    const id = idCounter.current++;
    const left = Math.random() * 85 + 2;
    setHearts((h) => [...h, { id, left, ...type }]);
    setTimeout(() => {
      setHearts((h) => h.filter((x) => x.id !== id));
    }, 3600);
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const spawnTimer = setInterval(spawnHeart, 550);
    const clock = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(clock);
          clearInterval(spawnTimer);
          setStatus("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      clearInterval(spawnTimer);
      clearInterval(clock);
    };
  }, [status, spawnHeart]);

  const catchHeart = (id, points) => {
    setHearts((h) => h.filter((x) => x.id !== id));
    setScore((s) => s + points);
  };

  const start = () => {
    setScore(0);
    setTimeLeft(GAME_LENGTH);
    setHearts([]);
    setStatus("playing");
  };

  return (
    <section className="relative min-h-screen px-6 py-32 flex flex-col items-center overflow-hidden bg-cream">
      <Atmosphere glow="center" stars />
      <div className="relative z-10 w-full max-w-md text-center">
        <p className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-4">
          Just For Fun 🎀
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mb-3 text-plum">Heart Catch</h2>
        <p className="text-mauve mb-10">Tap the hearts before they float away.</p>

        {status === "playing" && (
          <div className="flex justify-between text-sm font-semibold text-mauve mb-3 px-1">
            <span>Score: {score}</span>
            <span>{timeLeft}s</span>
          </div>
        )}

        <div
          ref={areaRef}
          className="relative w-full h-[420px] rounded-card overflow-hidden surface border-2 border-white shadow-soft"
        >
          {status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
              <span className="text-4xl animate-bob">💗</span>
              <button
                onClick={start}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-accent-rose to-accent-lavender text-white text-sm font-semibold shadow-glow active:scale-95 transition-transform"
              >
                Start Catching
              </button>
            </div>
          )}

          {status === "done" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center animate-popIn">
              <p className="font-display text-xl text-plum text-balance">
                You caught enough love to last another lifetime. 🥰
              </p>
              <p className="text-mauve text-sm font-medium">Final score: {score}</p>
              <button
                onClick={start}
                className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-accent-rose to-accent-lavender text-white text-sm font-semibold shadow-glow active:scale-95 transition-transform"
              >
                Play Again
              </button>
            </div>
          )}

          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                initial={{ top: "-8%", opacity: 0 }}
                animate={{ top: "104%", opacity: 1 }}
                exit={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 3.4, ease: "linear" }}
                onClick={() => catchHeart(heart.id, heart.points)}
                style={{ left: `${heart.left}%` }}
                className="absolute text-2xl active:scale-125 transition-transform"
              >
                {heart.icon}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
