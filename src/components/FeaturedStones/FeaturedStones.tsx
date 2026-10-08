'use client';

import { motion } from 'framer-motion';
import styles from './FeaturedStones.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const stones = [
  {
    id: 1,
    name: 'Royal Blue Sapphire',
    weight: '3.45 ct',
    origin: 'Ratnapura, Ceylon',
    image: '/images/guide/blue-sapphire.png',
    priceUSD: 4250,
    glow: 'rgba(28, 93, 230, 0.45)',
    badge: 'Unheated'
  },
  {
    id: 3,
    name: 'Sunset Padparadscha',
    weight: '1.85 ct',
    origin: 'Balangoda, Ceylon',
    image: '/images/guide/padparadscha.png',
    priceUSD: 8500,
    glow: 'rgba(245, 120, 80, 0.45)',
    badge: 'Rare Lotus'
  },
  {
    id: 2,
    name: 'Pigeon Blood Ruby',
    weight: '2.10 ct',
    origin: 'Mozambique',
    image: '/images/guide/ruby.png',
    priceUSD: 6800,
    glow: 'rgba(230, 32, 68, 0.45)',
    badge: 'Certified'
  },
  {
    id: 4,
    name: 'Vivid Pink Sapphire',
    weight: '4.20 ct',
    origin: 'Ratnapura, Ceylon',
    image: '/images/guide/pink-sapphire.png',
    priceUSD: 3900,
    glow: 'rgba(238, 77, 160, 0.45)',
    badge: 'Eye-Clean'
  },
  {
    id: 6,
    name: 'Golden Yellow Sapphire',
    weight: '5.10 ct',
    origin: 'Ratnapura, Ceylon',
    image: '/images/guide/yellow-sapphire.png',
    priceUSD: 3200,
    glow: 'rgba(240, 190, 50, 0.45)',
    badge: 'Unheated'
  },
  {
    id: 5,
    name: 'Color Change Alexandrite',
    weight: '1.50 ct',
    origin: 'Minas Gerais',
    image: '/images/guide/alexandrite.png',
    priceUSD: 12000,
    glow: 'rgba(56, 182, 160, 0.45)',
    badge: 'Investment'
  }
];

const FeaturedStones = () => {
  const { formatPrice } = useCurrency();

  return (
    <section className={`section ${styles.featured}`}>
      <div className="container" style={{ maxWidth: '1360px' }}>
        <div className={styles.header}>
          <motion.span 
            className={styles.kicker}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Curated Vault Selection
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Treasures of Ceylon &amp; Beyond
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={styles.subtitle}
          >
            Hand-selected single specimens of certified natural unheated gemstones, each accompanied by full international gemological reports.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {stones.map((stone, index) => (
            <motion.div
              key={stone.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * (index % 3) }}
            >
              <Link href={`/gemstones/${stone.id}`} className={styles.cardLink}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <div 
                      className={styles.glow} 
                      style={{ backgroundColor: stone.glow }} 
                    />
                    <Image
                      src={stone.image}
                      alt={stone.name}
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 1024px) 33vw, 380px"
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.cardInfo}>
                    <div className={styles.originMeta}>
                      <span className={styles.origin}>{stone.origin}</span>
                      <span className={styles.weight}>{stone.weight}</span>
                    </div>

                    <h3 className={styles.stoneName}>{stone.name}</h3>

                    <div className={styles.cardFooter}>
                      <span className={styles.price}>{formatPrice(stone.priceUSD)}</span>
                      <span className={styles.viewAction}>
                        Dossier <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.centerAction}>
          <Link href="/gemstones" className={styles.inventoryBtn}>
            <span>Explore Full Vault Inventory</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStones;
