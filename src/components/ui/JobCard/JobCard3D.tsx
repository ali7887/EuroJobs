"use client";
import { useRef } from "react";

interface JobCard3DProps {
  children: React.ReactNode;
}

export default function JobCard3D({ children }: JobCard3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * -10;
    const rotateY = (x / rect.width) * 10;

    el.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transition: "transform 0.2s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
