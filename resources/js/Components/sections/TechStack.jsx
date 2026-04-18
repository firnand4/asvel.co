import { useEffect, useRef } from 'react';

export default function TechStack({ techStack = [] }) {

    const safeData = (techStack || []).filter(t => t && t.category);
    const categories = [...new Set(safeData.map(t => t.category))];

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
        <section id="tech" className="py-20 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-500 font-semibold mb-2">
                        🛠️ Technology
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Our <span className="text-indigo-600">Tech Stack</span>
                    </h2>

                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        We use the best tools for each job — from web frameworks to AI libraries and cloud infrastructure.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 fade-up">
                    {categories.map(cat => (
                        <span
                            key={cat}
                            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full"
                        >
                            {cat}
                        </span>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 fade-up">
                    {safeData.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
                        >
                            <div className="text-2xl mb-2">
                                {t.emoji || '⚙️'}
                            </div>

                            <div className="text-sm font-semibold">
                                {t.name || '-'}
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                                {t.category}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}