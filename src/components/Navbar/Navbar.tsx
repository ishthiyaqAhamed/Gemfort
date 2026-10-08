'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, User, Menu, X } from 'lucide-react';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image 
              src="/images/logo.png" 
              alt="Gemfort Logo" 
              width={55} 
              height={55} 
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
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/gemstones" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
          <Link href="/expertise" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Our Expertise</Link>
          <Link href="/journal" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>
          <Link href="/gemstone-guide" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Gemstone Guide</Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
