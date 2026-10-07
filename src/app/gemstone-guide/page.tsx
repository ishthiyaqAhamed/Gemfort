import Navbar from '@/components/Navbar/Navbar';
import PageHeader from '@/components/PageHeader/PageHeader';

export default function GemstoneGuidePage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Gemstone Guide" 
        subtitle="Everything you need to know about purchasing, cutting, and evaluating natural gemstones."
      />
      <section className="section container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Gemstone guide coming soon...</p>
      </section>
    </main>
  );
}
