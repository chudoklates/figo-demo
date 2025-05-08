"use client";

import { HTMLProps } from "react";

export default function Video({
  children,
  ...overrides
}: HTMLProps<HTMLVideoElement>) {
  return (
    <video
      width="320"
      height="auto"
      preload="metadata"
      controls
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      {...overrides}
    >
      {children}
    </video>
  );
}
