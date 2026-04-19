import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

import { 
 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Star, 
  Globe 
} from "lucide-react";


export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* --- Top Grid --- */}
        <div className={styles.grid}>

          {/* Brand + Social + Newsletter */}
          <div className={styles.brand}>
            <div>
              <h3 className={styles.columnTitle}>JobBoard</h3>
              <p className={styles.description}>
                Modern job board platform connecting talent with opportunities.
              </p>
            </div>

            {/* Social Icons */}
            <div className={styles.social}>
{/*               <Link href="#"><Twitter className={styles.socialIcon} /></Link>
              <Link href="#"><Linkedin className={styles.socialIcon} /></Link>
              <Link href="#"><Github className={styles.socialIcon} /></Link>
              <Link href="#"><Instagram className={styles.socialIcon} /></Link> */}
            </div>

            {/* Newsletter */}
            <div>
              <h4 className={styles.newsletterTitle}>Subscribe to our newsletter</h4>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                />
                <button className={styles.subscribeBtn}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Job Seekers */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>For Job Seekers</h4>
            <Link href="/jobs" className={styles.link}>Browse Jobs</Link>
            <Link href="/companies" className={styles.link}>Companies</Link>
            <Link href="/resources" className={styles.link}>Resources</Link>
            <Link href="/salary" className={styles.link}>Salary Guide</Link>
            <Link href="/career-advice" className={styles.link}>Career Advice</Link>
          </div>

          {/* Employers */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>For Employers</h4>
            <Link href="/post-job" className={styles.link}>Post a Job</Link>
            <Link href="/pricing" className={styles.link}>Pricing</Link>
            <Link href="/solutions" className={styles.link}>Solutions</Link>
            <Link href="/analytics" className={styles.link}>Analytics</Link>
            <Link href="/integrations" className={styles.link}>Integrations</Link>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Company</h4>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/careers" className={styles.link}>Careers</Link>
            <Link href="/press" className={styles.link}>Press</Link>
          </div>
        </div>

        {/* --- Trust Badges --- */}
        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <ShieldCheck className="text-green-500" size={24} />
            <div>
              <p className={styles.trustTextTitle}>Secure Platform</p>
              <p className={styles.trustSubtitle}>SSL Encrypted</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Users className="text-blue-500" size={24} />
            <div>
              <p className={styles.trustTextTitle}>10,000+ Companies</p>
              <p className={styles.trustSubtitle}>Trust us</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Briefcase className="text-purple-500" size={24} />
            <div>
              <p className={styles.trustTextTitle}>50,000+ Jobs</p>
              <p className={styles.trustSubtitle}>Posted monthly</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Star className="text-yellow-500" size={24} />
            <div>
              <p className={styles.trustTextTitle}>4.8 / 5 Rating</p>
              <p className={styles.trustSubtitle}>2,000+ Reviews</p>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar (Sub-footer) --- */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} JobBoard. All rights reserved.
          </p>

          <div className={styles.legal}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
            <Link href="/cookies" className={styles.legalLink}>Cookie Policy</Link>
          </div>

          <div className={styles.language}>
            <Globe size={18} className="text-gray-500" />
            <select>
              <option>English</option>
              <option>فارسی</option>
            </select>
          </div>
        </div>

        {/* Designer Credit */}
        <p className={styles.designer}>
          Designed & Built by <a href="https://alikiani.vercel.app" target="_blank">Ali Kiani</a>
        </p>
      </div>
    </footer>
  );
};
