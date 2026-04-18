import { useEffect, useRef, useState } from 'react';

const clients = ['HiMart', 'MedTrack', 'LogiTrack', 'DataInsight', 'TalentLink', 'VisioGuard', 'RetailGroup', 'TechCorp'];

export default function Testimonials({ testimonials = [] }) {
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

    const t = testimonials[active] || {
        text: '',
        name: '',
        role: '',
        avatar: '👤',
        rating: 5
    };

    return (
        <section id="testimonials" className="py-24 bg-[#05050A] text-white border-y border-white/5 relative overflow-hidden" ref={ref}>
            
            {/* Atmospheric Depth - Central Cyan Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                        // Verified Nodes
                        <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 animate-text-glow">Endpoints</span>
                    </h2>
                </div>

                {/* Card - Glass Node */}
                <div className="bg-[#08080E]/60 border border-white/10 backdrop-blur-md rounded-xl p-12 text-center fade-up opacity-0 translate-y-6 transition duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">

                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400/80 transition-all duration-700" />

                    <div className="text-7xl text-cyan-500/10 mb-8 font-serif leading-none absolute top-6 left-8 block group-hover:text-cyan-500/20 transition-colors">"</div>

                    <p className="text-gray-300 text-lg md:text-2xl font-light italic leading-relaxed mb-10 relative z-10">
                        {t.text}
                    </p>

                    {/* Author Node */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded border border-cyan-500/40 bg-[#05050A] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(34,211,238,0.15)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
                            <span className="relative z-10">{t.avatar}</span>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="text-white text-lg font-bold tracking-tight">{t.name}</div>
                            <div className="text-[10px] text-indigo-400 uppercase tracking-[0.3em] font-mono mt-1">&gt; {t.role}</div>
                        </div>

                        <div className="md:ml-auto flex gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-sm ${i < t.rating ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'text-gray-800'}`}>★</span>
                            ))}
                        </div>
                    </div>

                    {/* Minimal Data Rail Navigation */}
                    <div className="flex justify-center gap-4 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-[2px] transition-all duration-500 rounded-full ${i === active ? 'w-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                            />
                        ))}
                    </div>

                </div>

                {/* Verified Clients Rail */}
                <div className="mt-24 text-center fade-up opacity-0 translate-y-6 transition duration-700 delay-200">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-10 border-b border-white/5 pb-4 inline-block">
                        Proprietary Deployment Partners
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {clients.map((c, i) => (
                            <div
                                key={i}
                                className="px-6 py-3 bg-[#08080E]/40 border border-white/5 rounded-sm text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 shadow-sm cursor-default"
                            >
                                {c}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}