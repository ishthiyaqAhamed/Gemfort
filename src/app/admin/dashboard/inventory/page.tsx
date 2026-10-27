'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Edit2,
  Trash2,
  ExternalLink,
  Plus,
  X,
  Loader2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  DollarSign,
  UploadCloud,
  FileText,
  Check,
} from 'lucide-react';
import styles from '../adminPages.module.css';
import modalStyles from './gemstoneModal.module.css';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Gemstone {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  weight?: number | null;
  color?: string | null;
  shape?: string | null;
  origin?: string | null;
  treatment?: string | null;
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';
  images: string[];
  certificate?: string | null;
  categoryId: string;
  category?: Category;
  createdAt: string;
}

export default function AdminInventoryPage() {
  const [gemstones, setGemstones] = useState<Gemstone[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEditStone, setCurrentEditStone] = useState<Gemstone | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formShape, setFormShape] = useState('');
  const [formOrigin, setFormOrigin] = useState('Ratnapura, Sri Lanka');
  const [formTreatment, setFormTreatment] = useState('100% Unheated & Untreated Natural');
  const [formCert, setFormCert] = useState('');
  const [formStatus, setFormStatus] = useState<'AVAILABLE' | 'RESERVED' | 'SOLD'>('AVAILABLE');
  const [formImage, setFormImage] = useState('/images/guide/blue-sapphire.png');
  const [formDesc, setFormDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Image upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadProvider, setUploadProvider] = useState<'cloudinary' | 'local' | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [gemRes, catRes] = await Promise.all([
        fetch('/api/gemstones'),
        fetch('/api/categories'),
      ]);

      const gemData = await gemRes.json();
      const catData = await catRes.json();

      if (gemRes.ok && gemData.success) {
        setGemstones(gemData.data);
      }
      if (catRes.ok && catData.success) {
        setCategories(catData.data);
        if (catData.data.length > 0 && !formCategory) {
          setFormCategory(catData.data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load inventory data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    setUploadProgress('Uploading image...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'gemfort/vault');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setFormImage(data.url);
        setUploadProvider(data.provider === 'cloudinary' ? 'cloudinary' : 'local');
        setUploadProgress(
          data.provider === 'cloudinary'
            ? 'Stored on Cloudinary CDN'
            : 'Image Loaded Successfully'
        );
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Network error while uploading image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setFormName('');
    setFormPrice('');
    setFormWeight('');
    setFormColor('Royal Blue (Vivid)');
    setFormShape('Cushion Mixed Cut');
    setFormOrigin('Ratnapura, Sri Lanka');
    setFormTreatment('100% Unheated & Untreated Natural');
    setFormCert('GRS-2026-88419');
    setFormStatus('AVAILABLE');
    setFormImage('/images/guide/blue-sapphire.png');
    setFormDesc('');
    setUploadProgress(null);
    setUploadProvider(null);
    if (categories.length > 0) setFormCategory(categories[0].id);
    setIsAddOpen(true);
    setAlertMsg(null);
  };

  const handleCreateStone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCategory) {
      setAlertMsg({ type: 'error', text: 'Gemstone name and category are required.' });
      return;
    }

    setSubmitting(true);
    setAlertMsg(null);

    const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
      const res = await fetch('/api/gemstones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim(),
          slug: `${slug}-${Math.floor(Math.random() * 900 + 100)}`,
          categoryId: formCategory,
          price: formPrice ? parseFloat(formPrice) : null,
          weight: formWeight ? parseFloat(formWeight) : null,
          color: formColor.trim() || null,
          shape: formShape.trim() || null,
          origin: formOrigin.trim() || null,
          treatment: formTreatment.trim() || null,
          certificate: formCert.trim() || null,
          status: formStatus,
          images: [formImage.trim() || '/images/guide/blue-sapphire.png'],
          description: formDesc.trim() || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGemstones([data.data, ...gemstones]);
        setIsAddOpen(false);
      } else {
        setAlertMsg({ type: 'error', text: data.error || 'Failed to create gemstone.' });
      }
    } catch {
      setAlertMsg({ type: 'error', text: 'Network error creating gemstone.' });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (stone: Gemstone) => {
    setCurrentEditStone(stone);
    setFormName(stone.name);
    setFormCategory(stone.categoryId);
    setFormPrice(stone.price ? String(stone.price) : '');
    setFormWeight(stone.weight ? String(stone.weight) : '');
    setFormColor(stone.color || '');
    setFormShape(stone.shape || '');
    setFormOrigin(stone.origin || '');
    setFormTreatment(stone.treatment || '');
    setFormCert(stone.certificate || '');
    setFormStatus(stone.status);
    setFormImage(stone.images?.[0] || '/images/guide/blue-sapphire.png');
    setFormDesc(stone.description || '');
    setUploadProgress(null);
    setUploadProvider(stone.images?.[0]?.includes('cloudinary') ? 'cloudinary' : null);
    setIsEditOpen(true);
    setAlertMsg(null);
  };

  const handleUpdateStone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditStone) return;

    setSubmitting(true);
    setAlertMsg(null);

    try {
      const res = await fetch(`/api/gemstones/${currentEditStone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim(),
          categoryId: formCategory,
          price: formPrice ? parseFloat(formPrice) : null,
          weight: formWeight ? parseFloat(formWeight) : null,
          color: formColor.trim() || null,
          shape: formShape.trim() || null,
          origin: formOrigin.trim() || null,
          treatment: formTreatment.trim() || null,
          certificate: formCert.trim() || null,
          status: formStatus,
          images: [formImage.trim() || '/images/guide/blue-sapphire.png'],
          description: formDesc.trim() || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGemstones((prev) =>
          prev.map((item) => (item.id === currentEditStone.id ? data.data : item))
        );
        setIsEditOpen(false);
      } else {
        setAlertMsg({ type: 'error', text: data.error || 'Failed to update gemstone.' });
      }
    } catch {
      setAlertMsg({ type: 'error', text: 'Network error updating gemstone.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStone = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}" from the vault?`)) return;

    try {
      const res = await fetch(`/api/gemstones/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setGemstones((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete gemstone.');
      }
    } catch {
      alert('Network error deleting gemstone.');
    }
  };

  return (
    <div>
      {/* Page Header Card */}
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Vault Inventory Management</h1>
          <p className={styles.pageSubtitle}>
            Add, update, or remove natural certified gemstones in your vault ({gemstones.length} active stones).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={loadData}
            className={styles.actionBtn}
            title="Refresh Inventory"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.85rem' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={openAddModal} 
            className={styles.primaryBtn}
          >
            <Plus size={16} />
            <span>Add New Stone</span>
          </button>
        </div>
      </div>
      
      {/* Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3.5rem', color: '#6b7280' }}>
              <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
              <p>Loading gemstones from database...</p>
            </div>
          ) : gemstones.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#6b7280' }}>
              <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.4rem' }}>No gemstones currently in vault.</p>
              <button onClick={openAddModal} className={styles.primaryBtn} style={{ marginTop: '0.75rem' }}>
                <Plus size={16} /> Add Your First Gemstone
              </button>
            </div>
          ) : (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Stone</th>
                  <th>Category</th>
                  <th>Weight</th>
                  <th>Price (USD)</th>
                  <th>Origin</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {gemstones.map((stone) => {
                  const displayImage = stone.images?.[0] || '/images/guide/blue-sapphire.png';
                  const displayWeight = stone.weight ? `${stone.weight} ct` : '—';
                  const displayPrice = stone.price ? `$${stone.price.toLocaleString()}` : 'Inquire';

                  return (
                    <tr key={stone.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ position: 'relative', width: '42px', height: '42px', backgroundColor: '#07101d', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                            <Image src={displayImage} alt={stone.name} fill style={{ objectFit: 'contain', padding: '3px' }} />
                          </div>
                          <div>
                            <span style={{ fontWeight: 600, color: '#111827', display: 'block' }}>{stone.name}</span>
                            <span style={{ fontSize: '0.72rem', color: '#8c6d1f', fontFamily: 'monospace' }}>
                              {stone.certificate || stone.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#4b5563' }}>{stone.category?.name || 'Ceylon Stone'}</td>
                      <td style={{ color: '#4b5563', fontWeight: 500 }}>{displayWeight}</td>
                      <td style={{ color: '#111827', fontWeight: 600 }}>{displayPrice}</td>
                      <td style={{ color: '#6b7280', fontSize: '0.85rem' }}>{stone.origin || 'Sri Lanka'}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${
                          stone.status === 'AVAILABLE' ? styles.statusAvailable :
                          stone.status === 'RESERVED' ? styles.statusReserved :
                          styles.statusSold
                        }`}>
                          {stone.status === 'AVAILABLE' ? 'Available' : stone.status === 'RESERVED' ? 'Reserved' : 'Sold'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => openEditModal(stone)}
                            className={styles.actionBtn} 
                            title="Edit Gemstone"
                          >
                            <Edit2 size={15} />
                          </button>
                          <Link 
                            href={`/gemstones/${stone.slug || stone.id}`} 
                            className={styles.actionBtn} 
                            title="View on site"
                            target="_blank"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <button 
                            onClick={() => handleDeleteStone(stone.id, stone.name)}
                            className={`${styles.actionBtn} ${styles.actionBtnDanger}`} 
                            title="Delete Gemstone"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── LUXURY GEMSTONE REGISTRATION / EDIT MODAL ──────────────────────── */}
      {(isAddOpen || isEditOpen) && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modalCard}>
            
            {/* Modal Header */}
            <div className={modalStyles.modalHeader}>
              <div>
                <span className={modalStyles.headerBadge}>
                  <Sparkles size={11} /> Gemfort Vault Registry
                </span>
                <h3 className={modalStyles.modalTitle}>
                  {isAddOpen ? 'Register New Gemstone' : `Edit: ${currentEditStone?.name}`}
                </h3>
                <p className={modalStyles.modalSubtitle}>
                  Certified Ceylon provenance, physical grading, pricing, and high-resolution imagery.
                </p>
              </div>

              <button
                type="button"
                onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                aria-label="Close Modal"
                className={modalStyles.closeBtn}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={isAddOpen ? handleCreateStone : handleUpdateStone} style={{ display: 'contents' }}>
              <div className={modalStyles.modalBody}>
                
                {alertMsg && (
                  <div style={{
                    padding: '0.85rem 1.15rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor: alertMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
                    color: alertMsg.type === 'success' ? '#065f46' : '#991b1b',
                    border: `1px solid ${alertMsg.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
                    fontSize: '0.88rem',
                  }}>
                    {alertMsg.type === 'success' ? <CheckCircle2 size={18} color="#059669" /> : <AlertCircle size={18} color="#dc2626" />}
                    <span>{alertMsg.text}</span>
                  </div>
                )}

                {/* 1. Core Identity & Category */}
                <div className={modalStyles.formSection}>
                  <div className={modalStyles.sectionHeader}>
                    <div className={modalStyles.sectionIcon}>
                      <Sparkles size={15} />
                    </div>
                    <h4 className={modalStyles.sectionTitle}>1. Identity &amp; Classification</h4>
                  </div>

                  <div className={modalStyles.gridTwo}>
                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>
                        Gemstone Name <span className={modalStyles.requiredStar}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Blue Ceylon Sapphire"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>

                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>
                        Category Collection <span className={modalStyles.requiredStar}>*</span>
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className={modalStyles.select}
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={modalStyles.inputGroup}>
                    <label className={modalStyles.label}>Origin &amp; Mining Provenance</label>
                    <input
                      type="text"
                      placeholder="e.g. Ratnapura, Sri Lanka (Artisanal Ceylon Mine)"
                      value={formOrigin}
                      onChange={(e) => setFormOrigin(e.target.value)}
                      className={modalStyles.input}
                    />
                  </div>
                </div>

                {/* 2. Gemological Specifications */}
                <div className={modalStyles.formSection}>
                  <div className={modalStyles.sectionHeader}>
                    <div className={modalStyles.sectionIcon}>
                      <Award size={15} />
                    </div>
                    <h4 className={modalStyles.sectionTitle}>2. Gemological Grading &amp; Certification</h4>
                  </div>

                  <div className={modalStyles.gridTwo}>
                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Color Grade / Hue</label>
                      <input
                        type="text"
                        placeholder="e.g. Royal Blue (Vivid Cornflower Saturation)"
                        value={formColor}
                        onChange={(e) => setFormColor(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>

                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Cut &amp; Faceting Shape</label>
                      <input
                        type="text"
                        placeholder="e.g. Cushion Mixed Cut, Oval Brilliant"
                        value={formShape}
                        onChange={(e) => setFormShape(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>
                  </div>

                  <div className={modalStyles.gridTwo}>
                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Treatment &amp; Thermal Status</label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Unheated & Untreated Natural"
                        value={formTreatment}
                        onChange={(e) => setFormTreatment(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>

                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Laboratory Certificate Report #</label>
                      <input
                        type="text"
                        placeholder="e.g. GRS-2026-88419 / GIA Certified"
                        value={formCert}
                        onChange={(e) => setFormCert(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Valuation & Status */}
                <div className={modalStyles.formSection}>
                  <div className={modalStyles.sectionHeader}>
                    <div className={modalStyles.sectionIcon}>
                      <DollarSign size={15} />
                    </div>
                    <h4 className={modalStyles.sectionTitle}>3. Valuation &amp; Vault Availability</h4>
                  </div>

                  <div className={modalStyles.gridThree}>
                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Carat Weight (ct)</label>
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 3.45"
                        value={formWeight}
                        onChange={(e) => setFormWeight(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>

                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Valuation Price (USD $)</label>
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 4250"
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        className={modalStyles.input}
                      />
                    </div>

                    <div className={modalStyles.inputGroup}>
                      <label className={modalStyles.label}>Vault Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as any)}
                        className={modalStyles.select}
                      >
                        <option value="AVAILABLE">Available</option>
                        <option value="RESERVED">Reserved</option>
                        <option value="SOLD">Sold</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Cloudinary Imagery & Direct File Upload */}
                <div className={modalStyles.formSection}>
                  <div className={modalStyles.sectionHeader}>
                    <div className={modalStyles.sectionIcon}>
                      <UploadCloud size={15} />
                    </div>
                    <div>
                      <h4 className={modalStyles.sectionTitle}>4. High-Resolution Imagery &amp; Cloudinary</h4>
                    </div>
                  </div>

                  {/* Dropzone or Live Preview */}
                  {formImage ? (
                    <div className={modalStyles.previewStage}>
                      <div className={modalStyles.previewImageWrap}>
                        <Image
                          src={formImage}
                          alt="Uploaded Gemstone"
                          fill
                          style={{ objectFit: 'contain', padding: '4px' }}
                        />
                      </div>
                      <div className={modalStyles.previewInfo}>
                        <div className={modalStyles.previewBadge}>
                          <Check size={12} />
                          <span>{uploadProgress || (uploadProvider === 'cloudinary' ? 'Stored on Cloudinary CDN' : 'Ready in Vault')}</span>
                        </div>
                        <p className={modalStyles.previewUrl} title={formImage}>{formImage}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setFormImage(''); setUploadProgress(null); }}
                        className={modalStyles.removeImageBtn}
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label className={modalStyles.dropzone}>
                      <input
                        type="file"
                        accept="image/*"
                        className={modalStyles.hiddenFileInput}
                        disabled={uploadingImage}
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                        }}
                      />
                      <div className={modalStyles.dropzoneIconWrap}>
                        {uploadingImage ? <Loader2 size={26} className="animate-spin" /> : <UploadCloud size={26} />}
                      </div>
                      <p className={modalStyles.dropzonePrompt}>
                        {uploadingImage ? (
                          'Uploading to Cloudinary...'
                        ) : (
                          <>Drag &amp; drop gemstone photograph or <span className={modalStyles.dropzoneHighlight}>browse files</span></>
                        )}
                      </p>
                      <p className={modalStyles.dropzoneHelp}>
                        Supports PNG, JPG, WEBP. Uploads directly to Cloudinary CDN storage.
                      </p>
                    </label>
                  )}

                  {/* Quick Presets Strip */}
                  <div className={modalStyles.presetStrip}>
                    <span className={modalStyles.presetLabel}>Quick Ceylon Presets:</span>
                    {[
                      { label: 'Blue Sapphire', path: '/images/guide/blue-sapphire.png' },
                      { label: 'Ruby', path: '/images/guide/ruby.png' },
                      { label: 'Padparadscha', path: '/images/guide/padparadscha.png' },
                      { label: 'Pink Sapphire', path: '/images/guide/pink-sapphire.png' },
                      { label: 'Alexandrite', path: '/images/guide/alexandrite.png' },
                      { label: 'Yellow Sapphire', path: '/images/guide/yellow-sapphire.png' },
                      { label: 'Spinel', path: '/images/guide/spinel.png' },
                    ].map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => { setFormImage(preset.path); setUploadProvider(null); setUploadProgress(null); }}
                        className={`${modalStyles.presetBtn} ${formImage === preset.path ? modalStyles.presetBtnActive : ''}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Gemological Narrative */}
                <div className={modalStyles.formSection}>
                  <div className={modalStyles.sectionHeader}>
                    <div className={modalStyles.sectionIcon}>
                      <FileText size={15} />
                    </div>
                    <h4 className={modalStyles.sectionTitle}>5. Gemstone Narrative &amp; Vault Dossier</h4>
                  </div>

                  <div className={modalStyles.inputGroup}>
                    <label className={modalStyles.label}>Collector Story &amp; Faceting Narrative</label>
                    <textarea
                      rows={3}
                      placeholder="An exceptional unheated specimen showcasing deep velvety scintillation, loupe-clean crystal purity, and peerless Ceylon provenance..."
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className={modalStyles.textarea}
                    />
                  </div>
                </div>

              </div>

              {/* Modal Sticky Footer */}
              <div className={modalStyles.modalFooter}>
                <button
                  type="button"
                  onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                  className={modalStyles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className={modalStyles.saveBtn}
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  <span>{submitting ? 'Saving to Vault...' : isAddOpen ? 'Register Gemstone in Vault' : 'Save Changes'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
