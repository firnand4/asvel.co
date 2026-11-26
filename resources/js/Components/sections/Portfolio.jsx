import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../../i18n';

const SPEED_PX_PER_S = 40;
const EASE_PER_S = 4;          // how fast the speed eases towards moving/stopped (~0.5s)
const RESUME_AFTER_MS = 3000;  // autoplay resumes this long after a manual move ends
const FLING_FRICTION = 4;      // swipe momentum decay per second
const STEP_MS = 450;           // arrow button animation
const COPIES = 3;              // the list is rendered 3x so any offset/drag shows cards on both sides

const wrap = (x, length) => ((x % length) + length) % length;
const easeInOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// Screenshot from public/<image>; a short icon strip until the file exists.
// In the marquee (`uniform`) every card gets the same image height.
function ProjectImage({ project, uniform }) {
    const [failed, setFailed] = useState(false);
    const src = project.image && !failed ? `/${project.image.replace(/^\/+/, '')}` : null;
    const box = uniform ? 'h-40' : src ? 'aspect-[16/9]' : 'h-24';

    if (src) {
        return (
            <div className={`relative shrink-0 ${box} bg-accent/[0.07] border-b border-line-soft overflow-hidden`}>
                <img
                    src={src}
                    alt={project.title}
                    loading="lazy"
                    draggable="false"
                    onError={() => setFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </div>
        );
    }

    return (
        <div className={`flex shrink-0 ${box} items-center justify-center bg-accent/[0.07] border-b border-line-soft text-4xl`} aria-hidden="true">
            {project.emoji}
        </div>
    );
}

// `uniform` (marquee): fixed width, equal height, clamped text with the problem/result block at the bottom.
// Clamping is visual only; the full text stays in the HTML for screen readers and search engines.
export function ProjectCard({ project: p, t, className = '', hidden = false, uniform = false }) {
    // Full class names so Tailwind generates them
    const clamp = (lines) => (uniform ? { 2: 'line-clamp-2', 3: 'line-clamp-3' }[lines] : '');

    return (
        <div
            className={`bg-surface rounded-lg overflow-hidden border border-line-soft hover:border-brand/40 transition-colors duration-300 group ${uniform ? 'flex flex-col' : ''} ${className}`}
            aria-hidden={hidden || undefined}
        >
            <ProjectImage project={p} uniform={uniform} />

            <div className={`p-5 flex flex-col gap-2 ${uniform ? 'flex-1' : ''}`}>
                {p.category && (
                    <span className="self-start text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                        {p.category}
                    </span>
                )}

                <h3 className={`text-base font-semibold leading-snug text-fg group-hover:text-brand transition-colors ${clamp(2)}`} title={uniform ? p.title : undefined}>
                    {p.title}
                </h3>

                {p.description && (
                    <p className={`text-sm text-muted leading-relaxed ${clamp(3)}`}>
                        {p.description}
                    </p>
                )}

                {(p.tech || []).length > 0 && (
                    <div className={`flex flex-wrap gap-1.5 pt-0.5 ${uniform ? 'max-h-[3.25rem] overflow-hidden' : ''}`}>
                        {p.tech.map(tech => (
                            <span key={tech} className="text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {(p.problem || p.result) && (
                    <div className={`${uniform ? 'mt-auto' : 'mt-1'} pt-3 border-t border-line-soft text-[13px] space-y-2`}>
                        {p.problem && (
                            <div>
                                <span className="text-subtle block font-semibold">{t.portfolio.problem}</span>
                                <p className={`text-muted leading-relaxed ${clamp(2)}`}>{p.problem}</p>
                            </div>
                        )}
                        {p.result && (
                            <div>
                                <span className="text-accent block font-semibold">{t.portfolio.result}</span>
                                <p className={`text-fg-2 leading-relaxed ${clamp(2)}`}>{p.result}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);
    return reduced;
}

const CARD_WIDTH = 'w-[min(380px,85vw)]';
const CARD_GAP = 20; // gap-5
const controlClass = 'grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-fg hover:border-fg/40 transition-colors';

export default function Portfolio({ projects = [] }) {
    const { t } = useLang();
    const ref = useRef(null);
    const viewportRef = useRef(null);
    const trackRef = useRef(null);

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [paused, setPaused] = useState(false);          // pause/play button
    const [interacting, setInteracting] = useState(false); // mouse hover or keyboard focus
    const [dragging, setDragging] = useState(false);
    const [inView, setInView] = useState(false);
    const [fits, setFits] = useState(false);               // all cards fit on screen: no need to move
    const reducedMotion = usePrefersReducedMotion();

    const categories = useMemo(
        () => [...new Set(projects.map(p => p.category).filter(Boolean))],
        [projects]
    );

    const filtering = query.trim() !== '' || category !== '';
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter(p => {
            if (category && p.category !== category) return false;
            if (!q) return true;
            return [p.title, p.category, ...(p.tech || [])]
                .some(value => value && value.toLowerCase().includes(q));
        });
    }, [projects, query, category]);

    const marquee = !filtering && !reducedMotion && !fits;
    const moving = marquee && !paused && !interacting && !dragging && inView;

    // Fade-in on scroll; re-run when the marquee/grid swap re-mounts elements.
    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        items?.forEach(i => obs.observe(i));
        return () => obs.disconnect();
    }, [projects.length, filtering, marquee]);

    // Only animate while the section is on screen.
    useEffect(() => {
        const section = ref.current;
        if (!section) return;
        const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
        obs.observe(section);
        return () => obs.disconnect();
    }, [projects.length]);

    // If one set of cards fits in the container, show it static instead of scrolling it.
    // Computed from the window size (not the DOM) because the marquee is unmounted while static.
    useEffect(() => {
        const measure = () => {
            const vw = window.innerWidth;
            const viewport = vw >= 640 ? Math.min(vw, 1152) - 48 : vw; // phones: the strip runs edge to edge
            const card = Math.min(380, vw * 0.85);
            setFits(projects.length * (card + CARD_GAP) - CARD_GAP <= viewport);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [projects.length]);

    /*
     * Marquee state lives in a ref (no re-render per frame).
     * `offset` is unbounded; it is wrapped by one set's width only when drawn, so dragging or
     * flinging past either end never jumps.
     */
    const motion = useRef({
        offset: 0, speed: 0, fling: 0, tween: null, resumeAt: 0,
        drag: null, moved: false,
    });
    motion.current.auto = moving;

    // Width of one set of cards (distance between card 0 and its first copy).
    const loopWidth = () => {
        const track = trackRef.current;
        const first = track?.children[0];
        const copy = track?.children[projects.length];
        return first && copy ? copy.offsetLeft - first.offsetLeft : 0;
    };

    const holdAutoplay = () => {
        const m = motion.current;
        m.speed = 0;
        m.resumeAt = performance.now() + RESUME_AFTER_MS;
    };

    useEffect(() => {
        if (!marquee) return;
        let frame;
        let last = performance.now();
        const tick = (now) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            const m = motion.current;

            if (m.tween) {
                const k = Math.min(1, (now - m.tween.start) / STEP_MS);
                m.offset = m.tween.from + (m.tween.to - m.tween.from) * easeInOut(k);
                if (k === 1) {
                    m.tween = null;
                    m.resumeAt = now + RESUME_AFTER_MS;
                }
            } else if (!m.drag) {
                if (Math.abs(m.fling) > 5) {
                    m.offset += m.fling * dt;
                    m.fling *= Math.exp(-FLING_FRICTION * dt);
                    if (Math.abs(m.fling) <= 5) m.resumeAt = now + RESUME_AFTER_MS;
                } else {
                    m.fling = 0;
                    const target = m.auto && now >= m.resumeAt ? SPEED_PX_PER_S : 0;
                    m.speed += (target - m.speed) * Math.min(1, dt * EASE_PER_S); // smooth stop / start
                    m.offset += m.speed * dt;
                }
            }

            const track = trackRef.current;
            const length = loopWidth();
            if (track && length) {
                track.style.transform = `translate3d(${-wrap(m.offset, length)}px, 0, 0)`;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [marquee, projects.length]);

    // Horizontal trackpad scroll / shift+wheel. Needs a non-passive listener to stop the page from
    // swallowing it; vertical scrolling is left alone so the page still scrolls normally.
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!marquee || !viewport) return;
        const onWheel = (e) => {
            const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
            if (!dx) return;
            e.preventDefault();
            const m = motion.current;
            m.tween = null;
            m.fling = 0;
            m.offset += dx * (e.deltaMode === 1 ? 16 : 1);
            holdAutoplay();
        };
        viewport.addEventListener('wheel', onWheel, { passive: false });
        return () => viewport.removeEventListener('wheel', onWheel);
    }, [marquee]);

    // Mouse drag and touch swipe (touch-action: pan-y keeps vertical page scrolling on phones).
    const onPointerDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        const m = motion.current;
        m.tween = null;
        m.fling = 0;
        m.speed = 0;
        m.moved = false;
        m.drag = { id: e.pointerId, x: e.clientX, offset: m.offset, lastX: e.clientX, lastT: performance.now(), velocity: 0 };
        try {
            e.currentTarget.setPointerCapture(e.pointerId); // keep receiving moves outside the strip
        } catch {
            // pointer already gone; the drag still works while it stays over the strip
        }
        setDragging(true);
    };

    const onPointerMove = (e) => {
        const m = motion.current;
        if (!m.drag || m.drag.id !== e.pointerId) return;
        const now = performance.now();
        const dx = e.clientX - m.drag.x;
        if (Math.abs(dx) > 4) m.moved = true;
        m.offset = m.drag.offset - dx;
        const dt = (now - m.drag.lastT) / 1000;
        if (dt > 0) {
            // smoothed velocity in offset px/s, used for the release fling
            m.drag.velocity = 0.8 * (-(e.clientX - m.drag.lastX) / dt) + 0.2 * m.drag.velocity;
        }
        m.drag.lastX = e.clientX;
        m.drag.lastT = now;
    };

    const endDrag = (e) => {
        const m = motion.current;
        if (!m.drag || m.drag.id !== e.pointerId) return;
        // no fling if the pointer stopped before release
        const idle = performance.now() - m.drag.lastT > 80;
        m.fling = idle ? 0 : Math.max(-2500, Math.min(2500, m.drag.velocity));
        m.drag = null;
        m.resumeAt = performance.now() + RESUME_AFTER_MS;
        setDragging(false);
    };

    // A drag should not count as a click on whatever is under the pointer.
    const onClickCapture = (e) => {
        if (motion.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            motion.current.moved = false;
        }
    };

    const step = (dir) => {
        const m = motion.current;
        const card = trackRef.current?.children[0];
        if (!card) return;
        const from = m.tween ? m.tween.to : m.offset; // repeated clicks keep stepping from the target
        m.fling = 0;
        m.speed = 0;
        m.tween = { from: m.offset, to: from + dir * (card.offsetWidth + CARD_GAP), start: performance.now() };
    };

    // The marquee unmounts while searching, so a pending hover would never get its "leave" event.
    useEffect(() => {
        setInteracting(false);
        setDragging(false);
        motion.current.drag = null;
    }, [filtering]);

    const interactionHandlers = {
        onPointerEnter: (e) => e.pointerType === 'mouse' && setInteracting(true),
        onPointerLeave: (e) => e.pointerType === 'mouse' && setInteracting(false),
        onFocus: () => setInteracting(true),
        onBlur: (e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
        },
        onPointerDown,
        onPointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
        onClickCapture,
    };

    if (!projects.length) return null;

    const gridItems = filtering ? results : projects;

    return (
        <section id="portfolio" className="py-24 text-fg overflow-hidden" ref={ref}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                    <div className="max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                        <div className="eyebrow mb-4">{t.portfolio.eyebrow}</div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {t.portfolio.title}
                        </h2>

                        <p className="text-muted mt-6 max-w-xl leading-relaxed">
                            {t.portfolio.subtitle}
                        </p>
                    </div>

                    {marquee && (
                        <div className="flex gap-2">
                        <button type="button" onClick={() => step(-1)} aria-label={t.portfolio.prev} className={controlClass}>
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaused(p => !p)}
                            aria-pressed={paused}
                            aria-label={paused ? t.portfolio.play : t.portfolio.pause}
                            title={paused ? t.portfolio.play : t.portfolio.pause}
                            className={controlClass}
                        >
                            {paused ? (
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
                            )}
                        </button>
                        <button type="button" onClick={() => step(1)} aria-label={t.portfolio.next} className={controlClass}>
                            →
                        </button>
                        </div>
                    )}
                </div>

                {/* Search + category filter */}
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="relative md:w-80">
                        <label htmlFor="portfolio-search" className="sr-only">{t.portfolio.searchLabel}</label>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle pointer-events-none" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                        </svg>
                        <input
                            id="portfolio-search"
                            type="search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder={t.portfolio.searchPlaceholder}
                            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-subtle focus:border-brand/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                        />
                    </div>

                    {categories.length > 1 && (
                        <div role="group" aria-label={t.portfolio.filterLabel} className="flex flex-wrap gap-2">
                            {[['', t.portfolio.all], ...categories.map(c => [c, c])].map(([value, label]) => (
                                <button
                                    key={value || 'all'}
                                    type="button"
                                    onClick={() => setCategory(value)}
                                    aria-pressed={category === value}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${category === value
                                        ? 'bg-fg text-page border-fg'
                                        : 'bg-surface text-fg-2 border-line hover:border-fg/40'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <p className="sr-only" aria-live="polite">
                    {filtering ? t.portfolio.found.replace('{n}', results.length) : ''}
                </p>

                {marquee ? (
                    // Moving strip; the copies are decorative so screen readers read each project once.
                    <div
                        ref={viewportRef}
                        {...interactionHandlers}
                        className={`-mx-4 sm:mx-0 overflow-hidden touch-pan-y select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'} fade-up opacity-0 translate-y-6 transition duration-700`}
                    >
                        <div ref={trackRef} className="flex w-max items-stretch gap-5 px-4 sm:px-0 will-change-transform">
                            {Array.from({ length: COPIES }, () => projects).flat().map((p, i) => (
                                <ProjectCard
                                    key={`${p.id ?? i}-${i}`}
                                    project={p}
                                    t={t}
                                    uniform
                                    hidden={i >= projects.length}
                                    className={`shrink-0 ${CARD_WIDTH}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : gridItems.length ? (
                    <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {gridItems.map((p, i) => <ProjectCard key={p.id ?? i} project={p} t={t} />)}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed border-line py-16 text-center">
                        <p className="text-muted">{t.portfolio.empty}</p>
                        <button
                            type="button"
                            onClick={() => { setQuery(''); setCategory(''); }}
                            className="mt-4 text-sm font-semibold text-brand hover:underline"
                        >
                            {t.portfolio.reset}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
