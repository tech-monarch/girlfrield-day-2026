import React, { useEffect, useRef, useState } from "react";
import { MusicProvider } from "./context/MusicContext.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import FloatingNav from "./components/FloatingNav.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import LoadingSequence from "./components/LoadingSequence.jsx";
import PasswordGate from "./components/PasswordGate.jsx";
import Hero from "./pages/Hero.jsx";
import OurStory from "./pages/OurStory.jsx";
import Gallery from "./pages/Gallery.jsx";
import ThingsILove from "./pages/ThingsILove.jsx";
import Timer from "./pages/Timer.jsx";
import HeartCatchGame from "./pages/HeartCatchGame.jsx";
import LoveLetter from "./pages/LoveLetter.jsx";
import Certificate from "./pages/Certificate.jsx";
import Finale from "./pages/Finale.jsx";

// phase: "loading" -> "locked" -> "unlocked"
export default function App() {
  const [phase, setPhase] = useState("loading");
  const [active, setActive] = useState("home");
  const sectionRefs = useRef({});

  const registerSection = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (phase !== "unlocked") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [phase]);

  return (
    <MusicProvider>
      {phase === "loading" && <LoadingSequence onDone={() => setPhase("locked")} />}
      {phase === "locked" && <PasswordGate onUnlock={() => setPhase("unlocked")} />}

      {phase === "unlocked" && (
        <>
          <ScrollProgress />
          <MusicPlayer />
          <FloatingNav active={active} onNavigate={scrollTo} />

          <main>
            <div id="home" ref={registerSection("home")}>
              <Hero onBegin={() => scrollTo("story")} />
            </div>
            <div id="story" ref={registerSection("story")}>
              <OurStory />
            </div>
            <div id="memories" ref={registerSection("memories")}>
              <Gallery />
            </div>
            <div id="love" ref={registerSection("love")}>
              <ThingsILove />
            </div>
            <Timer />
            <div id="fun" ref={registerSection("fun")}>
              <HeartCatchGame />
            </div>
            <div id="letter" ref={registerSection("letter")}>
              <LoveLetter />
            </div>
            <Certificate />
            <Finale />
          </main>
        </>
      )}
    </MusicProvider>
  );
}
