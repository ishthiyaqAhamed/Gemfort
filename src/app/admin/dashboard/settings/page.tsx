'use client';

import styles from '../adminPages.module.css';

export default function AdminSettingsPage() {
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
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '1rem', fontWeight: 600 }}>Profile Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@gemfort.com" 
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.92rem' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Update Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password" 
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.92rem' }} 
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '1rem', fontWeight: 600 }}>Notification Preferences</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <input type="checkbox" id="email_notif" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <label htmlFor="email_notif" style={{ color: '#4b5563', fontSize: '0.88rem', cursor: 'pointer' }}>
                Email me immediately when a new private acquisition inquiry is received
              </label>
            </div>
          </div>

          <div>
            <button 
              onClick={() => alert('Settings saved successfully (Demo)')} 
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
