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
        window.addEventListener('resize', resize);

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const handleScroll = (id) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center bg-gray-900 text-white overflow-hidden">

            {/* Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6">

                <div className="max-w-3xl space-y-6">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-1 rounded-full text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                        Available for New Projects
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        {settings?.tagline || 'Building Digital Solutions'}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 text-lg">
                        {settings?.subheadline}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => handleScroll('#contact')}
                            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition"
                        >
                            🚀 Start a Project
                        </button>

                        <button
                            onClick={() => handleScroll('#contact')}
                            className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            📞 Free Consultation
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-700">
                        {[
                            [settings?.stats_projects, 'Projects'],
                            [settings?.stats_clients, 'Clients'],
                            [settings?.stats_years, 'Years'],
                            [settings?.stats_satisfaction, 'Satisfaction'],
                        ].map(([n, label]) => (
                            <div key={label}>
                                <div className="text-2xl font-bold text-indigo-500">{n}</div>
                                <div className="text-sm text-gray-400">{label}</div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </section>
    );
}