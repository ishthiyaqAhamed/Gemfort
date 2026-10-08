'use client';

import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Globe2, Hammer } from 'lucide-react';
import styles from './ValueProps.module.css';

const values = [
  {
    icon: <Globe2 size={32} strokeWidth={1.5} />,
    title: 'Ethical Sourcing',
    description: 'We partner directly with artisanal miners, ensuring fair trade and sustainable practices at the source.'
  },
  {
    icon: <Hammer size={32} strokeWidth={1.5} />,
    title: 'Master Craftsmanship',
    description: 'Every gemstone is meticulously hand-cut by our master artisans to maximize brilliance and fire.'
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    title: 'GIA Certified',
    description: 'Our premium stones come with independent certification from the world’s most trusted laboratories.'
  },
  {
    icon: <Gem size={32} strokeWidth={1.5} />,
    title: 'Natural & Untreated',
    description: 'We specialize in entirely natural, unheated sapphires and rubies of the highest caliber.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ValueProps = () => {
  return (
    <section className={`section ${styles.valuesSection}`}>
      <div className={`container`}>
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map((value, index) => (
            <motion.div key={index} className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                {value.icon}
              </div>
              <h3 className={styles.title}>{value.title}</h3>
              <p className={styles.description}>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProps;
