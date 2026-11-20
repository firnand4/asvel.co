import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';

export default function Process() {
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

    return (
        <section id="process" className="py-24 theme-ink bg-page text-fg overflow-hidden flex flex-col items-center" ref={ref}>



            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10">

                {/* HEADER */}
                <div className="mb-12 max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <p className="eyebrow mb-4">{t.process.eyebrow}</p>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        {t.process.title}
                    </h2>

                    <p className="text-muted font-light leading-relaxed max-w-xl">
                        {t.process.subtitle}
                    </p>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-8">

                    {t.process.steps.map((s, i) => (
                        <div
                            key={i}
                            className="fade-up opacity-0 translate-y-6 transition-all duration-700 bg-surface p-8 rounded-lg border border-line-soft hover:border-accent/30 relative group overflow-hidden"
                        >

                            <div className="flex justify-between items-start mb-6">
                                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                    {s.icon}
                                </div>
                                <div className="text-sm text-subtle font-bold group-hover:text-accent transition-colors">
                                    {i + 1}
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-3 text-fg group-hover:text-fg transition-colors">
                                {s.title}
                            </h3>

                            <p className="text-subtle text-[13px] leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}