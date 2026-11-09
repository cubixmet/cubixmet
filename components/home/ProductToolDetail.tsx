import ArrowUpRightIcon from "./ArrowUpRightIcon";
import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { whatsappLink } from "../../data/site";
import type { ProductTool } from "../../data/productTools";

export default function ProductToolDetail({ item }: { item: ProductTool }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] pt-[60px] text-white md:pt-[68px]">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-16 md:pb-24 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-32 h-[490px] w-[490px] rounded-full bg-[#1677FF]/10 blur-[110px]" />
        <div className="relative mx-auto w-[90%] max-w-[1500px]">
          <Link href="/#products-tools" className="inline-flex min-h-10 items-center gap-2 text-[12px] text-white/55 transition-colors hover:text-white">
            <span aria-hidden="true">←</span> Products &amp; Tools
          </Link>
          <p className="section-label mb-5 mt-8">{item.category} / Cubixmet</p>
          <h1 className="max-w-[1000px] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.95] tracking-[-.065em]">
            {item.detailHeading}
          </h1>
          <p className="mt-7 max-w-[690px] text-[14px] leading-[1.85] text-white/55 md:text-[17px]">
            {item.detailDescription}
          </p>
          <a
            href={whatsappLink(item.contactMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-12 items-center rounded-full bg-[#1677FF] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#348aff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
          >
            Discuss a {item.category.toLowerCase()} <ArrowUpRightIcon />
          </a>
        </div>
      </section>

      <section aria-labelledby="detail-features" className="py-16 md:py-24">
        <div className="mx-auto w-[90%] max-w-[1500px]">
          <p className="section-label mb-5">{item.category} capabilities</p>
          <h2 id="detail-features" className="mb-8 text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-.055em]">{item.name}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {item.features.map((feature, index) => (
              <article key={feature} className="min-w-0 rounded-[18px] border border-white/10 bg-[#0d111a] p-6 md:min-h-[170px] md:p-8">
                <span className="text-[12px] font-mono text-[#75b5ff]">0{index + 1}</span>
                <h3 className="mt-8 text-[18px] font-semibold tracking-[-.04em] text-white">{feature}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
