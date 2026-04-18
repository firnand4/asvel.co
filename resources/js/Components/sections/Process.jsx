import { useEffect, useRef } from 'react';

const steps = [
    {
        icon: '🔍',
        title: 'Requirement Analysis',
        desc: 'Deep dive into your business goals, pain points, and technical requirements to build a solid foundation.',
    },
    {
        icon: '🎨',
        title: 'Design & Prototyping',
        desc: 'From wireframes to interactive prototypes — we validate the UI/UX before coding.',
    },
    {
        icon: '⚙️',
        title: 'Development',
        desc: 'Agile development with clean code, documentation, and continuous progress updates.',
    },
    {
        icon: '🧪',
        title: 'Testing',
        desc: 'Rigorous testing to ensure performance, security, and reliability.',
    },
    {
        icon: '🚀',
        title: 'Deployment',
        desc: 'Seamless deployment to production with monitoring and optimization.',
    },
    {
        icon: '🔧',
        title: 'Maintenance',
        desc: 'Continuous support, updates, and improvements after launch.',
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
        <section id="process" className="py-20 bg-gray-50" ref={ref}>

            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <p className="text-indigo-500 font-semibold mb-2">
                        ⚙️ How We Work
                    </p>

                    <h2 className="text-3xl font-bold mb-4">
                        Our Process
                    </h2>

                    <p className="text-gray-600 max-w-xl mx-auto">
                        A proven 6-step methodology that ensures every project is delivered on time, on budget, and beyond expectations.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-8">

                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className="fade-up opacity-0 translate-y-6 transition duration-700 bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-2"
                        >
                            <div className="text-3xl mb-4">{s.icon}</div>

                            <h3 className="font-semibold text-lg mb-2">
                                {s.title}
                            </h3>

                            <p className="text-gray-600 text-sm">
                                {s.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}