'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Edit2, Trash2, ExternalLink, Plus } from 'lucide-react';
import styles from '../adminPages.module.css';

export default function AdminInventoryPage() {
  const inventory = [
    { id: 'GEM-001', stoneId: 1, name: 'Royal Blue Sapphire', type: 'Sapphire', weight: '3.45 ct', price: '$4,250', status: 'Available', img: '/images/guide/blue-sapphire.png' },
    { id: 'GEM-002', stoneId: 2, name: 'Pigeon Blood Ruby', type: 'Ruby', weight: '2.10 ct', price: '$6,800', status: 'Reserved', img: '/images/guide/ruby.png' },
    { id: 'GEM-003', stoneId: 3, name: 'Sunset Padparadscha', type: 'Padparadscha', weight: '1.85 ct', price: '$8,500', status: 'Available', img: '/images/guide/padparadscha.png' },
    { id: 'GEM-004', stoneId: 4, name: 'Vivid Pink Sapphire', type: 'Sapphire', weight: '4.20 ct', price: '$3,900', status: 'Sold', img: '/images/guide/pink-sapphire.png' },
    { id: 'GEM-005', stoneId: 5, name: 'Color Change Alexandrite', type: 'Alexandrite', weight: '1.50 ct', price: '$12,000', status: 'Available', img: '/images/guide/alexandrite.png' },
  ];

  return (
    <div>
      {/* Page Header Card */}
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Inventory Management</h1>
          <p className={styles.pageSubtitle}>Add, edit, or manage gemstones currently in your vault.</p>
        </div>
        <button 
          onClick={() => alert('Backend not connected yet. Real implementation will open an upload form.')} 
          className={styles.primaryBtn}
        >
          <Plus size={16} />
          <span>Add New Stone</span>
        </button>
      </div>
      
      {/* Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Stone</th>
                <th>ID</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((stone, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ position: 'relative', width: '40px', height: '40px', backgroundColor: '#07101d', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <Image src={stone.img} alt={stone.name} fill style={{ objectFit: 'contain', padding: '3px' }} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#111827' }}>{stone.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#6b7280', fontFamily: 'monospace', fontSize: '0.8rem' }}>{stone.id}</td>
                  <td style={{ color: '#4b5563' }}>{stone.type}</td>
                  <td style={{ color: '#4b5563' }}>{stone.weight}</td>
                  <td style={{ color: '#111827', fontWeight: 600 }}>{stone.price}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      stone.status === 'Available' ? styles.statusAvailable :
                      stone.status === 'Reserved' ? styles.statusReserved :
                      styles.statusSold
                    }`}>
                      {stone.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button className={styles.actionBtn} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <Link 
                        href={`/gemstones/${stone.stoneId}`} 
                        className={styles.actionBtn} 
                        title="View on site"
                        target="_blank"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Delete">
                        <Trash2 size={16} />
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
