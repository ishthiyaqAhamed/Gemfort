'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { articles } from '@/data/articles';

type Article = typeof articles[0];

export default function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Split content by double newlines into paragraphs
  const renderContent = (content: string) => {
    if (!content) return null;
    return content.split('\n\n').map((paragraph, idx) => {
      // Check if paragraph is likely a heading
      if (paragraph.length < 100 && !paragraph.endsWith('.') && idx > 0) {
        return <h3 key={idx} style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{paragraph}</h3>;
      }
      return <p key={idx} style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.2rem' }}>{paragraph}</p>;
    });
  };

  return (
    <main>
      <PageHeader 
        title="The Gemfort Journal" 
        subtitle="Notes on gemstones, heritage and the Ceylon trade" 
        imagePath="/images/hero-bg-stunning.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
            {articles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
                onClick={() => setSelectedArticle(article)}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(0,33,71,0.06)' }}>
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
                  
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4, fontFamily: 'var(--font-serif)' }}>
                    {article.title}
                  </h2>
                  
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>
                    {article.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,33,71,0.06)', paddingTop: '1rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{article.date}</span>
                    <span style={{ color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1.5px', fontWeight: 600 }}>Read Article</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 33, 71, 0.85)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                backgroundColor: 'var(--bg-primary)',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  zIndex: 10,
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ overflowY: 'auto', padding: '0', display: 'flex', flexDirection: 'column' }}>
                {/* Modal Header Image */}
                <div style={{ position: 'relative', width: '100%', height: '350px', flexShrink: 0 }}>
                  <Image 
                    src={selectedArticle.img} 
                    alt={selectedArticle.title} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)' }} />
                </div>
                
                {/* Modal Content */}
                <div style={{ padding: '3rem 4rem', marginTop: '-100px', position: 'relative', zIndex: 2 }}>
                  <span style={{ color: 'var(--text-accent)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 600 }}>
                    {selectedArticle.category}
                  </span>
                  
                  <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.2, fontFamily: 'var(--font-serif)' }}>
                    {selectedArticle.title}
                  </h1>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span>{selectedArticle.date}</span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-accent)' }} />
                    <span>Gemfort Journal</span>
                  </div>
                  
                  <div className="article-body">
                    {renderContent(selectedArticle.content)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
