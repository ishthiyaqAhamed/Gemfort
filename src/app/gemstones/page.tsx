'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';

const allStones = [
  { id: 1, name: 'Royal Blue Sapphire', origin: 'Sri Lanka', weight: '3.45 ct', img: '/images/blue-sapphire-isolated.jpg' },
  { id: 2, name: 'Pigeon Blood Ruby', origin: 'Burma', weight: '2.10 ct', img: '/images/ruby-isolated.jpg' },
  { id: 3, name: 'Sunset Padparadscha', origin: 'Sri Lanka', weight: '1.85 ct', img: '/images/padparadscha-isolated.jpg' },
  { id: 4, name: 'Vivid Pink Sapphire', origin: 'Madagascar', weight: '4.20 ct', img: '/images/pink-sapphire-isolated.jpg' },
  { id: 5, name: 'Color Change Alexandrite', origin: 'Tanzania', weight: '1.50 ct', img: '/images/alexandrite-isolated.jpg' },
  { id: 6, name: 'Golden Yellow Sapphire', origin: 'Sri Lanka', weight: '5.10 ct', img: '/images/yellow-sapphire-isolated.jpg' },
  { id: 7, name: 'Cornflower Blue Sapphire', origin: 'Sri Lanka', weight: '2.80 ct', img: '/images/blue-sapphire-isolated.jpg' },
  { id: 8, name: 'Unheated Ruby', origin: 'Mozambique', weight: '3.05 ct', img: '/images/ruby-isolated.jpg' },
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
        title="Our Collection" 
        subtitle="Ethically Sourced Natural Gemstones" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Showing {allStones.length} premium gemstones</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'var(--font-body)', backgroundColor: 'transparent' }}>
                <option>All Gemstones</option>
                <option>Sapphires</option>
                <option>Rubies</option>
                <option>Padparadscha</option>
              </select>
              <select style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'var(--font-body)', backgroundColor: 'transparent' }}>
                <option>Sort by: Featured</option>
                <option>Price: High to Low</option>
                <option>Carat: High to Low</option>
              </select>
            </div>
          </div>

          <motion.div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem' 
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
                  backgroundColor: 'var(--bg-secondary)', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,33,71,0.05)';
                  e.currentTarget.style.borderColor = 'var(--text-accent)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', marginBottom: '1.5rem', overflow: 'hidden', borderRadius: '4px' }}>
                  <Image 
                    src={stone.img} 
                    alt={stone.name} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'white',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    color: 'var(--text-primary)',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    {stone.weight}
                  </div>
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                  <p style={{ 
                    fontFamily: 'var(--font-body)', 
                    color: 'var(--text-accent)', 
                    fontSize: '0.75rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px', 
                    marginBottom: '0.5rem',
                    fontWeight: 600
                  }}>
                    {stone.origin}
                  </p>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                    {stone.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button className="btn btn-primary">
              <span>Load More Stones</span>
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
