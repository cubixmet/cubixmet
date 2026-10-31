"use client";

import { useEffect, useRef, useState } from "react";

type ProjectCoverPreviewProps = {
  name: string;
  category: string;
  video?: string;
};

/**
 * CubixSkill-style artwork, created directly in the UI. No image fields,
 * third-party stock photos, or external thumbnail requests are needed.
 */
function ProjectArtwork({ name, category }: Pick<ProjectCoverPreviewProps, "name" | "category">) {
  const mark = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      aria-label={`${name} designed portfolio cover`}
      role="img"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#09172a]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#071120_5%,#10223b_67%,#183d63_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#8aafd4_0.8px,transparent_0.8px)] [background-size:19px_19px]" />
      <div className="absolute -right-[16%] -top-[48%] h-[145%] w-[80%] rounded-full border border-[#69bcff]/15 bg-[radial-gradient(circle,rgba(61,173,255,0.16)_0%,transparent_70%)]" />
      <div className="absolute right-[2%] top-[3%] h-[100%] w-[63%] rounded-full border border-[#65baff]/10" />

      <div className="absolute left-[5.8%] top-[13%] z-[1] w-[53%]">
        <p className="text-[clamp(7px,1.15vw,12px)] font-bold uppercase tracking-[.18em] text-[#5fc6ff]">
          Cubixmet / Portfolio
        </p>
        <h4 className="mt-[13%] break-words text-[clamp(17px,2.6vw,36px)] font-bold leading-[1.12] tracking-[-.05em] text-[#f2f7ff]">
          {name}
        </h4>
        <p className="mt-[4%] text-[clamp(9px,1.45vw,17px)] font-medium text-[#a6c0dc]">
          {category}
        </p>
        <div className="mt-[5%] h-[3px] w-[16%] min-w-[22px] rounded-full bg-[#5fc6ff]" />
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 430 320"
        className="absolute right-[4%] top-[22%] z-[1] h-[66%] w-[46%] drop-shadow-[0_20px_30px_rgba(1,7,17,.4)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="1" y="1" width="428" height="317" rx="17" fill="#102A47" stroke="#45678D" strokeOpacity=".8" strokeWidth="2" />
        <path d="M18 1H412a17 17 0 0 1 17 17v29H1V18A17 17 0 0 1 18 1Z" fill="#234568" />
        <circle cx="26" cy="24" r="6" fill="#f7aaaf" />
        <circle cx="47" cy="24" r="6" fill="#f4ce95" />
        <circle cx="68" cy="24" r="6" fill="#9ae3cb" />
        <rect x="26" y="68" width="112" height="85" rx="10" fill="#193b5e" />
        <rect x="43" y="87" width="75" height="10" rx="5" fill="#5fc6ff" fillOpacity=".9" />
        <rect x="43" y="110" width="57" height="7" rx="3.5" fill="#91b5d8" fillOpacity=".6" />
        <rect x="160" y="68" width="112" height="85" rx="10" fill="#193b5e" />
        <rect x="177" y="87" width="75" height="10" rx="5" fill="#5fc6ff" fillOpacity=".65" />
        <rect x="177" y="110" width="57" height="7" rx="3.5" fill="#91b5d8" fillOpacity=".6" />
        <rect x="294" y="68" width="108" height="85" rx="10" fill="#193b5e" />
        <rect x="311" y="87" width="71" height="10" rx="5" fill="#5fc6ff" fillOpacity=".5" />
        <rect x="311" y="110" width="52" height="7" rx="3.5" fill="#91b5d8" fillOpacity=".6" />
        {[56, 96, 136, 176, 216, 256, 296, 336].map((x, index) => {
          const height = [61, 92, 117, 155, 131, 67, 96, 125][index];
          return (
            <rect
              key={x}
              x={x}
              y={288 - height}
              width="21"
              height={height}
              rx="7"
              fill="#5fc6ff"
              fillOpacity={0.26 + index * 0.085}
            />
          );
        })}
      </svg>
    </div>
  );
}

/** Keep the designed cover on screen until the video is ready to display. */
export default function ProjectCoverPreview({ name, category, video }: ProjectCoverPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failedVideo, setFailedVideo] = useState<string | null>(null);
  const [loadedVideo, setLoadedVideo] = useState<string | null>(null);
  const showVideo = Boolean(video && failedVideo !== video);

  useEffect(() => {
    if (!showVideo) return;
    const player = videoRef.current;
    if (!player) return;

    let visible = false;
    let disposed = false;
    const syncPlayback = () => {
      if (!visible || document.hidden) {
        player.pause();
        return;
      }
      const pending = player.play();
      if (pending) {
        void pending.catch((error: unknown) => {
          if (!disposed && error instanceof DOMException && error.name === "NotSupportedError" && video) {
            setFailedVideo(video);
          }
        });
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      visible = true;
      syncPlayback();
      document.addEventListener("visibilitychange", syncPlayback);
      return () => {
        disposed = true;
        document.removeEventListener("visibilitychange", syncPlayback);
        player.pause();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45);
        syncPlayback();
      },
      { threshold: [0, 0.45, 0.75] }
    );
    observer.observe(player);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      player.pause();
    };
  }, [showVideo, video]);

  return (
    <>
      <ProjectArtwork name={name} category={category} />
      {showVideo && video && (
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
          onError={() => setFailedVideo(video)}
        />
      )}
    </>
  );
}
