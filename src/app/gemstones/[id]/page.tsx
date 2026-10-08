'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';

import { useCurrency } from '@/context/CurrencyContext';

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

import React from 'react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { formatPrice } = useCurrency();
  const resolvedParams = React.use(params);
  const stoneId = parseInt(resolvedParams.id);
  const stone = allStones.find(s => s.id === stoneId) || allStones[0]; // fallback to first if not found

  return (
    <main>
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '10rem', paddingBottom: '6rem' }}>
        <div className="container">
          
          <Link href="/gemstones" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to Inventory
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'start' }}>
            
            {/* Image Gallery Area */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '4rem', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(0,33,71,0.05)' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                <Image 
                  src={stone.img} 
                  alt={stone.name} 
                  fill 
                  style={{ objectFit: 'contain' }} 
                />
              </div>
            </div>

            {/* Product Details */}
            <div style={{ padding: '1rem 0' }}>
              <p style={{ color: 'var(--text-accent)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>
                Ref: GEM-{stone.id.toString().padStart(3, '0')}
              </p>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
                {stone.name}
              </h1>
              <p style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 300, marginBottom: '2.5rem' }}>
                {formatPrice(stone.priceUSD)}
              </p>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', marginBottom: '2.5rem' }}></div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem', fontSize: '1.05rem' }}>
                {stone.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0,33,71,0.05)' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Carat Weight</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>{stone.weight}</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0,33,71,0.05)' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Gem Type</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>Natural {stone.type}</p>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={18} color="var(--text-accent)" /> 100% Natural & Ethically Sourced
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={18} color="var(--text-accent)" /> Independent Gemological Certificate Included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={18} color="var(--text-accent)" /> Secure Worldwide Shipping
                </li>
              </ul>

              <a 
                href={`https://wa.me/17738850603?text=${encodeURIComponent(`Hi, I'm interested in the following gemstone:\n\nRef No: GEM-${stone.id.toString().padStart(3, '0')}\nName: ${stone.name}\nWeight: ${stone.weight}\nType/Color: ${stone.type}`)}`}
                target="_blank"
                rel="noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.8rem', 
                  backgroundColor: '#25D366', 
                  color: '#fff', 
                  padding: '14px 24px', 
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  transition: 'opacity 0.3s',
                  width: '100%'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <MessageCircle size={20} />
                Inquire via WhatsApp
              </a>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
