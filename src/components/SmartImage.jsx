import React, { useState } from "react";

// Real photos get renamed, re-exported, and re-uploaded a dozen different
// ways before they end up here, and filenames are case-sensitive once the
// site is actually deployed. Rather than fail silently on a mismatch like
// "photo1.JPG" vs "photo1.jpg", this tries the common variants in order.
const EXTENSIONS = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "webp", "WEBP"];

export default function SmartImage({ folder = "/images", name, alt = "", className, style, onReady, onAllFailed }) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed || !name) return null;

  const src = `${folder}/${name}.${EXTENSIONS[attempt]}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onLoad={onReady}
      onError={() => {
        if (attempt + 1 < EXTENSIONS.length) {
          setAttempt((a) => a + 1);
        } else {
          setFailed(true);
          onAllFailed?.();
        }
      }}
    />
  );
}
