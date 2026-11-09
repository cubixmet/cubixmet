import type { SVGProps } from "react";

/** One consistent vector icon across mobile and desktop. */
export default function ArrowUpRightIcon({
  className = "h-4 w-4 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M7 17 17 7M7.5 7H17v9.5" />
    </svg>
  );
}
