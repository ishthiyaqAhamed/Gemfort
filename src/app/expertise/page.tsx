'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ExpertisePage() {
  return (
    <main>
      <PageHeader 
        title="Our Expertise" 
        subtitle="The Art of Lapidary" 
        imagePath="/images/about-preview.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}
            >
              <div>
                <h4 style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>01. Sourcing</h4>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '2.2rem' }}>Ethical Origins</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Our journey begins at the source. We maintain deep, multi-generational relationships with artisanal miners across Sri Lanka, Madagascar, and East Africa. 
                  By sourcing directly, we ensure fair trade practices and can personally guarantee the untreated, natural origin of every rough stone we acquire.
                </p>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="/images/hero-bg-blue.jpg" alt="Sourcing" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', order: -1 }}>
                <Image src="/images/about-preview.jpg" alt="Cutting" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ order: 1 }}>
                <h4 style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>02. Craftsmanship</h4>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '2.2rem' }}>Masterful Faceting</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Sri Lanka is globally renowned for its lapidary heritage. Our master cutters analyze the crystal structure of each rough gem, carefully planning the cut to maximize color saturation, brilliance, and weight retention. It is a slow, meticulous process that requires decades of experience and an unwavering eye for perfection.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
