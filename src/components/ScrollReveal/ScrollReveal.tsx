'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — GSAP ScrollTrigger based reveal.
 * 1. Section titles: splits each title per word, masks each word, and animates with stagger 90ms.
 * 2. [data-reveal] elements: smooth fade & slide up.
 * 3. Respects reduced motion preferences.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    if (isReduced) {
      document.querySelectorAll<HTMLElement>('.section-title, [data-reveal]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Judul Section: pecah per kata, naik dari balik garis (mask) stagger 90ms
      const titles = document.querySelectorAll<HTMLElement>('.section-title');
      titles.forEach((title) => {
        if (title.getAttribute('data-split') === 'true') return;
        title.setAttribute('data-split', 'true');

        const childNodes = Array.from(title.childNodes);
        const words: HTMLElement[] = [];
        title.innerHTML = '';

        childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            const splitWords = text.trim().split(/\s+/).filter(Boolean);
            splitWords.forEach((word) => {
              const mask = document.createElement('span');
              mask.style.display = 'inline-block';
              mask.style.overflow = 'hidden';
              mask.style.verticalAlign = 'bottom';
              mask.style.marginRight = '0.28em';
              mask.style.paddingBottom = '0.08em';

              const span = document.createElement('span');
              span.style.display = 'inline-block';
              span.textContent = word;
              mask.appendChild(span);
              title.appendChild(mask);
              words.push(span);
            });
          } else if (node.nodeName === 'BR') {
            title.appendChild(document.createElement('br'));
          } else {
            title.appendChild(node.cloneNode(true));
          }
        });

        gsap.from(words, {
          yPercent: 120,
          duration: 0.85,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // 2. Generic [data-reveal] elements
      const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => {
        const delay = (parseFloat(el.dataset.revealDelay || '0') / 1000);
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
