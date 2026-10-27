'use client';

import { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';
import styles from './gemstones.module.css';
import { useCurrency } from '@/context/CurrencyContext';

interface Gemstone {
  id: string | number;
  name: string;
  slug?: string;
  type?: string;
  weight?: number | string;
  price?: number;
  priceUSD?: number;
  images?: string[];
  img?: string;
  category?: { name: string; slug: string };
  status?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const fallbackStones: Gemstone[] = [
  { id: 1, name: 'Royal Blue Sapphire', slug: 'royal-blue-sapphire-3-45ct', type: 'Sapphire', weight: '3.45 ct', img: '/images/guide/blue-sapphire.png', priceUSD: 4250 },
  { id: 2, name: 'Pigeon Blood Ruby', slug: 'pigeon-blood-ruby-2-10ct', type: 'Ruby', weight: '2.10 ct', img: '/images/guide/ruby.png', priceUSD: 6800 },
  { id: 3, name: 'Sunset Padparadscha', slug: 'sunset-padparadscha-1-85ct', type: 'Padparadscha', weight: '1.85 ct', img: '/images/guide/padparadscha.png', priceUSD: 8500 },
  { id: 4, name: 'Vivid Pink Sapphire', slug: 'vivid-pink-sapphire-4-20ct', type: 'Sapphire', weight: '4.20 ct', img: '/images/guide/pink-sapphire.png', priceUSD: 3900 },
  { id: 5, name: 'Color Change Alexandrite', slug: 'color-change-alexandrite-1-50ct', type: 'Alexandrite', weight: '1.50 ct', img: '/images/guide/alexandrite.png', priceUSD: 12000 },
  { id: 6, name: 'Golden Yellow Sapphire', slug: 'golden-yellow-sapphire-5-10ct', type: 'Sapphire', weight: '5.10 ct', img: '/images/guide/yellow-sapphire.png', priceUSD: 3200 },
  { id: 7, name: 'Cornflower Blue Sapphire', slug: 'cornflower-blue-sapphire-2-80ct', type: 'Sapphire', weight: '2.80 ct', img: '/images/guide/blue-sapphire.png', priceUSD: 3800 },
  { id: 8, name: 'Neon Spinel', slug: 'neon-spinel-3-05ct', type: 'Spinel', weight: '3.05 ct', img: '/images/guide/spinel.png', priceUSD: 2100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function GemstonesPage() {
  const { formatPrice } = useCurrency();
  const [stones, setStones] = useState<Gemstone[]>(fallbackStones);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [gemRes, catRes] = await Promise.all([
          fetch('/api/gemstones'),
          fetch('/api/categories'),
        ]);

        const gemData = await gemRes.json();
        const catData = await catRes.json();

        if (gemRes.ok && gemData.success && gemData.data?.length > 0) {
          setStones(gemData.data);
        }

        if (catRes.ok && catData.success && catData.data?.length > 0) {
          setCategories(catData.data);
        }
      } catch (err) {
        console.error('Failed to load gemstones from backend:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredStones = useMemo(() => {
    return stones
      .filter((stone) => {
        // Category filter
        if (selectedCategory !== 'ALL') {
          const catName = stone.category?.name || stone.type || '';
          const catSlug = stone.category?.slug || '';
          if (
            catName.toLowerCase() !== selectedCategory.toLowerCase() &&
            catSlug.toLowerCase() !== selectedCategory.toLowerCase()
          ) {
            return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = stone.name?.toLowerCase().includes(q);
          const matchType = (stone.type || stone.category?.name || '').toLowerCase().includes(q);
          if (!matchName && !matchType) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.price ?? a.priceUSD ?? 0;
        const priceB = b.price ?? b.priceUSD ?? 0;
        const weightA = typeof a.weight === 'number' ? a.weight : parseFloat(String(a.weight || '0'));
        const weightB = typeof b.weight === 'number' ? b.weight : parseFloat(String(b.weight || '0'));

        if (sortOption === 'price-desc') return priceB - priceA;
        if (sortOption === 'price-asc') return priceA - priceB;
        if (sortOption === 'carat-desc') return weightB - weightA;
        return 0; // featured / default
      });
  }, [stones, selectedCategory, sortOption, searchQuery]);

  return (
    <main>
      <PageHeader 
        title="Inventory" 
        subtitle="Ethically Sourced Natural Gemstones from Ceylon" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section" style={{ background: 'linear-gradient(180deg, #fcfbf8 0%, #f7f5ef 100%)', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div className={styles.filterBar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <p className={styles.filterCount}>
                Showing {filteredStones.length} {filteredStones.length === 1 ? 'gemstone' : 'gemstones'}
              </p>
              {loading && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#937326', fontSize: '0.82rem', fontWeight: 600 }}>
                  <Loader2 size={14} className="animate-spin" /> Syncing vault...
                </span>
              )}
            </div>

            <div className={styles.filterControls}>
              {/* Search input */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', color: '#64748b', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search stones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    minWidth: '170px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                />
              </div>

              {/* Category select */}
              <select
                className={styles.filterSelect}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Sapphires">Sapphires</option>
                    <option value="Rubies">Rubies</option>
                    <option value="Padparadscha">Padparadscha</option>
                    <option value="Alexandrite">Alexandrite</option>
                    <option value="Spinels">Spinels</option>
                  </>
                )}
              </select>

              {/* Sort select */}
              <select
                className={styles.filterSelect}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="carat-desc">Carat: High to Low</option>
              </select>
            </div>
          </div>

          {filteredStones.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 1rem', color: '#64748b' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#002147', fontWeight: 600 }}>No gemstones match your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                style={{
                  padding: '9px 20px',
                  backgroundColor: '#002147',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 33, 71, 0.15)',
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div 
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredStones.map((stone) => {
                const targetUrl = `/gemstones/${stone.slug || stone.id}`;
                const displayImage = stone.images?.[0] || stone.img || '/images/guide/blue-sapphire.png';
                const displayType = stone.category?.name || stone.type || 'Ceylon Gemstone';
                const displayWeight = typeof stone.weight === 'number' ? `${stone.weight} ct` : (stone.weight || 'Carat on request');
                const displayPrice = stone.price ?? stone.priceUSD ?? 0;

                return (
                  <motion.div 
                    key={String(stone.id)} 
                    variants={itemVariants}
                  >
                    <Link href={targetUrl} style={{ textDecoration: 'none' }}>
                      <div className={styles.card}>
                        <div className={styles.imageWrapper}>
                          <Image 
                            src={displayImage} 
                            alt={stone.name} 
                            fill 
                            className={styles.stoneImg}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized={displayImage.startsWith('data:')}
                          />

                        </div>
                        
                        <div className={styles.cardDetails}>
                          <p className={styles.stoneType}>
                            {displayType} • {displayWeight}
                          </p>
                          
                          <h3 className={styles.stoneName}>
                            {stone.name}
                          </h3>

                          <div className={styles.stoneMeta}>
                            <span className={styles.stonePrice}>
                              {displayPrice > 0 ? formatPrice(displayPrice) : 'Price on Inquiry'}
                            </span>
                          </div>
                          
                          <button className={styles.actionBtn}>
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

        </div>
      </section>
    </main>
  );
}
