import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import Reveal from "../components/Reveal.jsx";
import SmartImage from "../components/SmartImage.jsx";
import SmartVideo from "../components/SmartVideo.jsx";
import { galleryItems } from "../data/content.js";

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative px-6 sm:px-16 py-32 overflow-hidden bg-cream">
      <Atmosphere glow="top" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal as="p" className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-4 text-center">
          Chapter Two
        </Reveal>
        <Reveal as="h2" delay={0.1} className="font-display text-4xl sm:text-6xl text-center mb-4 text-plum text-balance">
          Moments I'll Never Forget
        </Reveal>
        <Reveal as="p" delay={0.2} className="text-center text-mauve mb-28">
          Tap a photograph to step back into it, the clips play as you scroll, sound off until you tap the speaker. 📸
        </Reveal>

        <div className="space-y-24 sm:space-y-32">
          {galleryItems.map((item, i) => {
            const label = String(i + 1).padStart(2, "0");
            const rotate = i % 2 === 0 ? -1.5 : 1.5;

            if (item.type === "video") {
              return (
                <motion.div
                  key={`video-${item.name}`}
                  initial={{ opacity: 0, y: 30, rotate }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="block w-full"
                >
                  <div className="rounded-card overflow-hidden bg-plum border-4 border-white shadow-soft aspect-[4/3] sm:aspect-[16/10]">
                    <SmartVideo
                      folder="/videos"
                      name={item.name}
                      posterName={item.poster}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-[11px] tracking-widest2 uppercase text-accent-lavender font-semibold">
                      {label}
                    </span>
                    <p className="text-mauve">{item.caption}</p>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.button
                key={`photo-${item.name}`}
                initial={{ opacity: 0, y: 30, rotate }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(item)}
                className="block w-full text-left group"
              >
                <div className="rounded-card overflow-hidden bg-white border-4 border-white shadow-soft aspect-[4/3] sm:aspect-[16/10]">
                  <SmartImage
                    folder="/images"
                    name={item.name}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-cinematic"
                  />
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-[11px] tracking-widest2 uppercase text-accent-lavender font-semibold">
                    {label}
                  </span>
                  <p className="text-mauve">{item.caption}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-plum/60 backdrop-blur-md flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <div className="rounded-card overflow-hidden border-4 border-white shadow-soft aspect-[4/3]">
                <SmartImage
                  folder="/images"
                  name={active.name}
                  alt={active.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-cream/90 mt-6 text-center font-medium">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
