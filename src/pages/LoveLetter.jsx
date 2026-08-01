import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import Reveal from "../components/Reveal.jsx";
import { loveLetter } from "../data/content.js";

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative min-h-screen px-6 py-32 flex items-center justify-center overflow-hidden bg-cream">
      <Atmosphere glow="top" accent="lavender" />
      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Reveal as="p" className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-4">
                Chapter Five
              </Reveal>
              <Reveal as="h2" delay={0.1} className="font-display text-4xl sm:text-5xl mb-16 text-plum">
                My Letter To You
              </Reveal>
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -4 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                onClick={() => setOpened(true)}
                className="mx-auto w-60 h-44 sm:w-72 sm:h-48 relative surface flex items-center justify-center shadow-soft border-2 border-white"
              >
                <span className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-pink to-accent-lavender flex items-center justify-center text-white text-2xl shadow-glow">
                  💌
                </span>
              </motion.button>
              <p className="text-xs text-mauve mt-8">Tap to open.</p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="surface px-7 py-12 sm:px-16 sm:py-16 shadow-soft border-2 border-white"
            >
              <p className="font-script text-4xl text-accent-rose mb-8">To Mitchelle,</p>
              <div className="space-y-6">
                {loveLetter.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="text-mauve"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <p className="text-mauve mt-8 italic">{loveLetter.closing}</p>
              <p className="font-script text-4xl text-accent-rose mt-10">{loveLetter.signature}</p>
              <p className="text-xs text-mauve mt-4">P.S. you still owe me a rematch. 😉</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
