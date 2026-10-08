'use client';

import { Mail } from 'lucide-react';
import styles from '../adminPages.module.css';

export default function AdminEnquiriesPage() {
  return (
    <div>
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Customer Enquiries</h1>
          <p className={styles.pageSubtitle}>Review and respond to private gemstone acquisition and sourcing requests.</p>
        </div>
      </div>
      
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Acquisition Details</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'James Carter', email: 'j.carter@example.com', interest: 'Looking for an unheated royal blue sapphire, around 3 carats, budget $5,000.', date: 'Oct 08, 2026', status: 'New' },
                { name: 'Sarah Wu', email: 'sarah.wu99@example.com', interest: 'Padparadscha sapphire for bespoke engagement ring, unheated certified.', date: 'Oct 07, 2026', status: 'In Progress' },
                { name: 'Michael Thorne', email: 'mthorne@example.com', interest: 'Pigeon blood ruby, 2+ carats, GRS/GIA report requested.', date: 'Oct 05, 2026', status: 'Resolved' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>{row.name}</td>
                  <td style={{ color: '#4b5563', whiteSpace: 'nowrap' }}>{row.email}</td>
                  <td style={{ color: '#4b5563', minWidth: '220px', maxWidth: '340px', lineHeight: 1.5 }}>{row.interest}</td>
                  <td style={{ color: '#6b7280', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{row.date}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      row.status === 'New' ? styles.statusNew : 
                      row.status === 'In Progress' ? styles.statusInProgress : 
                      styles.statusResolved
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <a 
                      href={`mailto:${row.email}?subject=Regarding your gemstone enquiry at Gemfort`}
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: '#c7a450', 
                        color: 'white', 
                        textDecoration: 'none',
                        padding: '0.45rem 0.85rem', 
                        borderRadius: '6px', 
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <Mail size={13} />
                      <span>Reply</span>
                    </a>
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
