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
 * Keep a project cover visible until the video has a playable frame.
 * IntersectionObserver starts muted playback only when most of the card is
 * visible, and pauses playback when the visitor scrolls away or switches tabs.
 * Preload "none" avoids downloading large MOV clips before they are visible.
 */
export default function ProjectVideoPreview({
  name,
  image,
  fallbackImage,
  video,
}: ProjectVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [loadedVideo, setLoadedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!video || hasPlaybackError) return;
    const player = videoRef.current;
    if (!player) return;

    let visibleRatio = 0;
    let disposed = false;

    const syncPlayback = () => {
      if (document.hidden || visibleRatio < 0.55) {
        player.pause();
        return;
      }

      // Muted inline playback is allowed on current mobile and desktop browsers.
      // An AbortError is normal if the visitor scrolls away while loading.
      const playPromise = player.play();
      if (playPromise) {
        void playPromise.catch((error: unknown) => {
          if (
            !disposed &&
            error instanceof DOMException &&
            error.name === "NotSupportedError"
          ) {
            setHasPlaybackError(true);
          }
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        visibleRatio = entry.intersectionRatio;
        syncPlayback();
      },
      { threshold: [0, 0.25, 0.55, 0.8] }
    );

    observer.observe(player);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      player.pause();
    };
  }, [video, hasPlaybackError]);

  return (
    <>
      <Image
        src={hasImageError && fallbackImage ? fallbackImage : image}
        alt={`${name} portfolio preview`}
        onError={() => {
          if (!hasImageError && fallbackImage) setHasImageError(true);
        }}
        fill
        sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {video && !hasPlaybackError && (
        <video
          ref={videoRef}
          src={video}
          playsInline
          muted
          loop
          preload="none"
          aria-label={`${name} project walkthrough, plays automatically when visible`}
          className={
            "pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 " +
            (loadedVideo === video ? "opacity-100" : "opacity-0")
          }
          onLoadedData={() => setLoadedVideo(video)}
          onError={() => setHasPlaybackError(true)}
        />
      )}
    </>
  );
}
