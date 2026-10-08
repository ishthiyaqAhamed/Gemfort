'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './gemstones.module.css';

import { useCurrency } from '@/context/CurrencyContext';

const allStones = [
  { id: 1, name: 'Royal Blue Sapphire', type: 'Sapphire', weight: '3.45 ct', img: '/images/guide/blue-sapphire.png', priceUSD: 4250 },
  { id: 2, name: 'Pigeon Blood Ruby', type: 'Ruby', weight: '2.10 ct', img: '/images/guide/ruby.png', priceUSD: 6800 },
  { id: 3, name: 'Sunset Padparadscha', type: 'Padparadscha', weight: '1.85 ct', img: '/images/guide/padparadscha.png', priceUSD: 8500 },
  { id: 4, name: 'Vivid Pink Sapphire', type: 'Sapphire', weight: '4.20 ct', img: '/images/guide/pink-sapphire.png', priceUSD: 3900 },
  { id: 5, name: 'Color Change Alexandrite', type: 'Alexandrite', weight: '1.50 ct', img: '/images/guide/alexandrite.png', priceUSD: 12000 },
  { id: 6, name: 'Golden Yellow Sapphire', type: 'Sapphire', weight: '5.10 ct', img: '/images/guide/yellow-sapphire.png', priceUSD: 3200 },
  { id: 7, name: 'Cornflower Blue Sapphire', type: 'Sapphire', weight: '2.80 ct', img: '/images/guide/blue-sapphire.png', priceUSD: 3800 },
  { id: 8, name: 'Neon Spinel', type: 'Spinel', weight: '3.05 ct', img: '/images/guide/spinel.png', priceUSD: 2100 },
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
  const { formatPrice } = useCurrency();

  return (
    <main>
      <PageHeader 
        title="Shop Collections" 
        subtitle="Ethically Sourced Natural Gemstones" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section" style={{ backgroundColor: '#0a0f1a', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(199,164,80,0.15)', paddingBottom: '1.5rem' }}>
            <p style={{ color: 'rgba(240,236,228,0.4)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Showing {allStones.length} premium gemstones</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <select style={{ padding: '0.6rem 1rem', border: '1px solid rgba(199,164,80,0.25)', borderRadius: '8px', fontFamily: 'var(--font-body)', backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(240,236,228,0.8)', outline: 'none', fontSize: '0.85rem' }}>
                <option style={{ backgroundColor: '#001228' }}>All Categories</option>
                <option style={{ backgroundColor: '#001228' }}>Sapphires</option>
                <option style={{ backgroundColor: '#001228' }}>Rubies</option>
                <option style={{ backgroundColor: '#001228' }}>Padparadscha</option>
                <option style={{ backgroundColor: '#001228' }}>Alexandrite</option>
              </select>
              <select style={{ padding: '0.6rem 1rem', border: '1px solid rgba(199,164,80,0.25)', borderRadius: '8px', fontFamily: 'var(--font-body)', backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(240,236,228,0.8)', outline: 'none', fontSize: '0.85rem' }}>
                <option style={{ backgroundColor: '#001228' }}>Sort by: Featured</option>
                <option style={{ backgroundColor: '#001228' }}>Price: High to Low</option>
                <option style={{ backgroundColor: '#001228' }}>Price: Low to High</option>
                <option style={{ backgroundColor: '#001228' }}>Carat: High to Low</option>
              </select>
            </div>
          </div>

          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {allStones.map((stone) => (
              <motion.div 
                key={stone.id} 
                variants={itemVariants}
              >
                <Link href={`/gemstones/${stone.id}`} style={{ textDecoration: 'none' }}>
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image 
                        src={stone.img} 
                        alt={stone.name} 
                        fill 
                        className={styles.stoneImg}
                      />
                    </div>
                    
                    <div className={styles.cardDetails}>
                      <p className={styles.stoneType}>
                        {stone.type}
                      </p>
                      
                      <h3 className={styles.stoneName}>
                        {stone.name}
                      </h3>

                      <div className={styles.stoneMeta}>
                        <span className={styles.stoneWeight}>{stone.weight}</span>
                        <span className={styles.stonePrice}>{formatPrice(stone.priceUSD)}</span>
                      </div>
                      
                      <button className={styles.actionBtn}>
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button style={{ padding: '14px 40px', backgroundColor: 'transparent', border: '1px solid rgba(199,164,80,0.5)', color: '#c7a450', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(199,164,80,0.12)'; e.currentTarget.style.borderColor = '#c7a450'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(199,164,80,0.5)'; }}
            >
              Load More Stones
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
