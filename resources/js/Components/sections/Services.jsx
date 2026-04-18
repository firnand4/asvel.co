import { useEffect, useRef } from 'react';

export default function Services({ services = [] }) {
    const ref = useRef(null);

    useEffect(() => {
        const cards = ref.current?.querySelectorAll('.fade-up');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        cards?.forEach(c => obs.observe(c));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="services" className="py-20 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-500 font-semibold mb-2">
                        ⚡ What We Do
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Our <span className="text-indigo-600">Services</span>
                    </h2>

                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        End-to-end software development services tailored for businesses that want to grow fast and scale confidently.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition fade-up"
                        >
                            {/* Icon */}
                            <div className="text-3xl mb-4">
                                {s.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-2">
                                {s.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm mb-4">
                                {s.description}
                            </p>

                            {/* Benefits */}
                            <ul className="text-sm text-green-600 space-y-1 mb-4">
                                {(s.benefits || []).map(b => (
                                    <li key={b}>✓ {b}</li>
                                ))}
                            </ul>

                            {/* Tech */}
                            <div className="flex flex-wrap gap-2">
                                {(s.tech || []).map(t => (
                                    <span
                                        key={t}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded"
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