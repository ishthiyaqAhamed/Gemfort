'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';

const articles = [
  { 
    id: 1, 
    title: 'Chinafort "Pathe" Gem Market: the heart of Sri Lanka\'s gem trade', 
    date: '4 August 2026', 
    category: 'China Fort', 
    excerpt: 'Nestled in Beruwala, just 55 km south of Colombo, the Chinafort "Pathe" Gem Market is a living ecosystem where generations of expertise, immense trust and precious stones change hands in a uniquely vibrant open-air market.',
    img: '/images/hero-bg-blue.jpg'
  },
  { 
    id: 2, 
    title: 'Reading rough sapphire: what a buyer looks for before cutting', 
    date: '18 July 2026', 
    category: 'Gem Trading', 
    excerpt: 'Most of a sapphire\'s value is decided before it is faceted. A look at how rough is evaluated in the Sri Lankan trade.',
    img: '/images/about-1.jpg'
  },
  { 
    id: 3, 
    title: 'Famous Sri Lankan gemstones: the island\'s most celebrated stones', 
    date: '27 June 2026', 
    category: 'Famous Gemstones', 
    excerpt: 'Ceylon gemstones are internationally celebrated, particularly for their exceptional blue sapphires and remarkable star corundum. Many of the world\'s largest and most famous sapphires of Sri Lankan origin now sit in royal collections and museums.',
    img: '/images/about-3.png'
  },
  { 
    id: 4, 
    title: 'Inside the Pathe gem market', 
    date: '6 June 2026', 
    category: 'Pathe Market', 
    excerpt: 'Located in the heart of China Fort, Pathe Gem Market is one of Sri Lanka\'s best-known destinations for gemstone trading — where generations of merchants, miners and international buyers meet.',
    img: '/images/about-2.jpg'
  },
  { 
    id: 5, 
    title: 'Heat treatment explained, without the mythology', 
    date: '19 May 2026', 
    category: 'Gemstone Origins', 
    excerpt: 'What heating actually does to a sapphire, which treatments the trade accepts, and which it does not.',
    img: '/images/hero-bg-stunning.jpg'
  },
  { 
    id: 6, 
    title: 'Two thousand years of Sri Lankan gem heritage', 
    date: '30 April 2026', 
    category: 'Gem Heritage', 
    excerpt: 'Sri Lanka, known internationally as Ceylon until 1972, has earned worldwide recognition for its remarkable wealth of gemstones and its exceptional variety of precious and semi-precious stones.',
    img: '/images/hero-light.jpg'
  }
];

const categories = ['All', 'Sri Lankan Gem Heritage', 'Beruwala History', 'China Fort', 'Pathe Gem Market', 'Famous Sri Lankan Gemstones', 'Gemstone Origins', 'Gem Trading', 'Gemstone Culture'];

export default function JournalPage() {
  return (
    <main>
      <PageHeader 
        title="The Gemfort Journal" 
        subtitle="Notes on gemstones, heritage and the Ceylon trade" 
        imagePath="/images/hero-bg-stunning.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '4rem' }}>
            {categories.map((cat, i) => (
              <button 
                key={i}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: i === 0 ? '1px solid var(--text-accent)' : '1px solid var(--border-color)',
                  backgroundColor: i === 0 ? 'rgba(199, 164, 80, 0.1)' : 'transparent',
                  color: i === 0 ? 'var(--text-accent)' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
            {articles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer', group: 'hover' }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <Image 
                    src={article.img} 
                    alt={article.title} 
                    fill 
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: 'var(--text-accent)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 600, marginBottom: '0.8rem' }}>
                    {article.category}
                  </span>
                  
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                    {article.title}
                  </h2>
                  
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>
                    {article.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{article.date}</span>
                    <span style={{ color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1.5px', fontWeight: 600 }}>Read Article</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
