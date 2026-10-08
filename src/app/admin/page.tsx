'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './adminLogin.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@gemfort.com' && password === 'admin') {
      localStorage.setItem('gemfort_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@gemfort.com / admin');
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <Image 
              src="/images/logo.png" 
              alt="Gemfort Logo" 
              width={42} 
              height={42} 
              priority
              style={{ objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'screen' }} 
            />
          </div>
        </div>
        
        <h1 className={styles.title}>Admin Portal</h1>
        <p className={styles.subtitle}>Sign in to manage inventory and settings.</p>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gemfort.com"
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>
        
        <p className={styles.demoNote}>
          Demo credentials: <strong>admin@gemfort.com</strong> / <strong>admin</strong>
        </p>

        <Link href="/" className={styles.backHomeLink}>
          ← Back to Website
        </Link>
      </div>
    </main>
  );
}
