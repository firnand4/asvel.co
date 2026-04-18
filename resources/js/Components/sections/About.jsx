import { useEffect, useRef } from 'react';

export default function About({ settings }) {
    const ref = useRef(null);

    useEffect(() => {
        const items = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        items?.forEach(c => obs.observe(c));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" className="py-20 bg-gray-900 text-white" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT */}
                    <div className="space-y-6 fade-up">

                        <div className="text-indigo-400 font-semibold">
                            🏢 Who We Are
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold">
                            Crafting the <span className="text-indigo-500">Future</span> of Software
                        </h2>

                        <p className="text-gray-400">
                            {settings?.about_intro}
                        </p>

                        {/* Vision & Mission */}
                        <div className="space-y-4">
                            <div className="flex gap-4 bg-gray-800 p-4 rounded-lg">
                                <div className="text-xl">🎯</div>
                                <div>
                                    <h4 className="font-semibold">Our Vision</h4>
                                    <p className="text-sm text-gray-400">{settings?.vision}</p>
                                </div>
                            </div>

                            <div className="flex gap-4 bg-gray-800 p-4 rounded-lg">
                                <div className="text-xl">🚀</div>
                                <div>
                                    <h4 className="font-semibold">Our Mission</h4>
                                    <p className="text-sm text-gray-400">{settings?.mission}</p>
                                </div>
                            </div>
                        </div>

                        {/* Credentials */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <div>✔ Deep expertise in AI, ML, and Computer Vision</div>
                            <div>✔ Full-stack engineers with 5+ years experience</div>
                            <div>✔ Agile methodology with transparent communication</div>
                            <div>✔ Committed to deadlines and code quality</div>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="fade-up">
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">

                            <div className="text-3xl">💡</div>

                            <h4 className="text-lg font-semibold">
                                Innovation First
                            </h4>

                            <p className="text-gray-400 text-sm">
                                We don't just write code — we engineer solutions that create real business impact.
                            </p>

                            <div className="flex gap-4 mt-4">
                                <div className="bg-gray-700 px-4 py-2 rounded-lg text-sm">
                                    🏆 {settings?.stats_projects} Projects
                                </div>
                                <div className="bg-gray-700 px-4 py-2 rounded-lg text-sm">
                                    ⭐ {settings?.stats_satisfaction} Satisfaction
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}