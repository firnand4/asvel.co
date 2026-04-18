import { useEffect, useRef } from 'react';

export default function Blog({ posts = [] }) {
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

    return (
        <section id="blog" className="py-20 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-500 font-semibold mb-2">
                        📝 Insights
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        From Our <span className="text-indigo-600">Blog</span>
                    </h2>

                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Practical insights on software development, AI, and digital transformation from our engineering team.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((p, i) => (
                        <article
                            key={i}
                            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition fade-up"
                        >

                            {/* Thumbnail */}
                            <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
                                <span className="text-4xl">{p.emoji}</span>

                                <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white"
                                    style={{ background: p.color }}>
                                    {p.category}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-6 flex flex-col gap-3">

                                {/* Meta */}
                                <div className="text-xs text-gray-400 flex gap-2">
                                    <span>{new Date(p.published_at).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{p.read_time}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-lg">
                                    {p.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-gray-500 flex-1">
                                    {p.excerpt}
                                </p>

                                {/* Button */}
                                <a
                                    href="#"
                                    className="text-indigo-600 font-semibold text-sm hover:underline"
                                >
                                    Read article →
                                </a>

                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}