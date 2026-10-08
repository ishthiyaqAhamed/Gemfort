export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Inventory', value: '42', change: '+3 this week' },
    { label: 'Pending Enquiries', value: '7', change: '2 new today' },
    { label: 'Journal Articles', value: '12', change: 'Last updated 2 days ago' },
    { label: 'Total Views', value: '1,248', change: '+12% from last month' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>{stat.label}</p>
            <h3 style={{ fontSize: '2rem', color: '#111827', margin: '0 0 0.5rem 0' }}>{stat.value}</h3>
            <p style={{ color: '#10b981', fontSize: '0.8rem', margin: 0 }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#111827', margin: 0 }}>Recent Enquiries</h2>
          <button style={{ color: 'var(--text-accent)', background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' }}>View All</button>
        </div>
        <div style={{ padding: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left', color: '#6b7280', fontSize: '0.9rem' }}>
                <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Name</th>
                <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Email</th>
                <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Interest</th>
                <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Date</th>
                <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'James Carter', email: 'j.carter@example.com', interest: 'Blue Sapphire 3+ ct', date: 'Oct 08, 2026', status: 'New' },
                { name: 'Sarah Wu', email: 'sarah.wu99@example.com', interest: 'Padparadscha inquiry', date: 'Oct 07, 2026', status: 'In Progress' },
                { name: 'Michael Thorne', email: 'mthorne@example.com', interest: 'Ruby engagement ring', date: 'Oct 05, 2026', status: 'Resolved' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '1.5rem 0', color: '#111827', fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '1.5rem 0', color: '#4b5563' }}>{row.email}</td>
                  <td style={{ padding: '1.5rem 0', color: '#4b5563' }}>{row.interest}</td>
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
      </div>
    </div>
  );
}
