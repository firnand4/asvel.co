import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n';

export default function Testimonials({ testimonials = [] }) {
    const { t: tr } = useLang();
    const [active, setActive] = useState(0);
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

    useEffect(() => {
        if (!testimonials.length) return;
        const t = setInterval(() => {
            setActive(a => (a + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(t);
    }, [testimonials]);

    if (!testimonials.length) return null;

    const t = testimonials[active] || testimonials[0];

    return (
        <section id="testimonials" className="py-24 text-fg overflow-hidden" ref={ref}>
            

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="mb-12 max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="eyebrow mb-4">{tr.testimonials.eyebrow}</div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        {tr.testimonials.title}
                    </h2>
                </div>

                {/* Card - Glass Node */}
                <div className="bg-surface border border-line rounded-xl p-6 sm:p-12 text-center fade-up opacity-0 translate-y-6 transition duration-700 relative overflow-hidden group">


                    <div className="text-7xl text-accent/10 mb-8 font-serif leading-none absolute top-6 left-8 block group-hover:text-accent/20 transition-colors">"</div>

                    <p className="text-fg-2 text-lg md:text-2xl font-light italic leading-relaxed mb-10 relative z-10">
                        {t.text}
                    </p>

                    {/* Author Node */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded border border-accent/40 bg-page flex items-center justify-center text-3xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
                            <span className="relative z-10">{t.avatar}</span>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="text-fg text-lg font-bold tracking-tight">{t.name}</div>
                            <div className="text-sm text-brand mt-1">{t.role}</div>
                        </div>

                        <div className="md:ml-auto flex gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-sm ${i < t.rating ? 'text-accent' : 'text-subtle/30'}`}>★</span>
                            ))}
                        </div>
                    </div>

                    {/* Minimal Data Rail Navigation */}
                    <div className="flex justify-center gap-4 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                aria-label={`${tr.testimonials.show} ${i + 1}`}
                                className={`h-[2px] transition-all duration-500 rounded-full ${i === active ? 'w-12 bg-accent' : 'w-4 bg-line hover:bg-muted/40'}`}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}