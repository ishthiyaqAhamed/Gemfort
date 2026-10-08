'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import styles from './product.module.css';

const allStones = [
  { id: 1, name: 'Royal Blue Sapphire', type: 'Sapphire', weight: '3.45 ct', img: '/images/guide/blue-sapphire.png', priceUSD: 4250, desc: 'A stunning unheated Royal Blue Sapphire sourced directly from the mines of Ratnapura, Sri Lanka. This stone exhibits an intense, velvety blue hue characteristic of top-tier Ceylon sapphires.' },
  { id: 2, name: 'Pigeon Blood Ruby', type: 'Ruby', weight: '2.10 ct', img: '/images/guide/ruby.png', priceUSD: 6800, desc: 'An exceptional Pigeon Blood Ruby from Mozambique. With excellent clarity and a vibrant, saturated red color, this is a perfect centerpiece for a high-end engagement ring or investment piece.' },
  { id: 3, name: 'Sunset Padparadscha', type: 'Padparadscha', weight: '1.85 ct', img: '/images/guide/padparadscha.png', priceUSD: 8500, desc: 'A rare Padparadscha Sapphire displaying the perfect balance of pink and orange, reminiscent of a tropical sunset. Certified unheated and exceptionally clean.' },
  { id: 4, name: 'Vivid Pink Sapphire', type: 'Sapphire', weight: '4.20 ct', img: '/images/guide/pink-sapphire.png', priceUSD: 3900, desc: 'A large, eye-clean Vivid Pink Sapphire with a brilliant step-cut. It flashes with bright magenta tones under all lighting conditions.' },
  { id: 5, name: 'Color Change Alexandrite', type: 'Alexandrite', weight: '1.50 ct', img: '/images/guide/alexandrite.png', priceUSD: 12000, desc: 'A mesmerizing Alexandrite with a strong color change from teal-green in daylight to purplish-red under incandescent light. Highly sought after by collectors.' },
  { id: 6, name: 'Golden Yellow Sapphire', type: 'Sapphire', weight: '5.10 ct', img: '/images/guide/yellow-sapphire.png', priceUSD: 3200, desc: 'A massive, completely clean Yellow Sapphire with a bright, sunny golden hue. Excellent brilliance and a master precision cut.' },
  { id: 7, name: 'Cornflower Blue Sapphire', type: 'Sapphire', weight: '2.80 ct', img: '/images/guide/blue-sapphire.png', priceUSD: 3800, desc: 'A highly desirable Cornflower Blue Sapphire with a soft, silky glow. Unheated and accompanied by a full gemological report.' },
  { id: 8, name: 'Neon Spinel', type: 'Spinel', weight: '3.05 ct', img: '/images/guide/spinel.png', priceUSD: 2100, desc: 'A vibrant, neon-pink Spinel from Mahenge, Tanzania. Known for its incredible fluorescence and high refractive index, this stone is a sparkler.' },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { formatPrice } = useCurrency();
  const resolvedParams = React.use(params);
  const stoneId = parseInt(resolvedParams.id);
  const stone = allStones.find(s => s.id === stoneId) || allStones[0];

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the following gemstone:\n\nRef No: GEM-${stone.id.toString().padStart(3, '0')}\nName: ${stone.name}\nWeight: ${stone.weight}\nType/Color: ${stone.type}`
  );

  return (
    <main>
      <section className={styles.section}>
        <div className="container">

          <Link href="/gemstones" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Inventory
          </Link>

          <div className={styles.grid}>

            {/* Image */}
            <div className={styles.imageCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={stone.img}
                  alt={stone.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Details */}
            <div className={styles.details}>
              <p className={styles.ref}>Ref: GEM-{stone.id.toString().padStart(3, '0')}</p>

              <h1 className={styles.name}>{stone.name}</h1>

              <p className={styles.price}>{formatPrice(stone.priceUSD)}</p>

              <div className={styles.divider} />

              <p className={styles.description}>{stone.desc}</p>

              <div className={styles.specGrid}>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Carat Weight</p>
                  <p className={styles.specValue}>{stone.weight}</p>
                </div>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Gem Type</p>
                  <p className={styles.specValue}>Natural {stone.type}</p>
                </div>
              </div>

              <ul className={styles.checklist}>
                <li className={styles.checkItem}>
                  <CheckCircle2 size={18} color="var(--text-accent)" />
                  100% Natural &amp; Ethically Sourced
                </li>
                <li className={styles.checkItem}>
                  <CheckCircle2 size={18} color="var(--text-accent)" />
                  Independent Gemological Certificate Included
                </li>
                <li className={styles.checkItem}>
                  <CheckCircle2 size={18} color="var(--text-accent)" />
                  Secure Worldwide Shipping
                </li>
              </ul>

              <div className={styles.actions}>
                <a
                  href={`https://wa.me/17738850603?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsappBtn}
                >
                  <MessageCircle size={20} />
                  Inquire via WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
