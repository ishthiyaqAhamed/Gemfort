'use client';

export default function AdminJournalPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Journal Entries</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Manage your blog and educational content.</p>
        </div>
        <button onClick={() => alert('Backend not connected yet. This will open a rich text editor.')} style={{ backgroundColor: 'var(--text-accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
          + New Article
        </button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left', color: '#6b7280', fontSize: '0.9rem' }}>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Title</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Author</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Published Date</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { title: 'The Heat Treatment of Sapphires', author: 'Gemfort', date: 'Sep 24, 2026', status: 'Published' },
            { title: 'Understanding Padparadscha Colors', author: 'Gemfort', date: 'Sep 15, 2026', status: 'Published' },
            { title: 'A Guide to Sourcing from Sri Lanka', author: 'Gemfort', date: '-', status: 'Draft' },
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '1.5rem 0', color: '#111827', fontWeight: 500 }}>{row.title}</td>
              <td style={{ padding: '1.5rem 0', color: '#4b5563' }}>{row.author}</td>
              <td style={{ padding: '1.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{row.date}</td>
              <td style={{ padding: '1.5rem 0' }}>
                <span style={{ 
                  backgroundColor: row.status === 'Published' ? '#d1fae5' : '#f3f4f6', 
                  color: row.status === 'Published' ? '#065f46' : '#4b5563',
                  padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 500
                }}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
