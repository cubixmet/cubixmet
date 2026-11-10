"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectVideoPreviewProps = {
  name: string;
  video?: string;
  coverImage?: string;
  fallbackImage?: string;
};

/** MP4-first previews. Images are only used for Digital Marketing entries. */
export default function ProjectVideoPreview({ name, video, coverImage, fallbackImage }: ProjectVideoPreviewProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [unplayable, setUnplayable] = useState<string | null>(null);
  const [frame, setFrame] = useState<string | null>(null);
  const [showPlay, setShowPlay] = useState(false);
  const [failedCovers, setFailedCovers] = useState<string[]>([]);
  const canPlayVideo = Boolean(video && unplayable !== video);
  const cover = [coverImage, fallbackImage].find((candidate) => candidate && !failedCovers.includes(candidate));

  useEffect(() => {
    if (!video || !canPlayVideo) return;
    const element = ref.current;
    if (!element) return;
    let visible = false;
    let stopped = false;
    element.muted = true;
    element.defaultMuted = true;
    element.setAttribute("playsinline", "");
    const update = () => {
      if (stopped) return;
      if (!visible || document.hidden) { element.pause(); return; }
      const result = element.play();
      if (result) void result.catch((error: unknown) => {
        if (stopped) return;
        const name = error instanceof DOMException ? error.name : '';
        if (name === 'NotAllowedError') setShowPlay(true);
        else if (name === 'NotSupportedError') setUnplayable(video);
      });
    };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      update();
    }, { rootMargin: '250px 0px', threshold: [0, 0.05, 0.2] });
    if (observer) observer.observe(element);
    else { visible = true; update(); }
    document.addEventListener('visibilitychange', update);
    return () => {
      stopped = true;
      observer?.disconnect();
      document.removeEventListener('visibilitychange', update);
      element.pause();
    };
  }, [video, canPlayVideo]);

  const ready = canPlayVideo && frame === video;
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#152b4e] via-[#09182c] to-[#070b15] px-5 text-center">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#78b6ff]">{canPlayVideo ? 'Project video' : 'Portfolio preview'}</span>
          <span className="mt-2 block text-[18px] font-semibold text-white/80">{name}</span>
        </div>
      </div>
      {cover && (
        <Image
          src={cover}
          alt={name + " portfolio image"}
          fill
          sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
          unoptimized={cover.endsWith('.svg')}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailedCovers((old) => old.includes(cover) ? old : [...old, cover])}
        />
      )}
      {canPlayVideo && video && (
        <video
          key={video}
          ref={ref}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={name + " project video"}
          className={"pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 " + (ready ? 'opacity-100' : 'opacity-0')}
          onLoadedData={() => setFrame(video)}
          onPlaying={() => { setFrame(video); setShowPlay(false); }}
          onError={() => setUnplayable(video)}
        />
      )}
      {canPlayVideo && showPlay && (
        <button
          type="button"
          aria-label={"Play " + name + " preview video"}
          onClick={() => {
            const player = ref.current;
            if (!player) return;
            player.muted = true;
            void player.play().then(() => { setFrame(video ?? null); setShowPlay(false); }).catch(() => setShowPlay(true));
          }}
          className="absolute bottom-3 left-3 z-20 inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 bg-[#101827]/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF] sm:bottom-4 sm:left-4"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="m8 5 11 7-11 7V5Z" /></svg>Play video</span>
        </button>
      )}
    </>
  );
}
