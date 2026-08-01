import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import { timeline } from "../data/content.js";

// Chapter One. A single connected path instead of a gimmick, one continuous
// line running through every moment that led to us, read top to bottom like
// pages in a keepsake book.
export default function OurStory() {
  const [openId, setOpenId] = useState(timeline[0].id);

  return (
    <section className="relative px-6 sm:px-16 py-32 overflow-hidden bg-cream">
      <Atmosphere glow="top" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-4 text-center">
          Chapter One
        </p>
        <h2 className="font-display text-4xl sm:text-6xl text-center mb-6 text-plum text-balance">
          Our Beginning
        </h2>
        <p className="text-center text-mauve max-w-md mx-auto mb-28">
          Every love story starts somewhere ordinary. Here is the path that
          quietly led from there to us.
        </p>

        <div className="relative">
          <div
            className="absolute left-[15px] sm:left-1/2 top-2 bottom-2 w-px bg-accent-pink/40 sm:-translate-x-1/2"
            aria-hidden
          />

          <div className="space-y-16 sm:space-y-4">
            {timeline.map((item, i) => {
              const open = openId === item.id;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative sm:flex sm:items-start"
                >
                  <div
                    className={`absolute left-0 sm:left-1/2 top-1 sm:top-6 w-8 h-8 rounded-full bg-white border-2 border-accent-rose flex items-center justify-center text-[12px] font-bold text-accent-rose sm:-translate-x-1/2 z-10`}
                  >
                    {i + 1}
                  </div>

                  <div
                    className={`pl-14 sm:pl-0 sm:w-1/2 ${
                      isLeft ? "sm:pr-14 sm:text-right sm:ml-0" : "sm:pl-14 sm:ml-auto"
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="w-full text-left sm:text-inherit group"
                    >
                      <span className="block text-[12px] text-mauve mb-1.5">{item.date}</span>
                      <span
                        className={`flex items-center gap-2 ${
                          isLeft ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="font-display text-2xl sm:text-3xl text-plum group-hover:text-accent-rose transition-colors">
                          {item.title}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          className="text-xl text-accent-rose flex-shrink-0"
                        >
                          +
                        </motion.span>
                      </span>

                      <AnimatePresence>
                        {open && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden text-mauve leading-relaxed pt-3"
                          >
                            {item.text}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-script text-3xl text-accent-lavender text-center mt-28"
        >
          and that was only the beginning
        </motion.p>
      </div>
    </section>
  );
}
