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
                if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
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
        <section id="contact" className="py-24 bg-[#08080E] text-white border-t border-white/5 relative overflow-hidden" ref={ref}>
            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full border border-cyan-400 flex items-center justify-center">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></span>
                        </span>
                        Secure Uplink
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Connection</span>
                    </h2>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        Initialize a project securely. Transmit your requirements and our systems will respond within 24 operational hours.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* FORM */}
                    <div className="bg-[#05050A] p-8 rounded-lg border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)] fade-up opacity-0 translate-y-6 transition duration-700 relative">
                        
                        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-indigo-500">
                            TCP/IP: Secured
                        </div>

                        {sent ? (
                            <div className="text-center space-y-6 py-10">
                                <div className="text-6xl text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">✓</div>
                                <h3 className="text-xl font-mono text-gray-200">Transmission_Success</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Data packet received. Our network nodes will process and echo back shortly.
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="border border-indigo-500/30 px-6 py-3 rounded text-xs font-mono uppercase tracking-widest text-indigo-300 hover:bg-indigo-500/20 transition-all font-bold"
                                >
                                    Re-initialize
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-6 mt-4 font-mono">

                                {/* Name */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Identifier_Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-sm bg-[#08080E] border border-white/10 focus:border-cyan-400/50 focus:outline-none transition-colors text-sm text-gray-200"
                                        placeholder="Enter full name..."
                                    />
                                    {errors.name && <p className="text-red-400 text-[10px] uppercase mt-2">&gt; ERROR: {errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Network_Address (Email)</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 rounded-sm bg-[#08080E] border border-white/10 focus:border-cyan-400/50 focus:outline-none transition-colors text-sm text-gray-200"
                                        placeholder="address@domain.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-[10px] uppercase mt-2">&gt; ERROR: {errors.email}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Payload_Data</label>
                                    <textarea
                                        rows="5"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 rounded-sm bg-[#08080E] border border-white/10 focus:border-cyan-400/50 focus:outline-none transition-colors text-sm text-gray-200 resize-none"
                                        placeholder="Describe your system requirements..."
                                    />
                                    {errors.message && <p className="text-red-400 text-[10px] uppercase mt-2">&gt; ERROR: {errors.message}</p>}
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600/20 border border-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition-all overflow-hidden relative group"
                                >
                                    <span className="relative z-10">{processing ? 'Transmitting...' : 'Execute_Transmission'}</span>
                                    <div className="absolute inset-0 bg-indigo-500 w-0 group-hover:w-full transition-all duration-300 z-0 opacity-50" />
                                </button>

                            </form>
                        )}

                    </div>

                    {/* INFO */}
                    <div className="space-y-6 fade-up opacity-0 translate-y-6 transition duration-700 delay-200">

                        <div className="bg-[#05050A] p-8 rounded-lg border border-white/5">
                            <h3 className="font-mono text-sm uppercase tracking-[0.1em] mb-6 text-gray-200 border-b border-white/10 pb-4">Data Hub Coordinates</h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex gap-4 items-center">
                                    <span className="font-mono text-cyan-500 uppercase text-xs w-12 border-r border-white/10">Mail_</span> 
                                    <span className="font-sans text-gray-300 font-light tracking-wide">{settings?.email}</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="font-mono text-cyan-500 uppercase text-xs w-12 border-r border-white/10">Comm_</span> 
                                    <span className="font-sans text-gray-300 font-light tracking-wide">{settings?.whatsapp}</span>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <span className="font-mono text-cyan-500 uppercase text-xs w-12 border-r border-white/10 mt-1">Base_</span> 
                                    <span className="font-sans text-gray-300 font-light tracking-wide leading-relaxed pl-1">{settings?.office_address}</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="font-mono text-cyan-500 uppercase text-xs w-12 border-r border-white/10">Time_</span> 
                                    <span className="font-sans text-gray-300 font-light tracking-wide">{settings?.office_hours}</span>
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/${settings?.whatsapp_number}`}
                                target="_blank"
                                className="mt-8 flex items-center justify-center gap-2 border border-green-500/50 bg-green-900/20 hover:bg-green-600 text-green-400 hover:text-white py-3 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors font-bold w-full"
                            >
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Establish Secure_Chat
                            </a>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-900/30 to-transparent border-l-4 border-indigo-500 p-6 rounded-r-lg">
                            <h4 className="font-mono text-indigo-300 text-sm uppercase tracking-widest relative z-10 mb-2">🎁 Free System Diagnostics</h4>
                            <p className="text-[13px] text-gray-400 leading-relaxed font-light">
                                Connect with our senior engineers for a 30-minute high-level technical consultation without obligation.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}