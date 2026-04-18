import { useEffect, useRef } from 'react';

export default function Portfolio({ projects = [] }) {
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
        <section id="portfolio" className="py-24 bg-[#05050A] text-white border-y border-white/5 relative overflow-hidden" ref={ref}>
            {/* Atmospheric Depth - Deep Indigo Radial */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
                        // System Logs_
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Deployments</span>
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        A selection of securely executed projects where we resolved critical business constraints with intelligent systems.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <div
                            key={i}
                            className="bg-[#0A0A12] rounded-lg overflow-hidden border border-white/5 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] fade-up opacity-0 translate-y-6 group flex flex-col"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >

                            {/* Thumbnail Overlay */}
                            <div className="relative h-48 flex items-center justify-center bg-[#0C0C14] border-b border-white/5 overflow-hidden">
                                {/* Tech grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-50" />
                                
                                <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 relative z-10">{p.emoji}</span>

                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Body */}
                            <div className="p-7 flex flex-col gap-4 flex-1">

                                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">
                                    {p.title}
                                </h3>

                                <p className="text-[13px] text-gray-400 leading-relaxed font-light">
                                    {p.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {(p.tech || []).map(t => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest bg-indigo-900/20 border border-indigo-500/20 px-2 py-1 rounded-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Problem & Result Layout */}
                                <div className="mt-4 pt-4 border-t border-white/5 text-[12px] space-y-3 font-mono">
                                    <div>
                                        <span className="text-gray-600 block mb-1 uppercase tracking-widest">Constraint:</span>
                                        <p className="text-gray-400 leading-relaxed">{p.problem}</p>
                                    </div>

                                    <div>
                                        <span className="text-cyan-500/80 block mb-1 uppercase tracking-widest">Resolution:</span>
                                        <p className="text-gray-300 leading-relaxed">{p.result}</p>
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