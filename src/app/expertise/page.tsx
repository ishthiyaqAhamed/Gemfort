'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Search, Scissors, Stamp, PackageSearch, Gem, Globe2, BookOpen, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-react';

const stages = [
  { id: '01', title: 'Source', desc: 'Rough selected from Sri Lankan gem gravels and trusted suppliers.' },
  { id: '02', title: 'Evaluate', desc: 'Colour, transparency and inclusions read before cutting.' },
  { id: '03', title: 'Cut', desc: 'Orientation and proportions set to maximise face-up colour.' },
  { id: '04', title: 'Polish', desc: 'Every facet finished cleanly, with sharp meets and symmetry.' },
  { id: '05', title: 'Test', desc: 'Identity and treatment confirmed under magnification.' },
  { id: '06', title: 'Certify', desc: 'Independent laboratory report where value warrants it.' },
  { id: '07', title: 'Deliver', desc: 'Insured, documented shipping to the buyer\'s country.' }
];

export default function ExpertisePage() {
  return (
    <main>
      <PageHeader 
        title="Our Expertise" 
        subtitle="Sourcing, Cutting & Certification" 
        imagePath="/images/hero-bg-blue.jpg"
      />
      
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '6rem' }}
          >
            <p className="eyebrow">Craft</p>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Skill applied where it counts</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>
              Gemstone buying rests on trust. We would rather earn it through documentation and process than through claims. Two stones from the same parcel can end up worlds apart in value. The difference is rarely luck — it is how the rough was read and how the cutter chose to treat it.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            
            {/* Sourcing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}
            >
              <div>
                <p className="eyebrow">Sourcing</p>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '2.2rem' }}>Where our stones begin</h2>
                
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Local sourcing</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  China Fort traders have built strong relationships over several decades with local gem miners and dealers operating in major mining regions such as Ratnapura, Nithigala, Idangoda, Eheliyagoda and Pelmadulla. Experienced buyers use a combination of traditional techniques and modern methods. Stones may be exposed to direct sunlight to observe natural characteristics, or placed in clean water against a white background to study colour distribution.
                </p>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>International sourcing</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  In addition to sourcing gemstones within Sri Lanka, our traders travel internationally in search of exceptional stones. Their sourcing activities extend to Madagascar (Ikaka and Ambatondrazaka), Tanzania (Tunduru), Mozambique, Kenya, and Burma. These gemstones are brought to China Fort, where highly experienced lapidaries cut and polish them.
                </p>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="/images/custom-sourcing.png" alt="Sourcing" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>

            {/* Cutting & Polishing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', order: -1 }}>
                <Image src="/images/about-preview.jpg" alt="Cutting" fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <p className="eyebrow">Craftsmanship</p>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '2.2rem' }}>Cutting & Polishing</h2>
                
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Gem cutting</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Gem cutting is the specialised art of transforming a rough gemstone into an attractive, lustrous stone suitable for jewellery. A skilled cutter needs accurate eyesight, strong judgement, extensive experience, and an artistic understanding of shape and proportion. Our cutters have mastered a wide range of faceted shapes including emerald cut, brilliant cut, Ceylon cut, cushion and shield shapes.
                </p>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Polishing</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  The cutting stage establishes the overall shape. Polishing then develops its final lustre and brilliance through a series of carefully completed faceting stages. An experienced polisher understands how different proportions and facets influence the way colour appears within a stone.
                </p>
              </div>
            </motion.div>

            {/* Testing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}
            >
              <div>
                <p className="eyebrow">Verification</p>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '2.2rem' }}>Testing & Certification</h2>
                
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Gem laboratories in China Fort use modern technologies and are supported by professionals from internationally recognised gemological institutes. Gemstones are submitted for testing to determine important characteristics, including heat treatment or synthetics.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  A standard report includes identity, date of testing, weight, dimensions, colour, variety and comments regarding indications of treatment. A detailed report may also include cut, clarity and origin.
                </p>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Recognised Laboratories</h3>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                  <li>EGL – Emteem Gem Laboratory</li>
                  <li>GIC – Gemological Institute Colombo</li>
                  <li>TGL – Tourmaline Lanka Gem Lab</li>
                  <li>PGTL – Precious Gem Testing Lab</li>
                  <li>CGL – Ceylon Gem Laboratories</li>
                  <li>AIGS & AGTL</li>
                </ul>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="/images/journal/5.jpg" alt="Testing" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The 7 Stages */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="eyebrow">The Process</p>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '2.5rem' }}>Seven stages, one stone</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Nothing skips a stage, regardless of the value of the material.</p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .timeline-grid {
              display: grid;
              gap: 3.5rem 5rem;
            }
            .timeline-card {
              position: relative;
              background-color: var(--bg-primary);
              padding: 2.5rem 2rem;
              border-radius: 16px;
              border: 1px solid rgba(0,33,71,0.06);
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              box-shadow: 0 10px 40px rgba(0,0,0,0.03);
            }
            .timeline-arrow-right, .timeline-arrow-down, .timeline-arrow-left {
              position: absolute;
              display: none;
              color: var(--text-accent);
              opacity: 0.9;
            }
            .timeline-arrow-right {
              right: -3rem;
              top: 50%;
              transform: translate(50%, -50%);
            }
            .timeline-arrow-left {
              left: -3rem;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            .timeline-arrow-down {
              bottom: -2.2rem;
              left: 50%;
              transform: translate(-50%, 50%);
            }

            /* Assign grid areas */
            .timeline-card:nth-child(1) { grid-area: card1; }
            .timeline-card:nth-child(2) { grid-area: card2; }
            .timeline-card:nth-child(3) { grid-area: card3; }
            .timeline-card:nth-child(4) { grid-area: card4; }
            .timeline-card:nth-child(5) { grid-area: card5; }
            .timeline-card:nth-child(6) { grid-area: card6; }
            .timeline-card:nth-child(7) { grid-area: card7; }

            /* Desktop */
            @media (min-width: 993px) {
              .timeline-grid {
                grid-template-columns: repeat(3, 1fr);
                grid-template-areas:
                  "card1 card2 card3"
                  "card6 card5 card4"
                  "card7 . .";
              }
              .timeline-card:nth-child(1) .timeline-arrow-right { display: block; }
              .timeline-card:nth-child(2) .timeline-arrow-right { display: block; }
              .timeline-card:nth-child(3) .timeline-arrow-down { display: block; }
              
              .timeline-card:nth-child(4) .timeline-arrow-left { display: block; }
              .timeline-card:nth-child(5) .timeline-arrow-left { display: block; }
              .timeline-card:nth-child(6) .timeline-arrow-down { display: block; }
            }

            /* Tablet */
            @media (max-width: 992px) and (min-width: 769px) {
              .timeline-grid {
                grid-template-columns: repeat(2, 1fr);
                grid-template-areas:
                  "card1 card2"
                  "card4 card3"
                  "card5 card6"
                  "card8 card7";
              }
              .timeline-card:nth-child(1) .timeline-arrow-right { display: block; }
              .timeline-card:nth-child(2) .timeline-arrow-down { display: block; }
              .timeline-card:nth-child(3) .timeline-arrow-left { display: block; }
              .timeline-card:nth-child(4) .timeline-arrow-down { display: block; }
              .timeline-card:nth-child(5) .timeline-arrow-right { display: block; }
              .timeline-card:nth-child(6) .timeline-arrow-down { display: block; }
            }

            /* Mobile */
            @media (max-width: 768px) {
              .timeline-grid {
                grid-template-columns: 1fr;
                grid-template-areas:
                  "card1"
                  "card2"
                  "card3"
                  "card4"
                  "card5"
                  "card6"
                  "card7";
              }
              .timeline-card .timeline-arrow-down {
                display: block;
              }
              .timeline-card:last-child .timeline-arrow-down {
                display: none;
              }
            }
          `}} />

          <div className="timeline-grid" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
            {stages.map((stage, i) => (
              <motion.div 
                key={stage.id}
                className="timeline-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <div style={{ fontSize: '3rem', color: 'rgba(199, 164, 80, 0.6)', fontWeight: 400, fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: '1rem' }}>
                  {stage.id}
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)' }}>{stage.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{stage.desc}</p>

                <div className="timeline-arrow-right">
                  <ArrowRight size={36} strokeWidth={2} />
                </div>
                <div className="timeline-arrow-left">
                  <ArrowLeft size={36} strokeWidth={2} />
                </div>
                <div className="timeline-arrow-down">
                  <ArrowDown size={36} strokeWidth={2} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '2.5rem' }}>Our Capabilities</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Globe2 size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Authentic sourcing</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Rough is bought at source and through established trade relationships in Beruwala, keeping the chain from gravel to finished stone short.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Gem size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Sri Lankan expertise</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Working daily with Ceylon material means recognising what is typical, what is exceptional and what does not add up.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <BookOpen size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Generational knowledge</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Rough evaluation is learned by handling thousands of stones. That experience sits behind every purchase we make.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Search size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Rough evaluation</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Transparency, colour distribution, crystal shape and inclusion position are assessed before any cutting decision is taken.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Scissors size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Cutting and polishing</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Stones are cut for beauty rather than weight: correct orientation, no windows, symmetrical outlines and a high final polish.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Stamp size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Certification</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Independent laboratory reports are arranged for significant stones, covering identity, treatment and origin where relevant.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <PackageSearch size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>International experience</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Documentation, invoicing and insured logistics prepared for buyers in Europe, North America, Asia and the Gulf.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <ShieldCheck size={24} color="var(--text-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Ethical trading</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>Treatment disclosure in writing, honest grading language and clear pricing on every transaction.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
