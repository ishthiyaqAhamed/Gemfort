import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
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
            <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
            <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
            <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
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
