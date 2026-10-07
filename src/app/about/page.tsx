import Navbar from '@/components/Navbar/Navbar';
import PageHeader from '@/components/PageHeader/PageHeader';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="About Us" 
        subtitle="Discover the heritage of Gemfort and our legacy in Sri Lanka's gem trade."
      />
      <section className="section container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Full story coming soon...</p>
      </section>
    </main>
  );
}
