import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useParallax(
  section: RefObject<HTMLDivElement>,
  cards: RefObject<HTMLDivElement[]>,
  particleEngine: any
) {
  if (!section.current) return;

  ScrollTrigger.create({
    trigger: section.current,
    start: "top bottom",
    end: "bottom top",
    scrub: 1.2,
    onUpdate: (self) => {
      const progress = self.progress;
      if (particleEngine?.camera) {
        particleEngine.camera.position.y = (progress - 0.5) * 15;
      }
    }
  });

  gsap.from(cards.current, {
    opacity: 0,
    yPercent: 25,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section.current,
      start: "top 85%",
      scrub: 1
    }
  });
}
