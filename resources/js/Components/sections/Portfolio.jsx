import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n';

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

export default function Portfolio({ projects = [] }) {
    const { t } = useLang();
    const ref = useRef(null);
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

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
    }, [projects.length]);

    const scrollByCard = (dir) => {
        const track = trackRef.current;
        const card = track?.firstElementChild;
        if (!card) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
    };

    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        items?.forEach(i => obs.observe(i));
        return () => obs.disconnect();
    }, []);

    if (!projects.length) return null;

    return (
        <section id="portfolio" className="py-24 text-fg overflow-hidden" ref={ref}>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="eyebrow mb-4">{t.portfolio.eyebrow}</div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {t.portfolio.title}
                    </h2>

                    <p className="text-muted mt-6 max-w-xl font-light leading-relaxed">
                        {t.portfolio.subtitle}
                    </p>
                </div>

                {(canPrev || canNext) && (
                    <div className="hidden sm:flex gap-2">
                        {[[-1, '←', t.portfolio.prev, canPrev], [1, '→', t.portfolio.next, canNext]].map(([dir, arrow, label, enabled]) => (
                            <button
                                key={dir}
                                type="button"
                                onClick={() => scrollByCard(dir)}
                                disabled={!enabled}
                                aria-label={label}
                                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-fg hover:border-fg/40 disabled:opacity-35 disabled:cursor-default transition-colors"
                            >
                                {arrow}
                            </button>
                        ))}
                    </div>
                )}
                </div>

                {/* Horizontal carousel: swipe on touch, arrows on larger screens */}
                <div
                    ref={trackRef}
                    className="no-scrollbar -mx-4 px-4 scroll-px-4 sm:mx-0 sm:px-0 sm:scroll-px-0 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 fade-up opacity-0 translate-y-6 transition duration-700"
                >
                    {projects.map((p, i) => (
                        <div
                            key={p.id ?? i}
                            className="shrink-0 snap-start w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)] bg-surface rounded-lg overflow-hidden border border-line-soft hover:border-brand/40 transition-colors duration-300 group flex flex-col"
                        >

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
                    ))}
                </div>
            </div>

        </section>
    );
}