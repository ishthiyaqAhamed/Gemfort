export default function AdminEnquiriesPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Customer Enquiries</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Review and respond to gemstone sourcing requests.</p>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left', color: '#6b7280', fontSize: '0.9rem' }}>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Name</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Email</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Requirements</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Date</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'James Carter', email: 'j.carter@example.com', interest: 'Looking for a royal blue sapphire, around 3 carats, budget $5k.', date: 'Oct 08, 2026', status: 'New' },
            { name: 'Sarah Wu', email: 'sarah.wu99@example.com', interest: 'Padparadscha sapphire for engagement ring, unheated.', date: 'Oct 07, 2026', status: 'In Progress' },
            { name: 'Michael Thorne', email: 'mthorne@example.com', interest: 'Pigeon blood ruby, 2+ ct.', date: 'Oct 05, 2026', status: 'Resolved' },
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '1.5rem 0', color: '#111827', fontWeight: 500 }}>{row.name}</td>
              <td style={{ padding: '1.5rem 0', color: '#4b5563' }}>{row.email}</td>
              <td style={{ padding: '1.5rem 0', color: '#4b5563', maxWidth: '300px' }}>{row.interest}</td>
              <td style={{ padding: '1.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{row.date}</td>
              <td style={{ padding: '1.5rem 0' }}>
                <span style={{ 
                  backgroundColor: row.status === 'New' ? '#dbeafe' : row.status === 'In Progress' ? '#fef3c7' : '#d1fae5', 
                  color: row.status === 'New' ? '#1e40af' : row.status === 'In Progress' ? '#92400e' : '#065f46',
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
