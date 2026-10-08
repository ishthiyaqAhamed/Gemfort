'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login logic
    if (email === 'admin@gemfort.com' && password === 'admin') {
      localStorage.setItem('gemfort_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@gemfort.com / admin');
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--bg-secondary)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        padding: '3.5rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'var(--text-primary)', padding: '1.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src="/images/logo.png" 
              alt="Gemfort Logo" 
              width={80} 
              height={80} 
              style={{ objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'screen' }} 
            />
          </div>
        </div>
        
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
          Admin Portal
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
          Sign in to manage inventory and settings.
        </p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gemfort.com"
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '6px', 
                border: '1px solid rgba(0,33,71,0.1)', backgroundColor: 'rgba(0,33,71,0.02)',
                color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none'
              }}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '6px', 
                border: '1px solid rgba(0,33,71,0.1)', backgroundColor: 'rgba(0,33,71,0.02)',
                color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none'
              }}
              required
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%', padding: '14px', marginTop: '1rem',
              backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)',
              border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--text-accent)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--text-primary)'}
          >
            Sign In
          </button>
        </form>
        
        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(0,33,71,0.4)' }}>
          For demo purposes, use admin@gemfort.com / admin
        </p>
      </div>
    </main>
  );
}
