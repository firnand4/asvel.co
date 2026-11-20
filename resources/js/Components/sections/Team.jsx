import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';

const initials = (name = '') => name.split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();

export default function Team({ team = [] }) {
    const { t } = useLang();
    const ref = useRef(null);

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

    if (!team.length) return null;

    return (
        <section id="team" className="py-20 text-fg overflow-hidden" ref={ref}>
            

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="mb-12 max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="eyebrow mb-4">{t.team.eyebrow}</div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        {t.team.title}
                    </h2>

                    <p className="text-muted mt-6 max-w-xl font-light leading-relaxed">
                        {t.team.subtitle}
                    </p>
                </div>

                {/* Grid */}
                {/* Centred so a small team does not leave the row half empty */}
                <div className="flex flex-wrap justify-center gap-8">
                    {team.map((m, i) => (
                        <div
                            key={i}
                            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(25%-1.5rem)] bg-surface rounded-lg border border-line-soft hover:border-brand/40 transition-all duration-500 fade-up opacity-0 translate-y-6 group relative overflow-hidden"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >

                            {/* Photo, or initials until a photo is uploaded */}
                            <div className="relative aspect-square flex items-center justify-center bg-brand/[0.07] border-b border-line-soft overflow-hidden">
                                {m.photo ? (
                                    <img
                                        src={`/${m.photo}`}
                                        alt={m.name}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <span className="grid h-24 w-24 place-items-center rounded-full bg-brand/15 text-3xl font-bold text-brand">
                                        {initials(m.name)}
                                    </span>
                                )}

                                {m.linkedin_url && m.linkedin_url !== '#' && (
                                    <a
                                        href={m.linkedin_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="absolute bottom-3 right-3 bg-surface border border-line hover:bg-indigo-700 hover:text-white w-8 h-8 flex items-center justify-center rounded text-xs font-bold text-fg transition-colors z-20"
                                        aria-label={`LinkedIn ${m.name}`}
                                    >
                                        In
                                    </a>
                                )}
                            </div>

                            {/* Identity Log */}
                            <div className="p-6">
                                <h3 className="font-bold text-fg text-lg group-hover:text-accent transition-colors tracking-tight">
                                    {m.name}
                                </h3>

                                <div className="text-sm text-brand my-2">
                                    {m.role}
                                </div>

                                <div className="text-xs text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded inline-block mb-4">
                                    {m.expertise}
                                </div>

                                <p className="text-[13px] text-subtle leading-relaxed font-light mb-6 line-clamp-2">
                                    {m.bio}
                                </p>

                                {/* Technical Skillset */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-line-soft">
                                    {(m.skills || []).map(s => (
                                        <span
                                            key={s}
                                            className="text-[11px] text-muted bg-line-soft border border-line px-2 py-0.5 rounded"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}