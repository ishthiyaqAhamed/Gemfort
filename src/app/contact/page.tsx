'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main>
      <PageHeader 
        title="Get in Touch" 
        subtitle="Contact Us" 
        imagePath="/images/contact-banner.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Visit Our Boutique</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Experience our unparalleled collection in person. Schedule a private viewing with one of our master gemologists to find the perfect stone for your bespoke jewelry piece.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin size={24} color="var(--text-accent)" style={{ marginTop: '4px' }} />
                <div>
                  <h4 style={{ marginBottom: '0.2rem' }}>Address</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>45 Gem Avenue, <br />Colombo 03, Sri Lanka</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Phone size={24} color="var(--text-accent)" style={{ marginTop: '4px' }} />
                <div>
                  <h4 style={{ marginBottom: '0.2rem' }}>Phone</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>+94 11 234 5678</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Mail size={24} color="var(--text-accent)" style={{ marginTop: '4px' }} />
                <div>
                  <h4 style={{ marginBottom: '0.2rem' }}>Email</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>inquiries@gemfort.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Send an Inquiry</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '1rem' }} 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '1rem' }} 
              />
              <select style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '1rem', backgroundColor: 'white' }}>
                <option>Interested in Sapphires</option>
                <option>Interested in Rubies</option>
                <option>Bespoke Jewelry Consultation</option>
                <option>Other Inquiry</option>
              </select>
              <textarea 
                placeholder="Your Message" 
                rows={5}
                style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '1rem', resize: 'vertical' }} 
              />
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <span>Submit Inquiry</span>
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
