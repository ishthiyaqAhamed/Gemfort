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
  Share2,
  Mail,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import styles from './product.module.css';

interface GemstoneData {
  id: string | number;
  name: string;
  slug?: string;
  type: string;
  weight: string;
  img: string;
  images?: string[];
  video?: string | null;
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

const fallbackStones: GemstoneData[] = [
  {
    id: 1,
    slug: 'royal-blue-sapphire-3-45ct',
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
    slug: 'pigeon-blood-ruby-2-10ct',
    name: 'Pigeon Blood Ruby',
    type: 'Ruby',
    weight: '2.10 ct',
    img: '/images/guide/ruby.png',
    priceUSD: 6800,
    desc: 'An ultra-rare Pigeon Blood Ruby with mesmerizing fire and supreme crystalline purity. Exhibits the coveted incandescent crimson fluorescence under direct light, signifying the finest unheated corundum specimen.',
    shape: 'Cushion Step Cut',
    colorGrade: 'Pigeon Blood Red',
    clarity: 'Slightly Included (Natural Silk)',
    treatment: 'Unheated (Certified Natural)',
    origin: 'Montepuez, Mozambique',
    certNumber: 'GIA-2024-54109',
    dimensions: '7.80 × 6.95 × 4.60 mm',
    glowColor: 'rgba(230, 32, 68, 0.45)'
  },
  {
    id: 3,
    slug: 'sunset-padparadscha-1-85ct',
    name: 'Sunset Padparadscha',
    type: 'Padparadscha',
    weight: '1.85 ct',
    img: '/images/guide/padparadscha.png',
    priceUSD: 8500,
    desc: 'The pinnacle of Ceylon gemstones — a sovereign Padparadscha Sapphire manifesting the delicate harmony of lotus petal pink and tropical orange sunset. Certified completely unheated with superb optical clarity.',
    shape: 'Oval Brilliant Cut',
    colorGrade: 'Sunset Pink-Orange',
    clarity: 'Loupe Clean (VVS1)',
    treatment: '100% Natural & Untreated',
    origin: 'Balangoda, Sri Lanka',
    certNumber: 'GRS-2024-91024',
    dimensions: '8.10 × 6.20 × 4.15 mm',
    glowColor: 'rgba(245, 120, 80, 0.45)'
  },
  {
    id: 4,
    slug: 'vivid-pink-sapphire-4-20ct',
    name: 'Vivid Pink Sapphire',
    type: 'Sapphire',
    weight: '4.20 ct',
    img: '/images/guide/pink-sapphire.png',
    priceUSD: 3900,
    desc: 'An eye-clean, vibrant Pink Sapphire radiating intense magenta brilliance. Masterfully faceted with precision symmetry to accentuate its high luster and dazzling electric luster.',
    shape: 'Cushion Mixed Cut',
    colorGrade: 'Vivid Neon Pink',
    clarity: 'Eye-Clean (VS)',
    treatment: '100% Unheated & Untreated',
    origin: 'Ratnapura, Sri Lanka',
    certNumber: 'GIC-2024-11820',
    dimensions: '9.90 × 8.15 × 5.60 mm',
    glowColor: 'rgba(238, 77, 160, 0.45)'
  },
  {
    id: 5,
    slug: 'color-change-alexandrite-1-50ct',
    name: 'Color Change Alexandrite',
    type: 'Alexandrite',
    weight: '1.50 ct',
    img: '/images/guide/alexandrite.png',
    priceUSD: 12000,
    desc: 'Phenomenal natural Alexandrite displaying a dramatic 90% color shift from lush teal-green in natural daylight to radiant incandescent raspberry amethyst under evening halogen lighting.',
    shape: 'Round Brilliant Cut',
    colorGrade: 'Teal Green to Raspberry Red',
    clarity: 'Very Slightly Included',
    treatment: '100% Untreated Natural',
    origin: 'Minas Gerais, Brazil',
    certNumber: 'GÜBELIN-2024-3019',
    dimensions: '7.40 × 5.85 × 3.90 mm',
    glowColor: 'rgba(56, 182, 160, 0.45)'
  },
  {
    id: 6,
    slug: 'golden-yellow-sapphire-5-10ct',
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
    slug: 'cornflower-blue-sapphire-2-80ct',
    name: 'Cornflower Blue Sapphire',
    type: 'Sapphire',
    weight: '2.80 ct',
    img: '/images/guide/blue-sapphire.png',
    priceUSD: 3800,
    desc: 'Classic velvety Cornflower Blue Ceylon Sapphire with soft inner glow and exceptional silk refraction. Completely unheated, accompanied by full laboratory report & certification.',
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
    slug: 'neon-spinel-3-05ct',
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
  const rawId = resolvedParams.id;

  // Initial fallback
  const numericId = parseInt(rawId);
  const initialFallback = fallbackStones.find(s => s.id === numericId || s.slug === rawId) || fallbackStones[0];
  const [stone, setStone] = useState<GemstoneData>(initialFallback);
  const [copied, setCopied] = useState(false);

  // Inquiry modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchGemstone() {
      try {
        const res = await fetch(`/api/gemstones/${rawId}`);
        const data = await res.json();
        if (res.ok && data.success && data.data) {
          const item = data.data;
          setStone({
            id: item.id,
            slug: item.slug,
            name: item.name,
            type: item.category?.name || 'Precious Gemstone',
            weight: typeof item.weight === 'number' ? `${item.weight} ct` : (item.weight || 'Carat on request'),
            img: item.images?.[0] || initialFallback.img,
            images: item.images || [initialFallback.img],
            video: item.video || null,
            priceUSD: item.price || 0,
            desc: item.description || initialFallback.desc,
            shape: item.shape || 'Faceted Precision Cut',
            colorGrade: item.color || 'Vivid Ceylon Hue',
            clarity: 'Eye-Clean / Fine Gem Quality',
            treatment: item.treatment || '100% Unheated & Untreated Natural',
            origin: item.origin || 'Ceylon, Sri Lanka',
            certNumber: item.certificate || 'GRS / GIA Laboratory Certified',
            dimensions: 'Calibrated Precision Faceting',
            glowColor: initialFallback.glowColor || 'rgba(199, 164, 80, 0.4)',
          });
        }
      } catch (e) {
        console.error('Error fetching live stone:', e);
      }
    }
    fetchGemstone();
  }, [rawId]);

  const formattedPrice = stone.priceUSD > 0 ? formatPrice(stone.priceUSD) : 'Price on Inquiry';

  const whatsappInquiryUrl = `https://wa.me/17738850603?text=${encodeURIComponent(
    `Hello Gemfort International,\n\nI am inquiring about an acquisition from your private vault:\n\n• Ref ID: ${stone.id}\n• Gemstone: ${stone.name}\n• Carat: ${stone.weight}\n• Origin: ${stone.origin}\n• Price: ${formattedPrice}\n• Certificate: ${stone.certNumber}\n\nPlease share the high-resolution gemological report and arrange a private consultation.`
  )}`;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) {
      setInquiryStatus({ type: 'error', text: 'Please enter your name and email address.' });
      return;
    }
    setSubmitting(true);
    setInquiryStatus(null);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName.trim(),
          email: inquiryEmail.trim(),
          phone: inquiryPhone.trim() || null,
          message: inquiryMessage.trim() || `Inquiry for gemstone: ${stone.name} (${stone.weight})`,
          gemstoneId: String(stone.id),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiryStatus({
          type: 'success',
          text: `Thank you! Your private acquisition inquiry for ${stone.name} has been received. Our gemological concierge will contact you shortly.`,
        });
        setInquiryName('');
        setInquiryEmail('');
        setInquiryPhone('');
        setInquiryMessage('');
      } else {
        setInquiryStatus({ type: 'error', text: data.error || 'Failed to submit inquiry. Please try again.' });
      }
    } catch {
      setInquiryStatus({ type: 'error', text: 'Network error. Please try again or connect via WhatsApp.' });
    } finally {
      setSubmitting(false);
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
                aria-label="Share Gemstone Details"
                className={`${styles.shareBtn} ${copied ? styles.shareBtnCopied : ''}`}
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

                <Image
                  src={stone.img}
                  alt={stone.name}
                  fill
                  priority
                  className={styles.mainImage}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>

              <div className={styles.stageFooter}>
                <p className={styles.inspectionNote}>
                  Inspected under 10x achromatic darkfield illumination in Beruwala, Sri Lanka.
                </p>
              </div>
            </div>

            {/* Dossier Specifications Panel */}
            <div className={styles.dossierCard}>

              <div className={styles.headingBlock}>
                <span className={styles.gemType}>{stone.type}</span>
                <h1 className={styles.title}>{stone.name}</h1>
                <p className={styles.originSubtitle}>{stone.origin}</p>
              </div>

              {/* Price Banner */}
              <div className={styles.priceBanner}>
                <div>
                  <p className={styles.priceMeta}>Private Vault Valuation</p>
                  <p className={styles.priceVal}>{formattedPrice}</p>
                </div>
                <div className={styles.availabilityPill}>
                  <span className={styles.pulseDot} />
                  <span>Vault Available</span>
                </div>
              </div>

              {/* Gemological Description */}
              <p className={styles.narrative}>{stone.desc}</p>

              {/* Gemological Specs Grid */}
              <div className={styles.specsGrid}>
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

              {/* Privileges */}
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
              <div className={styles.actions} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.WhatsappBtn}
                >
                  <MessageCircle size={20} />
                  <span>Inquire via WhatsApp<span className={styles.conciergeText}> Concierge</span></span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    backgroundColor: '#ffffff',
                    color: '#002147',
                    border: '1px solid rgba(199, 164, 80, 0.4)',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 33, 71, 0.04)',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#c7a450'; e.currentTarget.style.backgroundColor = '#faf8f2'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(199, 164, 80, 0.4)'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
                >
                  <Mail size={18} color="#c7a450" />
                  <span>Submit Private Acquisition Inquiry</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── MODAL FOR DIRECT ACQUISITION INQUIRY ──────────────────────── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 20, 45, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '540px',
            padding: '2rem',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 33, 71, 0.25)',
            border: '1px solid rgba(199, 164, 80, 0.3)',
          }}>
            <button
              onClick={() => { setIsModalOpen(false); setInquiryStatus(null); }}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', color: '#002147', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
              Private Vault Inquiry
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Inquiring for: <strong>{stone.name}</strong> ({stone.weight})
            </p>

            {inquiryStatus && (
              <div style={{
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: inquiryStatus.type === 'success' ? '#ecfdf5' : '#fef2f2',
                color: inquiryStatus.type === 'success' ? '#065f46' : '#991b1b',
                border: `1px solid ${inquiryStatus.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
                fontSize: '0.88rem',
              }}>
                {inquiryStatus.type === 'success' ? <CheckCircle2 size={18} color="#059669" /> : <AlertCircle size={18} color="#dc2626" />}
                <span>{inquiryStatus.text}</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Roosevelt"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Inquiry Message or Specific Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Request certification report, schedule a private suite viewing, or discuss bespoke setting options..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.92rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    padding: '11px',
                    backgroundColor: '#c7a450',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  <span>{submitting ? 'Submitting...' : 'Send Inquiry to Concierge'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '11px 18px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── STICKY MOBILE CONCIERGE DOCK ──────────────────────── */}
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
          <span> Inquire</span>
        </a>
      </aside>
    </main>
  );
}
