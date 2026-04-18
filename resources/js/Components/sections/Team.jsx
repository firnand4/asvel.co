import { useEffect, useRef } from 'react';

export default function Team({ team = [] }) {
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
        <section id="team" className="py-16 bg-[#05050A] text-white border-y border-white/5 relative overflow-hidden" ref={ref}>
            
            {/* Atmospheric Depth - Subtle Indigo Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-10 fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                        System Architects
                        <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 animate-text-glow">Engineers</span>
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        A specialized node of technical architects and deployment specialists bound by elite engineering standards.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                    {team.map((m, i) => (
                        <div
                            key={i}
                            className="bg-[#08080E] rounded-lg border border-white/5 hover:border-indigo-500/40 transition-all duration-500 fade-up opacity-0 translate-y-6 group relative overflow-hidden"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >

                            {/* Avatar - High Tech Display */}
                            <div className="relative h-56 flex items-center justify-center bg-[#0C0C14] border-b border-white/5 overflow-hidden">
                                {/* Scanline animated overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(99,102,241,0.05)_51%)] bg-[size:100%_4px] group-hover:animate-scanline pointer-events-none opacity-40" />
                                
                                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500 relative z-10 filter grayscale group-hover:grayscale-0">
                                    {m.emoji}
                                    <div className="absolute -inset-4 bg-indigo-500 blur-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                                </div>

                                {/* Frame Targets */}
                                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-indigo-500/50 group-hover:border-indigo-400"></div>
                                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-indigo-500/50 group-hover:border-indigo-400"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-indigo-500/50 group-hover:border-indigo-400"></div>
                                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-indigo-500/50 group-hover:border-indigo-400"></div>

                                {m.linkedin && (
                                    <a
                                        href={m.linkedin}
                                        target="_blank"
                                        className="absolute bottom-4 right-4 bg-[#05050A] border border-indigo-500/50 hover:bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-sm text-xs font-mono font-bold text-white transition-all z-20"
                                    >
                                        In
                                    </a>
                                )}
                            </div>

                            {/* Identity Log */}
                            <div className="p-6">
                                <h3 className="font-bold text-gray-100 text-lg group-hover:text-cyan-400 transition-colors tracking-tight">
                                    {m.name}
                                </h3>

                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400/80 my-2">
                                    &gt; {m.role}
                                </div>

                                <div className="text-[10px] font-mono text-cyan-500/80 bg-cyan-900/10 border border-cyan-500/10 px-2 py-1 inline-block mb-4">
                                    {m.expertise}
                                </div>

                                <p className="text-[13px] text-gray-500 leading-relaxed font-light mb-6 line-clamp-2">
                                    {m.bio}
                                </p>

                                {/* Technical Skillset */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                    {(m.skills || []).map(s => (
                                        <span
                                            key={s}
                                            className="text-[9px] font-mono uppercase tracking-widest text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}