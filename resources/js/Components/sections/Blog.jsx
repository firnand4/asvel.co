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
        <section id="blog" className="py-24 bg-[#05050A] text-white border-t border-white/5 relative overflow-hidden" ref={ref}>

            {/* Atmospheric Depth - Corner Glow */}
            <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 fade-up">
                    <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
                        // Knowledge Base
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Engineering Log</span>
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        Practical insights, technical deep dives, and perspectives on digital transformation from our core team.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((p, i) => (
                        <article
                            key={i}
                            className="bg-[#08080E] rounded-lg overflow-hidden border border-white/5 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] group flex flex-col fade-up"
                        >

                            {/* Thumbnail Overlay */}
                            <div className="relative h-48 flex items-center justify-center bg-[#0C0C14] border-b border-white/5 overflow-hidden">
                                {/* Decor texture */}
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02)_100%)] bg-[size:20px_20px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
                                
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                                    {p.emoji}
                                </span>

                                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm text-white/90 backdrop-blur-md border border-white/10"
                                    style={{ background: p.color ? `${p.color}40` : 'rgba(99,102,241,0.2)' }}>
                                    {p.category}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-7 flex flex-col flex-1">

                                {/* Meta Data */}
                                <div className="text-[11px] font-mono text-gray-500 flex gap-3 mb-4 uppercase tracking-widest">
                                    <span className="text-cyan-500/80">{new Date(p.published_at).toLocaleDateString()}</span>
                                    <span>/</span>
                                    <span>{p.read_time}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-lg mb-3 text-gray-200 group-hover:text-cyan-400 transition-colors">
                                    {p.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-[13px] text-gray-400 leading-relaxed flex-1 mb-6">
                                    {p.excerpt}
                                </p>

                                {/* Terminal Style Button */}
                                <a
                                    href="#"
                                    className="inline-flex items-center text-xs font-mono font-bold text-indigo-400 hover:text-cyan-400 transition-colors uppercase tracking-[0.1em]"
                                >
                                    <span className="mr-2">&gt;_</span> Read_Log
                                </a>

                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}