import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';

export default function Blog({ posts = [] }) {
    const { t, lang } = useLang();
    const ref = useRef(null);

    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        items?.forEach(i => obs.observe(i));
        return () => obs.disconnect();
    }, []);

    if (!posts.length) return null;

    return (
        <section id="blog" className="py-24 text-fg overflow-hidden" ref={ref}>


            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="mb-12 max-w-2xl fade-up">
                    <div className="eyebrow mb-4">{t.blog.eyebrow}</div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {t.blog.title}
                    </h2>

                    <p className="text-muted mt-6 max-w-xl font-light leading-relaxed">
                        {t.blog.subtitle}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((p, i) => (
                        <article
                            key={i}
                            className="bg-surface rounded-lg overflow-hidden border border-line-soft hover:border-brand/40 transition-all duration-300 group flex flex-col fade-up"
                        >

                            {/* Thumbnail Overlay */}
                            <div className="relative h-48 flex items-center justify-center bg-accent/[0.07] border-b border-line-soft overflow-hidden">
                                
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                                    {p.emoji}
                                </span>

                                <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full text-fg border border-line"
                                    style={{ background: p.color ? `${p.color}40` : 'rgba(99,102,241,0.2)' }}>
                                    {p.category}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-7 flex flex-col flex-1">

                                {/* Meta Data */}
                                <div className="text-xs text-subtle flex gap-3 mb-4">
                                    <span className="text-accent">{new Date(p.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    <span>/</span>
                                    <span>{p.read_time}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-lg mb-3 text-fg group-hover:text-accent transition-colors">
                                    {p.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-[13px] text-muted leading-relaxed flex-1 mb-6">
                                    {p.excerpt}
                                </p>

                                <a
                                    href={p.slug ? `/blog/${p.slug}` : '#blog'}
                                    className="inline-flex items-center text-sm font-semibold text-brand hover:text-accent transition-colors"
                                >
                                    {t.blog.read} →
                                </a>

                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}