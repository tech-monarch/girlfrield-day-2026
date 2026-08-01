import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// A thin gradient thread across the very top of the page that fills as she
// scrolls through the story. Purely a feel-good touch, it echoes the same
// rose-to-lavender gradient already used on buttons and the glow effects,
// so it reads as part of the site rather than a bolted-on progress bar.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-accent-pink via-accent-rose to-accent-lavender z-50"
      aria-hidden
    />
  );
}
