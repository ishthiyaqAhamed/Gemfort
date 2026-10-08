'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
              gap: '2.5rem' 
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
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  borderRadius: '0', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#f9f9f9', padding: '2rem' }}>
                  <Image 
                    src={stone.img} 
                    alt={stone.name} 
                    fill 
                    style={{ objectFit: 'contain', padding: '2rem', transition: 'transform 0.5s ease' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '4px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    color: 'var(--text-primary)',
                    borderRadius: '2px',
                    textTransform: 'uppercase'
                  }}>
                    {stone.weight}
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <p style={{ 
                    fontFamily: 'var(--font-body)', 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.7rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px', 
                    marginBottom: '0.5rem'
                  }}>
                    {stone.type}
                  </p>
                  
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.8rem', flexGrow: 1 }}>
                    {stone.name}
                  </h3>
                  
                  <p style={{ color: 'var(--text-accent)', fontWeight: 600, fontSize: '1.1rem' }}>
                    {stone.price}
                  </p>
                </div>
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
