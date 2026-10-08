'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Gem, 
  FileText, 
  Settings, 
  LogOut, 
  Users, 
  Globe,
  Menu,
  X
} from 'lucide-react';
import styles from './adminDashboard.module.css';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('gemfort_admin_auth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Close sidebar on path change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('gemfort_admin_auth');
    router.push('/admin');
  };

  const getPageTitle = () => {
    if (pathname.includes('/inventory')) return 'Inventory Management';
    if (pathname.includes('/journal')) return 'Journal Entries';
    if (pathname.includes('/enquiries')) return 'Customer Enquiries';
    if (pathname.includes('/settings')) return 'Settings';
    return 'Dashboard Overview';
  };

  return (
    <div 
      className={styles.layoutContainer}
      style={{ opacity: isAuthenticated ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsSidebarOpen(false)} 
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop sticky, Mobile off-canvas drawer) */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandGroup}>
            <Image 
              src="/images/logo.png" 
              alt="Gemfort" 
              width={38} 
              height={38} 
              className={styles.sidebarLogo}
            />
            <div>
              <h2 className={styles.sidebarTitle}>Gemfort</h2>
              <p className={styles.sidebarSubtitle}>Admin Panel</p>
            </div>
          </div>
          <button 
            className={styles.closeDrawerBtn} 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          <Link 
            href="/admin/dashboard" 
            className={`${styles.navItem} ${pathname === '/admin/dashboard' ? styles.navItemActive : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link 
            href="/admin/dashboard/inventory" 
            className={`${styles.navItem} ${pathname.includes('/inventory') ? styles.navItemActive : ''}`}
          >
            <Gem size={18} />
            <span>Inventory</span>
          </Link>

          <Link 
            href="/admin/dashboard/journal" 
            className={`${styles.navItem} ${pathname.includes('/journal') ? styles.navItemActive : ''}`}
          >
            <FileText size={18} />
            <span>Journal Entries</span>
          </Link>

          <Link 
            href="/admin/dashboard/enquiries" 
            className={`${styles.navItem} ${pathname.includes('/enquiries') ? styles.navItemActive : ''}`}
          >
            <Users size={18} />
            <span>Enquiries</span>
          </Link>

          <Link 
            href="/admin/dashboard/settings" 
            className={`${styles.navItem} ${pathname.includes('/settings') ? styles.navItemActive : ''}`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <div className={styles.navDivider} />

          <Link href="/" className={styles.navItem}>
            <Globe size={18} />
            <span>Back to Website</span>
          </Link>

          <button onClick={handleLogout} className={styles.signOutBtn}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainWrapper}>
        {/* Mobile Top Header */}
        <header className={styles.mobileTopBar}>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          <div className={styles.mobileBrand}>
            <Image 
              src="/images/logo.png" 
              alt="Gemfort" 
              width={26} 
              height={26} 
              style={{ filter: 'invert(1)', mixBlendMode: 'screen', objectFit: 'contain' }}
            />
            <span className={styles.mobileBrandTitle}>Admin Panel</span>
          </div>

          <div className={styles.mobileUserBadge}>
            A
          </div>
        </header>

        {/* Desktop Header */}
        <header className={styles.desktopHeader}>
          <h1 className={styles.headerTitle}>{getPageTitle()}</h1>
          <div className={styles.userProfile}>
            <span className={styles.userName}>Welcome, Admin</span>
            <div className={styles.userAvatar}>A</div>
          </div>
        </header>
        
        <div className={styles.contentBody}>
          {children}
        </div>
      </main>
    </div>
  );
}
