'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Key, 
  Database, 
  Cloud, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Download, 
  Lock, 
  Server,
  RefreshCw
} from 'lucide-react';
import styles from '../adminPages.module.css';

interface EnvCredentials {
  DATABASE_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

export default function AdminSettingsPage() {
  const [adminEmail, setAdminEmail] = useState('admin@gemfort.com');
  const [password, setPassword] = useState('');
  const [emailNotif, setEmailNotif] = useState(true);
  const [saved, setSaved] = useState(false);

  // Confidential .env Vault state
  const [envData, setEnvData] = useState<EnvCredentials>({
    DATABASE_URL: '',
    CLOUDINARY_CLOUD_NAME: '',
    CLOUDINARY_API_KEY: '',
    CLOUDINARY_API_SECRET: '',
  });
  const [loadingEnv, setLoadingEnv] = useState(true);
  const [savingEnv, setSavingEnv] = useState(false);
  const [envMsg, setEnvMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Visibility toggles
  const [showDbUrl, setShowDbUrl] = useState(false);
  const [showCloudSecret, setShowCloudSecret] = useState(false);

  // Copied states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchEnvCredentials = async () => {
    setLoadingEnv(true);
    try {
      const res = await fetch('/api/admin/env');
      const data = await res.json();
      if (res.ok && data.success && data.env) {
        setEnvData(data.env);
      }
    } catch (err) {
      console.error('Failed to load environment credentials:', err);
    } finally {
      setLoadingEnv(false);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('gemfort_admin_email');
    if (savedEmail) setAdminEmail(savedEmail);
    const savedNotif = localStorage.getItem('gemfort_admin_notif');
    if (savedNotif !== null) setEmailNotif(savedNotif === 'true');

    fetchEnvCredentials();
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('gemfort_admin_email', adminEmail);
    localStorage.setItem('gemfort_admin_notif', String(emailNotif));
    if (password) {
      localStorage.setItem('gemfort_admin_custom_pass', password);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveEnvCredentials = async () => {
    setSavingEnv(true);
    setEnvMsg(null);
    try {
      const res = await fetch('/api/admin/env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnvMsg({ type: 'success', text: 'All confidential credentials safely stored and synced in .env file.' });
        setTimeout(() => setEnvMsg(null), 4000);
      } else {
        setEnvMsg({ type: 'error', text: data.error || 'Failed to save credentials.' });
      }
    } catch {
      setEnvMsg({ type: 'error', text: 'Network error saving credentials to .env.' });
    } finally {
      setSavingEnv(false);
    }
  };

  const copyToClipboard = (text: string, keyName: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(keyName);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const downloadEnvBackup = () => {
    const content = [
      `# Gemfort Production Environment Backup`,
      `# Exported securely from Admin Platform Settings on ${new Date().toISOString()}`,
      ``,
      `DATABASE_URL="${envData.DATABASE_URL}"`,
      `CLOUDINARY_CLOUD_NAME="${envData.CLOUDINARY_CLOUD_NAME}"`,
      `CLOUDINARY_API_KEY="${envData.CLOUDINARY_API_KEY}"`,
      `CLOUDINARY_API_SECRET="${envData.CLOUDINARY_API_SECRET}"`,
      ``,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '.env';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fullEnvString = `DATABASE_URL="${envData.DATABASE_URL}"\nCLOUDINARY_CLOUD_NAME="${envData.CLOUDINARY_CLOUD_NAME}"\nCLOUDINARY_API_KEY="${envData.CLOUDINARY_API_KEY}"\nCLOUDINARY_API_SECRET="${envData.CLOUDINARY_API_SECRET}"`;

  return (
    <div style={{ maxWidth: '920px', paddingBottom: '3rem' }}>
      
      {/* Page Header */}
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Platform Settings &amp; Vault Credentials</h1>
          <p className={styles.pageSubtitle}>
            Manage administrator access, notification preferences, and safe backup of production .env credentials.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* ─── 1. CONFIDENTIAL ENVIRONMENT VAULT (.ENV) ───────────────────────── */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 33, 71, 0.05)',
          border: '1px solid #e2e8f0',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#002147',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c7a450',
                flexShrink: 0
              }}>
                <Lock size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.2rem', color: '#002147', fontWeight: 700, margin: 0 }}>
                    Confidential .env Credentials Vault
                  </h2>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    border: '1px solid #a7f3d0'
                  }}>
                    Stored Safely
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#64748b', margin: '0.2rem 0 0' }}>
                  All master connection strings and secret API keys are safely preserved here so you never lose them if your device changes.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => copyToClipboard(fullEnvString, 'ALL_ENV')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {copiedKey === 'ALL_ENV' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                <span>{copiedKey === 'ALL_ENV' ? 'Copied Full .env!' : 'Copy Entire .env'}</span>
              </button>

              <button
                type="button"
                onClick={downloadEnvBackup}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: '#002147',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Download size={14} />
                <span>Download .env File</span>
              </button>
            </div>
          </div>

          {/* Feedback message */}
          {envMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              backgroundColor: envMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
              color: envMsg.type === 'success' ? '#065f46' : '#991b1b',
              border: `1px solid ${envMsg.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
              fontSize: '0.9rem',
              fontWeight: 500,
            }}>
              {envMsg.type === 'success' ? <CheckCircle2 size={18} color="#059669" /> : <AlertCircle size={18} color="#dc2626" />}
              <span>{envMsg.text}</span>
            </div>
          )}

          {/* Service Status Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}>
            <div style={{
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1' }}>
                <Database size={16} />
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Database Engine</span>
                <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>Neon Serverless PostgreSQL (Active)</p>
              </div>
            </div>

            <div style={{
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
                <Cloud size={16} />
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Media Storage</span>
                <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>Cloudinary CDN (Connected: {envData.CLOUDINARY_CLOUD_NAME || 'yby4nz6v'})</p>
              </div>
            </div>
          </div>

          {/* Credential Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* 1. DATABASE_URL */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ color: '#1e293b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Database size={14} color="#0284c7" />
                  <span>DATABASE_URL (Neon PostgreSQL Connection)</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowDbUrl(!showDbUrl)}
                    style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.76rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {showDbUrl ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showDbUrl ? 'Hide' : 'Reveal'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(envData.DATABASE_URL, 'DATABASE_URL')}
                    style={{ background: 'none', border: 'none', color: '#002147', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {copiedKey === 'DATABASE_URL' ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{copiedKey === 'DATABASE_URL' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showDbUrl ? 'text' : 'password'}
                  value={envData.DATABASE_URL}
                  onChange={(e) => setEnvData({ ...envData, DATABASE_URL: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'monospace',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    backgroundColor: '#f8fafc',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                Encrypted PostgreSQL connection URI connecting to Neon AWS pooler.
              </span>
            </div>

            {/* 2. Cloudinary Credentials Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              
              {/* CLOUDINARY_CLOUD_NAME */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ color: '#1e293b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Cloud size={14} color="#d97706" />
                    <span>CLOUDINARY_CLOUD_NAME</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(envData.CLOUDINARY_CLOUD_NAME, 'CLOUD_NAME')}
                    style={{ background: 'none', border: 'none', color: '#002147', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {copiedKey === 'CLOUD_NAME' ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{copiedKey === 'CLOUD_NAME' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={envData.CLOUDINARY_CLOUD_NAME}
                  onChange={(e) => setEnvData({ ...envData, CLOUDINARY_CLOUD_NAME: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'monospace',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    backgroundColor: '#f8fafc',
                  }}
                />
              </div>

              {/* CLOUDINARY_API_KEY */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ color: '#1e293b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Key size={14} color="#d97706" />
                    <span>CLOUDINARY_API_KEY</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(envData.CLOUDINARY_API_KEY, 'API_KEY')}
                    style={{ background: 'none', border: 'none', color: '#002147', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {copiedKey === 'API_KEY' ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{copiedKey === 'API_KEY' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={envData.CLOUDINARY_API_KEY}
                  onChange={(e) => setEnvData({ ...envData, CLOUDINARY_API_KEY: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'monospace',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    backgroundColor: '#f8fafc',
                  }}
                />
              </div>
            </div>

            {/* 3. CLOUDINARY_API_SECRET */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ color: '#1e293b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={14} color="#dc2626" />
                  <span>CLOUDINARY_API_SECRET (Confidential)</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowCloudSecret(!showCloudSecret)}
                    style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.76rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {showCloudSecret ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showCloudSecret ? 'Hide' : 'Reveal'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(envData.CLOUDINARY_API_SECRET, 'API_SECRET')}
                    style={{ background: 'none', border: 'none', color: '#002147', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {copiedKey === 'API_SECRET' ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{copiedKey === 'API_SECRET' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <input
                type={showCloudSecret ? 'text' : 'password'}
                value={envData.CLOUDINARY_API_SECRET}
                onChange={(e) => setEnvData({ ...envData, CLOUDINARY_API_SECRET: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontFamily: 'monospace',
                  fontSize: '0.86rem',
                  color: '#0f172a',
                  backgroundColor: '#f8fafc',
                }}
              />
              <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                Used by server-side endpoints to securely authenticate and upload gemstone media assets.
              </span>
            </div>

            {/* Save / Sync Button */}
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                type="button"
                onClick={handleSaveEnvCredentials}
                disabled={savingEnv}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  backgroundColor: '#002147',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: savingEnv ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 33, 71, 0.15)',
                }}
              >
                {savingEnv ? <RefreshCw size={15} className="animate-spin" /> : <ShieldCheck size={16} color="#c7a450" />}
                <span>{savingEnv ? 'Saving to .env...' : 'Save & Sync Credentials to .env'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* ─── 2. PROFILE & AUTHENTICATION ───────────────────────────────────── */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 33, 71, 0.05)',
          border: '1px solid #e2e8f0',
        }}>
          <h3 style={{ fontSize: '1.1rem', color: '#002147', marginBottom: '1.25rem', fontWeight: 700 }}>
            Admin Portal Access
          </h3>

          {saved && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>Admin login settings updated successfully.</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#334155', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Email</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.92rem' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#334155', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Update Password</label>
              <input 
                type="password" 
                placeholder="Enter new password (leave blank to keep current 'admin')"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.92rem' }} 
              />
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input 
                  type="checkbox" 
                  id="email_notif" 
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                />
                <label htmlFor="email_notif" style={{ color: '#475569', fontSize: '0.88rem', cursor: 'pointer' }}>
                  Email me immediately when a new private gemstone inquiry is submitted
                </label>
              </div>
            </div>

            <div>
              <button 
                onClick={handleSaveProfile} 
                className={styles.primaryBtn}
                style={{ marginTop: '0.5rem' }}
              >
                Save Admin Profile
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
