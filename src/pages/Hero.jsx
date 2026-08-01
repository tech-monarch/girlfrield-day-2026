import React from "react";
import { motion } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import { useMusic } from "../context/MusicContext.jsx";

export default function Hero({ onBegin }) {
  const { play, hasStarted } = useMusic();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-cream">
      <Atmosphere glow="top" stars />

      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero-couple.jpg"
          alt="Mitchelle and Onyinyechi"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 sm:px-16 pb-20 pt-32 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-5"
        >
          ✨ Chapter Zero, To My Favorite Person
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="font-display text-[13vw] sm:text-7xl leading-[1.05] text-plum text-balance"
        >
          Mitchelle
          <br />
          <span className="font-script text-accent-rose text-[16vw] sm:text-8xl">Isioma</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="text-mauve mt-8 max-w-md"
        >
          Happy Girlfriend's Day 💐 This isn't a website. It's every little
          piece of my heart, arranged so you can walk through it.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.9 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => {
            if (!hasStarted) play();
            onBegin();
          }}
          className="mt-12 inline-flex items-center gap-3 w-fit px-8 py-4 rounded-full bg-gradient-to-r from-accent-rose to-accent-lavender text-white text-sm font-semibold tracking-wide shadow-glow"
        >
          Begin our journey
          <span aria-hidden>💕</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ delay: 2.3, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-14 w-44 sm:w-56"
        >
          <div className="rounded-2xl overflow-hidden bg-white border-4 border-white shadow-soft aspect-[4/5]">
            <img
              src="/images/us.jpg"
              alt="Mitchelle and Onyinyechi"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.parentElement.style.display = "none")}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
