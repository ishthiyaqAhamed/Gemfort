'use client';

import { motion } from 'framer-motion';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
}

const PageHeader = ({ title, subtitle, imagePath }: PageHeaderProps) => {
  return (
    <div 
      className={styles.header} 
      style={imagePath ? { 
        backgroundImage: `linear-gradient(rgba(251, 250, 246, 0.9), rgba(251, 250, 246, 0.95)), url(${imagePath})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      } : {}}
    >
      <div className={`container ${styles.content}`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.subtitle}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
