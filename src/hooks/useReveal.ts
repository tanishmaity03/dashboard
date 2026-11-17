import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/** Short ease-out entrance for every [data-reveal] element inside the ref. Skipped for reduced motion. */
export function useReveal<T extends HTMLElement>(trigger: unknown) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 9 },
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          ease: "power2.out",
          stagger: 0.045,
          clearProps: "opacity,transform",
        },
      );
    });
    return () => mm.revert();
  }, [trigger]);
  return ref;
}
