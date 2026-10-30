import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/home/SiteHeader";
import SiteFooter from "../../components/home/SiteFooter";
import { availableToolCount, freeTools } from "../../data/freeTools";
import CardVideoPreview from "../../components/home/CardVideoPreview";
import { getAvailablePortfolioVideos } from "../../data/portfolioVideos.server";

export const metadata: Metadata = {
  title: "Tools | Cubixmet",
  description:
    "Explore online tools for QR codes, barcodes, tickets, certificates, image slicing, VCF contacts, nutrition plans and OP posters.",
};

export default function ToolsPage() {
  const videoPaths = getAvailablePortfolioVideos(freeTools.map((item) => item.video));
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] pt-[60px] text-white md:pt-[68px]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-14 sm:px-8 md:pb-20 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-[#1677FF]/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-[1400px]">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <p className="mt-9 text-xs font-semibold uppercase tracking-[0.22em] text-[#75b5ff]">
            Cubixmet / Tools
          </p>
          <h1 className="mt-4 max-w-[940px] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
            Small tools.
            <br />
            <span className="text-[#1677FF]">Big impact.</span>
          </h1>
          <p className="mt-7 max-w-[720px] text-[15px] leading-8 text-white/60 md:text-lg">
            Practical online utilities for creators, businesses, teams and everyday work.
            Find the right tool, open it, and get things done.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-white/55 sm:text-sm">
            <p>
              <span className="mr-2 font-semibold text-white">{String(availableToolCount).padStart(2, "0")}</span>
              Available tools
            </p>
            <p>
              <span className="mr-2 font-semibold text-white">
                {String(freeTools.length - availableToolCount).padStart(2, "0")}
              </span>
              Coming soon
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-14" aria-labelledby="tool-directory-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 md:mb-9">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#75b5ff]">
                Explore the collection
              </p>
              <h2 id="tool-directory-title" className="mt-2 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-[-0.05em]">
                Tools & utilities
              </h2>
            </div>
            <span className="text-xs font-medium text-white/40">
              {String(freeTools.length).padStart(2, "0")} tools
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {freeTools.map((tool, index) => (
              <article
                key={tool.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0d111a] p-6 transition-colors hover:border-[#1677FF]/50 sm:p-7 lg:min-h-[430px]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1677FF]/[0.08] blur-[80px] transition-colors group-hover:bg-[#1677FF]/15"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-14 min-w-14 place-items-center rounded-[15px] border border-[#1677FF]/25 bg-[#1677FF]/10 px-2 text-[16px] font-bold tracking-[-0.055em] text-[#8cc1ff]"
                  >
                    {tool.mark}
                  </span>
                  <span className="font-mono text-xs text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

              {(
                  <div className="relative mt-6 aspect-[1.9/1] overflow-hidden rounded-[15px] border border-white/10 bg-[#101a2d]">
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-4xl font-bold text-[#8cc1ff]">
                      {tool.mark}
                    </span>
                    <CardVideoPreview
                      video={videoPaths.includes(tool.video ?? "") ? tool.video : undefined}
                      image={tool.coverImage}
                      name={tool.name}
                    />
                  </div>
                )}
                <div className="relative mt-7 flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#86bfff]">
                    {tool.category}
                  </span>
                </div>
                <h3 className="relative mt-3 text-[clamp(1.65rem,2.4vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
                  {tool.name}
                </h3>
                <p className="relative mt-4 text-[13px] leading-[1.75] text-white/55 sm:text-sm">
                  {tool.description}
                </p>

                <ul className="relative mt-6 flex flex-wrap gap-2" aria-label={`${tool.name} capabilities`}>
                  {tool.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] leading-[1.4] text-white/60"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-8">
                  {tool.href ? (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tool.action} — ${tool.name} (opens in a new tab)`}
                      className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#1677FF] px-5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#348aff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {tool.action}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/[0.035] px-5 text-[12px] font-semibold text-white/55">
                      Coming Soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-[780px] text-xs leading-6 text-white/35">
            Some tools open on a separate website. Availability and features may change over time.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
