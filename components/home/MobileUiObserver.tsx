"use client";

import { useEffect } from "react";

/**
 * iOS Safari can miss the original scroll-reveal observer when the address bar
 * resizes or filtered cards mount later. This mobile-only observer reveals all
 * new cards, and gives visible elements a subtle native Web Animations effect.
 * It never leaves content hidden while waiting for JavaScript to load.
 */
export default function MobileUiObserver() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new Set<HTMLElement>();
    const animated = new WeakSet<HTMLElement>();
    const selector = "[data-scroll-card], .scroll-card, [data-reveal], .reveal";

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-visible", "is-card-visible", "mobile-in-view");
      element.style.setProperty("visibility", "visible", "important");
      element.style.setProperty("opacity", "1", "important");
      element.style.setProperty("transform", "none", "important");
      if (reducedMotion || animated.has(element)) return;
      animated.add(element);
      // Animate an inner surface when possible. The content always remains visible
      // even if Web Animations / IntersectionObserver is unsupported.
      const surface = element.firstElementChild instanceof HTMLElement
        ? element.firstElementChild
        : element;
      if (!surface.animate) return;
      surface.animate(
        [
          { opacity: 0.75, transform: "translate3d(0, 12px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)", fill: "none" },
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "20% 0px 20% 0px" },
    );
    const scan = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        observer.observe(element);
        const box = element.getBoundingClientRect();
        if (box.bottom > -100 && box.top < window.innerHeight + 100) reveal(element);
      });
    };

    // Ensure service images never present as an entirely black rectangle during
    // a slow or failed request; the real image still covers this background.
    const guardImages = () => {
      document.querySelectorAll<HTMLImageElement>("#services img").forEach((image) => {
        if (image.dataset.mobileMediaGuard === "yes") return;
        image.dataset.mobileMediaGuard = "yes";
        const holder = image.parentElement;
        if (!holder) return;
        holder.style.backgroundImage = "url('/images/mobile-media-fallback.svg')";
        holder.style.backgroundSize = "cover";
        holder.style.backgroundPosition = "center";
        const onError = () => {
          image.style.opacity = "0";
          holder.style.backgroundColor = "#10213a";
        };
        image.addEventListener("error", onError);
        if (image.complete && image.naturalWidth === 0) onError();
      });
    };

    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        scan();
        guardImages();
      });
    };
    const mutation = new MutationObserver(update);
    mutation.observe(document.body, { childList: true, subtree: true });
    const onScroll = () => {
      // Resize and iOS toolbar changes can miss an IntersectionObserver event.
      for (const element of observed) {
        if (element.classList.contains("mobile-in-view")) continue;
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom >= 0 && bounds.top <= window.innerHeight) reveal(element);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      observed.clear();
    };
  }, []);

  return null;
}
