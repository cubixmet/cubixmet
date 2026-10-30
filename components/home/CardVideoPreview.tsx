"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Display the cover before video playback, when the video is missing or fails. */
export default function CardVideoPreview({
  video,
  image,
  name,
}: {
  video?: string | null;
  image?: string | null;
  name: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failedVideo, setFailedVideo] = useState<string | null>(null);
  const [loadedVideo, setLoadedVideo] = useState<string | null>(null);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const showVideo = Boolean(video && video !== failedVideo);
  const showImage = Boolean(image && image !== failedImage);

  useEffect(() => {
    if (!video || !showVideo) return;
    const player = videoRef.current;
    if (!player) return;
    let visible = false;
    let disposed = false;
    const sync = () => {
      if (!visible || document.hidden) {
        player.pause();
        return;
      }
      const pending = player.play();
      if (pending) void pending.catch((error: unknown) => {
        if (!disposed && error instanceof DOMException && error.name === "NotSupportedError") {
          setFailedVideo(video);
        }
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45);
        sync();
      },
      { threshold: [0, 0.45, 0.75] }
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

  if (!showVideo && !showImage) return null;
  return (
    <>
      {showImage && image && (
        <Image
          src={image}
          alt={`${name} cover`}
          fill
          unoptimized
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
          onError={() => setFailedImage(image)}
        />
      )}
      {showVideo && video && (
        <video
          ref={videoRef}
          src={video}
          playsInline
          muted
          loop
          preload="none"
          aria-label={`${name} video preview`}
          className={
            "pointer-events-none absolute inset-0 z-20 h-full w-full object-cover transition-opacity duration-300 " +
            (loadedVideo === video ? "opacity-100" : "opacity-0")
          }
          onLoadedData={() => setLoadedVideo(video)}
          onError={() => setFailedVideo(video)}
        />
      )}
    </>
  );
}
