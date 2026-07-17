import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

/* ─────────────────────────────────────────────────────────────
   Motion-safe: everything below is skipped when the user asks
   for reduced motion (CSS already renders every section legibly).
───────────────────────────────────────────────────────────────*/
mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* Hero intro — staggered rise on load */
    const heroFx = gsap.utils.toArray<HTMLElement>('#top .fx');
    gsap.set(heroFx, { opacity: 0, y: 28 });
    gsap.to(heroFx, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
    });

    /* Scroll reveals for every other .fx element */
    const rest = gsap
        .utils.toArray<HTMLElement>('.fx')
        .filter((el) => !heroFx.includes(el));
    rest.forEach((el) => {
        gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
        );
    });
});

/* ─────────────────────────────────────────────────────────────
   Pinned scrollytelling Skills — desktop + motion-safe only.
   The sticky element does the pinning; ScrollTrigger just reads
   progress and drives the category/panel/item state.
───────────────────────────────────────────────────────────────*/
mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const skills = document.querySelector<HTMLElement>('#skills');
    if (!skills) return;

    const cats   = gsap.utils.toArray<HTMLElement>('.cat-item', skills);
    const panels = gsap.utils.toArray<HTMLElement>('.cat-panel', skills);
    const dots   = gsap.utils.toArray<HTMLElement>('.prog-dot', skills);
    const N = panels.length;

    const activate = (idx: number, local: number) => {
        cats.forEach((c, i) => {
            const on = i === idx;
            c.style.opacity = on ? '1' : '0.3';
            const num = c.querySelector<HTMLElement>('.cat-num');
            const nm  = c.querySelector<HTMLElement>('.cat-name');
            if (num) num.style.color = on ? '#6f7cff' : '#5b5a50';
            if (nm)  nm.style.color  = on ? '#f3f0e9' : '#5b5a50';
        });

        dots.forEach((d, i) => {
            d.style.background = i <= idx ? '#6f7cff' : '#3b3a31';
        });

        panels.forEach((pl, i) => {
            const on = i === idx;
            pl.style.opacity = on ? '1' : '0';
            pl.style.transform = on
                ? 'translateY(0)'
                : i < idx
                    ? 'translateY(-24px)'
                    : 'translateY(24px)';
            pl.style.pointerEvents = on ? 'auto' : 'none';

            if (on) {
                const items = gsap.utils.toArray<HTMLElement>('.sk-item', pl);
                const show = Math.max(1, Math.ceil(local * items.length));
                items.forEach((it, j) => {
                    const vis = j < show;
                    it.style.opacity = vis ? '1' : '0.15';
                    it.style.transform = vis ? 'translateX(0)' : 'translateX(20px)';
                });
            }
        });
    };

    activate(0, 0.2);

    ScrollTrigger.create({
        trigger: skills,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(N - 1, Math.floor(p * N));
            const local = p * N - idx;
            activate(idx, local);
        },
    });
});
