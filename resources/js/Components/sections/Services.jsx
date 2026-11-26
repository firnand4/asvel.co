import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';

export default function Services({ services = [], servicePages = [] }) {
    const { t } = useLang();
    const pageFor = (service) => servicePages.find(p => p.service_id === service.id);
    const ref = useRef(null);

    useEffect(() => {
        const cards = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        cards?.forEach(c => obs.observe(c));
        return () => obs.disconnect();
    }, []);

    if (!services.length) return null;

    return (
        <section id="services" className="py-24 text-fg overflow-hidden" ref={ref}>


            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="mb-12 max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="eyebrow mb-4">{t.services.eyebrow}</div>

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {t.services.title}
                    </h2>

                    <p className="text-muted mt-6 max-w-xl leading-relaxed">
                        {t.services.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((s, i) => (
                        <div
                            key={s.id ?? i}
                            className="group relative p-8 rounded-xl bg-surface border border-line hover:border-accent/50 transition-all duration-500 fade-up opacity-0 translate-y-6 flex flex-col"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="text-4xl mb-5">{s.icon}</div>

                            <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">
                                {s.title}
                            </h3>

                            <p className="text-muted text-sm leading-relaxed mb-6">
                                {s.description}
                            </p>

                            <ul className="text-sm space-y-2.5 mb-6">
                                {(s.benefits || []).map(b => (
                                    <li key={b} className="flex items-start gap-3 text-fg-2">
                                        <span className="text-accent">✓</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {(s.tech || []).length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-5 mt-auto border-t border-line-soft">
                                    {s.tech.map(tech => (
                                        <span key={tech} className="text-[11px] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {pageFor(s) && (
                                <a
                                    href={`/layanan/${pageFor(s).slug}`}
                                    className={`${(s.tech || []).length ? 'mt-5' : 'mt-auto'} self-start text-sm font-semibold text-brand hover:underline`}
                                >
                                    {t.services.more} <span className="sr-only">{s.title}</span> →
                                </a>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
