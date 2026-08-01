import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiBookOpen, FiImage, FiHeart, FiSmile, FiMail } from "react-icons/fi";

const items = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "story", label: "Story", icon: FiBookOpen },
  { id: "memories", label: "Memories", icon: FiImage },
  { id: "love", label: "Love", icon: FiHeart },
  { id: "fun", label: "Fun", icon: FiSmile },
  { id: "letter", label: "Letter", icon: FiMail },
];

export default function FloatingNav({ active, onNavigate }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed z-30 left-1/2 -translate-x-1/2 bottom-6 sm:top-6 sm:bottom-auto"
    >
      <div className="pill rounded-full px-1.5 py-1.5 flex items-center gap-0.5 shadow-subtle">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              className="relative flex items-center gap-1.5 rounded-full px-2.5 sm:px-3.5 py-2 transition-colors duration-300"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-accent-pink/20 border border-accent-pink/30 shadow-glow"
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
              )}
              <Icon
                size={15}
                className={`relative z-10 transition-all duration-300 ${
                  isActive
                    ? "text-accent-rose drop-shadow-[0_0_6px_rgba(176,61,110,0.65)]"
                    : "text-mauve"
                }`}
              />
              <span
                className={`relative z-10 hidden sm:inline text-[12px] font-medium tracking-wide transition-colors ${
                  isActive ? "text-plum" : "text-mauve"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
