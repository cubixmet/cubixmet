"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "./Arrow";
import ProjectCoverPreview from "./ProjectCoverPreview";
import Image from "next/image";
import { services } from "../../data/services";
import { aboutContent, aboutPillars } from "../../data/about";
import { ventures } from "../../data/ventures";
import { projects, projectFilters } from "../../data/projects";
import { products } from "../../data/products";
import { freeTools } from "../../data/freeTools";
import PortfolioDirectoryCard from "./PortfolioDirectoryCard";
import TestimonialsSlider from "./TestimonialsSlider";
import { homeCopy } from "../../data/homeContent";
import { site, whatsappLink } from "../../data/site";
import { whyChoose } from "../../data/whyChoose";
import { marqueeItems } from "../../data/marquee";
import TeamSection from "./TeamSection";
import ProductToolsSection from "./ProductToolsSection";
import { impactStats } from "../../data/impact";

function FlowerSeparator() {
  return (
    <span className="inline-flex h-[0.66em] w-[0.66em] shrink-0 translate-y-[0.03em] items-center justify-center align-middle text-current">
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <g fill="currentColor">
          <ellipse cx="50" cy="20" rx="10" ry="22" />
          <ellipse cx="50" cy="80" rx="10" ry="22" />
          <ellipse cx="24" cy="35" rx="10" ry="22" transform="rotate(-55 24 35)" />
          <ellipse cx="76" cy="35" rx="10" ry="22" transform="rotate(55 76 35)" />
          <ellipse cx="24" cy="65" rx="10" ry="22" transform="rotate(55 24 65)" />
          <ellipse cx="76" cy="65" rx="10" ry="22" transform="rotate(-55 76 65)" />
        </g>
      </svg>
    </span>
  );
}

function useReveal() {
  useEffect(() => {
    // Keep content visible even on browsers without IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(
        (element) => element.classList.add("is-visible")
      );
      document.querySelectorAll<HTMLElement>("[data-scroll-card]").forEach(
        (element) => element.classList.add("is-card-visible")
      );
      return;
    }

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const cardNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-card]"));
    const textNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main h4, main p, main blockquote footer"
      )
    ).filter((node) => !node.closest("header") && !node.closest("[data-no-text-reveal]"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          const delay = Number(node.dataset.scrollDelay || 0);
          window.setTimeout(() => node.classList.add("is-card-visible"), delay);
          cardObserver.unobserve(node);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.classList.add("is-text-visible");
          textObserver.unobserve(node);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" }
    );

    textNodes.forEach((node, index) => {
      node.classList.add("text-scroll-reveal");
      node.style.setProperty("--text-delay", `${Math.min(index % 4, 3) * 55}ms`);
      textObserver.observe(node);
    });

    revealNodes.forEach((node) => revealObserver.observe(node));
    cardNodes.forEach((node) => cardObserver.observe(node));

    return () => {
      revealObserver.disconnect();
      cardObserver.disconnect();
      textObserver.disconnect();
    };
  }, []);
}

