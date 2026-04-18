import { useEffect, useRef } from 'react';

export default function About({ settings }) {
    const ref = useRef(null);

    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
            });
        }, { threshold: 0.1 });

        items?.forEach(c => obs.observe(c));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" className="py-24 bg-[#05050A] text-white overflow-hidden relative" ref={ref}>

            {/* Atmospheric Depth - Deep Cyan Radial */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Subtle Tech Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT SYSTEM DATA */}
                    <div className="space-y-8">

                        <div className="fade-up opacity-0 translate-y-6 transition duration-700 text-cyan-400 font-mono text-xs uppercase tracking-[0.2em]">
                            // Core Identity
                        </div>

                        <h2 className="fade-up opacity-0 translate-y-6 transition duration-700 delay-100 text-4xl md:text-5xl font-bold tracking-tight">
                            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Future</span> of Software
                        </h2>

                        <p className="text-gray-400 leading-relaxed font-light fade-up opacity-0 translate-y-6 transition duration-700 delay-200">
                            {settings?.about_intro}
                        </p>

                        {/* Vision & Mission as Modules */}
                        <div className="space-y-4 fade-up opacity-0 translate-y-6 transition duration-700 delay-300">
                            <div className="flex gap-4 bg-[#05050A] border border-white/5 hover:border-indigo-500/30 transition-colors p-5 rounded-lg group">
                                <div className="text-cyan-500 text-xl font-mono mt-1 group-hover:animate-pulse">[*]</div>
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-indigo-300 mb-2">System Vision</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{settings?.vision}</p>
                                </div>
                            </div>

                            <div className="flex gap-4 bg-[#05050A] border border-white/5 hover:border-indigo-500/30 transition-colors p-5 rounded-lg group">
                                <div className="text-cyan-500 text-xl font-mono mt-1 group-hover:animate-pulse">[+]</div>
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-indigo-300 mb-2">Mission Protocol</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{settings?.mission}</p>
                                </div>
                            </div>
                        </div>

                        {/* Capabilities Output */}
                        <div className="fade-up opacity-0 translate-y-6 transition duration-700 delay-400">
                            <div className="font-mono text-xs text-gray-500 mb-3 border-b border-white/10 pb-2">Capabilities Loaded:</div>
                            <div className="space-y-2 text-[13px] text-gray-300 font-mono">
                                <div className="flex items-center gap-2"><span className="text-cyan-500">&gt;</span> Deep expertise in AI, ML, & Computer Vision</div>
                                <div className="flex items-center gap-2"><span className="text-cyan-500">&gt;</span> Full-stack engineering veterans</div>
                                <div className="flex items-center gap-2"><span className="text-cyan-500">&gt;</span> Agile pipelines with transparent metrics</div>
                                <div className="flex items-center gap-2"><span className="text-cyan-500">&gt;</span> Zero-compromise logic & code quality</div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT HUD */}
                    <div className="fade-up opacity-0 translate-y-6 transition duration-700 delay-500 relative">
                        
                        {/* Decorative Grid inside right panel */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] rounded-xl pointer-events-none" />

                        <div className="bg-[#05050A] p-8 rounded-xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                            
                            <div className="absolute top-0 right-0 p-4">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                                    <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                                    <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></span>
                                </div>
                            </div>

                            <div className="text-cyan-500 mb-6 font-mono text-xl font-bold tracking-tight">
                                Innovation_Core
                            </div>

                            <h4 className="text-xl font-semibold mb-4 text-gray-200">
                                Engineering Impact
                            </h4>

                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                We don't just write code — we architect scalable technical operations that generate measurable business velocity.
                            </p>

                            <div className="flex gap-4">
                                <div className="bg-[#08080E] border border-indigo-500/20 px-5 py-4 rounded text-sm flex-1 group-hover:border-indigo-500/50 transition-colors">
                                    <div className="text-2xl font-bold font-mono text-indigo-400 mb-1">{settings?.stats_projects}</div>
                                    <div className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">Executions</div>
                                </div>
                                <div className="bg-[#08080E] border border-cyan-500/20 px-5 py-4 rounded text-sm flex-1 group-hover:border-cyan-500/50 transition-colors">
                                    <div className="text-2xl font-bold font-mono text-cyan-400 mb-1">{settings?.stats_satisfaction}</div>
                                    <div className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">Effectiveness</div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}