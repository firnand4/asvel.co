import { useState, useEffect, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { useLang, waLink } from '../../i18n';

const inputClass = 'w-full px-4 py-3 rounded-lg bg-surface border border-line focus:border-accent/50 focus:outline-none transition-colors text-sm text-fg';

export default function Contact({ settings }) {
    const { t } = useLang();
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

    // Only Google Maps embeds are rendered (the URL is editable in admin settings).
    const mapUrl = settings?.maps_embed_url?.startsWith('https://www.google.com/maps') ? settings.maps_embed_url : null;

    const info = [
        [t.contact.labelEmail, settings?.email, `mailto:${settings?.email}`],
        [t.contact.labelWa, settings?.whatsapp, waLink(settings?.whatsapp_number, t.wa.message)],
        [t.contact.labelAddress, settings?.office_address],
        [t.contact.labelHours, settings?.office_hours],
    ].filter(([, value]) => value);

    return (
        <section id="contact" className="py-24 text-fg overflow-hidden" ref={ref}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="mb-12 max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="eyebrow mb-4">{t.contact.eyebrow}</div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {t.contact.title}
                    </h2>

                    <p className="text-muted mt-6 max-w-xl leading-relaxed">
                        {t.contact.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* FORM */}
                    <div className="bg-surface p-6 sm:p-8 rounded-xl border border-brand/20 fade-up opacity-0 translate-y-6 transition duration-700">

                        {sent ? (
                            <div className="text-center space-y-6 py-10">
                                <div className="text-6xl text-accent">✓</div>
                                <h3 className="text-xl font-semibold text-fg">{t.contact.successTitle}</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    {t.contact.successText}
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="border border-brand/30 px-6 py-3 rounded-lg text-sm font-semibold text-brand hover:bg-brand/10 transition-all"
                                >
                                    {t.contact.again}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-6">

                                <div>
                                    <label htmlFor="contact-name" className="block text-sm text-fg-2 mb-2">{t.contact.name}</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={inputClass}
                                        placeholder={t.contact.namePlaceholder}
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="block text-sm text-fg-2 mb-2">{t.contact.email}</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={inputClass}
                                        placeholder={t.contact.emailPlaceholder}
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-sm text-fg-2 mb-2">{t.contact.message}</label>
                                    <textarea
                                        id="contact-message"
                                        rows="5"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className={`${inputClass} resize-none`}
                                        placeholder={t.contact.messagePlaceholder}
                                    />
                                    {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white py-3.5 rounded-lg text-sm font-semibold transition-colors"
                                >
                                    {processing ? t.contact.sending : t.contact.submit}
                                </button>

                            </form>
                        )}

                    </div>

                    {/* INFO */}
                    <div className="space-y-6 fade-up opacity-0 translate-y-6 transition duration-700 delay-200">

                        <div className="bg-surface p-6 sm:p-8 rounded-xl border border-line-soft">
                            <h3 className="text-base font-semibold mb-6 text-fg border-b border-line pb-4">{t.contact.info}</h3>

                            <dl className="space-y-4 text-sm">
                                {info.map(([label, value, href]) => (
                                    <div key={label} className="grid grid-cols-[6rem_1fr] gap-3">
                                        <dt className="text-subtle">{label}</dt>
                                        <dd className="text-fg break-words">
                                            {href ? (
                                                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-accent hover:underline">
                                                    {value}
                                                </a>
                                            ) : value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            {mapUrl && (
                                <div className="mt-6">
                                    <div className="relative h-44 rounded-lg overflow-hidden border border-line bg-surface-2">
                                        <iframe
                                            src={mapUrl}
                                            title={t.contact.mapTitle}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="absolute inset-0 w-full h-full border-0"
                                        />
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${settings?.company_name || ''} ${settings?.office_address || ''}`.trim())}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block mt-2 text-xs text-accent hover:underline"
                                    >
                                        {t.contact.mapOpen} →
                                    </a>
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
