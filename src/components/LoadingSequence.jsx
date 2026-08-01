import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "./Atmosphere.jsx";

const storyLines = ["Some stories are written.", "Some are lived.", "Ours became my favorite."];
const loadingWords = ["memories", "sparkles", "laughter", "us"];

export default function LoadingSequence({ onDone }) {
  const [phase, setPhase] = useState("story");
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === "story") {
      const t = setTimeout(() => setPhase("loading"), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    const wordTimer = setInterval(() => {
      setWordIndex((i) => (i + 1 < loadingWords.length ? i + 1 : i));
    }, 750);
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        const nextP = Math.min(p + 3.4, 100);
        if (nextP >= 100) {
          clearInterval(progressTimer);
          setTimeout(onDone, 500);
        }
        return nextP;
      });
    }, 90);
    return () => {
      clearInterval(wordTimer);
      clearInterval(progressTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden bg-cream">
      <Atmosphere glow="center" stars />
      <div className="relative z-10 max-w-md">
        <AnimatePresence mode="wait">
          {phase === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              {storyLines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display italic text-2xl sm:text-3xl text-plum"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[11px] tracking-widest2 uppercase text-mauve mb-7">
                Loading {loadingWords[wordIndex]}
              </p>
              <div className="w-52 sm:w-60 h-1.5 bg-white/70 border border-accent-pink/20 mx-auto overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-pink to-accent-lavender rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
