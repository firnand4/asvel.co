import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';

export default function About({ copy }) {
    const { t } = useLang();
    const ref = useRef(null);

    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        items?.forEach(c => obs.observe(c));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" className="py-24 text-fg overflow-hidden" ref={ref}>


            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">

                        <div className="fade-up opacity-0 translate-y-6 transition duration-700 eyebrow">
                            {t.about.eyebrow}
                        </div>

                        <h2 className="fade-up opacity-0 translate-y-6 transition duration-700 delay-100 text-4xl md:text-5xl font-bold tracking-tight">
                            {t.about.titleA} <span className="text-accent">{t.about.titleB}</span>
                        </h2>

                        <p className="text-muted leading-relaxed fade-up opacity-0 translate-y-6 transition duration-700 delay-200">
                            {copy.about_intro}
                        </p>

                        <div className="space-y-4 fade-up opacity-0 translate-y-6 transition duration-700 delay-300">
                            <div className="bg-surface border border-line-soft hover:border-brand/30 transition-colors p-5 rounded-lg">
                                <h4 className="text-sm font-semibold text-brand mb-2">{t.about.vision}</h4>
                                <p className="text-sm text-muted leading-relaxed">{copy.vision}</p>
                            </div>

                            <div className="bg-surface border border-line-soft hover:border-brand/30 transition-colors p-5 rounded-lg">
                                <h4 className="text-sm font-semibold text-brand mb-2">{t.about.mission}</h4>
                                <p className="text-sm text-muted leading-relaxed">{copy.mission}</p>
                            </div>
                        </div>

                    </div>

                    <div className="fade-up opacity-0 translate-y-6 transition duration-700 delay-500">
                        <div className="bg-surface p-8 rounded-xl border border-line hover:border-accent/40 transition-colors">

                            <h3 className="text-xl font-semibold mb-4 text-fg">
                                {t.about.cardTitle}
                            </h3>

                            <p className="text-muted text-sm leading-relaxed mb-8">
                                {t.about.cardText}
                            </p>

                            <div className="text-sm font-semibold text-fg mb-4">{t.about.whyTitle}</div>
                            <ul className="space-y-3 text-sm text-fg-2">
                                {t.about.why.map(item => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="text-accent mt-0.5">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
