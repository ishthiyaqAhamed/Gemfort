'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Diamond, Globe2, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <PageHeader 
        title="Who We Are" 
        subtitle="Gemfort International" 
        imagePath="/images/about-preview.jpg"
      />
      
      {/* Introduction */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}
          >
            Premium Gemstone Supplier
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8 }}
          >
            We are a premium gemstone supplier based in Beruwala, Sri Lanka. For more than 35 years our business has specialised exclusively in natural minerals and genuine gemstones — never synthetic or lab-created stones.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
          >
            We supply all varieties of sapphires, rubies, chrysoberyl, alexandrite, spinels, tourmaline and garnets. Our raw material comes from Sri Lanka, African countries (Mozambique, Tanzania, Kenya, Madagascar, Ethiopia) and Burma, and is expertly hand-cut and polished in Sri Lanka before shipping to China, Hong Kong, the USA and worldwide.
          </motion.p>
        </div>
      </section>

      {/* History Timeline & Sourcing Image */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>Our History</h4>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '3rem', fontSize: '2.2rem' }}>Generations of Gem Knowledge</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1989: Founded in the Sri Lanka gem trade</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Our business began in Beruwala, specialising exclusively in natural minerals and genuine gemstones. From the start, we refused to trade synthetic or lab-created material.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1990s–2000s: From dealing to master cutting</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>We moved beyond rough trading and began working with highly skilled master craftsmen in Sri Lanka to hand-cut and polish stones for colour, brilliance and jewellery suitability.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2010s: Global sourcing network</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Raw material partnerships expanded to African countries — Mozambique, Tanzania, Kenya, Madagascar and Ethiopia — alongside Burma, while cutting and quality control remained in Sri Lanka.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Today: Gemfort International</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>For more than 35 years we have supplied natural sapphires, rubies, chrysoberyl, alexandrite, and spinels directly to China, Hong Kong and the USA with worldwide shipping.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,33,71,0.1)' }}>
                <Image src="/images/about-3.png" alt="Global Sourcing Network in Africa" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,33,71,0.1)' }}>
                <Image src="/images/about-1.jpg" alt="Examining rough stones" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Purpose, Vision, Mission */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              To become the world’s most trusted supplier of authentic Ceylon gemstones, recognized for unparalleled quality, ethical practices, and innovation, while preserving Sri Lanka’s rich gem heritage and empowering local communities to thrive in the global gem industry.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              To deliver exceptional gemstones that exceed customer expectations, combining ethical sourcing, expert craftsmanship, and personalized service; promote sustainable practices; and nurture talent to maintain Sri Lanka’s leadership in global gemstone excellence.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Our Commitment</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We commit to providing top-quality gemstones, ensuring transparency, integrity, and customer satisfaction; safeguarding Sri Lanka’s gem heritage; supporting ethical trade; and fostering trust with clients, artisans, and partners across international markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values & International Reach */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative', width: '100%', aspectRatio: '4/4', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,33,71,0.1)' }}
            >
              <Image src="/images/about-2.jpg" alt="Direct Export and Client Relations" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>Core Values</h4>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '3rem', fontSize: '2.2rem' }}>Direct Supply to the World</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <Shield size={32} color="var(--text-accent)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Natural Only</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We deal exclusively in natural minerals and genuine gemstones. Synthetic and lab-created stones are never part of our inventory.</p>
                </div>
                <div>
                  <Diamond size={32} color="var(--text-accent)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Master Craftsmanship</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Every stone is hand-cut and polished in Sri Lanka by skilled craftsmen who understand how to maximise colour, clarity and durability.</p>
                </div>
                <div>
                  <Globe2 size={32} color="var(--text-accent)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Global Sourcing</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Raw material sourced from Sri Lanka, African countries and Burma, selected for quality before it reaches the cutting wheel.</p>
                </div>
                <div>
                  <Truck size={32} color="var(--text-accent)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Direct Export</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fast, reliable shipping and full documentation for buyers in China, Hong Kong, the USA and beyond. Certification included.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
