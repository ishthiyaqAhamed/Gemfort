'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import styles from '../adminPages.module.css';

export default function AdminSettingsPage() {
  const [adminEmail, setAdminEmail] = useState('admin@gemfort.com');
  const [password, setPassword] = useState('');
  const [emailNotif, setEmailNotif] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('gemfort_admin_email');
    if (savedEmail) setAdminEmail(savedEmail);
    const savedNotif = localStorage.getItem('gemfort_admin_notif');
    if (savedNotif !== null) setEmailNotif(savedNotif === 'true');
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemfort_admin_email', adminEmail);
    localStorage.setItem('gemfort_admin_notif', String(emailNotif));
    if (password) {
      localStorage.setItem('gemfort_admin_custom_pass', password);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Platform Settings</h1>
          <p className={styles.pageSubtitle}>Manage administrator credentials and notification preferences.</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {saved && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>Platform settings updated successfully.</span>
            </div>
          )}

          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '1rem', fontWeight: 600 }}>Profile &amp; Authentication</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Email</label>
                <input 
                  type="email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.92rem' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Update Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password to change"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.92rem' }} 
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '0.4rem', fontWeight: 600 }}>Cloudinary Media Storage</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
              Gemfort connects directly to Cloudinary for instant CDN image hosting. Add these credentials to your <code>.env</code> file:
            </p>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#1e293b', lineHeight: 1.6 }}>
              <div>CLOUDINARY_CLOUD_NAME=your_cloud_name</div>
              <div>CLOUDINARY_API_KEY=your_api_key</div>
              <div>CLOUDINARY_API_SECRET=your_api_secret</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '1rem', fontWeight: 600 }}>Notification Preferences</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="email_notif" 
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
              />
              <label htmlFor="email_notif" style={{ color: '#4b5563', fontSize: '0.88rem', cursor: 'pointer' }}>
                Email me immediately when a new private acquisition inquiry is received
              </label>
            </div>
          </div>

          <div>
            <button 
              onClick={handleSave} 
              className={styles.primaryBtn}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
