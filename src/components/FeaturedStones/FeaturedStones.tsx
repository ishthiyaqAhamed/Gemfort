'use client';

import { motion } from 'framer-motion';
import styles from './FeaturedStones.module.css';
import Image from 'next/image';

const stones = [
  {
    id: 1,
    name: 'Royal Blue Sapphire',
    weight: '3.03 Cts',
    origin: 'Madagascar',
    image: '/images/sapphire.jpg',
  },
  {
    id: 2,
    name: 'Unheated Pigeon Blood Ruby',
    weight: '2.03 Cts',
    origin: 'Mozambique',
    image: '/images/ruby.jpg',
  }
];

const FeaturedStones = () => {
  return (
    <section className={`section ${styles.featured}`}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Featured Gemstones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.subtitle}
          >
            A curated selection of the finest natural stones from our current inventory.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {stones.map((stone, index) => (
            <motion.div
              key={stone.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={stone.image}
                  alt={stone.name}
                  fill
                  className={styles.image}
                />
                <div className={styles.cardOverlay}>
                  <button className="btn btn-primary">
                    <span>View Details</span>
                  </button>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.stoneOrigin}>{stone.origin} • {stone.weight}</p>
                <h3 className={styles.stoneName}>{stone.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.centerAction}>
          <button className="btn">
            <span>View Full Inventory</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStones;
