import styles from "./featured-jobs.module.css";
import { FiMapPin, FiUsers, FiEye, FiMail } from "react-icons/fi";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  applicants: number;
  views: number;
  reply: number;
  match: number;
  skills: string[];
  salary: string;
  posted: string;
}

export function JobCard(props: JobCardProps) {
  return (
    <div className={styles.jobCard}>
      
      <div className={styles.matchScore}>{props.match}% Match</div>

      <div className={styles.title}>{props.title}</div>
      <div className={styles.company}>{props.company}</div>

      <div className={styles.location}>
        <FiMapPin size={14} /> {props.location}
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}><FiUsers size={14} /> {props.applicants}</div>
        <div className={styles.stat}><FiEye size={14} /> {props.views}</div>
        <div className={styles.stat}><FiMail size={14} /> {props.reply}%</div>
      </div>

      <div className={styles.skillsRow}>
        {props.skills.map(skill => (
          <span key={skill} className={styles.skillTag}>{skill}</span>
        ))}
      </div>

      <button className={styles.ctaBtn}>Apply Before It's Gone</button>

      <div className={styles.footerRow}>
        <span>📅 {props.posted}</span>
        <span>💰 {props.salary}</span>
      </div>
    </div>
  );
}
