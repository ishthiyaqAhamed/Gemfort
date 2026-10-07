import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
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
          <button className={styles.actionTextBtn}>Search</button>
          <select className={styles.currencySelect}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="LKR">LKR</option>
          </select>
          <Link href="/admin" className={styles.actionTextBtn}>Admin</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
