"use client";

import { useState } from "react";

type Props = {
  src: string;
  className?: string;
  opacity?: number;
  poster?: string;
};

export default function MotionBackdrop({ src, className = "", opacity = 0.35, poster }: Props) {
  const [available, setAvailable] = useState(true);

  if (!available) return null;

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onError={() => setAvailable(false)}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ opacity, mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
