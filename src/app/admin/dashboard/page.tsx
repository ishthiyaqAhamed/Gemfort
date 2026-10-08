import Link from 'next/link';
import styles from './adminPages.module.css';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Inventory', value: '42', change: '+3 this week' },
    { label: 'Pending Enquiries', value: '7', change: '2 new today' },
    { label: 'Journal Articles', value: '12', change: 'Updated 2d ago' },
    { label: 'Total Views', value: '1,248', change: '+12% this mo.' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
            <h3 className={styles.statValue}>{stat.value}</h3>
            <p className={styles.statChange}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Enquiries</h2>
          <Link 
            href="/admin/dashboard/enquiries" 
            style={{ color: '#c7a450', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
          >
            View All →
          </Link>
        </div>
        
        <div className={styles.tableResponsive}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Interest</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'James Carter', email: 'j.carter@example.com', interest: 'Blue Sapphire 3+ ct', date: 'Oct 08, 2026', status: 'New' },
                { name: 'Sarah Wu', email: 'sarah.wu99@example.com', interest: 'Padparadscha inquiry', date: 'Oct 07, 2026', status: 'In Progress' },
                { name: 'Michael Thorne', email: 'mthorne@example.com', interest: 'Ruby engagement ring', date: 'Oct 05, 2026', status: 'Resolved' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#111827' }}>{row.name}</td>
                  <td style={{ color: '#4b5563' }}>{row.email}</td>
                  <td style={{ color: '#4b5563' }}>{row.interest}</td>
                  <td style={{ color: '#6b7280', fontSize: '0.85rem' }}>{row.date}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      row.status === 'New' ? styles.statusNew : 
                      row.status === 'In Progress' ? styles.statusInProgress : 
                      styles.statusResolved
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
