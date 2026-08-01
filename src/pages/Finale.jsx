import React from "react";
import { motion } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";

const lines = [
  "Every beginning became a memory.",
  "Every memory became a star.",
  "Every star became our universe.",
  "And every time you return, it shines a little brighter.",
];

export default function Finale() {
  return (
    <section className="relative min-h-screen px-6 py-32 flex flex-col items-center justify-center text-center overflow-hidden bg-cream">
      <Atmosphere glow="center" stars />
      <div className="relative z-10 max-w-lg">
        <div className="space-y-5 mb-16">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: i * 0.35 }}
              className="text-mauve italic"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 1.2 }}
        >
          <p className="font-display text-4xl sm:text-6xl text-plum mb-2 text-balance">
            I would still choose you.
          </p>
          <p className="font-display text-4xl sm:text-6xl text-plum mb-10">Every single time.</p>
          <p className="font-script text-4xl text-accent-rose">Onyinyechi 💕</p>
        </motion.div>
      </div>
    </section>
  );
}
