'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main>
      <PageHeader 
        title="Our Story" 
        subtitle="The Gemfort Legacy" 
        imagePath="/images/about-preview.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}
          >
            A Journey of Precision and Passion
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8 }}
          >
            Founded in 1989 in the heart of Colombo, Sri Lanka, Gemfort International began as a small family-run lapidary with a singular vision: to unlock the raw, hidden beauty of the earth's rarest minerals. 
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.8 }}
          >
            Today, we are recognized globally as purveyors of the finest natural sapphires, rubies, and exotic gemstones. Our journey spans continents—from the legendary mines of Ceylon to the rich deposits of Madagascar and Burma—ensuring that every stone in our collection is not only breathtaking, but ethically and responsibly sourced.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}
          >
            <Image src="/images/hero-bg-blue.jpg" alt="Gemstone Crafting" fill style={{ objectFit: 'cover' }} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
