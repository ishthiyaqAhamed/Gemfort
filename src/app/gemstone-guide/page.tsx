'use client';

import PageHeader from '@/components/PageHeader/PageHeader';

export default function GuidePage() {
  return (
    <main>
      <PageHeader 
        title="Gemstone Guide" 
        subtitle="Education & Care" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>The 4 C's of Colored Gemstones</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Unlike diamonds, colored gemstones are primarily evaluated on the intensity, hue, and saturation of their color. A vivid, unheated blue sapphire with minor inclusions is often far more valuable than a perfectly clear, heated stone with pale color.
          </p>
          <p style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Comprehensive guide coming soon.
          </p>
        </div>
      </section>
    </main>
  );
}
