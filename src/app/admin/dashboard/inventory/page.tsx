export default function AdminInventoryPage() {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Inventory Management</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Add, edit, or remove gemstones from your collection.</p>
        </div>
        <button style={{ backgroundColor: 'var(--text-accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
          + Add New Stone
        </button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left', color: '#6b7280', fontSize: '0.9rem' }}>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>ID</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Stone</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Type</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Weight</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Price</th>
            <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 'GEM-001', name: 'Royal Blue Sapphire', type: 'Sapphire', weight: '3.45 ct', price: '$4,250', status: 'Available' },
            { id: 'GEM-002', name: 'Pigeon Blood Ruby', type: 'Ruby', weight: '2.10 ct', price: '$6,800', status: 'Reserved' },
            { id: 'GEM-003', name: 'Sunset Padparadscha', type: 'Padparadscha', weight: '1.85 ct', price: '$8,500', status: 'Available' },
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '1.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{row.id}</td>
              <td style={{ padding: '1.5rem 0', color: '#111827', fontWeight: 500 }}>{row.name}</td>
              <td style={{ padding: '1.5rem 0', color: '#4b5563' }}>{row.type}</td>
              <td style={{ padding: '1.5rem 0', color: '#4b5563' }}>{row.weight}</td>
              <td style={{ padding: '1.5rem 0', color: '#4b5563', fontWeight: 500 }}>{row.price}</td>
              <td style={{ padding: '1.5rem 0' }}>
                <span style={{ 
                  backgroundColor: row.status === 'Available' ? '#d1fae5' : '#fef3c7', 
                  color: row.status === 'Available' ? '#065f46' : '#92400e',
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
