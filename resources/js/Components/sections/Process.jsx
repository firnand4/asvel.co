import { useEffect, useRef } from 'react';

const steps = [
    {
        icon: '🔍',
        title: 'Requirement Analysis',
        desc: 'Deep dive into your business goals, pain points, and technical requirements to build a solid foundation.',
    },
    {
        icon: '🎨',
        title: 'Architecture & Design',
        desc: 'From system architecture to interactive prototypes — we validate the technical blueprint and UX before coding.',
    },
    {
        icon: '⚙️',
        title: 'Development Iteration',
        desc: 'Agile development with clean code, documentation, and continuous progress updates through active nodes.',
    },
    {
        icon: '🧪',
        title: 'System Validation',
        desc: 'Rigorous automated testing to ensure performance, security, and reliability across all edges.',
    },
    {
        icon: '🚀',
        title: 'Production Deployment',
        desc: 'Seamless deployment to production servers with continuous monitoring and optimization.',
    },
    {
        icon: '🔧',
        title: 'Ongoing Maintenance',
        desc: 'Continuous support, security updates, and performance improvements after launch.',
    },
];

export default function Process() {
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
        <section id="process" className="py-24 bg-[#05050A] text-white relative overflow-hidden flex flex-col items-center" ref={ref}>

            {/* Atmospheric Depth - Central Indigo Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Tech grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="max-w-6xl w-full mx-auto px-6 relative z-10">

                {/* HEADER */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
                        // Execution Pipeline
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Process</span>
                    </h2>

                    <p className="text-gray-400 font-light leading-relaxed max-w-xl mx-auto">
                        A proven 6-step engineering methodology that ensures every project is delivered systematically, securely, and beyond expectations.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-8">

                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className="fade-up opacity-0 translate-y-6 transition-all duration-700 delay-[${i * 100}ms] bg-[#05050A] p-8 rounded-lg border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] relative group overflow-hidden"
                        >
                            {/* Hover accent */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                    {s.icon}
                                </div>
                                <div className="text-xs font-mono text-gray-600 font-bold group-hover:text-cyan-500/50 transition-colors">
                                    0{i + 1}_
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-3 text-gray-200 group-hover:text-white transition-colors">
                                {s.title}
                            </h3>

                            <p className="text-gray-500 text-[13px] leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}