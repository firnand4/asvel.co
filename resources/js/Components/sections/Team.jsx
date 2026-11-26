import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';

const initials = (name = '') => name.split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
const hasLinkedIn = (m) => m.linkedin_url && m.linkedin_url !== '#';

// Photo, or initials until a photo is uploaded
function MemberPhoto({ member, className = '', initialsClass = 'h-24 w-24 text-3xl' }) {
    return (
        <div className={`relative aspect-square flex items-center justify-center bg-brand/[0.07] overflow-hidden ${className}`}>
            {member.photo ? (
                <img
                    src={`/${member.photo}`}
                    alt={member.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <span className={`grid place-items-center rounded-full bg-brand/15 font-bold text-brand ${initialsClass}`}>
                    {initials(member.name)}
                </span>
            )}
        </div>
    );
}

// A single member is presented as the founder profile instead of a one-card grid.
function FounderProfile({ member, t }) {
    return (
        <div className="fade-up opacity-0 translate-y-6 transition duration-700 grid md:grid-cols-[minmax(0,280px)_1fr] bg-surface rounded-xl border border-line-soft overflow-hidden">
            <MemberPhoto member={member} className="md:h-full md:aspect-auto" initialsClass="h-32 w-32 text-5xl" />

            <div className="p-6 sm:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{member.name}</h3>
                <div className="text-brand mt-1">{member.role}</div>

                {member.bio && (
                    <p className="text-fg-2 leading-relaxed mt-5 max-w-2xl">
                        {member.bio}
                    </p>
                )}

                {hasLinkedIn(member) && (
                    <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm font-semibold text-fg hover:border-fg/40 transition-colors"
                    >
                        <span className="grid h-5 w-5 place-items-center rounded bg-[#0A66C2] text-[10px] font-bold text-white" aria-hidden="true">in</span>
                        {t.team.linkedin}
                    </a>
                )}
            </div>
        </div>
    );
}

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
    }, [team.length]);

    if (!team.length) return null;

    const isFounder = team.length === 1;

    return (
        <section id="team" className="py-20 text-fg overflow-hidden" ref={ref}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="mb-10 max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    {!isFounder && <div className="eyebrow mb-4">{t.team.eyebrow}</div>}

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {isFounder ? t.team.founderTitle : t.team.title}
                    </h2>

                    {!isFounder && (
                        <p className="text-muted mt-6 max-w-xl leading-relaxed">
                            {t.team.subtitle}
                        </p>
                    )}
                </div>

                {isFounder ? (
                    <FounderProfile member={team[0]} t={t} />
                ) : (
                    // Centred so a small team does not leave the row half empty
                    <div className="flex flex-wrap justify-center gap-8">
                        {team.map((m, i) => (
                            <div
                                key={m.id ?? i}
                                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(25%-1.5rem)] bg-surface rounded-lg border border-line-soft hover:border-brand/40 transition-all duration-500 fade-up opacity-0 translate-y-6 group relative overflow-hidden"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className="relative border-b border-line-soft">
                                    <MemberPhoto member={m} />

                                    {hasLinkedIn(m) && (
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

                                <div className="p-6">
                                    <h3 className="font-bold text-fg text-lg group-hover:text-accent transition-colors tracking-tight">
                                        {m.name}
                                    </h3>

                                    <div className="text-sm text-brand my-2">
                                        {m.role}
                                    </div>

                                    {m.expertise && (
                                        <div className="text-xs text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded inline-block mb-4">
                                            {m.expertise}
                                        </div>
                                    )}

                                    {m.bio && (
                                        <p className="text-[13px] text-subtle leading-relaxed mb-6 line-clamp-2">
                                            {m.bio}
                                        </p>
                                    )}

                                    {(m.skills || []).length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-line-soft">
                                            {m.skills.map(s => (
                                                <span key={s} className="text-[11px] text-muted bg-line-soft border border-line px-2 py-0.5 rounded">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
