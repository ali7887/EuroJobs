import { useEffect, useRef, useState } from "react";
import styles from "./FeaturedJobs.module.css";
import JobCard from "../../ui/JobCard/JobCard";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const INITIAL_DATA = [
  {
    id: "1",
    title: "Frontend Lead",
    company: "AeroTech",
    companyInitial: "A",
    location: "Berlin",
    type: "Full-time",
    applicantCount: 12,
    salary: { min: 85000, max: 95000, currency: "€" },
    tags: ["React", "TypeScript"],
    postedAt: "1h ago",
    isFeatured: true,
    isNew: true,
  },
  {
    id: "2",
    title: "UI Developer",
    company: "CyberX",
    companyInitial: "C",
    location: "Remote",
    type: "Contract",
    applicantCount: 5,
    salary: { min: 60000, max: 70000, currency: "€" },
    tags: ["CSS", "Next.js"],
    postedAt: "4h ago",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Fullstack Engineer",
    company: "DataFlow",
    companyInitial: "D",
    location: "Munich",
    type: "Hybrid",
    applicantCount: 24,
    salary: { min: 75000, max: 82000, currency: "€" },
    tags: ["Node.js", "React"],
    postedAt: "1d ago",
    isFeatured: true,
  },
  {
    id: "4",
    title: "React Specialist",
    company: "BioSoft",
    companyInitial: "B",
    location: "Hamburg",
    type: "Full-time",
    applicantCount: 9,
    salary: { min: 90000, max: 100000, currency: "€" },
    tags: ["Redux", "TypeScript"],
    postedAt: "2d ago",
    isFeatured: true,
  },
];

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState(INITIAL_DATA);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const containerRef = useRef(null);

  // GSAP entrance animation
  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  // Three.js particles background
  useEffect(() => {
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;

    async function loadParticles() {
      const THREE = await import("three");

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 300,
        0.1,
        1000
      );

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, 300);

      const canvas = document.getElementById("featuredCanvas");
      canvas.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < 300; i++) {
        vertices.push((Math.random() - 0.5) * 6);
        vertices.push((Math.random() - 0.5) * 6);
        vertices.push((Math.random() - 0.5) * 6);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        size: 0.04,
        color: "#ffffff",
        opacity: 0.55,
        transparent: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 2.8;

      function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0004;
        renderer.render(scene, camera);
      }

      animate();
    }

    loadParticles();

    return () => {
      if (renderer) renderer.dispose();
    };
  }, []);

  const filteredJobs = jobs
    .filter((job) => filter === "All" || job.type === filter)
    .sort((a, b) => {
      if (sortBy === "Salary") return b.salary.max - a.salary.max;
      return 0;
    });

  return (
    <section className={styles.section}>
      <div id="featuredCanvas" className={styles.visualCanvas}></div>

      <div className={styles.header}>
        <h2>Featured Jobs</h2>
        <p>Top opportunities curated for you</p>
      </div>

      <div className={styles.filters}>
        {["All", "Full-time", "Contract", "Remote", "Hybrid"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? styles.activeFilter : ""}
          >
            {item}
          </button>
        ))}

        <select
          className={styles.sortSelect}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Salary">Highest Salary</option>
        </select>
      </div>

      <motion.div
        ref={containerRef}
        className={styles.jobsGrid}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        <AnimatePresence>
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: -15 }}
            >
              <JobCard {...job} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
