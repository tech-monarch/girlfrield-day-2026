import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";
import { RELATIONSHIP_START } from "../data/content.js";

function getDiff() {
  const start = new Date(RELATIONSHIP_START).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

  const start_d = new Date(RELATIONSHIP_START);
  const now_d = new Date();
  let years = now_d.getFullYear() - start_d.getFullYear();
  let months = now_d.getMonth() - start_d.getMonth();
  let days = now_d.getDate() - start_d.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now_d.getFullYear(), now_d.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

function Unit({ value, label }) {
  return (
    <div className="text-center px-3 sm:px-6">
      <motion.p
        key={value}
        initial={{ y: -8, opacity: 0.3, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        className="font-display text-4xl sm:text-6xl text-plum"
      >
        {value}
      </motion.p>
      <p className="text-[10px] tracking-widest2 uppercase text-accent-rose font-semibold mt-3">{label}</p>
    </div>
  );
}

export default function Timer() {
  const [t, setT] = useState(getDiff());

  useEffect(() => {
    const id = setInterval(() => setT(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    ["Years", t.years],
    ["Months", t.months],
    ["Days", t.days],
    ["Hours", t.hours],
    ["Min", t.minutes],
    ["Sec", t.seconds],
  ];

  return (
    <section className="relative min-h-screen px-6 py-32 flex flex-col items-center justify-center text-center overflow-hidden bg-cream">
      <Atmosphere glow="center" stars />
      <div className="relative z-10 max-w-2xl">
        <p className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-4">
          Chapter Four
        </p>
        <h2 className="font-display text-3xl sm:text-5xl text-plum mb-16 text-balance">
          Look how far we've come 🥹
        </h2>

        <div className="surface flex flex-wrap justify-center divide-x divide-accent-pink/15 px-4 py-8 sm:px-8 shadow-subtle">
          {units.map(([label, value]) => (
            <Unit key={label} value={value} label={label} />
          ))}
        </div>

        <p className="text-mauve mt-16 leading-relaxed max-w-sm mx-auto">
          We've celebrated our anniversary on December 4th, and December 5th.
          Honestly, I think you're both right. 💗
        </p>
      </div>
    </section>
  );
}
