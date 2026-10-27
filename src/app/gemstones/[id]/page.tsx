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
  AlertCircle,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { formatPrice } = useCurrency();
  const resolvedParams = React.use(params);
  const rawId = resolvedParams.id;

  const [stone, setStone] = useState<GemstoneData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const shareContainerRef = useRef<HTMLDivElement>(null);

  // Initialize current URL and detect native share support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        setHasNativeShare(true);
      }
    }
  }, []);

  // Dismiss share menu on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareContainerRef.current && !shareContainerRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowShareMenu(false);
    };
    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showShareMenu]);

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
      setLoading(true);
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
            img: item.images?.[0] || '/images/guide/blue-sapphire.png',
            images: item.images && item.images.length > 0 ? item.images : ['/images/guide/blue-sapphire.png'],
            video: item.video || null,
            priceUSD: item.price || 0,
            desc: item.description || 'Certified natural gemstone from Gemfort International.',
            shape: item.shape || 'Faceted Precision Cut',
            colorGrade: item.color || 'Vivid Ceylon Hue',
            clarity: 'Eye-Clean / Fine Gem Quality',
            treatment: item.treatment || '100% Unheated & Untreated Natural',
            origin: item.origin || 'Ceylon, Sri Lanka',
            certNumber: item.certificate || 'GRS / GIA Laboratory Certified',
            dimensions: 'Calibrated Precision Faceting',
            glowColor: 'rgba(199, 164, 80, 0.35)',
          });
        } else {
          setStone(null);
        }
      } catch (e) {
        console.error('Error fetching live stone:', e);
        setStone(null);
      } finally {
        setLoading(false);
      }
    }
    fetchGemstone();
  }, [rawId]);

  if (loading) {
    return (
      <main>
        <section className={styles.section} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#64748b' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#c7a450' }} />
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#002147' }}>Loading gemstone specifications...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!stone) {
    return (
      <main>
        <section className={styles.section} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '480px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#002147', marginBottom: '0.75rem', fontFamily: 'serif' }}>
              Gemstone Not Found
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              This gemstone may have been archived, transferred to a private client, or is not currently active in the vault.
            </p>
            <Link
              href="/gemstones"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#002147',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0, 33, 71, 0.15)',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Vault Inventory</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const formattedPrice = stone.priceUSD > 0 ? formatPrice(stone.priceUSD) : 'Price on Inquiry';

  const whatsappInquiryUrl = `https://wa.me/17738850603?text=${encodeURIComponent(
    `Hello Gemfort International,\n\nI am inquiring about an acquisition from your private vault:\n\n• Ref ID: ${stone.id}\n• Gemstone: ${stone.name}\n• Carat: ${stone.weight}\n• Origin: ${stone.origin}\n• Price: ${formattedPrice}\n• Certificate: ${stone.certNumber}\n\nPlease share the high-resolution gemological report and arrange a private consultation.`
  )}`;

  const handleShareClick = async () => {
    const isMobile = typeof window !== 'undefined' && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.innerWidth <= 768 && navigator.maxTouchPoints > 0)
    );

    const shareUrl = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = stone ? `${stone.name} (${stone.weight}) | Gemfort International Vault` : 'Gemfort International Vault';
    const shareText = stone ? `Discover this certified natural ${stone.name} (${stone.weight}) from Gemfort International Vault.` : 'Gemfort International Vault';

    // On mobile devices with native share API: open native device share sheet directly
    if (isMobile && typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return; // User dismissed share sheet
        }
        // Fall through to show the dropdown if native share failed
      }
    }

    // On desktop or when native share is unavailable: toggle luxury share menu
    setShowShareMenu((prev) => !prev);
  };

  const handleCopyLink = async () => {
    const shareUrl = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
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

  const shareUrl = currentUrl || '';
  const shareTitle = stone ? `${stone.name} (${stone.weight}) - Gemfort International` : 'Gemfort International';
  const shareSummary = stone
    ? `Explore certified natural ${stone.name} (${stone.weight}) at Gemfort International Vault:\n${shareUrl}`
    : shareUrl;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareSummary)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareSummary)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <main>
      <section className={styles.section}>
        <div className="container" style={{ maxWidth: '1320px' }}>

          {/* Top Bar Navigation */}
          <div className={styles.topBar}>
            <Link href="/gemstones" className={styles.backLink}>
              <ArrowLeft size={15} /> Back to Vault
            </Link>

            <div className={styles.shareWrapper} ref={shareContainerRef}>
              <button
                type="button"
                onClick={handleShareClick}
                aria-label="Share Gemstone Details"
                className={`${styles.shareBtn} ${copied ? styles.shareBtnCopied : ''}`}
                title={copied ? 'Link Copied!' : 'Share Gemstone'}
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
              </button>

              {/* Luxury Share Dropdown Popover (Desktop & Fallback) */}
              {showShareMenu && (
                <div className={styles.shareDropdown}>
                  <div className={styles.shareDropdownHeader}>
                    <span className={styles.shareDropdownTitle}>Share Gemstone</span>
                    <button
                      type="button"
                      onClick={() => setShowShareMenu(false)}
                      className={styles.shareDropdownClose}
                      aria-label="Close Share Menu"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className={styles.shareCopyBox}>
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className={styles.shareCopyInput}
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`${styles.shareCopyBtn} ${copied ? styles.shareCopyBtnCopied : ''}`}
                    >
                      {copied ? (
                        <>
                          <Check size={13} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className={styles.shareGrid}>
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareOption}
                      title="Share via WhatsApp"
                    >
                      <span className={`${styles.shareOptionIcon} ${styles.iconWhatsapp}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.58 1.961.94 3.03.94 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.768-5.767zm7.689 5.766c-.001 4.242-3.448 7.689-7.689 7.689-1.341 0-2.59-.35-3.673-.96l-4.108 1.077 1.096-4.01c-.672-1.121-1.045-2.42-1.046-3.796.002-4.242 3.449-7.689 7.69-7.689 4.241 0 7.688 3.448 7.689 7.689z" />
                        </svg>
                      </span>
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={emailShareUrl}
                      className={styles.shareOption}
                      title="Share via Email"
                    >
                      <span className={`${styles.shareOptionIcon} ${styles.iconEmail}`}>
                        <Mail size={16} />
                      </span>
                      <span>Email</span>
                    </a>

                    <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareOption}
                      title="Share on X (Twitter)"
                    >
                      <span className={`${styles.shareOptionIcon} ${styles.iconTwitter}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </span>
                      <span>X / Post</span>
                    </a>
                  </div>

                  {hasNativeShare && (
                    <button
                      type="button"
                      onClick={async () => {
                        setShowShareMenu(false);
                        try {
                          await navigator.share({
                            title: shareTitle,
                            text: `Certified natural ${stone.name} (${stone.weight}) from Gemfort International Vault.`,
                            url: shareUrl,
                          });
                        } catch (err: any) {
                          if (err.name !== 'AbortError') console.error(err);
                        }
                      }}
                      className={styles.nativeShareBtn}
                    >
                      <ExternalLink size={13} />
                      <span>System Share Options...</span>
                    </button>
                  )}
                </div>
              )}

              {/* Floating Toast when link copied */}
              {showToast && (
                <div className={styles.copyToast}>
                  <CheckCircle2 size={16} color="#2ecc71" />
                  <span>Link copied to clipboard!</span>
                </div>
              )}
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
                  unoptimized={stone.img.startsWith('data:')}
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
