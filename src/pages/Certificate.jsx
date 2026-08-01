import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Atmosphere from "../components/Atmosphere.jsx";

export default function Certificate() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#B03D6E";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return {
      x: (point.clientX - rect.left) * (canvas.width / rect.width),
      y: (point.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const start = (e) => {
    drawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setSaved(false);
  };

  const download = async () => {
    const cert = document.createElement("canvas");
    cert.width = 900;
    cert.height = 620;
    const ctx = cert.getContext("2d");

    ctx.fillStyle = "#FFF8F2";
    ctx.fillRect(0, 0, 900, 620);

    ctx.strokeStyle = "rgba(232,138,168,0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 840, 560);

    ctx.textAlign = "center";
    ctx.fillStyle = "#4A2E44";
    ctx.font = "34px Georgia, serif";
    ctx.fillText("Certificate of Forever", 450, 120);

    ctx.font = "15px Georgia, serif";
    ctx.fillStyle = "rgba(74,46,68,0.85)";
    ctx.fillText("Presented to", 450, 168);

    ctx.font = "28px Georgia, serif";
    ctx.fillStyle = "#B03D6E";
    ctx.fillText("Mitchelle Isioma Affam", 450, 208);
    ctx.fillStyle = "rgba(74,46,68,0.85)";
    ctx.font = "15px Georgia, serif";
    ctx.fillText("and", 450, 234);
    ctx.font = "28px Georgia, serif";
    ctx.fillStyle = "#7C4FB0";
    ctx.fillText("Omijeh David Odianonsen", 450, 268);

    ctx.font = "italic 16px Georgia, serif";
    ctx.fillStyle = "rgba(74,46,68,0.9)";
    wrapText(
      ctx,
      "For creating a universe filled with love, laughter, memories, and countless moments worth remembering. May this story continue long after the stars themselves grow old.",
      450,
      318,
      620,
      26
    );

    ctx.drawImage(canvasRef.current, 300, 420, 300, 100);
    ctx.font = "13px Georgia, serif";
    ctx.fillStyle = "rgba(74,46,68,0.8)";
    ctx.fillText("Signed", 450, 540);
    ctx.fillText(new Date().toLocaleDateString(), 450, 560);
    ctx.font = "italic 12px Georgia, serif";
    ctx.fillText("Witnessed by the moon, the stars, and time", 450, 586);

    const link = document.createElement("a");
    link.download = "certificate-of-forever.png";
    link.href = cert.toDataURL("image/png");
    link.click();
    setSaved(true);
  };

  return (
    <section className="relative min-h-screen px-6 py-32 flex flex-col items-center overflow-hidden bg-cream">
      <Atmosphere glow="top" />
      <div className="relative z-10 w-full max-w-lg text-center">
        <p className="text-[12px] tracking-widest2 uppercase text-accent-rose font-semibold mb-4">
          Chapter Six
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mb-14 text-plum">Our Promise 📜</h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="surface px-6 py-10 sm:px-14 sm:py-14 shadow-soft border-2 border-white"
        >
          <p className="font-display text-2xl text-plum mb-1">Certificate of Forever</p>
          <p className="text-[11px] text-mauve mb-6 tracking-widest2 uppercase">Presented to</p>
          <p className="font-script text-3xl text-accent-rose">Mitchelle Isioma Affam</p>
          <p className="text-xs text-mauve my-2">and</p>
          <p className="font-script text-3xl text-accent-lavender">Omijeh David Odianonsen</p>

          <p className="text-[15px] text-mauve leading-relaxed mt-8 italic max-w-sm mx-auto">
            For creating a universe filled with love, laughter, memories, and
            countless moments worth remembering. May this story continue long
            after the stars themselves grow old.
          </p>

          <div className="mt-10">
            <p className="text-[11px] tracking-widest2 uppercase text-mauve mb-3">Sign here ✍️</p>
            <canvas
              ref={canvasRef}
              width={500}
              height={160}
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
              className="w-full h-32 bg-white rounded-2xl border-2 border-accent-pink/20 touch-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={clear}
                className="flex-1 py-3 rounded-full border border-accent-pink/25 text-sm font-medium text-mauve hover:text-accent-rose transition-colors"
              >
                Clear
              </button>
              <button
                onClick={download}
                disabled={!hasSignature}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-accent-rose to-accent-lavender text-white text-sm font-semibold shadow-glow disabled:opacity-30 disabled:shadow-none transition-all"
              >
                {saved ? "Downloaded ✓" : "Download"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + " ";
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
}
