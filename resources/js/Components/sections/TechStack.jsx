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
        <section id="tech" className="py-24 bg-[#05050A] text-white border-y border-white/5 relative overflow-hidden" ref={ref}>
            
            {/* Atmospheric Depth - Deep Indigo Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                        /&gt; Core Infrastructure
                        <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 animate-text-glow">Stack</span>
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        A robust matrix of modern frameworks and specialized cloud architectures optimized for low-latency scale.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 fade-up opacity-0 translate-y-6 transition duration-700">
                    {categories.map(cat => (
                        <span
                            key={cat}
                            className="px-6 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] bg-white/5 text-indigo-300 border border-white/10 rounded-sm hover:border-cyan-400/40 transition-all cursor-default"
                        >
                            {cat}
                        </span>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 fade-up opacity-0 translate-y-6 transition duration-700">
                    {safeData.map((t, i) => (
                        <div
                            key={i}
                            className="group bg-[#08080E] p-6 rounded-lg border border-white/5 hover:border-cyan-500/40 hover:bg-[#0A0A15] transition-all duration-300 text-center relative overflow-hidden"
                        >
                            {/* Static grid glow effect on hover */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300 grayscale group-hover:grayscale-0 relative z-10">
                                {t.emoji || '⚙️'}
                            </div>

                            <div className="text-[13px] font-bold text-gray-200 tracking-tight group-hover:text-white transition-colors relative z-10">
                                {t.name || '-'}
                            </div>

                            <div className="text-[9px] text-indigo-500 mt-2 font-mono uppercase tracking-[0.2em] relative z-10">
                                {t.category}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}