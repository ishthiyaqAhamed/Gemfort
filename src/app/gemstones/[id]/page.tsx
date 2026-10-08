'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MessageCircle, 
  Award, 
  Sparkles, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Video,
  Share2
} from 'lucide-react';
import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import styles from './product.module.css';

interface GemstoneData {
  id: number;
  name: string;
  type: string;
  weight: string;
  img: string;
  priceUSD: number;
  desc: string;
  shape: string;
  colorGrade: string;
  clarity: string;
  treatment: string;
  origin: string;
  certNumber: string;
  dimensions: string;
  glowColor: string;
}

const allStones: GemstoneData[] = [
  { 
    id: 1, 
    name: 'Royal Blue Sapphire', 
    type: 'Sapphire', 
    weight: '3.45 ct', 
    img: '/images/guide/blue-sapphire.png', 
    priceUSD: 4250, 
    desc: 'An exceptional unheated Royal Blue Sapphire of peerless Ceylon provenance. Sourced directly from the artisanal gravels of Ratnapura, Sri Lanka. This collector stone showcases a deep, velvety cornflower-to-royal hue with remarkable transparency and vivid natural scintillation.',
    shape: 'Cushion Mixed Cut',
    colorGrade: 'Royal Blue (Vivid)',
    clarity: 'Eye-Clean (VVS)',
    treatment: '100% Unheated & Untreated',
    origin: 'Ratnapura, Sri Lanka',
    certNumber: 'GRS-2024-88419',
    dimensions: '9.42 × 7.85 × 5.30 mm',
    glowColor: 'rgba(28, 93, 230, 0.45)'
  },
  { 
    id: 2, 
    name: 'Pigeon Blood Ruby', 
    type: 'Ruby', 
    weight: '2.10 ct', 
    img: '/images/guide/ruby.png', 
    priceUSD: 6800, 
    desc: 'An ultra-rare Pigeon Blood Ruby with mesmerizing fire and supreme crystalline purity. Exhibits the coveted incandescent crimson fluorescence under direct light, signifying the finest unheated corundum specimen.',
    shape: 'Cushion Step Cut',
    colorGrade: 'Pigeon Blood Red',
    clarity: 'Exceptional (VS+)',
    treatment: 'Unheated (Certified Natural)',
    origin: 'Montepuez, Mozambique',
    certNumber: 'GIA-2024-54109',
    dimensions: '7.80 × 6.95 × 4.22 mm',
    glowColor: 'rgba(230, 32, 68, 0.45)'
  },
  { 
    id: 3, 
    name: 'Sunset Padparadscha', 
    type: 'Padparadscha', 
    weight: '1.85 ct', 
    img: '/images/guide/padparadscha.png', 
    priceUSD: 8500, 
    desc: 'The pinnacle of Ceylon gemstones — a sovereign Padparadscha Sapphire manifesting the delicate harmony of lotus petal pink and tropical orange sunset. Certified completely unheated with superb optical clarity.',
    shape: 'Oval Brilliant Cut',
    colorGrade: 'Sunset Pink-Orange',
    clarity: 'Eye-Clean (VVS)',
    treatment: '100% Natural & Untreated',
    origin: 'Balangoda, Sri Lanka',
    certNumber: 'GRS-2024-91024',
    dimensions: '8.12 × 6.45 × 4.10 mm',
    glowColor: 'rgba(245, 120, 80, 0.45)'
  },
  { 
    id: 4, 
    name: 'Vivid Pink Sapphire', 
    type: 'Sapphire', 
    weight: '4.20 ct', 
    img: '/images/guide/pink-sapphire.png', 
    priceUSD: 3900, 
    desc: 'An eye-clean, vibrant Pink Sapphire radiating intense magenta brilliance. Masterfully faceted with precision symmetry to accentuate its high luster and dazzling electric luster.',
    shape: 'Cushion Mixed Cut',
    colorGrade: 'Vivid Neon Pink',
    clarity: 'Eye-Clean (VVS)',
    treatment: 'Unheated Natural',
    origin: 'Ratnapura, Sri Lanka',
    certNumber: 'GIA-2024-77192',
    dimensions: '10.15 × 8.40 × 5.60 mm',
    glowColor: 'rgba(238, 77, 160, 0.45)'
  },
  { 
    id: 5, 
    name: 'Color Change Alexandrite', 
    type: 'Alexandrite', 
    weight: '1.50 ct', 
    img: '/images/guide/alexandrite.png', 
    priceUSD: 12000, 
    desc: 'An imperial Chrysoberyl Alexandrite possessing a phenomenal 100% color change from lush teal-emerald in daylight to regal raspberry-purple under incandescent light. Investment grade rarity.',
    shape: 'Oval Modified Brilliant',
    colorGrade: 'Teal Green to Purple Red',
    clarity: 'Eye-Clean (VS)',
    treatment: 'No Enhancement (100% Natural)',
    origin: 'Minas Gerais, Brazil',
    certNumber: 'GÜBELIN-2024-3019',
    dimensions: '7.40 × 5.85 × 3.90 mm',
    glowColor: 'rgba(56, 182, 160, 0.45)'
  },
  { 
    id: 6, 
    name: 'Golden Yellow Sapphire', 
    type: 'Sapphire', 
    weight: '5.10 ct', 
    img: '/images/guide/yellow-sapphire.png', 
    priceUSD: 3200, 
    desc: 'A magnificent, pure canary yellow sapphire exhibiting warm honey sunshine facets. Flawless crystal body with excellent depth and unheated pedigree.',
    shape: 'Radiant Step Cut',
    colorGrade: 'Canary Golden Yellow',
    clarity: 'Flawless / Loupe Clean',
    treatment: 'Unheated & Untreated',
    origin: 'Ratnapura, Sri Lanka',
    certNumber: 'GRS-2024-60142',
    dimensions: '11.02 × 8.90 × 5.80 mm',
    glowColor: 'rgba(240, 190, 50, 0.45)'
  },
  { 
    id: 7, 
    name: 'Cornflower Blue Sapphire', 
    type: 'Sapphire', 
    weight: '2.80 ct', 
    img: '/images/guide/blue-sapphire.png', 
    priceUSD: 3800, 
    desc: 'Classic velvety Cornflower Blue Ceylon Sapphire with soft inner glow and exceptional silk refraction. Completely unheated, accompanied by full laboratory dossier.',
    shape: 'Cushion Mixed Cut',
    colorGrade: 'Cornflower Blue',
    clarity: 'Eye-Clean (VVS)',
    treatment: '100% Unheated',
    origin: 'Elahera, Sri Lanka',
    certNumber: 'GRS-2024-73911',
    dimensions: '8.75 × 7.20 × 4.95 mm',
    glowColor: 'rgba(65, 120, 245, 0.45)'
  },
  { 
    id: 8, 
    name: 'Neon Spinel', 
    type: 'Spinel', 
    weight: '3.05 ct', 
    img: '/images/guide/spinel.png', 
    priceUSD: 2100, 
    desc: 'A fiery, fluorescent hot neon pink Spinel originating from the renowned deposits of Mahenge. Boasts an extraordinarily high refractive index and crystalline brilliance.',
    shape: 'Cushion Brilliant',
    colorGrade: 'Electric Hot Pink',
    clarity: 'Eye-Clean (VVS)',
    treatment: 'Natural (No Treatments Known)',
    origin: 'Mahenge, Tanzania',
    certNumber: 'GIA-2024-41908',
    dimensions: '8.90 × 7.45 × 5.10 mm',
    glowColor: 'rgba(255, 60, 140, 0.45)'
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { formatPrice } = useCurrency();
  const resolvedParams = React.use(params);
  const stoneId = parseInt(resolvedParams.id);
  const stone = allStones.find(s => s.id === stoneId) || allStones[0];
  const [copied, setCopied] = useState(false);

  const formattedPrice = formatPrice(stone.priceUSD);

  const whatsappInquiryUrl = `https://wa.me/17738850603?text=${encodeURIComponent(
    `Hello Gemfort Concierge,\n\nI am inquiring about an acquisition from your private vault:\n\n• Ref ID: GEM-${stone.id.toString().padStart(3, '0')}\n• Gemstone: ${stone.name}\n• Carat: ${stone.weight}\n• Origin: ${stone.origin}\n• Price: ${formattedPrice}\n• Certificate: ${stone.certNumber}\n\nPlease share the high-resolution gemological dossier and arrange a private consultation.`
  )}`;

  const whatsappVideoUrl = `https://wa.me/17738850603?text=${encodeURIComponent(
    `Hello Gemfort Concierge, please send me the 360° Macro 4K video inspection and certificate photos for GEM-${stone.id.toString().padStart(3, '0')} (${stone.name}, ${stone.weight}).`
  )}`;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main>
      <section className={styles.section}>
        <div className="container" style={{ maxWidth: '1320px' }}>

          {/* Top Bar Navigation */}
          <div className={styles.topBar}>
            <Link href="/gemstones" className={styles.backLink}>
              <ArrowLeft size={15} /> Back to Vault
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={styles.vaultTag}>
                <Sparkles size={12} /> Private Collection
              </span>
              <button 
                onClick={handleShare}
                aria-label="Share Gemstone Dossier"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(199, 164, 80, 0.25)',
                  color: copied ? '#9fe2bf' : '#c7a450',
                  padding: '0.45rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>

          <div className={styles.grid}>

            {/* Gemstone Showcase Stage */}
            <div className={styles.stageCard}>
              <div className={styles.stageBadges}>
                <span className={styles.naturalPill}>
                  <Award size={12} /> 100% Unheated
                </span>
                <span className={styles.certPill}>
                  <ShieldCheck size={12} /> Certified Natural
                </span>
              </div>

              <div className={styles.imageWrapper}>
                {/* Ambient gemstone glow */}
                <div 
                  className={styles.gemAura} 
                  style={{ backgroundColor: stone.glowColor }} 
                />
                <div className={styles.pedestalGlow} />

                <Image
                  src={stone.img}
                  alt={stone.name}
                  fill
                  priority
                  className={styles.stoneImage}
                  sizes="(max-width: 768px) 90vw, 450px"
                />
              </div>

              <div className={styles.stageFooter}>
                <span>Provenience: {stone.origin}</span>
                <span className={styles.inspectHint}>
                  <Sparkles size={13} /> Studio Macro 4K
                </span>
              </div>
            </div>

            {/* Dossier & Specifications */}
            <div className={styles.details}>
              
              <div className={styles.headerMeta}>
                <span className={styles.refTag}>Ref: GEM-{stone.id.toString().padStart(3, '0')}</span>
                <span className={styles.statusDot}>
                  <span className={styles.dot} /> Available in Vault
                </span>
              </div>

              <h1 className={styles.name}>{stone.name}</h1>

              <div className={styles.priceBlock}>
                <span className={styles.price}>{formattedPrice}</span>
                <span className={styles.deliveryNote}>• Worldwide Insured Courier Included</span>
              </div>

              <div className={styles.divider} />

              <p className={styles.description}>{stone.desc}</p>

              {/* Gemological Appraisal Dossier */}
              <div className={styles.dossierTitle}>
                <Award size={14} /> Gemological Appraisal Dossier
              </div>

              <div className={styles.specGrid}>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Carat Weight</p>
                  <p className={styles.specValue}>{stone.weight}</p>
                </div>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Cut &amp; Shape</p>
                  <p className={styles.specValue}>{stone.shape}</p>
                </div>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Color Grade</p>
                  <p className={styles.specValue}>{stone.colorGrade}</p>
                </div>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Clarity</p>
                  <p className={styles.specValue}>{stone.clarity}</p>
                </div>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Treatment</p>
                  <p className={styles.specValue}>{stone.treatment}</p>
                </div>
                <div className={styles.specCard}>
                  <p className={styles.specLabel}>Origin</p>
                  <p className={styles.specValue}>{stone.origin}</p>
                </div>
              </div>

              {/* Certificate Verification Card */}
              <div className={styles.certCard}>
                <div className={styles.certIconWrap}>
                  <FileText size={22} />
                </div>
                <div className={styles.certInfo}>
                  <p className={styles.certTitle}>Laboratory Certificate: {stone.certNumber}</p>
                  <p className={styles.certSubtitle}>
                    Accompanied by an independent physical master gemological report certifying authentic untreated origin.
                  </p>
                </div>
              </div>

              {/* VIP Privileges */}
              <ul className={styles.privileges}>
                <li className={styles.privilegeItem}>
                  <ShieldCheck size={18} className={styles.privilegeIcon} />
                  <span><strong>Armored Global Delivery</strong> — Hand-delivered or insured via Malca-Amit / Brinks.</span>
                </li>
                <li className={styles.privilegeItem}>
                  <Lock size={18} className={styles.privilegeIcon} />
                  <span><strong>Private Viewing Suites</strong> — In-person inspection available in London, Geneva &amp; Colombo.</span>
                </li>
                <li className={styles.privilegeItem}>
                  <CheckCircle2 size={18} className={styles.privilegeIcon} />
                  <span><strong>Lifetime Provenance Guarantee</strong> — Guaranteed 100% natural and ethically mined.</span>
                </li>
              </ul>

              {/* In-Page Action Buttons */}
              <div className={styles.actions}>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.vipWhatsappBtn}
                >
                  <MessageCircle size={22} />
                  <span>Inquire via VIP WhatsApp Concierge</span>
                </a>

                <a
                  href={whatsappVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryActionBtn}
                >
                  <Video size={18} />
                  <span>Request 360° Macro 4K Video</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE VIP CONCIERGE DOCK ──────────────────────── */}
      <aside className={styles.stickyBar}>
        <div className={styles.stickyPriceCol}>
          <span className={styles.stickyLabel}>Private Vault</span>
          <span className={styles.stickyPrice}>{formattedPrice}</span>
          <span className={styles.stickyWeight}>{stone.weight} • {stone.shape}</span>
        </div>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.stickyBtn}
        >
          <span className={styles.onlineIndicator} />
          <MessageCircle size={18} />
          <span>VIP Inquire</span>
        </a>
      </aside>
    </main>
  );
}
