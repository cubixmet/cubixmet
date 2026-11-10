import Image from "next/image";
import { site, footerCopy, companyLinks } from "../../data/site";
import { ventures } from "../../data/ventures";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M7.2 3.8 4.8 5.4c-.8.5-1.1 1.5-.8 2.4 1.8 5.2 5.9 9.3 11.1 11.1.9.3 1.9 0 2.4-.8l1.6-2.4c.5-.8.4-1.8-.3-2.5l-2-2c-.6-.6-1.5-.7-2.2-.3l-1.9 1.1a13.7 13.7 0 0 1-4.8-4.8L9 5.3c.4-.7.3-1.6-.3-2.2l-2-2c-.7-.7-1.7-.8-2.5-.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21M12 3C9.7 5.5 8.5 8.5 8.5 12S9.7 18.5 12 21" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteFooter() {

  return (
    <footer className="bg-[#050505] pb-8 pt-16 text-white md:pb-10 md:pt-24">
      <div className="site-wrapper">
        <div className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 md:pb-16">
          <div>
            <a
              href="/"
              aria-label="Cubixmet home"
              className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1677FF] md:h-11 md:w-11"
            >
              <Image
                src={site.logo}
                alt={site.brand}
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            </a>

            <h2 className="mt-7 max-w-[760px] text-[clamp(2.4rem,5vw,5.6rem)] font-medium leading-[.93] tracking-[-0.06em]">
              {footerCopy.title}
            </h2>

            <p className="mt-5 max-w-[610px] text-[13px] leading-6 text-white/48 md:text-[15px] md:leading-7">
              {footerCopy.description}
            </p>

            <div className="mt-8 flex max-w-[620px] items-start gap-3 text-[12px] leading-6 text-white/42 md:text-[13px]">
              <span className="mt-1 text-[#1677FF]">
                <LocationIcon />
              </span>
              <p>{site.address}</p>
            </div>
          </div>

          <div className="overflow-hidden border border-white/8 bg-[#0b0b0b]">
            <iframe
              src={site.mapEmbedUrl}
              title={site.mapTitle}
              className="h-[280px] w-full border-0 grayscale contrast-[1.05] md:h-[330px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr] lg:gap-14 md:py-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1677FF]">
              {footerCopy.venturesLabel}
            </p>
            <div className="mt-5 space-y-3">
              {ventures.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="flex w-fit items-center gap-2 text-[13px] text-white/52 transition hover:text-white"
                >
                  {name}
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1677FF]">
              {footerCopy.companyLabel}
            </p>
            <div className="mt-5 space-y-3">
              {companyLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block w-fit text-[13px] text-white/52 transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1677FF]">
              {footerCopy.contactLabel}
            </p>

            <div className="mt-5 space-y-4">
              <a
                href={`tel:${site.phoneDial}`}
                className="flex w-fit items-center gap-3 text-[13px] text-white/55 transition hover:text-white"
              >
                <span className="text-[#1677FF]">
                  <PhoneIcon />
                </span>
                {site.phoneDisplay}
              </a>

              <a
                href={site.website}
                className="flex w-fit items-center gap-3 text-[13px] text-white/55 transition hover:text-white"
              >
                <span className="text-[#1677FF]">
                  <GlobeIcon />
                </span>
                {site.websiteDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-6 text-[10px] uppercase tracking-[0.12em] text-white/26 sm:flex-row sm:items-center sm:justify-between">
          <span>{footerCopy.copyright}</span>
          <span>{site.locationShort}</span>
        </div>
      </div>
    </footer>
  );
}
