'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const allStones = [
  { id: 1, name: 'Royal Blue Sapphire', type: 'Sapphire', weight: '3.45 ct', img: '/images/guide/blue-sapphire.png', price: '$4,250' },
  { id: 2, name: 'Pigeon Blood Ruby', type: 'Ruby', weight: '2.10 ct', img: '/images/guide/ruby.png', price: '$6,800' },
  { id: 3, name: 'Sunset Padparadscha', type: 'Padparadscha', weight: '1.85 ct', img: '/images/guide/padparadscha.png', price: '$8,500' },
  { id: 4, name: 'Vivid Pink Sapphire', type: 'Sapphire', weight: '4.20 ct', img: '/images/guide/pink-sapphire.png', price: '$3,900' },
  { id: 5, name: 'Color Change Alexandrite', type: 'Alexandrite', weight: '1.50 ct', img: '/images/guide/alexandrite.png', price: '$12,000' },
  { id: 6, name: 'Golden Yellow Sapphire', type: 'Sapphire', weight: '5.10 ct', img: '/images/guide/yellow-sapphire.png', price: '$3,200' },
  { id: 7, name: 'Cornflower Blue Sapphire', type: 'Sapphire', weight: '2.80 ct', img: '/images/guide/blue-sapphire.png', price: '$3,800' },
  { id: 8, name: 'Neon Spinel', type: 'Spinel', weight: '3.05 ct', img: '/images/guide/spinel.png', price: '$2,100' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function GemstonesPage() {
  return (
    <main>
      <PageHeader 
        title="Shop Collections" 
        subtitle="Ethically Sourced Natural Gemstones" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Showing {allStones.length} premium gemstones</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select style={{ padding: '0.8rem 1.5rem', border: '1px solid rgba(0,33,71,0.1)', borderRadius: '4px', fontFamily: 'var(--font-body)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}>
                <option>All Categories</option>
                <option>Sapphires</option>
                <option>Rubies</option>
                <option>Padparadscha</option>
                <option>Alexandrite</option>
              </select>
              <select style={{ padding: '0.8rem 1.5rem', border: '1px solid rgba(0,33,71,0.1)', borderRadius: '4px', fontFamily: 'var(--font-body)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}>
                <option>Sort by: Featured</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
                <option>Carat: High to Low</option>
              </select>
            </div>
          </div>

          <motion.div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '3rem 2rem' 
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {allStones.map((stone) => (
              <motion.div 
                key={stone.id} 
                variants={itemVariants}
                style={{ position: 'relative' }}
              >
                <Link href={`/gemstones/${stone.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 33, 71, 0.06)';
                    const img = e.currentTarget.querySelector('.stone-img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1.05)';
                    const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
                    if (overlay) overlay.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.02)';
                    const img = e.currentTarget.querySelector('.stone-img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1)';
                    const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
                    if (overlay) overlay.style.opacity = '0';
                  }}
                  >
                    {/* Image Area */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#fcfcfc', borderBottom: '1px solid rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image 
                        src={stone.img} 
                        alt={stone.name} 
                        fill 
                        className="stone-img"
                        style={{ objectFit: 'contain', padding: '3rem', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} 
                      />
                      
                      {/* Hover Overlay */}
                      <div 
                        className="hover-overlay"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,33,71,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.4s ease'
                        }}
                      >
                        <span style={{ 
                          backgroundColor: 'var(--text-primary)', 
                          color: 'var(--bg-primary)', 
                          padding: '12px 28px', 
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          boxShadow: '0 10px 25px rgba(0,33,71,0.15)'
                        }}>
                          Inquire Now
                        </span>
                      </div>
                    </div>
                    
                    {/* Text Details Area */}
                    <div style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: 'var(--bg-primary)' }}>
                      <p style={{ 
                        fontFamily: 'var(--font-body)', 
                        color: 'var(--text-accent)', 
                        fontSize: '0.65rem', 
                        fontWeight: 700,
                        textTransform: 'uppercase', 
                        letterSpacing: '3px', 
                        marginBottom: '1rem'
                      }}>
                        {stone.type}
                      </p>
                      
                      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', fontWeight: 500, lineHeight: '1.3' }}>
                        {stone.name}
                      </h3>

                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
                        {stone.weight}
                      </p>
                      
                      <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--border-color)', margin: 'auto auto 1.5rem auto' }}></div>

                      <p style={{ color: 'var(--text-primary)', fontWeight: 400, fontSize: '1.1rem', letterSpacing: '1px' }}>
                        {stone.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <button className="btn btn-primary" style={{ padding: '16px 40px' }}>
              <span>Load More Stones</span>
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
