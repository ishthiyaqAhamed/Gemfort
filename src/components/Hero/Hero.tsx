'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero-bg-stunning.jpg"
        alt="Premium Gemstone Background"
        fill
        priority
        className={styles.bgImage}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      
      <div className={`container ${styles.content}`}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.subtitle}
        >
          Over 35 Years of Excellence
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={styles.title}
        >
          Premium Natural <br /> Gemstone Supplier
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.description}
        >
          Natural sapphires, rubies, and spinels — sourced from Sri Lanka, Africa, and Burma. Hand-cut by master craftsmen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={styles.actions}
        >
          <button className="btn btn-primary">
            <span>Explore Collection</span>
          </button>
          <button className="btn">
            <span>Our Story</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
