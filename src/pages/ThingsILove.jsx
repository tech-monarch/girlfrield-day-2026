import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import { reasons } from "../data/content.js";

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ThingsILove() {
  const [order] = useState(() => shuffled(reasons));
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % order.length);

  return (
    <section className="relative min-h-screen px-6 py-32 flex flex-col items-center justify-center overflow-hidden bg-cream">
      <Atmosphere glow="center" accent="lavender" stars />

      <div className="relative z-10 w-full max-w-xl text-center">
        <p className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-14">
          Chapter Three, Reasons 💕
        </p>

        <div className="relative min-h-[10rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -14 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="font-display italic text-3xl sm:text-5xl leading-snug text-plum text-balance"
            >
              {order[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="mt-16 px-7 py-3.5 rounded-full bg-white border border-accent-pink/25 text-sm font-medium text-mauve hover:text-accent-rose hover:border-accent-rose/40 shadow-subtle transition-colors"
        >
          Tell me another reason 🌸
        </button>
        <p className="text-[11px] text-mauve mt-4">
          {index + 1} of {order.length}
        </p>
      </div>
    </section>
  );
}
