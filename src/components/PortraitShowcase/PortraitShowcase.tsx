'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Gem, 
  MessageCircle 
} from 'lucide-react';
import styles from './PortraitShowcase.module.css';

const PortraitShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play first; if browser blocks, fallback to muted autoplay
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setIsPlaying(true);
        })
        .catch(() => {
          // Modern browsers block autoplay with sound by default without prior interaction
          video.muted = true;
          video.play()
            .then(() => {
              setIsMuted(true);
              setIsPlaying(true);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        });
    }

    // Auto-unmute on first user click anywhere on page if still muted
    const enableSoundOnInteraction = () => {
      if (video && video.muted && !hasInteracted) {
        video.muted = false;
        setIsMuted(false);
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', enableSoundOnInteraction, { once: true });
    window.addEventListener('touchstart', enableSoundOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', enableSoundOnInteraction);
      window.removeEventListener('touchstart', enableSoundOnInteraction);
    };
  }, [hasInteracted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    setHasInteracted(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Left: Portrait Video Frame */}
        <motion.div 
          className={styles.videoCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.portraitCard} onClick={togglePlay}>
            {/* Ambient luxury halo */}
            <div className={styles.ambientGlow} />

            <div className={styles.videoWrapper}>
              <video
                ref={videoRef}
                src="/videos/hero.mp4"
                playsInline
                autoPlay
                loop
                muted={isMuted}
                className={styles.video}
              />

              {/* Status overlay badge */}
              <div className={styles.videoBadge}>
                <span className={styles.livePulse} />
                <span>Live Vault Footage</span>
              </div>

              {/* Floating Sound Toggle */}
              <button 
                type="button"
                className={`${styles.soundBtn} ${isMuted ? styles.soundBtnMuted : styles.soundBtnActive}`}
                onClick={toggleSound}
                aria-label={isMuted ? "Unmute video with sound" : "Mute video"}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={16} />
                    <span>Tap for Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    <span>Sound On</span>
                    <span className={styles.equalizer}>
                      <span className={styles.bar} />
                      <span className={styles.bar} />
                      <span className={styles.bar} />
                    </span>
                  </>
                )}
              </button>

              {/* Play/Pause Indicator if paused */}
              {!isPlaying && (
                <div className={styles.playOverlay}>
                  <div className={styles.playIconCircle}>
                    <Play size={28} fill="currentColor" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom card reflection line */}
            <div className={styles.cardFooter}>
              <span>Handcrafted in Sri Lanka • 4K Macro Inspection</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Editorial Narrative */}
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.tag}>
            <Sparkles size={14} />
            <span>Artistry in Motion</span>
          </div>

          <h2 className={styles.title}>
            Living Brilliance, <br />
            Untouched by Heat
          </h2>

          <p className={styles.description}>
            True gemstones are dynamic masterpieces of light. Observe the intense velvety saturation, silky pleochroism, and razor-sharp pavilion reflections that only natural, ethically mined Ceylon gems possess.
          </p>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <Gem size={20} />
              </div>
              <div>
                <h4 className={styles.featureHeading}>100% Unheated Provenance</h4>
                <p className={styles.featureSub}>Directly sourced from the artisanal gravels of Ratnapura and Elahera.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className={styles.featureHeading}>Independent Laboratory Verification</h4>
                <p className={styles.featureSub}>Every acquisition comes with accredited GIA, GRS, or Gübelin certification.</p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/gemstones" className="btn btn-primary">
              <span>Explore Vault Collection</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href="https://wa.me/17738850603?text=Hello%20Gemfort%20International%2C%20I%20saw%20your%20video%20showcase%20and%20would%20like%20to%20inquire%20about%20your%20current%20inventory."
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageCircle size={18} />
              <span>Private Consultation</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PortraitShowcase;
