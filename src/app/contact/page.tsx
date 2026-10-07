import Navbar from '@/components/Navbar/Navbar';
import PageHeader from '@/components/PageHeader/PageHeader';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Contact Us" 
        subtitle="Enquiries welcome. Share your variety, carat range, and budget."
      />
      <section className="section container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}><strong>Email:</strong> GEMFORTINTERNATIONAL@gmail.com</p>
          <p style={{ marginBottom: '1rem' }}><strong>WhatsApp:</strong> +1 773 885 0603</p>
          <p><strong>Locations:</strong> Beruwala, Sri Lanka • Chicago, USA</p>
        </div>
      </section>
    </main>
  );
}
