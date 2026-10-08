'use client';

import { Plus } from 'lucide-react';
import styles from '../adminPages.module.css';

export default function AdminJournalPage() {
  return (
    <div>
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Journal Entries</h1>
          <p className={styles.pageSubtitle}>Manage your gemstone education and maison editorial content.</p>
        </div>
        <button 
          onClick={() => alert('Backend not connected yet. This will open a rich text editor.')} 
          className={styles.primaryBtn}
        >
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </div>
      
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'The Heat Treatment of Sapphires', author: 'Gemfort', date: 'Sep 24, 2026', status: 'Published' },
                { title: 'Understanding Padparadscha Colors', author: 'Gemfort', date: 'Sep 15, 2026', status: 'Published' },
                { title: 'A Guide to Sourcing from Sri Lanka', author: 'Gemfort', date: 'Draft', status: 'Draft' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#111827' }}>{row.title}</td>
                  <td style={{ color: '#4b5563' }}>{row.author}</td>
                  <td style={{ color: '#6b7280', fontSize: '0.85rem' }}>{row.date}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      row.status === 'Published' ? styles.statusAvailable : styles.statusReserved
                    }`}>
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
