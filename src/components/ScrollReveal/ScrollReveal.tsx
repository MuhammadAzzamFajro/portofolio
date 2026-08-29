'use client';

import { useEffect } from 'react';

// Interactive FX engine (no deps):
//  1. Scroll reveal    — `.in-view` on sections as they enter view.
//  2. Cursor spotlight — light following the pointer (--mx/--my on body).
//  3. Title decode     — section titles scramble then resolve on reveal.
//  4. Card tilt        — `.glass` cards tilt in 3D toward the cursor.
//  5. Magnetic buttons — `.btn-premium` drift toward a nearby cursor.
//  6. Particle trail   — dots trailing the pointer on a full-screen canvas.
export default function ScrollReveal() {
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const cleanup: Array<() => void> = [];

        // ---- 1. Reveal + 3. decode ----------------------------------------
        const GLYPHS = '!<>-_\\/[]{}=+*^?#________0123456789';
        const scramble = (el: HTMLElement) => {
            const final = el.textContent || '';
            if (reduce) return;
            let frame = 0;
            const total = 22;
            const tick = () => {
                let out = '';
                const revealed = Math.floor((frame / total) * final.length);
                for (let i = 0; i < final.length; i++) {
                    if (final[i] === ' ') { out += ' '; continue; }
                    out += i < revealed ? final[i]
                        : GLYPHS[(frame * 7 + i * 13) % GLYPHS.length];
                }
                el.textContent = out;
                if (frame++ <= total) requestAnimationFrame(tick);
                else el.textContent = final;
            };
            tick();
        };

        const sections = document.querySelectorAll<HTMLElement>('main > section:not(#home)');
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (!e.isIntersecting) return;
                e.target.classList.add('in-view');
                const t = e.target.querySelector<HTMLElement>('.section-title');
                if (t && t.childElementCount === 0) scramble(t);
                observer.unobserve(e.target);
            }),
            { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
        );
        sections.forEach((el) => observer.observe(el));
        cleanup.push(() => observer.disconnect());

        // Everything below is pointer-driven eye-candy: skip if coarse/reduced.
        if (reduce || !fine) return () => cleanup.forEach((fn) => fn());

        // ---- 2. Spotlight --------------------------------------------------
        let raf = 0, px = innerWidth / 2, py = innerHeight / 2;
        const onMove = (e: PointerEvent) => {
            px = e.clientX; py = e.clientY;
            if (!raf) raf = requestAnimationFrame(() => {
                document.body.style.setProperty('--mx', px + 'px');
                document.body.style.setProperty('--my', py + 'px');
                raf = 0;
            });
        };
        addEventListener('pointermove', onMove, { passive: true });
        cleanup.push(() => { removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf); });

        // ---- 4. Card tilt --------------------------------------------------
        const onTilt = (e: PointerEvent) => {
            const card = (e.target as HTMLElement).closest<HTMLElement>('.glass');
            if (!card) return;
            const r = card.getBoundingClientRect();
            const cx = (e.clientX - r.left) / r.width - 0.5;
            const cy = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform =
                `perspective(800px) rotateX(${-cy * 10}deg) rotateY(${cx * 10}deg) translateY(-6px)`;
        };
        const onTiltOut = (e: PointerEvent) => {
            const card = (e.target as HTMLElement).closest<HTMLElement>('.glass');
            if (card) card.style.transform = '';
        };
        document.querySelectorAll<HTMLElement>('.glass').forEach((c) => {
            c.style.transition = 'transform 0.2s ease-out';
            c.addEventListener('pointermove', onTilt);
            c.addEventListener('pointerleave', onTiltOut);
            cleanup.push(() => {
                c.removeEventListener('pointermove', onTilt);
                c.removeEventListener('pointerleave', onTiltOut);
            });
        });

        // ---- 5. Magnetic buttons ------------------------------------------
        const onMag = (e: PointerEvent) => {
            const b = e.currentTarget as HTMLElement;
            const r = b.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            b.style.transform = `translate(${dx * 0.3}px, ${dy * 0.4}px)`;
        };
        const onMagOut = (e: PointerEvent) => { (e.currentTarget as HTMLElement).style.transform = ''; };
        document.querySelectorAll<HTMLElement>('.btn-premium').forEach((b) => {
            b.style.transition = 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)';
            b.addEventListener('pointermove', onMag);
            b.addEventListener('pointerleave', onMagOut);
            cleanup.push(() => {
                b.removeEventListener('pointermove', onMag);
                b.removeEventListener('pointerleave', onMagOut);
            });
        });

        // ---- 6. Particle trail (canvas) -----------------------------------
        const canvas = document.createElement('canvas');
        canvas.className = 'fx-trail';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d')!;
        let w = 0, h = 0;
        const resize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
        resize();
        addEventListener('resize', resize);
        const parts: { x: number; y: number; life: number }[] = [];
        const onTrail = (e: PointerEvent) => parts.push({ x: e.clientX, y: e.clientY, life: 1 });
        addEventListener('pointermove', onTrail, { passive: true });
        let loop = 0;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (let i = parts.length - 1; i >= 0; i--) {
                const p = parts[i];
                p.life -= 0.03;
                if (p.life <= 0) { parts.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.life * 5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,102,255,${p.life * 0.4})`;
                ctx.fill();
            }
            loop = requestAnimationFrame(draw);
        };
        draw();
        cleanup.push(() => {
            cancelAnimationFrame(loop);
            removeEventListener('resize', resize);
            removeEventListener('pointermove', onTrail);
            canvas.remove();
        });

        return () => cleanup.forEach((fn) => fn());
    }, []);

    return <div className="cursor-spotlight" aria-hidden="true" />;
}
