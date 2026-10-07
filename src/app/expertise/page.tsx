import Navbar from '@/components/Navbar/Navbar';
import PageHeader from '@/components/PageHeader/PageHeader';

export default function ExpertisePage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Our Expertise" 
        subtitle="From rough stone to finished gem. Learn about our master cutting process."
      />
      <section className="section container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Expertise details coming soon...</p>
      </section>
    </main>
  );
}
