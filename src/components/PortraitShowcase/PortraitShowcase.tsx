'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Gem 
} from 'lucide-react';
import styles from './PortraitShowcase.module.css';

const PortraitShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Ensure native mobile attributes are set for iOS Safari and Android Chrome
    video.muted = isMuted;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    // ONLY play when the user scrolls and reaches the video section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User reached the video section: play automatically
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // If browser blocks unmuted playback, ensure muted and play
                  video.muted = true;
                  setIsMuted(true);
                  video.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
                });
            }
          } else {
            // User scrolled away from the video section: pause
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section enters viewport
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isMuted]);

  const toggleSound = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
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
    <section ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Left: Portrait Video Frame (Desktop & Mobile) */}
        <motion.div 
          className={styles.videoCol}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.portraitCard} onClick={togglePlay}>
            {/* Ambient luxury halo */}
            <div className={styles.ambientGlow} />

            <div className={styles.videoWrapper}>
              <video
                ref={videoRef}
                src="/videos/hero.mp4"
                playsInline
                loop
                muted={isMuted}
                preload="metadata"
                className={styles.video}
              />

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

              {/* Play Indicator when paused */}
              {!isPlaying && (
                <div className={styles.playOverlay}>
                  <div className={styles.playIconCircle}>
                    <Play size={28} fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right: Editorial Narrative */}
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
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
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PortraitShowcase;
