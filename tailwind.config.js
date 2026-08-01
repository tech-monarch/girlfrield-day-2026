/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm, soft neutrals, the base of every page.
        cream: "#FFF8F2",
        blush: "#FFEEF3",
        petal: "#FBE4EC",
        lilac: "#F1E6FA",
        plum: "#4A2E44", // primary text, ~9:1 contrast on cream
        mauve: "#6B4F66", // secondary text, ~6.8:1 contrast on cream
        // Accents, deep enough to read as text and to hold white button
        // labels at AA contrast, so the same tokens work as color and as UI.
        accent: {
          pink: "#E8A9C6", // decorative tint only (borders, glows), not text
          rose: "#B03D6E", // ~5.3:1 on cream, ~5.6:1 under white text
          lavender: "#7C4FB0", // ~5.5:1 on cream, ~5.8:1 under white text
          gold: "#B98A2E",
        },
      },
      fontFamily: {
        display: ["'DM Serif Display'", "serif"],
        script: ["'Caveat'", "cursive"],
        sans: ["'Quicksand'", "sans-serif"],
      },
      fontSize: {
        base: ["1.125rem", { lineHeight: "1.8" }],
        body: ["1.2rem", { lineHeight: "1.8" }],
      },
      borderRadius: {
        card: "28px",
      },
      boxShadow: {
        soft: "0 30px 70px -25px rgba(176,61,110,0.32)",
        subtle: "0 10px 30px -10px rgba(74,46,68,0.15)",
        glow: "0 0 40px rgba(176,61,110,0.35)",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: 0 },
          "10%": { opacity: 0.9 },
          "90%": { opacity: 0.9 },
          "100%": { transform: "translateY(-40px) rotate(8deg)", opacity: 0 },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.25)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        popIn: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "60%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        floatUp: "floatUp 5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        bob: "bob 3.5s ease-in-out infinite",
        popIn: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
        bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
