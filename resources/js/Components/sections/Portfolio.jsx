import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../../i18n';

const SPEED_PX_PER_S = 40;
const EASE_PER_S = 4; // how fast the speed eases towards moving/stopped (~0.5s)

// Screenshot from public/<image>; a short icon strip until the file exists.
function ProjectImage({ project }) {
    const [failed, setFailed] = useState(false);
    const src = project.image && !failed ? `/${project.image.replace(/^\/+/, '')}` : null;

    if (src) {
        return (
            <div className="relative aspect-[16/9] bg-accent/[0.07] border-b border-line-soft overflow-hidden">
                <img
                    src={src}
                    alt={project.title}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </div>
        );
    }

    return (
        <div className="flex h-24 items-center justify-center bg-accent/[0.07] border-b border-line-soft text-4xl" aria-hidden="true">
            {project.emoji}
        </div>
    );
}

export function ProjectCard({ project: p, t, className = '', hidden = false }) {
    return (
        <div
            className={`bg-surface rounded-lg overflow-hidden border border-line-soft hover:border-brand/40 transition-colors duration-300 group ${className}`}
            aria-hidden={hidden || undefined}
        >
            <ProjectImage project={p} />

            <div className="p-5 flex flex-col gap-2">
                {p.category && (
                    <span className="self-start text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                        {p.category}
                    </span>
                )}

                <h3 className="text-base font-semibold leading-snug text-fg group-hover:text-brand transition-colors">
                    {p.title}
                </h3>

                {p.description && (
                    <p className="text-sm text-muted leading-relaxed">
                        {p.description}
                    </p>
                )}

                {(p.tech || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {p.tech.map(tech => (
                            <span key={tech} className="text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {(p.problem || p.result) && (
                    <div className="mt-1 pt-3 border-t border-line-soft text-[13px] space-y-2">
                        {p.problem && (
                            <div>
                                <span className="text-subtle block font-semibold">{t.portfolio.problem}</span>
                                <p className="text-muted leading-relaxed">{p.problem}</p>
                            </div>
                        )}
                        {p.result && (
                            <div>
                                <span className="text-accent block font-semibold">{t.portfolio.result}</span>
                                <p className="text-fg-2 leading-relaxed">{p.result}</p>
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

export default function Portfolio({ projects = [] }) {
    const { t } = useLang();
    const ref = useRef(null);
    const trackRef = useRef(null);
    const touchTimer = useRef(null);

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [paused, setPaused] = useState(false);          // pause/play button
    const [interacting, setInteracting] = useState(false); // hover, focus or touch
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
    const moving = marquee && !paused && !interacting && inView;

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
            const container = Math.min(vw, 1152) - (vw >= 640 ? 48 : 32); // max-w-6xl minus side padding
            const card = Math.min(380, vw * 0.85);
            setFits(projects.length * (card + CARD_GAP) - CARD_GAP <= container);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [projects.length]);

    // Marquee loop: the list is rendered twice, so wrapping by one set's width is seamless.
    const motion = useRef({ offset: 0, speed: 0, target: 0 });
    motion.current.target = moving ? SPEED_PX_PER_S : 0;

    useEffect(() => {
        if (!marquee) return;
        let frame;
        let last = performance.now();
        const tick = (now) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            const m = motion.current;
            m.speed += (m.target - m.speed) * Math.min(1, dt * EASE_PER_S); // smooth stop / start
            const track = trackRef.current;
            const loop = track?.children[projects.length]?.offsetLeft;
            if (track && loop) {
                m.offset = (m.offset + m.speed * dt) % loop;
                track.style.transform = `translate3d(${-m.offset}px, 0, 0)`;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [marquee, projects.length]);

    useEffect(() => () => clearTimeout(touchTimer.current), []);

    // The marquee unmounts while searching, so a pending hover/touch would never get its "leave" event.
    useEffect(() => {
        clearTimeout(touchTimer.current);
        setInteracting(false);
    }, [filtering]);

    const interactionHandlers = {
        onMouseEnter: () => setInteracting(true),
        onMouseLeave: () => setInteracting(false),
        onFocus: () => setInteracting(true),
        onBlur: (e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
        },
        onTouchStart: () => {
            clearTimeout(touchTimer.current);
            setInteracting(true);
        },
        onTouchEnd: () => {
            touchTimer.current = setTimeout(() => setInteracting(false), 800);
        },
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
                        <button
                            type="button"
                            onClick={() => setPaused(p => !p)}
                            aria-pressed={paused}
                            aria-label={paused ? t.portfolio.play : t.portfolio.pause}
                            title={paused ? t.portfolio.play : t.portfolio.pause}
                            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-fg hover:border-fg/40 transition-colors"
                        >
                            {paused ? (
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
                            )}
                        </button>
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
                    // Moving strip; the second copy is decorative so screen readers read each project once.
                    <div
                        {...interactionHandlers}
                        className="-mx-4 sm:mx-0 overflow-hidden fade-up opacity-0 translate-y-6 transition duration-700"
                    >
                        <div ref={trackRef} className="flex w-max items-start gap-5 px-4 sm:px-0 will-change-transform">
                            {[...projects, ...projects].map((p, i) => (
                                <ProjectCard
                                    key={`${p.id ?? i}-${i}`}
                                    project={p}
                                    t={t}
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
