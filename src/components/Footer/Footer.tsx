'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Image src="/images/logo.png" alt="Gemfort Logo" width={180} height={60} className={styles.logo} />
          <p className={styles.description}>
            Purveyors of the world's finest natural gemstones. Sourced ethically, cut masterfully, and delivered globally since 1989.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>
        
        <div className={styles.linksColumn}>
          <h4 className={styles.title}>Collections</h4>
          <Link href="/gemstones" className={styles.link}>Sapphires</Link>
          <Link href="/gemstones" className={styles.link}>Rubies</Link>
          <Link href="/gemstones" className={styles.link}>Emeralds</Link>
          <Link href="/gemstones" className={styles.link}>Spinels</Link>
          <Link href="/gemstones" className={styles.link}>Alexandrite</Link>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.title}>Company</h4>
          <Link href="/about" className={styles.link}>Our Story</Link>
          <Link href="/expertise" className={styles.link}>Expertise</Link>
          <Link href="/journal" className={styles.link}>Journal</Link>
          <Link href="/gemstone-guide" className={styles.link}>Guide</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.contactColumn}>
          <h4 className={styles.title}>Get in Touch</h4>
          <div className={styles.contactItem}>
            <MapPin size={18} className={styles.contactIcon} />
            <span>45 Gem Avenue, Colombo 03, Sri Lanka</span>
          </div>
          <div className={styles.contactItem}>
            <Phone size={18} className={styles.contactIcon} />
            <span>+94 11 234 5678</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={18} className={styles.contactIcon} />
            <span>inquiries@gemfort.com</span>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Gemfort International. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
