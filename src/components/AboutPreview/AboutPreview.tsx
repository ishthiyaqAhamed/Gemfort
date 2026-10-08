'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './AboutPreview.module.css';

const AboutPreview = () => {
  return (
    <section className={`section ${styles.aboutSection}`}>
      <div className={`container ${styles.grid}`}>
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/images/masters-of-rough.jpg"
            alt="Master Jeweler examining rough gemstone"
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </motion.div>
        
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className={styles.subtitle}>The Gemfort Legacy</h4>
          <h2 className={styles.title}>Masters of Rough to Radiance</h2>
          <p className={styles.paragraph}>
            For over three decades, Gemfort International has built a reputation on uncompromising quality and ethical sourcing. Our master gem cutters in Sri Lanka bring generations of expertise to every facet, unlocking the true brilliance hidden within natural rough stones.
          </p>
          <p className={styles.paragraph}>
            From the deep mines of Madagascar to the legendary ruby pits of Burma, we traverse the globe to bring the world's most magnificent, untreated gemstones directly to luxury jewelers and discerning collectors.
          </p>
          <Link href="/about" className={`btn btn-primary ${styles.btn}`}>
            <span>Discover Our Story</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
