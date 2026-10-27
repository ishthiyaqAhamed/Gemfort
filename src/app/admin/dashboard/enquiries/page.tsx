'use client';

import { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Clock, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import styles from '../adminPages.module.css';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  gemstoneId?: string | null;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'NEW' | 'IN_PROGRESS' | 'RESOLVED') => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  return (
    <div>
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Customer Enquiries</h1>
          <p className={styles.pageSubtitle}>
            Review and respond to private gemstone acquisition and sourcing requests ({enquiries.length} total).
          </p>
        </div>
        <button
          onClick={loadEnquiries}
          className={styles.actionBtn}
          title="Refresh Enquiries"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.85rem' }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {(['ALL', 'NEW', 'IN_PROGRESS', 'RESOLVED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: filter === tab ? '#c7a450' : '#e5e7eb',
              backgroundColor: filter === tab ? '#002147' : '#ffffff',
              color: filter === tab ? '#ffffff' : '#4b5563',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab === 'ALL' ? 'All Inquiries' : tab === 'NEW' ? 'New' : tab === 'IN_PROGRESS' ? 'In Progress' : 'Resolved'}
            {' '}
            <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>
              ({tab === 'ALL' ? enquiries.length : enquiries.filter((e) => e.status === tab).length})
            </span>
          </button>
        ))}
      </div>
      
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3.5rem', color: '#6b7280' }}>
              <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
              <p>Loading inquiries from database...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#6b7280' }}>
              <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.4rem' }}>
                No inquiries found matching this filter.
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                When customers submit acquisition forms, their requests will appear here.
              </p>
            </div>
          ) : (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Contact Info</th>
                  <th>Acquisition Details</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((row) => {
                  const dateStr = new Date(row.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>
                        {row.name}
                      </td>
                      <td style={{ color: '#4b5563', whiteSpace: 'nowrap' }}>
                        <div>{row.email}</div>
                        {row.phone && (
                          <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '2px' }}>
                            {row.phone}
                          </div>
                        )}
                      </td>
                      <td style={{ color: '#4b5563', minWidth: '240px', maxWidth: '360px', lineHeight: 1.5 }}>
                        {row.message}
                      </td>
                      <td style={{ color: '#6b7280', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                        {dateStr}
                      </td>
                      <td>
                        <select
                          value={row.status}
                          disabled={updatingId === row.id}
                          onChange={(e) =>
                            handleStatusChange(row.id, e.target.value as 'NEW' | 'IN_PROGRESS' | 'RESOLVED')
                          }
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            backgroundColor:
                              row.status === 'NEW'
                                ? '#eff6ff'
                                : row.status === 'IN_PROGRESS'
                                ? '#fffbeb'
                                : '#ecfdf5',
                            color:
                              row.status === 'NEW'
                                ? '#1d4ed8'
                                : row.status === 'IN_PROGRESS'
                                ? '#b45309'
                                : '#047857',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="NEW">New</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <a 
                            href={`mailto:${row.email}?subject=Regarding your gemstone inquiry at Gemfort&body=Dear ${encodeURIComponent(row.name)},%0D%0A%0D%0AThank you for reaching out to Gemfort regarding your inquiry.%0D%0A%0D%0ABest regards,%0D%0AGemfort Concierge Team`}
                            style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#c7a450', 
                              color: 'white', 
                              textDecoration: 'none',
                              padding: '0.45rem 0.75rem', 
                              borderRadius: '6px', 
                              fontSize: '0.78rem',
                              fontWeight: 600,
                            }}
                          >
                            <Mail size={13} />
                            <span>Reply</span>
                          </a>

                          <button
                            onClick={() => handleDelete(row.id)}
                            className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                            title="Delete Inquiry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
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
