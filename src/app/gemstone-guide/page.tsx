'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

const gemstoneData = [
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    img: '/images/guide/blue-sapphire.png',
    intro: 'Blue sapphire is the most traded fine coloured stone in the world, which means both excellent choice and plenty of room for error.',
    whatToLookFor: 'A bright, open blue that holds its colour under both daylight and indoor light, with no window when the stone is tilted.',
    metrics: {
      colour: 'Aim for medium to medium-dark tone with strong saturation. Very dark stones lose life; very light stones lose value.',
      clarity: 'Eye clean is the practical standard. Fine silk is acceptable and can soften colour attractively; large fractures are not.',
      cut: 'Check symmetry, an unbroken pattern of reflections, and pavilion depth. Weight-retaining bellies are common in commercial goods.',
      carat: 'Price per carat rises in steps at 1 ct, 2 ct, 3 ct and 5 ct. Buying just under a threshold saves noticeably.',
      origin: 'Sri Lanka, Kashmir and Burma carry historical premiums. Origin should be stated by a laboratory, not assumed.',
      treatments: 'Conventional heating is normal and accepted when disclosed. Unheated stones cost substantially more.',
      certification: 'For anything above roughly one carat, ask for a report from a recognised laboratory covering identity and treatment.',
      pricing: 'Price is driven by colour first, then treatment status, then clarity, cut and size. Two stones of equal weight can differ by a factor of ten.'
    }
  },
  {
    id: 'padparadscha',
    name: 'Padparadscha',
    img: '/images/guide/padparadscha.png',
    intro: 'The rarest and most prized of all sapphires, padparadscha must show a delicate, balanced blend of pink and orange.',
    whatToLookFor: 'A pastel to medium saturation where pink and orange are simultaneously visible. Avoid stones that are purely orange or purely pink.',
    metrics: {
      colour: 'The ideal is often described as a "lotus blossom" or "sunset". The balance of pink to orange dictates the premium.',
      clarity: 'Because of their light tone, inclusions are easily visible. High clarity is essential for top pricing.',
      cut: 'Usually cut to retain maximum weight from rare rough. Asymmetrical shapes are common, but face-up beauty must remain.',
      carat: 'Extremely rare in large sizes. Anything above 2 carats of fine quality commands a massive premium.',
      origin: 'Sri Lanka is the classic and most respected origin. Madagascar stones exist but may trade at a slight discount.',
      treatments: 'Heat treatment is common. Beryllium diffusion (lattice diffusion) is heavily penalized and must be disclosed.',
      certification: 'A top-tier lab report (e.g., GRS, SSEF, Gübelin) is mandatory to confirm the "Padparadscha" colour call.',
      pricing: 'Highly subjective. The exact hue balance dictates value more than strict grading rules. Unheated stones fetch astronomical prices.'
    }
  },
  {
    id: 'ruby',
    name: 'Ruby',
    img: '/images/guide/ruby.png',
    intro: 'The king of precious stones. A true ruby commands respect and requires careful evaluation of both colour and origin.',
    whatToLookFor: 'A vibrant, highly saturated pure red with minimal secondary tones (purple or orange) and strong fluorescence.',
    metrics: {
      colour: '"Pigeon Blood" is the highest trade standard (a vivid red with soft fluorescence). Dark, brownish reds are heavily discounted.',
      clarity: 'Rubies are naturally more included than sapphires. Eye-clean stones are exceptionally rare and priced accordingly.',
      cut: 'Often cut deep or slightly asymmetrical to save weight. A well-proportioned ruby with no window is a rarity.',
      carat: 'Price jumps exponentially over 1 carat, and again massively over 3 carats. Large, fine rubies are among the most expensive gems.',
      origin: 'Burma (Myanmar) is the most prestigious. Mozambique provides excellent modern material. Sri Lanka offers brighter, pinkish-reds.',
      treatments: 'Heating is standard. Lead-glass filling (fracture filling) makes low-grade material look good but destroys intrinsic value.',
      certification: 'Crucial for verifying unheated status, confirming origin, and ruling out lead-glass filling.',
      pricing: 'Unheated Burmese rubies hold the absolute top tier. Mozambican rubies offer exceptional colour at slightly more accessible levels.'
    }
  },
  {
    id: 'alexandrite',
    name: 'Alexandrite',
    img: '/images/guide/alexandrite.png',
    intro: 'The most famous colour-change gemstone, described historically as "emerald by day, ruby by night".',
    whatToLookFor: 'A distinct, complete colour change from green/bluish-green in daylight to purplish-red in incandescent light.',
    metrics: {
      colour: 'The strength (percentage) of the colour change is the primary value driver. A 100% change is ideal but exceptionally rare.',
      clarity: 'Often heavily included. Clean stones are highly prized, but clarity is always secondary to the colour change.',
      cut: 'Frequently cut in mixed shapes (brilliant crown, step pavilion). Look for stones where the cut maximizes the colour switch.',
      carat: 'Extremely rare over 1 carat. A clean, strong-change alexandrite over 2 carats is a museum-quality piece.',
      origin: 'Russia (Ural Mountains) is the legendary, nearly exhausted source. Brazil, Sri Lanka, and East Africa provide modern supply.',
      treatments: 'Typically untreated. However, synthetic alexandrite is common in the market and must be guarded against.',
      certification: 'Essential to confirm natural origin (vs synthetic) and to objectively grade the percentage of colour change.',
      pricing: 'A 1-carat stone with strong change will easily surpass the price of a fine sapphire or diamond of equal weight.'
    }
  },
  {
    id: 'cats-eye',
    name: 'Cat\'s Eye',
    img: '/images/guide/cats-eye.png',
    intro: 'Chrysoberyl cat\'s eye is the benchmark for all chatoyant (cat\'s eye) gemstones, prized for its sharp, distinct optical effect.',
    whatToLookFor: 'A sharp, straight, silvery-white line perfectly centered on the cabochon that glides smoothly when the stone is tilted.',
    metrics: {
      colour: '"Honey" (a rich, golden-brown) is the most valuable. "Apple green" and pale yellows are also common.',
      clarity: 'Must contain the microscopic parallel rutile needles that cause the eye, but should otherwise be semi-transparent, not opaque.',
      cut: 'Must be cut as a cabochon (domed). The height of the dome dictates the sharpness of the eye. A flat dome ruins the effect.',
      carat: 'Available in larger sizes, but finding a perfectly centered, sharp eye in a large stone remains difficult and expensive.',
      origin: 'Sri Lanka is the premier historical and current source for top-quality chrysoberyl cat\'s eyes.',
      treatments: 'Generally untreated. Irradiated (radioactive) cat\'s eyes from other materials exist but true chrysoberyl is rarely treated.',
      certification: 'Needed to confirm it is true Chrysoberyl (and not quartz or apatite) and that it is untreated.',
      pricing: 'Determined by the sharpness of the eye and the "milk and honey" effect (one side of the stone appearing milky, the other honey-coloured).'
    }
  },
  {
    id: 'spinel',
    name: 'Spinel',
    img: '/images/guide/spinel.png',
    intro: 'Historically mistaken for ruby, spinel is now celebrated in its own right for its incredible brilliance and lack of treatments.',
    whatToLookFor: 'Intense, neon-like saturation and exceptional brilliance. Fine spinels should sparkle more than sapphires.',
    metrics: {
      colour: 'Vivid "Jedi" pinks/reds and cobalt blues are the top tier. Greys, lavenders, and pastel pinks offer great value.',
      clarity: 'Often much cleaner than ruby. Eye-clean material is expected in fine grades.',
      cut: 'Well-cut spinels are breathtaking due to their high refractive index. Avoid shallow stones with large windows.',
      carat: 'Readily available under 2 carats. Top colours (vivid red or cobalt blue) over 3 carats are exceedingly rare.',
      origin: 'Burma, Tajikistan, and Tanzania (Mahenge) produce the finest reds/pinks. Sri Lanka produces excellent blues and pastels.',
      treatments: 'One of the few major gemstones that is almost never treated (unheated).',
      certification: 'Useful to verify natural origin (synthetic spinel is very common) and specifically to confirm "Cobalt" variety if blue.',
      pricing: 'Red and cobalt blue rival sapphire prices. Pastels and greys are highly affordable and trendy.'
    }
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire',
    img: '/images/guide/yellow-sapphire.png',
    intro: 'A bright, cheerful gemstone deeply embedded in Vedic astrology and highly popular for vibrant engagement rings.',
    whatToLookFor: 'A pure, intense "canary" or "lemon" yellow without any brownish or greenish secondary modifiers.',
    metrics: {
      colour: 'Vivid, highly saturated yellows are best. Pale yellows can look washed out, while brownish yellows look muddy.',
      clarity: 'Generally very clean. Because of the light tone, any dark inclusions are immediately visible and lower the value.',
      cut: 'Often cut perfectly to maximize brilliance. They take an excellent polish and sparkle beautifully when well-proportioned.',
      carat: 'Available in larger sizes (5-10 carats) much more readily than blue or padparadscha sapphires.',
      origin: 'Sri Lanka is the undisputed world leader for fine, bright yellow sapphires.',
      treatments: 'Heating is standard. Beryllium diffusion is common to artificially induce deep yellow/orange and must be disclosed.',
      certification: 'Crucial to rule out Beryllium diffusion, which drastically lowers the value compared to standard heating or unheated stones.',
      pricing: 'More affordable than blue sapphire. Unheated stones carry a significant premium, especially for astrological purposes.'
    }
  },
  {
    id: 'pink-sapphire',
    name: 'Pink Sapphire',
    img: '/images/guide/pink-sapphire.png',
    intro: 'Ranging from delicate baby pink to intense magenta, pink sapphires offer incredible brilliance and durability.',
    whatToLookFor: 'A vivid, saturated pink that doesn\'t lean too heavily into purple or wash out into a pale, icy tone.',
    metrics: {
      colour: '"Hot pink" or "magenta" commands the highest prices. Pastel pinks are beautiful but trade at a lower tier.',
      clarity: 'Usually quite clean. Silk can give the stone a glowing, velvety appearance.',
      cut: 'Should be cut to eliminate windows and maximize the bright internal reflections characteristic of the colour.',
      carat: 'Price jumps significantly at the 2 and 3 carat marks. Large hot pinks are extremely rare.',
      origin: 'Madagascar and Sri Lanka are the primary sources for fine pinks today.',
      treatments: 'Heating is common to remove purplish tints or improve clarity.',
      certification: 'Important for high-value stones to confirm whether the colour is naturally occurring or achieved through standard heating.',
      pricing: 'Positioned between yellow and blue sapphires in price. Vivid "bubblegum" pinks command the highest premiums in this category.'
    }
  }
];

