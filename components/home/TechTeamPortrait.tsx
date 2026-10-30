"use client";

import Image from "next/image";
import { useState } from "react";

type TechTeamPortraitProps = {
  initials: string;
  name: string;
  photoUrl?: string;
  size?: "default" | "compact";
};

const flowerPath =
  "M31 8C39 8 44 13 50 18C56 13 61 8 69 8C83 8 92 19 92 33C92 41 87 46 82 50C87 54 92 59 92 67C92 81 81 92 67 92C59 92 54 87 50 82C46 87 41 92 33 92C19 92 8 81 8 67C8 59 13 54 18 50C13 46 8 41 8 33C8 19 19 8 31 8Z";

export default function TechTeamPortrait({
  initials,
  name,
  photoUrl,
  size = "default",
}: TechTeamPortraitProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showPhoto = Boolean(photoUrl && photoUrl !== failedUrl);

  return (
    <div
      className={
        size === "compact"
          ? "relative h-12 w-12 shrink-0"
          : "relative h-[100px] w-[100px] shrink-0 sm:h-[120px] sm:w-[120px] md:h-[136px] md:w-[136px]"
      }
    >
      {showPhoto && photoUrl ? (
        <div className={size === "compact" ? "relative h-full w-full overflow-hidden rounded-[13px] bg-[#101010]" : "relative h-full w-full overflow-hidden rounded-[28px] bg-[#101010]"}>
          <Image
            src={photoUrl}
            alt={name}
            fill
            unoptimized
            sizes={size === "compact" ? "48px" : "(max-width: 640px) 100px, 136px"}
            className="object-cover"
            onError={() => setFailedUrl(photoUrl)}
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${name} profile placeholder`}
          className="h-full w-full"
        >
          <path
            d={flowerPath}
            fill="#0d0d0d"
            stroke="rgba(255,255,255,.13)"
            strokeWidth="1.2"
          />
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fill="#1677FF"
            fontSize="22"
            fontWeight="700"
            letterSpacing="-1"
          >
            {initials}
          </text>
        </svg>
      )}

    </div>
  );
}
