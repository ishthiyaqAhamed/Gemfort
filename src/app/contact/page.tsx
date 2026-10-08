'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <PageHeader 
        title="Contact" 
        subtitle="Talk to our team in Beruwala or Chicago" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Whether you are buying your first sapphire or sourcing for a workshop, we are happy to answer questions before anything is bought.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
            
            {/* Left Column: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
                <Image src="/images/logo.png" alt="Gemfort Logo" width={160} height={160} style={{ objectFit: 'contain' }} />
              </div>

              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '2rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>Gemfort International</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--text-accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.2rem' }}>Sri Lanka Office</p>
                    <p style={{ color: 'var(--text-secondary)' }}>26, Naleem Hajiar Place, China Fort<br/>Beruwala, Sri Lanka</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--text-accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.2rem' }}>USA Office</p>
                    <p style={{ color: 'var(--text-secondary)' }}>6234 N Oakley Ave<br/>Chicago, Illinois 60659, USA</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Phone size={20} color="var(--text-accent)" style={{ flexShrink: 0 }} />
                  <div>
                    <p style={{ color: 'var(--text-secondary)' }}>+94 77 341 2932 (LK)</p>
                    <p style={{ color: 'var(--text-secondary)' }}>+1 773 885 0603 (US)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Mail size={20} color="var(--text-accent)" style={{ flexShrink: 0 }} />
                  <p style={{ color: 'var(--text-secondary)' }}>GEMFORTINTERNATIONAL@gmail.com</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Clock size={20} color="var(--text-accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: 'var(--text-secondary)' }}>Monday – Friday: 9:00 – 18:00 (GMT+5:30)</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Saturday: 9:00 – 14:00</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Sunday: By appointment</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginTop: '1rem' }}>
                  <MessageCircle size={20} color="var(--text-accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: 'var(--text-secondary)' }}>WeChat: AAISHA5553</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Little Red Book: Crystal Sapphire</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <a 
                  href="https://wa.me/17738850603" 
                  target="_blank"
                  rel="noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.8rem', 
                    backgroundColor: '#25D366', 
                    color: '#fff', 
                    padding: '12px 24px', 
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'opacity 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right Column: Enquiry Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Tell us what you are looking for</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                The more specific you are, the more useful our reply will be.
              </p>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div>
                  <label className={styles.label}>Name</label>
                  <input type="text" className={styles.input} placeholder="Your name" />
                </div>
                
                <div>
                  <label className={styles.label}>Email Address</label>
                  <input type="email" className={styles.input} placeholder="Your email address" />
                </div>

                <div>
                  <label className={styles.label}>Gemstone Requirements</label>
                  <textarea rows={6} className={styles.textarea} placeholder="Include variety, approximate carat weight, color preferences, and budget if possible..." style={{ resize: 'vertical' }} />
                </div>

                <button type="button" className={styles.submitBtn}>
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </div>
          
          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: '5rem' }}
          >
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '2rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>Our Locations</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Beruwala Map */}
              <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15857.086438096336!2d79.9912076!3d6.4877717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22ddbcfffffff%3A0xc6ce4b70258d6091!2sChina%20Fort%2C%20Beruwala%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Chicago Map */}
              <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.6253406259043!2d-87.6891004!3d41.997576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd1a1796d8e8b%3A0x89e81b379c67b938!2s6234%20N%20Oakley%20Ave%2C%20Chicago%2C%20IL%2060659%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
