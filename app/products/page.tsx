import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/home/SiteHeader";
import SiteFooter from "../../components/home/SiteFooter";
import { products } from "../../data/products";
import CardVideoPreview from "../../components/home/CardVideoPreview";
import { getAvailablePortfolioVideos } from "../../data/portfolioVideos.server";

export const metadata: Metadata = {
  title: "Products | Cubixmet",
  description:
    "Explore CubeGears Drive Hub, BiteMyBills, CubeSites, CubixSkill, CubixLog, and Influencer by Cubixmet.",
};

export default function ProductsPage() {
  const videoPaths = getAvailablePortfolioVideos(products.map((item) => item.video));
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] pt-[60px] text-white md:pt-[68px]">
      <SiteHeader />
      <section className="relative overflow-hidden px-5 pb-10 pt-16 sm:px-8 md:pb-14 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#1677FF]/10 blur-[100px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm text-white/55 transition hover:text-white">
            <span aria-hidden="true">←</span> Back to home
          </Link>
          <p className="mt-9 text-xs font-semibold uppercase tracking-[0.22em] text-[#75b5ff]">
            Cubixmet / Products
          </p>
          <h1 className="mt-4 max-w-[920px] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
            Products built for real work.
          </h1>
          <p className="mt-6 max-w-[720px] text-[15px] leading-8 text-white/60 md:text-lg">
            Explore our growing collection of business platforms, digital products, and creator tools.
          </p>
        </div>
      </section>
      <section className="px-5 pb-20 sm:px-8 md:pb-28" aria-label="Cubixmet products">
        <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="group relative flex min-h-[310px] min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0d111a] p-6 transition-colors hover:border-[#1677FF]/50 sm:p-8"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#1677FF]/10 blur-[70px]" />
              <div className="relative flex items-start justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8cc1ff]">
                  {product.category}
                </p>
                <span className="font-mono text-[12px] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {(
                  <div className="relative mt-6 aspect-[1.9/1] overflow-hidden rounded-[15px] border border-white/10 bg-[#101a2d]">
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-4xl font-bold text-[#8cc1ff]">
                      {product.mark}
                    </span>
                    <CardVideoPreview
                      video={videoPaths.includes(product.video ?? "") ? product.video : undefined}
                      image={product.coverImage}
                      name={product.name}
                    />
                  </div>
                )}
              <h2 className="relative mt-11 text-[clamp(1.65rem,2.7vw,2.5rem)] font-semibold leading-tight tracking-[-0.05em]">
                {product.name}
              </h2>
              <p className="relative mt-4 max-w-[48ch] text-sm leading-7 text-white/55">
                {product.description}
              </p>
              <div className="relative mt-auto pt-8">
                {product.href ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#1677FF] px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#348aff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={`Explore ${product.name} (opens in a new tab)`}
                  >
                    Explore Product <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-[12px] font-semibold text-white/50">
                    Details coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
