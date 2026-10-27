'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Lock 
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

  // Copied state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchEnvCredentials = async () => {
    try {
      const res = await fetch('/api/admin/env');
      const data = await res.json();
      if (res.ok && data.success && data.env) {
        setEnvData(data.env);
      }
    } catch (err) {
      console.error('Failed to load environment credentials:', err);
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
          <h1 className={styles.pageTitle}>Admin Settings</h1>
          <p className={styles.pageSubtitle}>
            Manage administrator login credentials, notification preferences, and backup production .env configuration.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* ─── 1. PROFILE & AUTHENTICATION (CHANGE PASSWORD) ────────────────── */}
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

        {/* ─── 2. CONFIDENTIAL .ENV CREDENTIALS VAULT (BELOW PASSWORD) ──────── */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 33, 71, 0.05)',
          border: '1px solid #e2e8f0',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#002147', fontWeight: 700, margin: 0, fontFamily: 'serif' }}>
                  Confidential .env Credentials Vault
                </h2>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: '1px solid #a7f3d0'
                }}>
                  Stored Safely
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0.35rem 0 0', lineHeight: 1.5 }}>
                All master connection strings and secret API keys are safely preserved here so you never lose them if your device changes.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => copyToClipboard(fullEnvString, 'ALL_ENV')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#1e293b',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {copiedKey === 'ALL_ENV' ? <Check size={16} color="#059669" /> : <Copy size={16} color="#475569" />}
              <span>{copiedKey === 'ALL_ENV' ? 'Copied Entire .env!' : 'Copy Entire .env'}</span>
            </button>

            <button
              type="button"
              onClick={downloadEnvBackup}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '8px',
                backgroundColor: '#002147',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(0, 33, 71, 0.18)'
              }}
            >
              <Download size={16} />
              <span>Download .env File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

