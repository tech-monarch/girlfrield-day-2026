import React from "react";
import { motion } from "framer-motion";

// A small extension of the whileInView pattern already used throughout the
// site (OurStory's timeline, Gallery's cards, Finale's lines), pulled into
// one place so every "Chapter X" header reveals the same way: a soft
// blur-and-rise into focus instead of just appearing. Framer Motion is
// already the animation library everywhere else in this project, so this
// builds on that rather than bringing in a second one (like AOS) with its
// own easing and re-render quirks that would feel inconsistent next to the
// rest of the site's motion.
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 22,
  blur = 8,
  duration = 0.9,
  once = true,
  margin = "-80px",
  className,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