function AboutIcon({ type }: { type: string }) {
  const common = "h-6 w-6";

  if (type === "layers") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="m12 3 8 4-8 4-8-4 8-4Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="m4 12 8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === "orbit") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="4.3" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="9" ry="4.3" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4.3" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.4" />
        <path d="m7 15 4-4 3 2 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7h3v3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      section.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach(
        (item) => item.classList.add("is-about-visible")
      );
      return;
    }

    const revealItems = Array.from(
      section.querySelectorAll<HTMLElement>("[data-about-reveal]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-about-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
    section.classList.add("about-motion-ready");

    return () => {
      observer.disconnect();
      section.classList.remove("about-motion-ready");
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-space about-mobile-section"
      data-no-text-reveal
    >
      <div className="about-wrapper">
        <div className="relative overflow-hidden rounded-[18px] bg-[#0b0b0b] md:rounded-[22px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(22,119,255,.08),transparent_24%),radial-gradient(circle_at_88%_82%,rgba(22,119,255,.08),transparent_26%)]" />

          <div className="relative z-10 grid gap-5 px-5 pb-6 pt-7 sm:gap-8 md:gap-10 md:px-10 md:py-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 xl:px-12">
            <div data-about-reveal className="about-reveal">
              <p className="section-label">{aboutContent.label}</p>
              <h2 className="max-w-[14ch] text-[clamp(2.2rem,10vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.055em] sm:max-w-[720px] md:text-[clamp(2.6rem,4.6vw,5.3rem)] md:font-medium md:leading-[.94]">
                {aboutContent.title}
              </h2>
            </div>

            <div data-about-reveal className="about-reveal flex items-end lg:justify-end">
              <p className="max-w-[560px] text-[13px] leading-[1.75] text-white/65 md:text-[15px] md:leading-7">
                {aboutContent.description}
              </p>
            </div>
          </div>

          <div className="relative z-10 grid border-t border-white/10 sm:grid-cols-2 sm:border-white/8 lg:grid-cols-4">
            {aboutPillars.map((item, index) => (
              <article
                key={item.title}
                data-about-reveal
                className="about-reveal about-pillar relative px-5 py-5 sm:min-h-[210px] sm:border-r sm:border-white/8 sm:py-7 md:px-7 md:py-8 lg:min-h-[230px] lg:last:border-r-0"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="flex items-start gap-3.5 sm:block">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#1677FF]/25 bg-[#1677FF]/5 text-[#1677FF] md:h-11 md:w-11">
                    <AboutIcon type={item.icon} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="pt-0.5 text-[17px] font-medium tracking-[-0.025em] text-white sm:mt-8 sm:pt-0 md:text-[20px]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-[300px] text-[12px] leading-[1.65] text-white/60 sm:mt-3 md:max-w-[250px] md:leading-5">
                      {item.copy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VenturesSection() {
  return (
    <section id="ventures" className="relative overflow-hidden pb-24 pt-10 md:pb-36 md:pt-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 640 640"
          className="absolute right-[-12%] top-[8%] h-[78%] w-auto text-white/[0.035] md:right-[-2%] md:top-[4%] md:h-[90%]"
          fill="currentColor"
          aria-hidden="true"
        >
          <g transform="translate(64 92)">
            <path d="M40 70 212 170 212 270 40 170Z" />
            <path d="M472 70 300 170 300 270 472 170Z" />
            <path d="M40 210 212 310 212 410 40 310Z" />
            <path d="M472 210 300 310 300 410 472 310Z" />
            <path d="M212 170 256 196 300 170 300 270 256 296 212 270Z" />
          </g>
        </svg>
      </div>

      <div className="about-wrapper relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="reveal lg:col-span-3">
            <p className="section-label">{homeCopy.venturesLabel}</p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6 lg:relative lg:block lg:min-h-[1080px]">
              {ventures.map((venture, index) => {
                const placement =
                  index === 0
                    ? "lg:absolute lg:left-[43%] lg:top-0 lg:w-[55%]"
                    : index === 1
                      ? "lg:absolute lg:-left-[28%] lg:top-[235px] lg:w-[55%]"
                      : "lg:absolute lg:left-[36%] lg:top-[630px] lg:w-[55%]";

                return (
                  <article
                    key={venture.name}
                    data-scroll-card
                    data-scroll-delay={index * 100}
                    className={
                      "scroll-card group relative flex min-w-0 flex-col overflow-hidden border border-white/8 bg-[#101010] p-5 sm:p-6 md:min-h-[370px] md:p-6 lg:min-h-[390px] lg:p-7 " +
                      placement
                    }
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.018),transparent_38%)]" />

                    <div className="relative z-10 flex h-full flex-col">
                      <span className="text-[clamp(2.3rem,3.5vw,3.7rem)] font-semibold leading-none tracking-[-0.06em] text-[#1677FF]">
                        0{index + 1}
                      </span>

                      <h3 className="mt-5 text-[clamp(1.75rem,2.65vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-white">
                        {venture.name}
                      </h3>

                      <p className="mt-2.5 text-[12px] font-medium text-white/70 md:text-[13px]">
                        {venture.tagline}
                      </p>

                      <p className="mt-3.5 max-w-[470px] text-[12px] leading-[1.7] text-white/55">
                        {venture.copy}
                      </p>

                      <div className="mt-5 grid gap-2 border-t border-white/10 pt-4">
                        {venture.services.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2.5 text-[11px] leading-[1.6] text-white/60"
                          >
                            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677FF]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {(venture.icon === "tech" || venture.icon === "digital" || venture.icon === "academy") && (
                        <a
                          href={venture.href}
                          className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 rounded-full bg-[#1677FF] px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#348aff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label={`Explore ${venture.name}`}
                        >
                          Explore {venture.name}
                          <Arrow />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileDragRef = useRef<{ id: number; x: number; scrollLeft: number; moved: boolean } | null>(null);
  const suppressNavClickRef = useRef(false);
  const phoneSwipeRef = useRef<{ x: number; y: number } | null>(null);
  const phoneNavRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const [serviceProgress, setServiceProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const top = section.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, (window.scrollY - top) / distance));

      setServiceProgress(progress);
      setActiveService(
        Math.min(services.length - 1, Math.floor(progress * services.length))
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 640 || window.innerWidth >= 1024) return;
    const track = mobileNavRef.current;
    const active = track?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!track || !active) return;
    const trackRect = track.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const center = track.scrollLeft + activeRect.left - trackRect.left +
      activeRect.width / 2 - track.clientWidth / 2;
    track.scrollTo({
      left: Math.max(0, center),
      behavior: "smooth",
    });
  }, [activeService]);

  // Keep the selected phone slide in view while the page scrolls through services.
  useEffect(() => {
    const track = phoneNavRef.current;
    const active = track?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!track || !active) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: active.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeService]);

  const selectService = (index: number) => {
    const nextIndex = Math.max(0, Math.min(services.length - 1, index));
    setActiveService(nextIndex);
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
    const destination = Math.min(0.999, (nextIndex + 0.08) / services.length);

    window.scrollTo({
      top: top + distance * destination,
      behavior: "smooth",
    });
  };

  const handleNavPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640 || !event.isPrimary || event.pointerType !== "mouse" || event.button !== 0) return;
    const track = mobileNavRef.current;
    if (!track) return;
    suppressNavClickRef.current = false;
    mobileDragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
    };
  };

  const handleNavPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = mobileDragRef.current;
    const track = mobileNavRef.current;
    if (!drag || !track || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (Math.abs(distance) < 7 && !drag.moved) return;
    drag.moved = true;
    suppressNavClickRef.current = true;
    track.scrollLeft = drag.scrollLeft - distance;
  };

  const handleNavPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mobileDragRef.current?.id === event.pointerId) {
      mobileDragRef.current = null;
    }
  };

  const current = services[activeService];

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our services"
      className="relative isolate h-[520svh] w-full bg-[#050505] text-white lg:h-[600svh]"
      data-no-text-reveal
    >
      {/* Mobile/tablet: pinned scroll-driven services stage, with clickable/swipeable tabs. */}
      <div className="services-mobile-stage sticky top-0 mx-auto flex h-[100svh] w-full max-w-[660px] flex-col justify-center overflow-hidden px-5 pb-3 pt-[64px] sm:px-8 lg:hidden">
        <div className="mb-0 flex items-center justify-end gap-4 sm:mb-4">
          <p className="font-mono text-[11px] text-white/55" aria-live="polite">
            <span className="font-semibold text-white">{current.no}</span>
            <span className="mx-2 text-white/35">—</span>
            {String(services.length).padStart(2, "0")}
          </p>
        </div>

        {/* Phone: a real horizontally swipeable service carousel with an active slide. */}
        <nav aria-label="Swipe or tap to choose a service" className="services-phone-controls sm:hidden">
          <div
            ref={phoneNavRef}
            className="services-phone-track relative flex w-full snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain"
            onTouchStart={(event) => {
              const touch = event.touches[0];
              if (touch) phoneSwipeRef.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              const start = phoneSwipeRef.current;
              phoneSwipeRef.current = null;
              const touch = event.changedTouches[0];
              if (!start || !touch) return;
              const dx = touch.clientX - start.x;
              const dy = touch.clientY - start.y;
              if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
              selectService(activeService + (dx < 0 ? 1 : -1));
            }}
            onTouchCancel={() => { phoneSwipeRef.current = null; }}
          >
            {services.map((service, index) => (
              <button
                key={service.no}
                type="button"
                onClick={() => selectService(index)}
                aria-current={activeService === index ? "true" : undefined}
                aria-label={`Service ${index + 1} of ${services.length}: ${service.title}`}
                className={
                  "services-phone-slide flex min-h-11 shrink-0 snap-start items-center justify-center border px-3 py-2 text-center text-[14px] font-extrabold leading-[1.2] tracking-[-.02em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF] " +
                  (activeService === index
                    ? "border-white bg-white text-black"
                    : "border-white/15 bg-[#131923] text-white/80")
                }
              >
                {service.title}
              </button>
            ))}
          </div>
        </nav>

        {/* Tablets: swipeable horizontal service tabs. */}
        <nav
          aria-label="Choose a service"
          ref={mobileNavRef}
          onPointerDown={handleNavPointerDown}
          onPointerMove={handleNavPointerMove}
          onPointerUp={handleNavPointerEnd}
          onPointerCancel={handleNavPointerEnd}
          onClickCapture={(event) => {
            if (!suppressNavClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressNavClickRef.current = false;
          }}
          className="services-mobile-nav hidden w-full snap-x snap-mandatory gap-2 overflow-x-auto pb-3 sm:flex"
        >
          {services.map((service, index) => (
            <button
              key={service.no}
              type="button"
              onClick={() => selectService(index)}
              aria-current={activeService === index ? "true" : undefined}
              className={
                "shrink-0 snap-center whitespace-nowrap rounded-sm px-3.5 py-3 text-center text-[14px] font-extrabold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF] " +
                (activeService === index
                  ? "bg-white text-black"
                  : "bg-white/[0.07] text-white/65 hover:text-white")
              }
            >
              {service.title}
            </button>
          ))}
        </nav>

        <div className="mb-0 h-[2px] w-full bg-white/15 sm:mb-4" aria-hidden="true">
          <div
            className="h-full origin-left bg-[#1677FF] transition-[width] duration-300"
            style={{ width: `${((activeService + 1) / services.length) * 100}%` }}
          />
        </div>

        <div key={current.no} className="service-content-enter">
          <div className="services-mobile-media relative h-[clamp(130px,27svh,260px)] w-full overflow-hidden rounded-[12px] bg-[#101010]">
            <img
              src={current.image}
              alt={current.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pt-3 sm:pt-4">
            <h3 className="text-[clamp(1.3rem,5vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.045em]">
              {current.title}
            </h3>
            <p className="mt-2 text-[12px] leading-[1.55] text-white/65 sm:text-[14px] sm:leading-6">{current.copy}</p>
            <ul className="services-mobile-features mt-3 grid min-w-0 grid-cols-2 gap-x-3 gap-y-1.5 pb-1">
              {current.meta.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2 text-[11px] leading-[1.45] text-white/65 sm:text-[12px]">
                  <span aria-hidden="true" className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677FF]" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop: sticky scroll-driven service showcase. */}
      <div className="sticky top-0 hidden h-[100svh] w-full overflow-hidden bg-[#050505] lg:flex">
        <div className="mx-auto grid h-full w-[92%] max-w-[1320px] grid-cols-[minmax(0,0.96fr)_40px_minmax(0,1.08fr)] items-center gap-7 py-8 xl:gap-12">
          <nav aria-label="Choose a service" className="flex min-w-0 flex-col items-center justify-center">
            <div className="w-full max-w-[460px]">
              <div className="relative flex w-full flex-col gap-0">
                <span
                  aria-hidden="true"
                  className="service-active-indicator pointer-events-none absolute inset-x-0 top-0 h-[56px] rounded-[12px] bg-white shadow-[0_10px_32px_rgba(255,255,255,0.07)]"
                  style={{ transform: `translate3d(0, ${activeService * 56}px, 0)` }}
                />
                {services.map((service, index) => (
                  <button
                    key={service.no}
                    type="button"
                    onClick={() => selectService(index)}
                    aria-current={activeService === index ? "true" : undefined}
                    className={
                      "relative z-10 flex h-[56px] min-w-0 w-full items-center justify-center rounded-[12px] p-0 text-center text-[clamp(1.5rem,2.6vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF] " +
                      (activeService === index ? "text-black" : "text-white/55 hover:text-white")
                    }
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex h-[clamp(265px,57svh,410px)] min-h-0 flex-col items-center justify-between">
            <div className="relative min-h-0 w-[2px] flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="absolute inset-0 origin-top bg-[#1677FF] transition-transform duration-150"
                style={{ transform: `scaleY(${Math.max(1 / services.length, serviceProgress)})` }}
              />
            </div>
            <p className="mt-4 whitespace-nowrap font-mono text-[12px] font-semibold tabular-nums">
              {current.no}
              <span className="mx-2 text-[#1677FF]">—</span>
              {String(services.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex min-w-0 w-full max-w-[620px] flex-col justify-center">
            <div className="relative h-[clamp(260px,43svh,420px)] w-full overflow-hidden rounded-[12px] bg-[#101010]">
              {services.map((service, index) => (
                <img
                  key={service.no}
                  src={service.image}
                  alt={service.title}
                  aria-hidden={index !== activeService}
                  loading="lazy"
                  decoding="async"
                  className={
                    "pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out " +
                    (index === activeService
                      ? "scale-100 opacity-100"
                      : "scale-[1.04] opacity-0")
                  }
                />
              ))}
            </div>

            <div key={current.no} className="service-content-enter mt-5 min-h-[180px]">
              <p className="max-w-[560px] text-[clamp(13px,1vw,15px)] leading-[1.65] text-white/70">
                {current.copy}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2">
                {current.meta.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-white/65">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677FF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseIcon({ type }: { type: string }) {
  const common = "h-6 w-6";

  if (type === "growth") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.4" />
        <path d="m7 15 4-4 3 2 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7h3v3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === "ecosystem") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="m8 11 8-3M8 13l8 3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === "talent") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 19c.8-4 3-6 7-6s6.2 2 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M18 3v4M16 5h4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === "partnership") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="m8 12 2.2 2.2a2.5 2.5 0 0 0 3.6 0L16 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="m3 10 4-4 4 1 2-1 4 4-3 3M21 10l-4-4-4 1" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.4-2.8 7.5-7 10-4.2-2.5-7-5.6-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m9 12 2 2 4-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative z-10 bg-[#050505] pb-14 pt-7 md:pb-28 md:pt-14">
      <div data-reveal className="reveal about-wrapper">
        <div className="relative overflow-hidden rounded-[16px] border border-white/8 bg-[#0b0b0b] md:rounded-[22px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(22,119,255,.11),transparent_24%),radial-gradient(circle_at_88%_84%,rgba(22,119,255,.08),transparent_26%)]" />

          <div className="relative z-10 grid gap-6 p-4 sm:p-5 md:gap-10 md:p-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14 xl:p-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1677FF] md:mb-4">
                {homeCopy.whyChooseLabel}
              </p>

              <h2 className="max-w-[560px] text-[clamp(1.9rem,4.2vw,4.8rem)] font-medium leading-[1.04] tracking-[-0.055em] md:leading-[.96]">
                {homeCopy.whyChooseHeading}
                <span className="block text-white/38">{homeCopy.whyChooseSubheading}</span>
              </h2>
            </div>

            <div className="divide-y divide-white/8 border-t border-white/8 lg:border-t-0">
              {whyChoose.map((item, index) => (
                <article
                  key={item.title}
                  data-scroll-card
                  data-scroll-delay={index * 80}
                  className="scroll-card grid grid-cols-[36px_minmax(0,1fr)_24px] items-start gap-3 py-4 first:pt-4 md:grid-cols-[54px_minmax(0,1fr)_auto] md:gap-5 md:py-7 md:first:pt-7"
                >
                  <div className="grid h-9 w-9 place-items-center border border-[#1677FF]/25 bg-[#1677FF]/5 text-[#1677FF] md:h-11 md:w-11">
                    <span className="[&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6"><WhyChooseIcon type={item.icon} /></span>
                  </div>

                  <div>
                    <h3 className="text-[15px] font-medium leading-[1.25] tracking-[-0.03em] text-white sm:text-[16px] md:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-w-[500px] text-[11px] leading-[1.55] text-white/55 md:mt-2 md:text-[12px] md:leading-6 md:text-white/40">
                      {item.copy}
                    </p>
                  </div>

                  <span className="text-right text-[10px] font-semibold tracking-[0.12em] text-white/25">
                    0{index + 1}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection({ availableVideoPaths }: { availableVideoPaths: string[] }) {
  const [portfolioFilter, setPortfolioFilter] = useState<
    "All" | "Dynamic Website" | "Digital Marketing" | "Products" | "Tools"
  >("All");
  const portfolioGridRef = useRef<HTMLDivElement>(null);

  // Newly filtered cards are mounted after the page-wide scroll observer's
  // initial scan; make them visible so filter changes never yield blank cards.
  useEffect(() => {
    portfolioGridRef.current?.querySelectorAll<HTMLElement>("[data-scroll-card]").forEach(
      (card) => card.classList.add("is-card-visible")
    );
  }, [portfolioFilter]);

  const filters = [...projectFilters, "Products", "Tools"] as const;
  const filteredProjects =
    portfolioFilter === "All"
      ? projects
      : portfolioFilter === "Dynamic Website" || portfolioFilter === "Digital Marketing"
        ? projects.filter((project) => project.category === portfolioFilter)
        : [];
  const showProducts = portfolioFilter === "All" || portfolioFilter === "Products";
  const showTools = portfolioFilter === "All" || portfolioFilter === "Tools";

  return (
    <section id="work" className="pb-20 pt-8 md:pb-28 md:pt-12" data-no-text-reveal>
      <div className="about-wrapper">
        <div data-reveal className="reveal grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-label">{homeCopy.portfolioLabel}</p>
            <h2 className="max-w-[720px] text-[clamp(2.8rem,5.1vw,5.8rem)] font-medium leading-[.92] tracking-[-0.06em]">
              {homeCopy.portfolioHeading}
            </h2>
          </div>

          <p className="max-w-[540px] text-[13px] leading-6 text-white/45 md:text-[15px] md:leading-7 lg:justify-self-end">
            {homeCopy.portfolioDescription}
          </p>
        </div>

        <div className="mt-8 min-w-0 border-y border-white/10 sm:mt-10">
          <div
            role="group"
            aria-label="Filter portfolio by category"
            className="portfolio-filter-scroll flex min-w-0 w-full flex-nowrap items-center gap-2 overflow-x-auto overscroll-x-contain py-3.5 sm:py-4"
          >
            {filters.map((filter) => {
              const active = portfolioFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={(event) => {
                    setPortfolioFilter(filter);
                    const button = event.currentTarget;
                    const track = button.parentElement;
                    if (track) {
                      const buttonBounds = button.getBoundingClientRect();
                      const trackBounds = track.getBoundingClientRect();
                      const desired = track.scrollLeft + buttonBounds.left - trackBounds.left + buttonBounds.width / 2 - trackBounds.width / 2;
                      track.scrollTo({
                        left: Math.max(0, desired),
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                      });
                    }
                  }}
                  className={
                    "flex min-h-10 shrink-0 snap-center items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF] sm:min-h-11 sm:px-5 sm:text-[13px] " +
                    (active
                      ? "border-[#1677FF] bg-[#1677FF] text-white shadow-[0_5px_18px_rgba(22,119,255,.2)]"
                      : "border-white/15 bg-white/[0.025] text-white/75 hover:border-white/35 hover:bg-white/[0.06] hover:text-white")
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={portfolioGridRef} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              data-scroll-card
              data-scroll-delay={(index % 6) * 70}
              className="scroll-card group min-w-0 overflow-hidden rounded-[17px] border border-[#192239] bg-[#0b1120] transition-colors hover:border-[#1677FF]/50"
            >
              <div className="relative aspect-[1.75/1] overflow-hidden bg-[#101723] sm:aspect-[2.15/1]">
                <ProjectCoverPreview
                  key={project.id}
                  name={project.name}
                  category={project.category}
                  video={availableVideoPaths.includes(project.video ?? "") ? project.video : undefined}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-transparent to-transparent" />
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} official website (opens in a new tab)`}
                    title={`Visit ${project.name} website`}
                    className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-[11px] border border-white/15 bg-[#0c1527]/90 text-[#63a8ff] shadow-lg backdrop-blur-sm transition-colors hover:border-[#1677FF] hover:bg-[#1677FF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF] sm:right-4 sm:top-4"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3a15 15 0 0 0 0 18M12 3a15 15 0 0 1 0 18" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="flex min-h-[205px] flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold tracking-[.01em] text-[#65a8ff]">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.3rem,2vw,1.75rem)] font-bold leading-[1.12] tracking-[-.035em] text-white">
                      {project.website ? (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-[#7db8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
                        >
                          {project.name}
                        </a>
                      ) : project.name}
                    </h3>
                  </div>
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name} website in a new tab`}
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#7b91b2] transition-colors hover:bg-[#1677FF]/15 hover:text-[#74b4ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M13 5h6v6M19 5l-9 9" /><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
                      </svg>
                    </a>
                  )}
                </div>

                <p className="mt-3 flex-1 text-[12px] leading-[1.7] text-[#8392ad] sm:text-[13px]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#1d2a40] px-3 py-1.5 text-[10px] font-medium text-[#8292ae]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {showProducts && products.map((product, index) => (
            <PortfolioDirectoryCard
              key={`product-${product.name}`}
              kind="Product"
              name={product.name}
              category={product.category}
              description={product.description}
              href={product.href}
              mark={product.mark}
              coverImage={product.coverImage}
              video={availableVideoPaths.includes(product.video ?? "") ? product.video : undefined}
              tags={["Cubixmet Product", product.category]}
              index={filteredProjects.length + index}
            />
          ))}

          {showTools && freeTools.map((tool, index) => (
            <PortfolioDirectoryCard
              key={`tool-${tool.id}`}
              kind="Tool"
              name={tool.name}
              category={tool.category}
              description={tool.description}
              href={tool.href}
              mark={tool.mark}
              coverImage={tool.coverImage}
              video={availableVideoPaths.includes(tool.video ?? "") ? tool.video : undefined}
              tags={tool.features.slice(0, 3)}
              index={filteredProjects.length + (showProducts ? products.length : 0) + index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  return (
    <section
      aria-label="Our capabilities"
      className="relative overflow-hidden bg-[#050505] py-5 sm:py-6 md:py-8"
      data-no-text-reveal
    >
      <div className="capabilities-marquee">
        <div className="capabilities-marquee__track text-[clamp(1.65rem,4.6vw,4.4rem)] font-semibold leading-[1.12] tracking-[-0.045em]">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="capabilities-marquee__group flex shrink-0 items-center gap-[0.5em] pr-[0.5em]"
              aria-hidden={copyIndex === 1 ? true : undefined}
            >
              {marqueeItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex shrink-0 items-center gap-[0.5em] whitespace-nowrap text-white/65 transition-colors duration-300 hover:text-white"
                >
                  <span>{item}</span>
                  <span className="inline-flex shrink-0 text-[#1677FF]/85" aria-hidden="true">
                    <FlowerSeparator />
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCounter({ value }: { value: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return;

    const target = Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;

        const startedAt = performance.now();
        const duration = 1000;

        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));

          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          }
        };

        frame = requestAnimationFrame(animate);
        observer.unobserve(node);
      },
      { threshold: 0.45 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={numberRef}>
      {count}
      {value.includes("+") ? "+" : ""}
    </span>
  );
}

function ImpactSection() {
  return (
    <section id="impact" className="section-space">
      <div className="about-wrapper">
        <div
          data-reveal
          className="reveal relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0b0b0b]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,119,255,.10),transparent_26%),radial-gradient(circle_at_86%_84%,rgba(22,119,255,.06),transparent_24%)]" />

          <div className="relative z-10 px-5 py-8 md:px-8 md:py-10 xl:px-10">
            <p className="section-label mb-0">{homeCopy.impactLabel}</p>
          </div>

          <div className="relative z-10 grid border-t border-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((item, index) => (
              <article
                key={item.label}
                data-scroll-card
                data-scroll-delay={index * 80}
                className="scroll-card min-h-[190px] border-white/8 p-5 sm:border-r sm:nth-[2n]:border-r-0 md:min-h-[220px] md:p-7 lg:min-h-[240px] lg:border-r lg:last:border-r-0"
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-white/20">
                    0{index + 1}
                  </span>

                  <div>
                    <strong className="block text-[clamp(3rem,5.5vw,6.5rem)] font-semibold leading-none tracking-[-0.065em] text-[#1677FF]">
                      <ImpactCounter value={item.value} />
                    </strong>
                    <p className="mt-4 text-[13px] font-medium text-white/58 md:text-[14px]">
                      {item.label}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-space pt-10">
      <div className="site-wrapper overflow-hidden rounded-[28px] bg-[#1677FF] text-white">
        <div className="grid gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.9fr_1.1fr] xl:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em]">{homeCopy.contactLabel}</p>
            <h2 className="mt-5 max-w-xl text-[clamp(3rem,6.5vw,7rem)] font-semibold leading-[0.86] tracking-[-0.065em]">{homeCopy.contactHeading}</h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/70">{homeCopy.contactDescription}</p>
            <a href={`mailto:${site.email}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white">{site.email} <Arrow /></a>
          </div>
          <form
            className="rounded-[22px] bg-white p-5 text-black md:p-7"
            onSubmit={(event) => {
              event.preventDefault();
              const values = new FormData(event.currentTarget);
              const name = String(values.get("name") ?? "").trim();
              const email = String(values.get("email") ?? "").trim();
              const topic = String(values.get("topic") ?? "").trim();
              const message = String(values.get("message") ?? "").trim();
              const draft = [
                "Hi Cubixmet, I'd like to discuss a project.",
                `Name: ${name}`,
                `Email: ${email}`,
                `Service: ${topic}`,
                `Project details: ${message}`,
              ].join("\n");
              // The visitor reviews and sends the message inside WhatsApp.
              window.location.assign(whatsappLink(draft));
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input name="name" required maxLength={100} autoComplete="name" className="form-line !mt-0" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input name="email" type="email" required maxLength={160} autoComplete="email" className="form-line !mt-0" placeholder="Email" />
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">What can we help with?</span>
                <input name="topic" required maxLength={150} className="form-line !mt-0" placeholder="What can we help with?" />
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">Tell us about the project</span>
                <textarea name="message" required maxLength={2000} rows={4} className="form-line !mt-0 resize-none" placeholder="Tell us about the project" />
              </label>
            </div>
            <button type="submit" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-[#202020]">
              {homeCopy.contactSubmit} <Arrow />
            </button>
            <p className="mt-3 text-[11px] leading-5 text-black/55">{homeCopy.contactFormNote}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function HomeSections({ availableVideoPaths }: { availableVideoPaths: string[] }) {
  useReveal();
  return (
    <>
      <MarqueeSection />
      <AboutSection />
      <VenturesSection />
      <ProductToolsSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection availableVideoPaths={availableVideoPaths} />
      <TestimonialsSlider />
      <TeamSection />
      <ImpactSection />
      <ContactSection />
    </>
  );
}
