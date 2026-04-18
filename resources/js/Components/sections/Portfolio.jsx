import { useEffect, useRef } from 'react';

export default function Portfolio({ projects = [] }) {
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
        <section id="portfolio" className="py-20 bg-gray-900 text-white" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-400 font-semibold mb-2">
                        🗂️ Our Work
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Featured <span className="text-indigo-500">Projects</span>
                    </h2>

                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        A selection of projects where we solved real business problems with smart technology.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <div
                            key={i}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition fade-up"
                        >

                            {/* Thumbnail */}
                            <div className="h-40 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
                                <span className="text-5xl">{p.emoji}</span>
                            </div>

                            {/* Body */}
                            <div className="p-6 flex flex-col gap-3">

                                <h3 className="text-lg font-semibold">
                                    {p.title}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {p.description}
                                </p>

                                {/* Tech */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(p.tech || []).map(t => (
                                        <span
                                            key={t}
                                            className="text-xs bg-gray-700 px-2 py-1 rounded"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Problem & Result */}
                                <div className="mt-4 text-sm space-y-2">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase">Problem</span>
                                        <p className="text-gray-300">{p.problem}</p>
                                    </div>

                                    <div>
                                        <span className="text-green-400 text-xs uppercase">Result</span>
                                        <p className="text-green-300">{p.result}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}