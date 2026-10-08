'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Gem, FileText, Settings, LogOut, Users, Globe } from 'lucide-react';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('gemfort_admin_auth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('gemfort_admin_auth');
    router.push('/admin');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', opacity: isAuthenticated ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--text-primary)', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Image 
            src="/images/logo.png" 
            alt="Gemfort" 
            width={45} 
            height={45} 
            style={{ filter: 'invert(1)', mixBlendMode: 'screen', objectFit: 'contain' }} 
          />
          <div>
            <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: 0, letterSpacing: '0.5px' }}>Gemfort</h2>
            <p style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>Admin Panel</p>
          </div>
        </div>

        <nav style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: pathname === '/admin/dashboard' ? 'white' : 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '6px', backgroundColor: pathname === '/admin/dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
            <LayoutDashboard size={18} />
            <span style={{ fontSize: '0.9rem' }}>Dashboard</span>
          </Link>
          <Link href="/admin/dashboard/inventory" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: pathname.includes('/inventory') ? 'white' : 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '6px', backgroundColor: pathname.includes('/inventory') ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
            <Gem size={18} />
            <span style={{ fontSize: '0.9rem' }}>Inventory</span>
          </Link>
          <Link href="/admin/dashboard/journal" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: pathname.includes('/journal') ? 'white' : 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '6px', backgroundColor: pathname.includes('/journal') ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
            <FileText size={18} />
            <span style={{ fontSize: '0.9rem' }}>Journal Entries</span>
          </Link>
          <Link href="/admin/dashboard/enquiries" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: pathname.includes('/enquiries') ? 'white' : 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '6px', backgroundColor: pathname.includes('/enquiries') ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
            <Users size={18} />
            <span style={{ fontSize: '0.9rem' }}>Enquiries</span>
          </Link>
          <Link href="/admin/dashboard/settings" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: pathname.includes('/settings') ? 'white' : 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '6px', backgroundColor: pathname.includes('/settings') ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
            <Settings size={18} />
            <span style={{ fontSize: '0.9rem' }}>Settings</span>
          </Link>

          <div style={{ margin: '1.5rem 0', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '6px' }}>
            <Globe size={18} />
            <span style={{ fontSize: '0.9rem' }}>Back to Website</span>
          </Link>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', 
              color: '#fca5a5', background: 'none', border: 'none', cursor: 'pointer',
              width: '100%', textAlign: 'left', borderRadius: '6px', fontFamily: 'inherit'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={18} />
            <span style={{ fontSize: '0.9rem' }}>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: 'white', padding: '1.5rem 3rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: 0, fontWeight: 500 }}>Overview</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Welcome, Admin</span>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--text-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              A
            </div>
          </div>
        </header>
        
        <div style={{ padding: '3rem', overflowY: 'auto', flexGrow: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
