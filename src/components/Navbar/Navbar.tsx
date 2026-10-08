'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  MessageCircle, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink} onClick={() => setIsMobileMenuOpen(false)}>
            <Image 
              src="/images/logo.png" 
              alt="Gemfort Logo" 
              width={52} 
              height={52} 
              priority
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Gemfort</span>
              <span className={styles.logoSubtitle}>INTERNATIONAL</span>
            </div>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/gemstones" className={styles.navLink}>Inventory</Link>
          <Link href="/expertise" className={styles.navLink}>Our Expertise</Link>
          <Link href="/journal" className={styles.navLink}>Journal</Link>
          <Link href="/gemstone-guide" className={styles.navLink}>Gemstone Guide</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Favorites">
            <Heart size={18} strokeWidth={1.5} />
          </button>
          
          <CurrencyDropdown />
          
          <Link href="/admin" className={styles.iconBtn} aria-label="Account">
            <User size={18} strokeWidth={1.5} />
          </Link>
          
          <button 
            className={styles.hamburgerBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <CurrencyDropdown />
          </div>

          <div className={styles.mobileNavLinks}>
            <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>Home</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
            <Link href="/gemstones" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>Vault Inventory</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>The Maison &amp; Legacy</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
            <Link href="/expertise" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>Our Expertise</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
            <Link href="/journal" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>Journal &amp; Insights</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
            <Link href="/gemstone-guide" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>Gemstone Education Guide</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
            <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              <span>Bespoke Inquiries &amp; Contact</span>
              <ChevronRight size={16} className={styles.mobileNavChevron} />
            </Link>
          </div>

          <div className={styles.mobileVipCard}>
            <a 
              href="https://wa.me/17738850603?text=Hello%20Gemfort%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20gemstone%20acquisition." 
              target="_blank" 
              rel="noreferrer"
              className={styles.mobileVipBtn}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle size={18} />
              <span>Connect on WhatsApp</span>
            </a>

            <Link 
              href="/admin" 
              className={styles.mobileAdminLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lock size={13} />
              <span>Admin Portal Access</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
