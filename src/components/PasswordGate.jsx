import React, { useState } from "react";
import { motion } from "framer-motion";
import Atmosphere from "./Atmosphere.jsx";

const CORRECT = "2025";

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value.trim() === CORRECT) {
      onUnlock();
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-cream">
      <Atmosphere glow="center" stars />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={wrong ? { x: [0, -8, 8, -8, 8, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-xs w-full surface px-8 py-12 shadow-soft"
      >
        <span className="text-3xl">💌</span>
        <p className="font-display text-3xl text-plum mt-4 mb-2">Before you enter</p>
        <p className="text-sm text-mauve mb-10">One small question</p>

        <form onSubmit={submit}>
          <input
            type="password"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="••••"
            className="w-full text-center text-2xl tracking-[0.4em] bg-transparent border-b-2 border-accent-pink/25 py-3 outline-none focus:border-accent-rose transition-colors placeholder:text-mauve text-plum"
            autoFocus
          />
          <p className="text-xs text-mauve mt-5">The year our story began.</p>

          {wrong && (
            <p className="text-xs text-accent-rose mt-4">That's not quite our year.</p>
          )}

          <button
            type="submit"
            className="mt-10 w-full py-3.5 rounded-full text-sm font-medium tracking-wide text-white bg-gradient-to-r from-accent-rose to-accent-lavender hover:opacity-90 active:scale-[0.98] transition-all shadow-glow"
          >
            Unlock ✨
          </button>
        </form>
      </motion.div>
    </div>
  );
}
