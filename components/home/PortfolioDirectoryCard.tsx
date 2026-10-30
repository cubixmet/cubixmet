import CardVideoPreview from "./CardVideoPreview";

type PortfolioDirectoryCardProps = {
  kind: "Product" | "Tool";
  name: string;
  category: string;
  description: string;
  href: string | null;
  mark: string;
  tags: readonly string[];
  index: number;
  video?: string;
  coverImage?: string;
};

export default function PortfolioDirectoryCard({
  kind,
  name,
  category,
  description,
  href,
  mark,
  tags,
  index,
  video,
  coverImage,
}: PortfolioDirectoryCardProps) {
  return (
    <article
      data-scroll-card
      data-scroll-delay={(index % 6) * 70}
      className="scroll-card group min-w-0 overflow-hidden rounded-[17px] border border-[#192239] bg-[#0b1120] transition-colors hover:border-[#1677FF]/50"
    >
      <div className="relative flex aspect-[1.75/1] flex-col justify-between overflow-hidden bg-[#0b172a] p-5 sm:aspect-[2.15/1] sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full bg-[#1677FF]/20 blur-[75px] transition-colors duration-500 group-hover:bg-[#1677FF]/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full border border-[#1677FF]/20"
        />
        {!href && (
          <div className="relative z-30 flex justify-end">
            <span className="rounded-full border border-white/15 bg-[#111c31] px-2.5 py-1 text-[10px] font-semibold text-white/60">
              Coming Soon
            </span>
          </div>
        )}
        <div className="relative flex items-end justify-between gap-3">
          <span
            aria-hidden="true"
            className="grid h-16 min-w-16 place-items-center rounded-[17px] border border-[#1677FF]/35 bg-[#1677FF]/15 px-3 text-[clamp(1.2rem,2vw,1.9rem)] font-bold tracking-[-0.06em] text-[#88beff] sm:h-20 sm:min-w-20"
          >
            {mark}
          </span>
          <span className="max-w-[60%] text-right text-[10px] font-medium uppercase leading-5 tracking-[0.13em] text-white/40">
            {category}
          </span>
        </div>
        <CardVideoPreview video={video} image={coverImage} name={name} />
      </div>

      <div className="flex min-h-[205px] flex-col p-5 sm:p-6">
        <p className="text-[12px] font-semibold tracking-[0.01em] text-[#65a8ff]">
          {kind} · {category}
        </p>
        <h3 className="mt-2 text-[clamp(1.3rem,2vw,1.75rem)] font-bold leading-[1.12] tracking-[-.035em] text-white">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#7db8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
              aria-label={`Open ${name} in a new tab`}
            >
              {name}
            </a>
          ) : (
            name
          )}
        </h3>
        <p className="mt-3 flex-1 text-[12px] leading-[1.7] text-[#8392ad] sm:text-[13px]">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#1d2a40] px-3 py-1.5 text-[10px] font-medium text-[#8292ae]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#1677FF]/45 bg-[#1677FF]/10 px-4 text-[12px] font-semibold text-[#91c5ff] transition-colors hover:bg-[#1677FF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
            >
              {kind === "Tool" ? "Open Tool" : "Explore Product"}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="inline-flex min-h-10 items-center rounded-full border border-white/10 px-4 text-[12px] font-medium text-white/40">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
