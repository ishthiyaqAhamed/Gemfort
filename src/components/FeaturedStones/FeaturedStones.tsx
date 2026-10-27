'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './FeaturedStones.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface FeaturedStone {
  id: string | number;
  slug?: string;
  name: string;
  weight?: string | number;
  origin?: string;
  image?: string;
  images?: string[];
  priceUSD?: number;
  price?: number;
  glow?: string;
  badge?: string;
}

const initialStones: FeaturedStone[] = [
  {
    id: 1,
    slug: 'royal-blue-sapphire-3-45ct',
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
    slug: 'sunset-padparadscha-1-85ct',
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
    slug: 'pigeon-blood-ruby-2-10ct',
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
    slug: 'vivid-pink-sapphire-4-20ct',
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
    slug: 'golden-yellow-sapphire-5-10ct',
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
    slug: 'color-change-alexandrite-1-50ct',
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
  const [stones, setStones] = useState<FeaturedStone[]>(initialStones);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch('/api/gemstones');
        const data = await res.json();
        if (res.ok && data.success && data.data?.length > 0) {
          // Take first 6 stones from database
          const mapped = data.data.slice(0, 6).map((item: any, idx: number) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            weight: typeof item.weight === 'number' ? `${item.weight} ct` : item.weight,
            origin: item.origin || 'Ceylon, Sri Lanka',
            image: item.images?.[0] || initialStones[idx % initialStones.length]?.image || '/images/guide/blue-sapphire.png',
            priceUSD: item.price || 0,
            glow: initialStones[idx % initialStones.length]?.glow || 'rgba(199, 164, 80, 0.35)',
            badge: item.treatment?.includes('Unheated') ? 'Unheated' : 'Natural',
          }));
          setStones(mapped);
        }
      } catch (err) {
        console.error('Failed to load featured stones from API:', err);
      }
    }
    loadFeatured();
  }, []);

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
          {stones.map((stone, index) => {
            const stoneHref = `/gemstones/${stone.slug || stone.id}`;
            const displayImage = stone.image || '/images/guide/blue-sapphire.png';
            const price = stone.priceUSD ?? stone.price ?? 0;

            return (
              <motion.div
                key={String(stone.id)}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 * (index % 3) }}
              >
                <Link href={stoneHref} className={styles.cardLink}>
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <div 
                        className={styles.glow} 
                        style={{ backgroundColor: stone.glow || 'rgba(199, 164, 80, 0.35)' }} 
                      />
                      <Image
                        src={displayImage}
                        alt={stone.name}
                        fill
                        sizes="(max-width: 600px) 45vw, (max-width: 1024px) 33vw, 380px"
                        className={styles.image}
                        unoptimized={displayImage.startsWith('data:')}
                      />

                    </div>

                    <div className={styles.cardInfo}>
                      <div className={styles.originMeta}>
                        <span className={styles.origin}>{stone.origin}</span>
                      </div>

                      <h3 className={styles.stoneName}>{stone.name}</h3>

                      <div className={styles.cardFooter}>
                        <span className={styles.price}>{price > 0 ? formatPrice(price) : 'Inquire'}</span>
                        <span className={styles.viewAction}>
                          View Details <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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
