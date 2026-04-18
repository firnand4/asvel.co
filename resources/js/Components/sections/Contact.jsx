import { useState, useEffect, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Contact({ settings }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const [sent, setSent] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            setSent(true);
            reset();
        }
    }, [flash]);

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

    const submit = (e) => {
        e.preventDefault();
        post('/contact', { preserveScroll: true });
    };

    return (
        <section id="contact" className="py-20 bg-gray-900 text-white" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12 fade-up">
                    <div className="text-indigo-400 font-semibold mb-2">
                        📬 Get In Touch
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Let's Build <span className="text-indigo-500">Your Project</span>
                    </h2>

                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        Ready to bring your idea to life? Tell us about your project and we’ll get back to you within 24 hours.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* FORM */}
                    <div className="bg-gray-800 p-8 rounded-xl shadow fade-up">

                        {sent ? (
                            <div className="text-center space-y-4">
                                <div className="text-4xl">✅</div>
                                <h3 className="text-xl font-semibold">Message Sent!</h3>
                                <p className="text-gray-400">
                                    Thank you for reaching out. Our team will contact you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="border px-4 py-2 rounded hover:bg-gray-700 transition"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-5">

                                {/* Name */}
                                <div>
                                    <label className="block text-sm mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:border-indigo-500 outline-none"
                                        placeholder="Ahmad Rasyid"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:border-indigo-500 outline-none"
                                        placeholder="hello@company.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm mb-1">Message</label>
                                    <textarea
                                        rows="5"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:border-indigo-500 outline-none"
                                        placeholder="Describe your project..."
                                    />
                                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold transition"
                                >
                                    {processing ? 'Sending...' : '🚀 Send Message'}
                                </button>

                            </form>
                        )}

                    </div>

                    {/* INFO */}
                    <div className="space-y-6 fade-up">

                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h3 className="font-semibold mb-4">Contact Information</h3>

                            <div className="space-y-3 text-sm text-gray-400">
                                <div>📧 {settings?.email}</div>
                                <div>📱 {settings?.whatsapp}</div>
                                <div>📍 {settings?.office_address}</div>
                                <div>⏰ {settings?.office_hours}</div>
                            </div>

                            <a
                                href={`https://wa.me/${settings?.whatsapp_number}`}
                                target="_blank"
                                className="block mt-6 bg-green-500 hover:bg-green-600 text-center py-2 rounded text-white"
                            >
                                💬 Chat on WhatsApp
                            </a>
                        </div>

                        <div className="bg-indigo-500/10 border border-indigo-500/30 p-6 rounded-xl">
                            <h4 className="font-semibold mb-2">🎁 Free Consultation</h4>
                            <p className="text-sm text-gray-400">
                                Book a free 30-minute consultation with our technical team.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}