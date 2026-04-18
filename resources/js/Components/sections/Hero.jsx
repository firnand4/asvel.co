import { useEffect, useRef } from 'react';

export default function Hero({ settings }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        const particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();
        let mouse = { x: undefined, y: undefined, radius: 180 };

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseOut = () => {
            mouse.x = undefined;
            mouse.y = undefined;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        // Generate Neural Nodes
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                color: Math.random() > 0.5 ? '14, 165, 233' : '99, 102, 241' // Cyan or Indigo RGB
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        // Draw neural connection to cursor
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${p.color}, ${0.6 * (1 - distance / mouse.radius)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();

                        // Soft repel force
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        p.x -= forceDirectionX * force * 2;
                        p.y -= forceDirectionY * force * 2;
                    }
                }

                // Draw Node
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgba(${p.color}, 1)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // Draw Connections (Neural Network)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        // Adaptive opacity based on distance
                        const alpha = 0.3 * (1 - dist / 150);
                        // Mix color of the line based on the first node
                        ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const handleScroll = (id) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center bg-[#05050A] text-white overflow-hidden font-sans">
            
            <style>{`
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-text-glow {
                    animation: gradient-x 4s linear infinite;
                    background-size: 200% auto;
                }
                .tech-scanlines {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.4) 51%);
                    background-size: 100% 4px;
                    pointer-events: none;
                    z-index: 5;
                    opacity: 0.3;
                }
            `}</style>

            {/* Glowing Nebulas */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

            {/* AI Neural Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-70 pointer-events-none" />
            
            {/* Scanlines Effect */}
            <div className="tech-scanlines" />

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 pointer-events-auto">

                <div className="max-w-3xl space-y-8">

                    {/* System Status Badge */}
                    <div className="inline-flex items-center gap-3 bg-indigo-950/40 border border-indigo-500/30 px-4 py-1.5 rounded-sm text-[11px] font-mono text-indigo-300 uppercase tracking-[0.2em] backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        System Ready_
                    </div>

                    {/* Hero Title */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-text-glow">
                        {settings?.tagline || 'asvel coding factory'}
                    </h1>

                    {/* Hero Subtitle */}
                    <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl border-l-2 border-indigo-500/50 pl-5">
                        {settings?.subheadline}
                    </p>

                    {/* Glitch Tech Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6">
                        <button
                            onClick={() => handleScroll('#contact')}
                            className="group relative px-8 py-3 bg-indigo-600/10 border border-indigo-500 text-indigo-400 font-mono text-xs uppercase tracking-[0.15em] hover:bg-indigo-600 hover:text-white transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 font-bold">Initialize Project</span>
                            <div className="absolute inset-0 h-full w-0 bg-indigo-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                            {/* Decorative Corner */}
                            <span className="absolute right-0 bottom-0 w-2 h-2 bg-indigo-400 group-hover:bg-white transition-colors z-10"></span>
                        </button>

                        <button
                            onClick={() => handleScroll('#contact')}
                            className="px-8 py-3 border border-gray-700 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-white/5 transition-all duration-300"
                        >
                            <span className="text-cyan-500 mr-2 font-bold">&gt;_</span>
                            Consultation
                        </button>
                    </div>

                    {/* Digital Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 mt-12 border-t border-white/10">
                        {[
                            [settings?.stats_projects, 'Projects_Deployed'],
                            [settings?.stats_clients, 'Active_Nodes'],
                            [settings?.stats_years, 'Years_Iteration'],
                            [settings?.stats_satisfaction, 'Accuracy_Rate'],
                        ].map(([n, label]) => (
                            <div key={label} className="flex flex-col gap-1.5">
                                <div className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                                    {n}
                                </div>
                                <div className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </section>
    );
}