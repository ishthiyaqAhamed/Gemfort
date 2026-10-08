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
