'use client';

export default function AdminSettingsPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Settings</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Manage your account and platform preferences.</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '1rem' }}>Profile Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Admin Email</label>
              <input type="email" defaultValue="admin@gemfort.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#4b5563', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Update Password</label>
              <input type="password" placeholder="Enter new password" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '1rem' }}>Notification Preferences</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="checkbox" id="email_notif" defaultChecked style={{ width: '16px', height: '16px' }} />
            <label htmlFor="email_notif" style={{ color: '#4b5563', fontSize: '0.9rem' }}>Email me when a new enquiry is submitted</label>
          </div>
        </div>

        <button onClick={() => alert('Settings saved successfully (Demo)')} style={{ backgroundColor: 'var(--text-primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
