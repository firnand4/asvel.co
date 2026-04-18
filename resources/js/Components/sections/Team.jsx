import { useEffect, useRef } from 'react';

export default function Team({ team = [] }) {
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
        <section id="team" className="py-20 bg-gray-900 text-white" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-400 font-semibold mb-2">
                        👥 Our People
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Meet the <span className="text-indigo-500">Team</span>
                    </h2>

                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        A passionate group of engineers, designers, and scientists united by one goal — building exceptional software.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                    {team.map((m, i) => (
                        <div
                            key={i}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition fade-up"
                        >

                            {/* Avatar */}
                            <div className="relative h-36 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
                                <div className="text-5xl">{m.emoji}</div>

                                {m.linkedin && (
                                    <a
                                        href={m.linkedin}
                                        target="_blank"
                                        className="absolute bottom-3 right-3 bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold hover:scale-110 transition"
                                    >
                                        in
                                    </a>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-5 flex flex-col gap-2">

                                <h3 className="font-semibold">
                                    {m.name}
                                </h3>

                                <span className="text-sm text-indigo-400 font-medium">
                                    {m.role}
                                </span>

                                <p className="text-xs text-gray-400 italic">
                                    {m.expertise}
                                </p>

                                <p className="text-sm text-gray-400 mt-2">
                                    {m.bio}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {(m.skills || []).map(s => (
                                        <span
                                            key={s}
                                            className="text-xs bg-gray-700 px-2 py-1 rounded"
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