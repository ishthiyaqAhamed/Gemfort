'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  X, 
  Loader2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  UploadCloud, 
  Check 
} from 'lucide-react';
import styles from '../adminPages.module.css';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  img: string;
  content: string;
}

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('China Fort');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadProvider, setUploadProvider] = useState<'cloudinary' | 'local' | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    setUploadProgress('Uploading to Cloudinary CDN...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'gemfort/journal');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setImg(data.url);
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

  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/journal');
      const data = await res.json();
      if (res.ok && data.success) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      setAlertMsg({ type: 'error', text: 'Title and excerpt are required.' });
      return;
    }
    setSubmitting(true);
    setAlertMsg(null);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim(),
          excerpt: excerpt.trim(),
          content: content.trim() || excerpt.trim(),
          img: img.trim() || '/images/hero-bg-stunning.jpg',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setArticles([data.data, ...articles]);
        setIsModalOpen(false);
        setTitle('');
        setExcerpt('');
        setContent('');
        setImg('');
        setUploadProgress(null);
        setUploadProvider(null);
      } else {
        setAlertMsg({ type: 'error', text: data.error || 'Failed to create article.' });
      }
    } catch {
      setAlertMsg({ type: 'error', text: 'Network error creating article.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeaderCard}>
        <div>
          <h1 className={styles.pageTitle}>Journal &amp; Editorial Entries</h1>
          <p className={styles.pageSubtitle}>
            Manage your gemstone education, Ceylon heritage, and maison editorial content ({articles.length} publications).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={loadArticles}
            className={styles.actionBtn}
            title="Refresh Articles"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.85rem' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={() => { setIsModalOpen(true); setAlertMsg(null); }} 
            className={styles.primaryBtn}
          >
            <Plus size={16} />
            <span>New Article</span>
          </button>
        </div>
      </div>
      
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3.5rem', color: '#6b7280' }}>
              <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
              <p>Loading journal publications...</p>
            </div>
          ) : (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Publication Date</th>
                  <th>Excerpt</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td style={{ fontWeight: 600, color: '#111827', minWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen size={16} color="#c7a450" style={{ flexShrink: 0 }} />
                        <span>{article.title}</span>
                      </div>
                    </td>
                    <td style={{ color: '#4b5563', whiteSpace: 'nowrap' }}>{article.category}</td>
                    <td style={{ color: '#6b7280', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{article.date}</td>
                    <td style={{ color: '#6b7280', fontSize: '0.82rem', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {article.excerpt}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles.statusAvailable}`}>
                        Published
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── NEW ARTICLE MODAL ──────────────────────── */}
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
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 33, 71, 0.25)',
            border: '1px solid rgba(199, 164, 80, 0.3)',
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
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
              Publish New Journal Entry
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Create a new educational guide or historical gemstone essay.
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

            <form onSubmit={handleCreateArticle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Legacy of Ceylon Star Sapphires"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none', backgroundColor: '#fff', color: '#0f172a' }}
                >
                  <option value="China Fort">China Fort</option>
                  <option value="Gem Trading">Gem Trading</option>
                  <option value="Famous Gemstones">Famous Gemstones</option>
                  <option value="Pathe Market">Pathe Market</option>
                  <option value="Gemstone Origins">Gemstone Origins</option>
                  <option value="Gem Heritage">Gem Heritage</option>
                </select>
              </div>

              {/* Upload Banner Image */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Banner Image
                </label>

                {img ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '74px',
                      height: '52px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      backgroundColor: '#001a3a',
                      flexShrink: 0,
                    }}>
                      <Image
                        src={img}
                        alt="Article Banner Preview"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized={img.startsWith('data:')}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          border: '1px solid #a7f3d0'
                        }}>
                          <Check size={11} />
                          <span>{uploadProgress || (uploadProvider === 'cloudinary' ? 'Stored on Cloudinary CDN' : 'Banner Ready')}</span>
                        </span>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '0.76rem',
                        color: '#64748b',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: 'monospace'
                      }} title={img}>
                        {img}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setImg(''); setUploadProgress(null); }}
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        color: '#dc2626',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <label style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.75rem 1rem',
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      backgroundColor: uploadingImage ? '#f8fafc' : '#ffffff',
                      cursor: uploadingImage ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                    }}>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        disabled={uploadingImage}
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                        }}
                      />
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: '#f1f5f9',
                        color: '#002147',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.65rem'
                      }}>
                        {uploadingImage ? <Loader2 size={22} className="animate-spin" color="#c7a450" /> : <UploadCloud size={22} color="#002147" />}
                      </div>
                      <p style={{ margin: '0 0 0.25rem', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>
                        {uploadingImage ? 'Uploading to Cloudinary CDN...' : 'Click or drag image here to upload'}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        PNG, JPG, WebP up to 10MB (Auto-optimized to Cloudinary CDN)
                      </span>
                    </label>

                    {/* Direct URL alternative */}
                    <div style={{ marginTop: '0.6rem' }}>
                      <input
                        type="text"
                        placeholder="Or enter direct image URL (e.g. /images/hero-bg-stunning.jpg or https://...)"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.82rem',
                          backgroundColor: '#f8fafc',
                          color: '#334155',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Short Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise synopsis displayed on the journal listing cards..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#002147', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Full Article Content
                </label>
                <textarea
                  rows={6}
                  placeholder="Write the full body paragraphs. Separate major sections with double line breaks..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
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
                  <span>{submitting ? 'Publishing...' : 'Publish Article'}</span>
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
    </div>
  );
}
