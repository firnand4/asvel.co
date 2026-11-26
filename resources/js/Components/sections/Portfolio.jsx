import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../../i18n';

const AUTOPLAY_MS = 4000;

// Shows the screenshot from public/<image>; falls back to a placeholder until the file exists.
function ProjectImage({ project }) {
    const [failed, setFailed] = useState(false);
    const src = project.image && !failed ? `/${project.image.replace(/^\/+/, '')}` : null;

    return (
        <div className="relative aspect-[16/10] bg-accent/[0.07] border-b border-line-soft overflow-hidden">
            {src ? (
                <img
                    src={src}
                    alt={project.title}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="relative text-5xl">{project.emoji}</span>
                    <span className="relative text-sm text-subtle">{project.title}</span>
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project: p, t, className = '' }) {
    return (
        <div className={`bg-surface rounded-lg overflow-hidden border border-line-soft hover:border-brand/40 transition-colors duration-300 group flex flex-col ${className}`}>
            <ProjectImage project={p} />

            <div className="p-7 flex flex-col gap-4 flex-1">
                {p.category && (
                    <span className="self-start text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                        {p.category}
                    </span>
                )}

                <h3 className="text-lg font-semibold text-fg group-hover:text-brand transition-colors">
                    {p.title}
                </h3>

                {p.description && (
                    <p className="text-sm text-muted leading-relaxed">
                        {p.description}
                    </p>
                )}

                {(p.tech || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {p.tech.map(tech => (
                            <span key={tech} className="text-[11px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {(p.problem || p.result) && (
                    <div className="mt-2 pt-4 border-t border-line-soft text-[13px] space-y-3">
                        {p.problem && (
                            <div>
                                <span className="text-subtle block mb-1 font-semibold">{t.portfolio.problem}</span>
                                <p className="text-muted leading-relaxed">{p.problem}</p>
                            </div>
                        )}
                        {p.result && (
                            <div>
                                <span className="text-accent block mb-1 font-semibold">{t.portfolio.result}</span>
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

const controlClass = 'grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-fg hover:border-fg/40 disabled:opacity-35 disabled:cursor-default transition-colors';

export default function Portfolio({ projects = [] }) {
    const { t } = useLang();
    const ref = useRef(null);
    const trackRef = useRef(null);

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);
    const [paused, setPaused] = useState(false);          // pause/play button
    const [interacting, setInteracting] = useState(false); // hover, focus or touch
    const [inView, setInView] = useState(false);
    const [tabVisible, setTabVisible] = useState(true);
    const [restartKey, setRestartKey] = useState(0);       // restarts the 4s countdown after manual moves
    const reducedMotion = usePrefersReducedMotion();
    const touchTimer = useRef(null);

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

    // Enable/disable the arrows from the carousel's scroll position.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const update = () => {
            setCanPrev(track.scrollLeft > 4);
            setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
        };
        update();
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            track.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [projects.length, filtering]);

    // Only autoplay while the section is on screen and the tab is visible.
    useEffect(() => {
        const section = ref.current;
        if (!section) return;
        const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
        obs.observe(section);
        const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            obs.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [projects.length]);

    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        items?.forEach(i => obs.observe(i));
        return () => obs.disconnect();
    }, [projects.length, filtering]); // the carousel re-mounts when search/filter is cleared

    useEffect(() => () => clearTimeout(touchTimer.current), []);

    // The carousel unmounts while searching, so a pending hover/touch would never get its "leave" event.
    useEffect(() => {
        clearTimeout(touchTimer.current);
        setInteracting(false);
    }, [filtering]);

    const scrollByCard = (dir) => {
        const track = trackRef.current;
        const card = track?.firstElementChild;
        if (!card) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
    };

    const overflows = canPrev || canNext;
    const autoplayOn = !reducedMotion && !filtering && !paused && !interacting && inView && tabVisible && overflows;

    useEffect(() => {
        if (!autoplayOn) return;
        const timer = setInterval(() => {
            const track = trackRef.current;
            if (!track) return;
            const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
            if (atEnd) {
                track.scrollTo({ left: 0, behavior: 'smooth' }); // loop back to the first card
            } else {
                scrollByCard(1);
            }
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [autoplayOn, restartKey]);

    const manualMove = (dir) => {
        scrollByCard(dir);
        setRestartKey(k => k + 1);
    };

    // Pause while the pointer, keyboard focus or a finger is on the carousel; resume afterwards.
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
            // let the swipe and snap settle before the countdown starts again
            touchTimer.current = setTimeout(() => setInteracting(false), 800);
        },
    };

    if (!projects.length) return null;

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

                    {!filtering && overflows && (
                        <div className="flex gap-2">
                            <button type="button" onClick={() => manualMove(-1)} disabled={!canPrev} aria-label={t.portfolio.prev} className={`${controlClass} max-sm:hidden`}>
                                ←
                            </button>
                            {!reducedMotion && (
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
                            )}
                            <button type="button" onClick={() => manualMove(1)} disabled={!canNext} aria-label={t.portfolio.next} className={`${controlClass} max-sm:hidden`}>
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

                {filtering ? (
                    results.length ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {results.map((p, i) => <ProjectCard key={p.id ?? i} project={p} t={t} />)}
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
                    )
                ) : (
                    // Carousel: one card per slide on phones (swipe), two on tablets, three on desktop
                    <div
                        ref={trackRef}
                        {...interactionHandlers}
                        className="no-scrollbar -mx-4 px-4 scroll-px-4 sm:mx-0 sm:px-0 sm:scroll-px-0 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 fade-up opacity-0 translate-y-6 transition duration-700"
                    >
                        {projects.map((p, i) => (
                            <ProjectCard
                                key={p.id ?? i}
                                project={p}
                                t={t}
                                className="shrink-0 snap-start w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
