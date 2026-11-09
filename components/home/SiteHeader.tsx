"use client";

import { useEffect, useState } from "react";
import Arrow from "./Arrow";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, observedSectionIds, observerSkippedIds } from "../../data/navigation";
import { site, contactMessages, whatsappLink } from "../../data/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Resolve on-page anchors and standalone routes consistently.
  const homeHref = (href: string) =>
    href.startsWith("#") && !isHomePage ? `/${href}` : href;
  const linkIsActive = (href: string) =>
    href.startsWith("/")
      ? pathname === href || pathname.startsWith(`${href}/`)
      : isHomePage && activeLink === href;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = observedSectionIds;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target?.id) return;

        const id = visible.target.id;
        if (observerSkippedIds.includes(id)) return;
        setActiveLink(`#${id}`);
      },
      { rootMargin: "-32% 0px -56% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (menuOpen
          ? "bg-[#050505]"
          : scrolled
            ? "bg-[#050505]/92 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/55 to-transparent")
      }
    >
      <div className="header-wrapper flex h-[60px] items-center justify-between md:h-[68px]">
        <a
        href="/"
        aria-label="Cubixmet Home"
        className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white md:h-11 md:w-11"
>
  <Image
    src={site.logo}
    alt="Cubixmet Logo"
    width={44}
    height={44}
    priority
    className="h-full w-full object-contain"
  />
</a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 xl:flex 2xl:gap-5">
          {navLinks.map(([href, label]) => (
            <a
              key={href}
              href={homeHref(href)}
              onClick={() => setActiveLink(href)}
              className={
                "relative px-1 py-2 text-[11px] font-medium transition-colors duration-300 xl:text-[12px] " +
                (linkIsActive(href)
                  ? "text-[#1677FF]"
                  : "text-white/65 hover:text-white")
              }
            >
              {label}
              <span
                aria-hidden="true"
                className={
                  "absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-[#1677FF] transition-transform duration-300 " +
                  (linkIsActive(href) ? "scale-x-100" : "scale-x-0")
                }
              />
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink(contactMessages.header)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Cubixmet on WhatsApp"
          className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold text-white transition hover:border-[#1677FF]/60 hover:bg-[#1677FF] xl:inline-flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]" />
          Let&apos;s Talk
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setMenuOpen((value) => !value)}
          className="relative z-50 grid h-10 w-10 place-items-center border-0 bg-transparent text-white outline-none transition-colors hover:text-[#1677FF] focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#1677FF] xl:hidden"
        >
          <span className="flex w-4 flex-col gap-[5px]">
            <span
              className={
                "h-px w-full bg-white transition duration-300 " +
                (menuOpen ? "translate-y-[3px] rotate-45" : "")
              }
            />
            <span
              className={
                "h-px w-full bg-white transition duration-300 " +
                (menuOpen ? "-translate-y-[3px] -rotate-45" : "")
              }
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-site-menu"
          className="mobile-menu-panel fixed inset-x-0 bottom-0 top-[60px] md:top-[68px] z-40 flex flex-col overflow-y-auto overscroll-contain bg-[#050505] px-6 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 xl:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center gap-1 py-2">
            {navLinks.map(([href, label]) => {
              const isActive = linkIsActive(href);
              return (
                <a
                  key={href}
                  href={homeHref(href)}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => {
                    setActiveLink(href);
                    setMenuOpen(false);
                  }}
                  className={
                    "group flex min-h-[46px] items-center py-2 text-[16px] font-medium tracking-[-0.02em] transition-colors duration-200 " +
                    (isActive ? "text-white" : "text-white/65 hover:text-white")
                  }
                >
                  <span className="inline-flex flex-col items-start gap-1.5">
                    {label}
                    <span
                      aria-hidden="true"
                      className={
                        "h-[2px] rounded-full bg-[#1677FF] transition-all duration-300 " +
                        (isActive ? "w-full opacity-100" : "w-0 opacity-0")
                      }
                    />
                  </span>
                </a>
              );
            })}
          </nav>
          <div className="mt-3 shrink-0 pb-1">
            <a
              href={homeHref("#contact")}
              onClick={() => {
                setActiveLink("#contact");
                setMenuOpen(false);
              }}
              className="flex min-h-12 items-center justify-between rounded-md bg-[#1677FF] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#3187ff]"
            >
              Start a project
              <Arrow />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
