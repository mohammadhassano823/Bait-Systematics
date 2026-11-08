'use client';

import { useEffect, useRef } from 'react';

export default function HomeHeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = videoRef.current;
    let visible = true;
    let ready = true; // no intro splash any more, so the video can start straight away
    video.defaultPlaybackRate = 0.65;
    video.playbackRate = 0.65;
    const syncMotion = () => {
      video.playbackRate = 0.65;
      if (preference.matches || !ready || !visible || document.hidden || video.readyState < 3) video.pause();
      else video.play().catch(() => {});
    };
    const onReady = () => { ready = true; syncMotion(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncMotion(); }, { threshold: 0.05 });
    observer.observe(video);
    video.addEventListener('canplay', syncMotion);
    window.addEventListener('stackforge:intro-ready', onReady);
    document.addEventListener('visibilitychange', syncMotion);
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => { observer.disconnect(); video.pause(); video.removeEventListener('canplay', syncMotion); window.removeEventListener('stackforge:intro-ready', onReady); document.removeEventListener('visibilitychange', syncMotion); preference.removeEventListener('change', syncMotion); };
  }, []);

  return <>
    <div className="sf-home-hero-video" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: '#101010' }}>
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'blur(0.4px)', transform: 'scale(1.005)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,18,24,0.42)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #101010 0%, rgba(16,16,16,0.15) 16%, transparent 32%)' }} />
    </div>
  </>;
}
