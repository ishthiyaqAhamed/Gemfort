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
  const [stones, setStones] = useState<Gemstone[]>([]);
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

        if (gemRes.ok && gemData.success && gemData.data) {
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
              <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#002147', fontWeight: 600 }}>
                {stones.length === 0 ? 'No Gemstones in Vault' : 'No gemstones match your criteria.'}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem', maxWidth: '460px', margin: '0 auto 1.5rem' }}>
                {stones.length === 0 
                  ? 'Your vault inventory is currently empty. Add your natural certified gemstones from the admin dashboard.' 
                  : 'Try selecting another gemstone category or clearing your search query.'}
              </p>
              {stones.length === 0 ? (
                <Link
                  href="/admin/dashboard/inventory"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '10px 22px',
                    backgroundColor: '#002147',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(0, 33, 71, 0.15)',
                  }}
                >
                  Add Gemstones in Admin &rarr;
                </Link>
              ) : (
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
              )}
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
