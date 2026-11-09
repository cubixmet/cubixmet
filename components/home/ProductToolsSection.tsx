import ArrowUpRightIcon from "./ArrowUpRightIcon";
import Link from "next/link";
import { productTools } from "../../data/productTools";

export default function ProductToolsSection() {
  return (
    <section
      id="products-tools"
      aria-labelledby="products-tools-heading"
      className="relative bg-[#050505] py-16 text-white md:py-24"
    >
      <div className="mx-auto w-[90%] max-w-[1500px]">
        <div className="mb-8 border-b border-white/10 pb-7 md:mb-10 md:pb-9">
          <h2
            id="products-tools-heading"
            className="max-w-[900px] text-[clamp(2.35rem,5vw,5.5rem)] font-semibold leading-[1] tracking-[-.06em]"
          >
            Built to solve real problems.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {productTools.map((item) => (
            <article
              key={item.id}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0d111a] p-6 transition-colors hover:border-[#1677FF]/55 sm:p-8 lg:min-h-[340px]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1677FF]/10 blur-[65px]" />
              <div className="relative mb-10">
                <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#8cc1ff]">{item.category}</span>
              </div>
              <h3 className="relative text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.06] tracking-[-.05em]">
                {item.name}
              </h3>
              <p className="relative mt-4 max-w-[52ch] text-[13px] leading-[1.8] text-white/55 sm:text-[15px]">
                {item.description}
              </p>
              <div className="relative mt-auto pt-8">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#1677FF]/60 bg-[#1677FF]/10 px-5 text-[12px] font-semibold text-[#a2cfff] transition-colors hover:bg-[#1677FF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
                >
                  {item.action}
                  <ArrowUpRightIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
