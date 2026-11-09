"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectVideoPreviewProps = {
  name: string;
  image: string;
  fallbackImage?: string;
  video?: string;
};

/**
 * Dynamic Website preview: cover is visible immediately and remains under the
 * video until a frame is ready. Unsupported/failed video falls back to cover.
 * Videos only play when substantially in view; Safari uses muted playsInline.
 */
export default function ProjectVideoPreview({
  name,
  image,
  fallbackImage,
  video,
}: ProjectVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [brokenVideo, setBrokenVideo] = useState<string | null>(null);
  const [readyVideo, setReadyVideo] = useState<string | null>(null);
  const [brokenImage, setBrokenImage] = useState<string | null>(null);

  const activeVideo = Boolean(video && brokenVideo !== video);
  const showFrame = activeVideo && readyVideo === video;
  const currentCover =
    brokenImage !== image
      ? image
      : fallbackImage && fallbackImage !== brokenImage
        ? fallbackImage
        : "/images/mobile-media-fallback.svg";

  useEffect(() => {
    if (!activeVideo || !video) return;
    const player = videoRef.current;
    if (!player) return;

    let visible = false;
    let cancelled = false;
    const sync = () => {
      if (document.hidden || !visible) {
        player.pause();
        return;
      }
      const pending = player.play();
      if (pending) {
        void pending.catch((error: unknown) => {
          // AbortError happens naturally when scrolling out of view.
          if (
            !cancelled &&
            error instanceof DOMException &&
            (error.name === "NotSupportedError" || error.name === "NotAllowedError")
          ) {
            setBrokenVideo(video);
          }
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
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [video, activeVideo]);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#11253e]"
        style={{ backgroundImage: "url('/images/mobile-media-fallback.svg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <Image
        src={currentCover}
        alt={`${name} portfolio cover`}
        fill
        sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
        loading="lazy"
        unoptimized={currentCover.endsWith(".svg")}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setBrokenImage(currentCover)}
      />
      {activeVideo && video && (
        <video
          key={video}
          ref={videoRef}
          src={video}
          playsInline
          muted
          loop
          preload="none"
          aria-label={`${name} portfolio video preview`}
          className={
            "pointer-events-none absolute inset-0 h-full w-full bg-transparent object-cover transition-opacity duration-500 " +
            (showFrame ? "opacity-100" : "opacity-0")
          }
          onLoadedData={() => setReadyVideo(video)}
          onPlaying={() => setReadyVideo(video)}
          onError={() => setBrokenVideo(video)}
        />
      )}
    </>
  );
}
