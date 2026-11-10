"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectVideoPreviewProps = {
  name: string;
  image: string;
  fallbackImage?: string;
  video?: string;
};

/* Mobile portfolio video player v3 */
export default function ProjectVideoPreview({ name, image, fallbackImage, video }: ProjectVideoPreviewProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(false);
  const [brokenVideo, setBrokenVideo] = useState<string | null>(null);
  const [readyVideo, setReadyVideo] = useState<string | null>(null);
  const [brokenImage, setBrokenImage] = useState<string | null>(null);
  const [tapToPlay, setTapToPlay] = useState(false);
  const videoAvailable = Boolean(video && brokenVideo !== video);
  const videoReady = Boolean(videoAvailable && readyVideo === video);
  const cover = brokenImage !== image
    ? image
    : fallbackImage && brokenImage !== fallbackImage
      ? fallbackImage
      : "/images/mobile-media-fallback.svg";

  useEffect(() => {
    if (!videoAvailable || !video) return;
    const player = ref.current;
    if (!player) return;
    player.muted = true;
    player.defaultMuted = true;
    let disposed = false;
    let startedLoading = false;

    const requestPlayback = () => {
      if (document.hidden || !visibleRef.current) {
        player.pause();
        return;
      }
      // play() initiates loading if the near-viewport preload has not fired yet.
      // Avoid load() immediately before play(), which can cause an AbortError in Safari.
      const pending = player.play();
      if (pending) void pending.catch((error: unknown) => {
        if (disposed || !(error instanceof DOMException)) return;
        if (error.name === "NotAllowedError") setTapToPlay(true);
        else if (error.name === "NotSupportedError") setBrokenVideo(video);
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      visibleRef.current = true;
      requestPlayback();
      document.addEventListener("visibilitychange", requestPlayback);
      return () => { disposed = true; player.pause(); document.removeEventListener("visibilitychange", requestPlayback); };
    }
    const nearbyObserver = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || startedLoading) return;
      startedLoading = true;
      player.load();
    }, { rootMargin: "500px 0px", threshold: 0 });
    const playbackObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = Boolean(entry?.isIntersecting);
      requestPlayback();
    }, { threshold: [0, 0.05, 0.25] });
    nearbyObserver.observe(player);
    playbackObserver.observe(player);
    document.addEventListener("visibilitychange", requestPlayback);
    return () => {
      disposed = true;
      visibleRef.current = false;
      nearbyObserver.disconnect();
      playbackObserver.disconnect();
      document.removeEventListener("visibilitychange", requestPlayback);
      player.pause();
    };
  }, [videoAvailable, video]);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#11253e]"
        style={{ backgroundImage: "url('/images/mobile-media-fallback.svg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <Image
        src={cover}
        alt={name + " portfolio cover"}
        fill
        sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
        loading="lazy"
        unoptimized={cover.endsWith(".svg")}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setBrokenImage(cover)}
      />
      {videoAvailable && video && (
        <video
          key={video}
          ref={ref}
          src={video}
          muted
          playsInline
          loop
          preload="none"
          aria-label={name + " project preview video"}
          className={"pointer-events-none absolute inset-0 h-full w-full bg-transparent object-cover transition-opacity duration-300 " + (videoReady ? "opacity-100" : "opacity-0")}
          onLoadedData={() => setReadyVideo(video)}
          onCanPlay={() => {
            setReadyVideo(video);
            if (visibleRef.current && !document.hidden) {
              void ref.current?.play().catch(() => {});
            }
          }}
          onPlaying={() => { setReadyVideo(video); setTapToPlay(false); }}
          onError={() => setBrokenVideo(video)}
        />
      )}
      {videoAvailable && tapToPlay && (
        <button
          type="button"
          onClick={() => { const player=ref.current; if(!player)return; player.muted=true; void player.play().then(()=>setTapToPlay(false)).catch(()=>setTapToPlay(true)); }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 text-sm font-semibold text-white"
          aria-label={"Play " + name + " video"}
        >
          <span className="rounded-full border border-white/40 bg-black/65 px-5 py-3">Play video ▶</span>
        </button>
      )}
    </>
  );
}
