'use client';

import Image from 'next/image';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

export default function AdminInventoryPage() {
  const inventory = [
    { id: 'GEM-001', name: 'Royal Blue Sapphire', type: 'Sapphire', weight: '3.45 ct', price: '$4,250', status: 'Available', img: '/images/guide/blue-sapphire.png' },
    { id: 'GEM-002', name: 'Pigeon Blood Ruby', type: 'Ruby', weight: '2.10 ct', price: '$6,800', status: 'Reserved', img: '/images/guide/ruby.png' },
    { id: 'GEM-003', name: 'Sunset Padparadscha', type: 'Padparadscha', weight: '1.85 ct', price: '$8,500', status: 'Available', img: '/images/guide/padparadscha.png' },
    { id: 'GEM-004', name: 'Vivid Pink Sapphire', type: 'Sapphire', weight: '4.20 ct', price: '$3,900', status: 'Sold', img: '/images/guide/pink-sapphire.png' },
    { id: 'GEM-005', name: 'Color Change Alexandrite', type: 'Alexandrite', weight: '1.50 ct', price: '$12,000', status: 'Available', img: '/images/guide/alexandrite.png' },
  ];

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', backgroundColor: 'white', padding: '2rem 3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Inventory Management</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Add, edit, or remove gemstones from your collection.</p>
        </div>
        <button onClick={() => alert('Backend not connected yet. Real implementation will open an upload form.')} style={{ backgroundColor: 'var(--text-accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>+ Add New Stone</span>
        </button>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stone</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weight</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
              {inventory.map((stone, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image src={stone.img} alt={stone.name} fill style={{ objectFit: 'contain', padding: '4px' }} />
                    </div>
                    <span style={{ fontWeight: 500, color: '#111827' }}>{stone.name}</span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontFamily: 'monospace' }}>{stone.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#4b5563' }}>{stone.type}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#4b5563' }}>{stone.weight}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#111827', fontWeight: 500 }}>{stone.price}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      backgroundColor: stone.status === 'Available' ? '#d1fae5' : stone.status === 'Reserved' ? '#fef3c7' : '#fee2e2', 
                      color: stone.status === 'Available' ? '#065f46' : stone.status === 'Reserved' ? '#92400e' : '#991b1b',
                      padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', display: 'inline-block'
                    }}>
                      {stone.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px' }} title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px' }} title="View on site">
                        <ExternalLink size={18} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
