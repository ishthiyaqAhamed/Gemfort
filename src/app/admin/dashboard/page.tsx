'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import styles from './adminPages.module.css';

interface DashboardStats {
  totalInventory: number;
  pendingEnquiries: number;
  totalEnquiries: number;
  totalCategories: number;
  recentEnquiries: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInventory: 7,
    pendingEnquiries: 0,
    totalEnquiries: 0,
    totalCategories: 5,
    recentEnquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (res.ok && data.success && data.data) {
          setStats(data.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    { label: 'Total Vault Inventory', value: stats.totalInventory, change: `${stats.totalCategories} active categories` },
    { label: 'New / Pending Enquiries', value: stats.pendingEnquiries, change: `${stats.totalEnquiries} lifetime inquiries` },
    { label: 'Active Gem Categories', value: stats.totalCategories, change: 'Sapphires, Rubies & more' },
    { label: 'Database Status', value: 'Live & Connected', change: 'Neon Serverless PostgreSQL' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statCards.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
            <h3 className={styles.statValue}>
              {loading ? <Loader2 size={24} className="animate-spin" /> : stat.value}
            </h3>
            <p className={styles.statChange}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.tableTitle}>Recent Customer Enquiries</h2>
            <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.2rem' }}>
              Direct acquisition and sourcing requests submitted through your website
            </p>
          </div>
          <Link 
            href="/admin/dashboard/enquiries" 
            style={{ color: '#c7a450', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
          >
            Manage All ({stats.totalEnquiries}) →
          </Link>
        </div>
        
        <div className={styles.tableResponsive}>
          {stats.recentEnquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6b7280' }}>
              <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>No customer inquiries yet.</p>
              <p style={{ fontSize: '0.85rem' }}>When clients submit inquiries on gemstone pages or the contact page, they will appear here in real-time.</p>
            </div>
          ) : (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Inquiry Details</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEnquiries.map((row) => {
                  const dateStr = new Date(row.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600, color: '#111827' }}>{row.name}</td>
                      <td style={{ color: '#4b5563' }}>{row.email}</td>
                      <td style={{ color: '#4b5563', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.message}
                      </td>
                      <td style={{ color: '#6b7280', fontSize: '0.85rem' }}>{dateStr}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${
                          row.status === 'NEW' ? styles.statusNew : 
                          row.status === 'IN_PROGRESS' ? styles.statusInProgress : 
                          styles.statusResolved
                        }`}>
                          {row.status === 'NEW' ? 'New' : row.status === 'IN_PROGRESS' ? 'In Progress' : 'Resolved'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
