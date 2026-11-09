"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Products / Tools: cover first; fade in muted video when playable. */
export default function CardVideoPreview({
  video,
  image,
  name,
}: {
  video?: string | null;
  image?: string | null;
  name: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failedVideo, setFailedVideo] = useState<string | null>(null);
  const [readyVideo, setReadyVideo] = useState<string | null>(null);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const showVideo = Boolean(video && video !== failedVideo);
  const cover = image && image !== failedImage ? image : "/images/mobile-media-fallback.svg";

  useEffect(() => {
    if (!video || !showVideo) return;
    const player = ref.current;
    if (!player) return;
    let visible = false;
    let disposed = false;
    const sync = () => {
      if (!visible || document.hidden) {
        player.pause();
        return;
      }
      const pending = player.play();
      if (pending) {
        void pending.catch((error: unknown) => {
          if (
            !disposed && error instanceof DOMException &&
            (error.name === "NotSupportedError" || error.name === "NotAllowedError")
          ) setFailedVideo(video);
        });
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.4);
        sync();
      },
      { threshold: [0, 0.4, 0.75] },
    );
    observer.observe(player);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [video, showVideo]);

  return (
    <>
      <Image
        src={cover}
        alt={`${name} cover`}
        fill
        unoptimized={cover.endsWith(".svg")}
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        onError={() => setFailedImage(cover)}
      />
      {showVideo && video && (
        <video
          key={video}
          ref={ref}
          src={video}
          playsInline
          muted
          loop
          preload="none"
          aria-label={`${name} video preview`}
          className={
            "pointer-events-none absolute inset-0 z-20 h-full w-full object-cover transition-opacity duration-500 " +
            (readyVideo === video ? "opacity-100" : "opacity-0")
          }
          onLoadedData={() => setReadyVideo(video)}
          onPlaying={() => setReadyVideo(video)}
          onError={() => setFailedVideo(video)}
        />
      )}
    </>
  );
}
