import styles from "./JobCard.module.css";
import { useRef, useEffect } from "react";

export default function JobCard(props) {
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `rotateX(${(-y / 40)}deg) rotateY(${x / 40}deg)`;
    };

    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.top}>
        <div className={styles.logo}>{props.companyInitial}</div>

        {props.isNew && <span className={styles.badgeNew}>New</span>}
        {props.isFeatured && (
          <span className={styles.badgeFeatured}>Featured</span>
        )}
      </div>

      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.company}>{props.company}</p>

      <div className={styles.meta}>
        <span>{props.location}</span>
        <span>•</span>
        <span>{props.type}</span>
      </div>

      <div className={styles.tags}>
        {props.tags?.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <button className={styles.applyBtn} ref={btnRef}>
        Apply Now
      </button>
    </div>
  );
}
