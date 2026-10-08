'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';

const articles = [
  { id: 1, title: 'The Rise of the Padparadscha Sapphire', date: 'October 12, 2026', category: 'Gemology', excerpt: 'Exploring the delicate balance of pink and orange in the world’s most sought-after sapphire.' },
  { id: 2, title: 'Understanding Gemstone Treatments', date: 'September 28, 2026', category: 'Education', excerpt: 'Why unheated and untreated natural gemstones command a premium in the luxury market.' },
  { id: 3, title: 'A Guide to Ceylon Sapphires', date: 'September 15, 2026', category: 'Origins', excerpt: 'What makes Sri Lankan sapphires the choice of royalty for centuries.' },
];

export default function JournalPage() {
  return (
    <main>
      <PageHeader 
        title="The Journal" 
        subtitle="Insights & Gemology" 
        imagePath="/images/hero-bg-stunning.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {articles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ paddingBottom: '3rem', borderBottom: '1px solid var(--border-color)' }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-accent)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 600 }}>{article.category}</span>
                  <span style={{ color: 'var(--border-hover)' }}>|</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{article.date}</span>
                </div>
                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem', cursor: 'pointer' }}>
                  {article.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {article.excerpt}
                </p>
                <button className="btn" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
                  <span>Read Article</span>
                </button>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
