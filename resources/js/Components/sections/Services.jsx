import { useEffect, useRef } from 'react';

export default function Services({ services = [] }) {
    const ref = useRef(null);

    useEffect(() => {
        const cards = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        cards?.forEach(c => obs.observe(c));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="services" className="py-24 bg-[#05050A] text-white border-y border-white/5 relative overflow-hidden" ref={ref}>
            
            {/* Atmospheric Depth - Subtle Cyan Glow */}
            <div className="absolute -top-24 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 left-0 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-cyan-500/30"></span>
                        // Operational Modules
                        <span className="w-8 h-[1px] bg-cyan-500/30"></span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 animate-text-glow">Solutions</span>
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        High-performance digital architectures designed for mission-critical scalability and aesthetic precision.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="group relative p-8 rounded-lg bg-[#08080E]/40 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/40 hover:bg-[#0A0A15]/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] fade-up opacity-0 translate-y-6"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {/* Inner Accent Glow */}
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon */}
                            <div className="text-4xl mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                {s.icon}
                                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-4 text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                                {s.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-[13px] leading-relaxed mb-6 font-light">
                                {s.description}
                            </p>

                            {/* Benefits */}
                            <ul className="text-[12px] space-y-2 mb-8 font-mono">
                                {(s.benefits || []).map(b => (
                                    <li key={b} className="flex items-start gap-3 text-gray-500 group-hover:text-gray-300 transition-colors">
                                        <span className="text-cyan-500/50 mt-1">::</span> 
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* Tech Stack Indicator */}
                            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 opacity-60 group-hover:opacity-100 transition-opacity">
                                {(s.tech || []).map(t => (
                                    <span
                                        key={t}
                                        className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest bg-cyan-900/10 border border-cyan-500/20 px-2 py-0.5 rounded-sm"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}