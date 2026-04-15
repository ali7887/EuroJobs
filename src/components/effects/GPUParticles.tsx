"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GPUParticles() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      ref.current.clientWidth / 300,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(ref.current.clientWidth, 300);
    ref.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 1200;

    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
      speeds[i / 3] = Math.random() * 0.008 + 0.002;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#60a5fa",
      size: 0.025,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 3.3;

    function animate() {
      requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] -= speeds[i];
        if (pos[i * 3 + 1] < -2.4) pos[i * 3 + 1] = 2.4;
      }

      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={ref} style={{ position: "absolute", top: 0, width: "100%" }} />;
}
