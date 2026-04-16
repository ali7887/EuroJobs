import { useEffect, useRef } from "react";

export default function CanvasParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const c = canvas;
    const context = ctx;

    // particles
    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 120,
      r: Math.random() * 1.3 + 0.4,
      v: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      context.clearRect(0, 0, c.width, c.height);

      particles.forEach((p) => {
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fillStyle = "rgba(0,0,0,0.07)";
        context.fill();
        p.y += p.v;

        if (p.y > 130) {
          p.y = -4;
          p.x = Math.random() * c.width;
        }
      });

      requestAnimationFrame(draw);
    }

    function resize() {
      c.width = window.innerWidth;
      c.height = 140;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
