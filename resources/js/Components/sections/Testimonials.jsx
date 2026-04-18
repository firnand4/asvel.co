import { useEffect, useRef, useState } from 'react';

const clients = ['HiMart', 'MedTrack', 'LogiTrack', 'DataInsight', 'TalentLink', 'VisioGuard', 'RetailGroup', 'TechCorp'];

export default function Testimonials({ testimonials = [] }) {
    const [active, setActive] = useState(0);
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
        <section id="testimonials" className="py-20 bg-gray-50" ref={ref}>
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-500 font-semibold mb-2">
                        💬 Client Love
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        What Our <span className="text-indigo-600">Clients Say</span>
                    </h2>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl shadow p-8 text-center fade-up">

                    <div className="text-5xl text-indigo-500 mb-4">❝</div>

                    <p className="text-gray-600 text-lg mb-6">
                        {t.text}
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                            {t.avatar}
                        </div>

                        <div className="text-left">
                            <div className="font-semibold">{t.name}</div>
                            <div className="text-sm text-gray-500">{t.role}</div>
                        </div>

                        <div className="ml-4 text-yellow-400">
                            {'⭐'.repeat(t.rating)}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-2 rounded-full transition ${i === active ? 'w-6 bg-indigo-500' : 'w-2 bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                </div>

                {/* Clients */}
                <div className="mt-16 text-center fade-up">
                    <p className="text-sm text-gray-400 uppercase mb-6">
                        Trusted by companies across Indonesia
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {clients.map((c, i) => (
                            <div
                                key={i}
                                className="px-4 py-2 bg-white border rounded-md text-sm font-semibold text-gray-500"
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