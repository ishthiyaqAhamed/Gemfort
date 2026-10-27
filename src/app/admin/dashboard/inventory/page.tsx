'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit2, Trash2, ExternalLink, Plus, X, Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from '../adminPages.module.css';

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
  const [formTreatment, setFormTreatment] = useState('100% Unheated & Untreated');
  const [formCert, setFormCert] = useState('');
  const [formStatus, setFormStatus] = useState<'AVAILABLE' | 'RESERVED' | 'SOLD'>('AVAILABLE');
  const [formImage, setFormImage] = useState('/images/guide/blue-sapphire.png');
  const [formDesc, setFormDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const openAddModal = () => {
    setFormName('');
    setFormPrice('');
    setFormWeight('');
    setFormColor('');
    setFormShape('Cushion Mixed Cut');
    setFormOrigin('Ratnapura, Sri Lanka');
    setFormTreatment('100% Unheated & Untreated');
    setFormCert('GRS-2026-');
    setFormStatus('AVAILABLE');
    setFormImage('/images/guide/blue-sapphire.png');
    setFormDesc('');
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

      {/* ─── ADD / EDIT GEMSTONE MODAL ──────────────────────── */}
      {(isAddOpen || isEditOpen) && (
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
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 33, 71, 0.25)',
            border: '1px solid rgba(199, 164, 80, 0.3)',
          }}>
            <button
              onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
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
              {isAddOpen ? 'Add New Gemstone to Vault' : `Edit: ${currentEditStone?.name}`}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Enter gemological specifications, pricing, and certified laboratory details.
            </p>

            {alertMsg && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
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

            <form onSubmit={isAddOpen ? handleCreateStone : handleUpdateStone} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Gemstone Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Blue Sapphire"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none', backgroundColor: '#fff' }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 4250"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Carat Weight
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 3.45"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none', backgroundColor: '#fff' }}
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="SOLD">Sold</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Color Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Blue (Vivid)"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Cut &amp; Shape
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cushion Mixed Cut"
                    value={formShape}
                    onChange={(e) => setFormShape(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Origin Provenance
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ratnapura, Sri Lanka"
                    value={formOrigin}
                    onChange={(e) => setFormOrigin(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GRS-2026-88419"
                    value={formCert}
                    onChange={(e) => setFormCert(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Image Path / URL
                </label>
                <input
                  type="text"
                  placeholder="/images/guide/blue-sapphire.png"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                />
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>Quick presets:</span>
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
                      onClick={() => setFormImage(preset.path)}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db',
                        backgroundColor: formImage === preset.path ? '#002147' : '#f9fafb',
                        color: formImage === preset.path ? '#fff' : '#4b5563',
                        cursor: 'pointer',
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Gemstone Narrative / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Collector-grade natural gemstone with exceptional optical scintillation..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
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
                  <span>{submitting ? 'Saving to Vault...' : isAddOpen ? 'Add Gemstone to Database' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
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
    </div>
  );
}
