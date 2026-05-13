"use client";

import { useState } from "react";

type Props = {
  src: string;
  className?: string;
};

export default function ProjectReel({ src, className = "" }: Props) {
  const [available, setAvailable] = useState(true);

  if (!available) return null;

  return (
    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-300/40 dark:border-purple-500/30 shadow-2xl shadow-purple-500/20 ${className}`}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setAvailable(false)}
        className="block h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
    </div>
  );
}
