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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {inventory.map((stone, i) => (
          <div key={i} style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)', 
            border: '1px solid #f3f4f6',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
          }}>
            {/* Image Area */}
            <div style={{ position: 'relative', height: '220px', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <Image 
                src={stone.img} 
                alt={stone.name} 
                fill 
                style={{ objectFit: 'contain', padding: '1.5rem' }} 
              />
              <span style={{ 
                position: 'absolute', top: '16px', right: '16px',
                backgroundColor: stone.status === 'Available' ? '#d1fae5' : stone.status === 'Reserved' ? '#fef3c7' : '#fee2e2', 
                color: stone.status === 'Available' ? '#065f46' : stone.status === 'Reserved' ? '#92400e' : '#991b1b',
                padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase'
              }}>
                {stone.status}
              </span>
              <span style={{ 
                position: 'absolute', top: '16px', left: '16px',
                backgroundColor: 'rgba(0,0,0,0.05)', color: '#4b5563',
                padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, fontFamily: 'monospace'
              }}>
                {stone.id}
              </span>
            </div>

            {/* Details Area */}
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: 'var(--text-accent)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.5rem 0' }}>
                {stone.type} • {stone.weight}
              </p>
              <h3 style={{ fontSize: '1.1rem', color: '#111827', margin: '0 0 1rem 0', fontFamily: 'var(--font-serif)', lineHeight: '1.4' }}>
                {stone.name}
              </h3>
              <p style={{ fontSize: '1.25rem', color: '#111827', fontWeight: 600, margin: 'auto 0 0 0' }}>
                {stone.price}
              </p>
            </div>

            {/* Action Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f3f4f6', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
                onMouseOver={(e) => e.currentTarget.style.color = '#111827'}
                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                <Edit2 size={16} /> Edit
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }} title="View on site"
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-accent)'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                >
                  <ExternalLink size={18} />
                </button>
                <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete"
                  onMouseOver={(e) => e.currentTarget.style.color = '#b91c1c'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#ef4444'}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
