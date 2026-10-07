import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, User } from 'lucide-react';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import styles from './Navbar.module.css';

const Navbar = () => {
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
          <Link href="/gemstones" className={styles.navLink}>Gemstones</Link>
          <Link href="/expertise" className={styles.navLink}>Our Expertise</Link>
          <Link href="/journal" className={styles.navLink}>Journal</Link>
          <Link href="/gemstone-guide" className={styles.navLink}>Gemstone Guide</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className={styles.iconBtn} aria-label="Favorites">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          
          <CurrencyDropdown />
          
          <Link href="/admin" className={styles.iconBtn} aria-label="Account">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
