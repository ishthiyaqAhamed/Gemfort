import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            Gemfort
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/gemstones" className={styles.navLink}>Gemstones</Link>
          <Link href="/expertise" className={styles.navLink}>Our Expertise</Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/journal" className={styles.navLink}>Journal</Link>
        </nav>
        
        <div className={styles.actions}>
          <Link href="/contact" className={styles.contactBtn}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
