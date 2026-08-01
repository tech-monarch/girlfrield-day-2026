import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import Reveal from "../components/Reveal.jsx";
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
  const [hasClicked, setHasClicked] = useState(false);

  const next = () => {
    setHasClicked(true);
    setIndex((i) => (i + 1) % order.length);
  };

  return (
    <section className="relative min-h-screen px-6 py-32 flex flex-col items-center justify-center overflow-hidden bg-cream">
      <Atmosphere glow="center" accent="lavender" stars />

      <div className="relative z-10 w-full max-w-xl text-center">
        <Reveal as="p" className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-14">
          Chapter Three, Reasons 💕
        </Reveal>

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

        <div className="relative inline-block mt-16">
          <motion.button
            onClick={next}
            whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            whileHover={{ scale: 1.04, y: -2, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            className="px-7 py-3.5 rounded-full bg-white border border-accent-pink/25 text-sm font-medium text-mauve hover:text-accent-rose hover:border-accent-rose/40 shadow-subtle transition-colors"
          >
            Tell me another reason 🌸
          </motion.button>

          {/* A little scribble nudge toward the button, gone for good the
              moment she actually taps it. */}
          <AnimatePresence>
            {!hasClicked && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pointer-events-none absolute -top-24 -right-6 sm:-right-16 w-28 sm:w-32"
              >
                <motion.div
                  animate={{ rotate: [-3, 4, -3] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-script text-2xl text-accent-rose block text-center -rotate-6 mb-0.5">
                    click it!
                  </span>
                  <svg viewBox="0 0 140 120" className="w-full h-auto text-accent-rose rotate-[6deg]" fill="none">
                    <defs>
                      <marker
                        id="scribbleArrowhead"
                        markerWidth="7"
                        markerHeight="7"
                        refX="3.5"
                        refY="3.5"
                        orient="auto-start-reverse"
                      >
                        <polygon points="0,0 7,3.5 0,7" fill="currentColor" />
                      </marker>
                    </defs>
                    <path
                      d="M120 10 C 95 4, 58 18, 46 46 C 36 70, 44 82, 18 102"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="1 8"
                      markerEnd="url(#scribbleArrowhead)"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-[11px] text-mauve mt-4">
          {index + 1} of {order.length}
        </p>
      </div>
    </section>
  );
}