const checklist = [
  'View in daylight and lamp light',
  'Tilt the stone to check for a window',
  'Confirm treatment disclosure in writing',
  'Match report numbers to the stone\'s dimensions',
  'Compare at least three stones before deciding'
];

export default function GemstoneGuidePage() {
  const [activeTab, setActiveTab] = useState(gemstoneData[0].id);
  const activeStone = gemstoneData.find(s => s.id === activeTab) || gemstoneData[0];

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p className="eyebrow" style={{ color: 'var(--text-accent)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>BUYING GUIDES</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', lineHeight: 1.15 }}>Select a gemstone</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Each guide follows the same structure so you can compare varieties directly.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          {gemstoneData.map((stone) => {
            const isActive = activeTab === stone.id;
            return (
              <button
                key={stone.id}
                onClick={() => setActiveTab(stone.id)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'transparent',
                  border: isActive ? '1px solid var(--text-accent)' : '1px solid var(--border-color)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderRadius: '2px'
                }}
              >
                {stone.name}
              </button>
            );
          })}
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg-grid">
          
          {/* Left Column: Image & Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStone.id + '-img'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  position: 'relative',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  padding: '2rem',
                  boxShadow: '0 8px 30px rgba(0, 33, 71, 0.04)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image src={activeStone.img} alt={activeStone.name} fill style={{ objectFit: 'contain' }} />
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '4px', backgroundColor: 'var(--bg-primary)' }}>
              <h4 style={{ color: 'var(--text-accent)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                BUYING CHECKLIST
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {checklist.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Check size={16} color="var(--text-accent)" style={{ marginTop: '4px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Stone Details */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStone.id + '-content'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                    {activeStone.name}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '800px' }}>
                    {activeStone.intro}
                  </p>
                </div>

                <div style={{ backgroundColor: 'rgba(199, 164, 80, 0.05)', border: '1px solid rgba(199, 164, 80, 0.2)', padding: '2rem', borderRadius: '4px' }}>
                  <h4 style={{ color: 'var(--text-accent)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    WHAT TO LOOK FOR
                  </h4>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                    {activeStone.whatToLookFor}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {Object.entries(activeStone.metrics).map(([key, value]) => (
                    <div key={key} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-primary)' }}>
                      <h4 style={{ color: 'var(--text-accent)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Small inline style for the responsive grid layout to match the original */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .lg-grid {
            grid-template-columns: 350px 1fr !important;
          }
        }
      `}} />
    </main>
  );
}
