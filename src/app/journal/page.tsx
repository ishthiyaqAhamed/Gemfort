import Navbar from '@/components/Navbar/Navbar';
import PageHeader from '@/components/PageHeader/PageHeader';

export default function JournalPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Journal" 
        subtitle="Insights, updates, and news from the world of Gemfort."
      />
      <section className="section container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Journal entries coming soon...</p>
      </section>
    </main>
  );
}
