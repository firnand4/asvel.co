import { useEffect, useState } from 'react';
import { useLang, waLink } from '../../i18n';

// Bounding boxes in % of the 400×300 scene below.
const DETECTIONS = [
    { key: 'person', score: 0.94, color: '#22d3ee', box: { left: 62, top: 39.3, width: 10.5, height: 44.7 } },
    { key: 'forklift', score: 0.91, color: '#fbbf24', box: { left: 9.5, top: 46, width: 38.5, height: 40 } },
    { key: 'box', score: 0.88, color: '#34d399', box: { left: 77, top: 65.3, width: 18.5, height: 22 } },
    { key: 'box', score: 0.82, color: '#34d399', box: { left: 10, top: 67.7, width: 11, height: 11.3 } },
];

const STEP_MS = 700;
const HOLD_STEPS = 6;

function WarehouseScene() {
    return (
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
                <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#111827" />
                    <stop offset="1" stopColor="#1f2937" />
                </linearGradient>
                <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#374151" />
                    <stop offset="1" stopColor="#1f2937" />
                </linearGradient>
            </defs>

            {/* Wall and floor */}
            <rect width="400" height="175" fill="url(#wall)" />
            <rect y="175" width="400" height="125" fill="url(#floor)" />
            <g stroke="#4b5563" strokeWidth="1" opacity="0.5">
                <line x1="200" y1="175" x2="0" y2="300" />
                <line x1="200" y1="175" x2="130" y2="300" />
                <line x1="200" y1="175" x2="270" y2="300" />
                <line x1="200" y1="175" x2="400" y2="300" />
            </g>

            {/* Shelving */}
            <g fill="#4b5563">
                <rect x="200" y="50" width="4" height="125" />
                <rect x="380" y="50" width="4" height="125" />
                <rect x="200" y="85" width="184" height="4" />
                <rect x="200" y="130" width="184" height="4" />
            </g>
            <g fill="#92400e" opacity="0.7">
                <rect x="212" y="62" width="30" height="23" />
                <rect x="248" y="68" width="24" height="17" />
                <rect x="320" y="60" width="34" height="25" />
                <rect x="228" y="108" width="36" height="22" />
                <rect x="300" y="112" width="26" height="18" />
                <rect x="334" y="104" width="38" height="26" />
            </g>

            {/* Forklift */}
            <g>
                <rect x="70" y="140" width="8" height="100" fill="#6b7280" />
                <rect x="40" y="235" width="50" height="5" fill="#9ca3af" />
                <rect x="42" y="205" width="40" height="30" fill="#b45309" />
                <line x1="42" y1="220" x2="82" y2="220" stroke="#78350f" strokeWidth="1.5" />
                <rect x="88" y="195" width="84" height="45" rx="4" fill="#d97706" />
                <path d="M110 195 V160 H158 L166 195" fill="none" stroke="#9ca3af" strokeWidth="4" />
                <circle cx="105" cy="245" r="12" fill="#111827" stroke="#6b7280" strokeWidth="3" />
                <circle cx="155" cy="245" r="12" fill="#111827" stroke="#6b7280" strokeWidth="3" />
            </g>

            {/* Worker with helmet */}
            <g>
                <path d="M256 131 a12 10 0 0 1 24 0 z" fill="#facc15" />
                <circle cx="268" cy="137" r="9" fill="#d6a77a" />
                <rect x="255" y="148" width="26" height="58" rx="6" fill="#f97316" />
                <rect x="255" y="170" width="26" height="4" fill="#fde047" />
                <rect x="258" y="204" width="8" height="46" rx="3" fill="#1e3a8a" />
                <rect x="270" y="204" width="8" height="46" rx="3" fill="#1e3a8a" />
            </g>

            {/* Box stack */}
            <g>
                <rect x="310" y="226" width="34" height="34" fill="#b45309" />
                <rect x="346" y="226" width="34" height="34" fill="#a16207" />
                <rect x="326" y="198" width="36" height="28" fill="#ca8a04" />
                <g stroke="#78350f" strokeWidth="1.5">
                    <line x1="327" y1="226" x2="327" y2="260" />
                    <line x1="363" y1="226" x2="363" y2="260" />
                    <line x1="344" y1="198" x2="344" y2="226" />
                </g>
            </g>
        </svg>
    );
}

function DetectionDemo() {
    const { t } = useLang();
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(DETECTIONS.length);
            return;
        }

        let step = 0;
        const timer = setInterval(() => {
            step = (step + 1) % (DETECTIONS.length + HOLD_STEPS);
            setVisible(Math.min(step, DETECTIONS.length));
        }, STEP_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <figure className="w-full theme-dark text-fg">
            <div className="rounded-xl border border-line bg-surface-2 overflow-hidden">

                {/* Camera header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-line text-xs">
                    <div className="flex items-center gap-2 text-fg-2">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        {t.hero.demo.camera}
                    </div>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
                        {t.hero.demo.mode}
                    </span>
                </div>

                {/* Scene + boxes */}
                <div className="relative aspect-[4/3]">
                    <WarehouseScene />

                    {DETECTIONS.map((d, i) => {
                        const shown = i < visible;
                        return (
                            <div
                                key={i}
                                className={`absolute border-2 rounded-sm transition-all duration-300 ${shown ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                                style={{
                                    left: `${d.box.left}%`,
                                    top: `${d.box.top}%`,
                                    width: `${d.box.width}%`,
                                    height: `${d.box.height}%`,
                                    borderColor: d.color,
                                    boxShadow: `0 0 12px ${d.color}55`,
                                }}
                            >
                                <span
                                    className="absolute -top-[1.35rem] -left-[2px] whitespace-nowrap rounded-t-sm px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold leading-none text-gray-950"
                                    style={{ background: d.color }}
                                >
                                    {t.hero.demo.labels[d.key]} {d.score.toFixed(2)}
                                </span>
                            </div>
                        );
                    })}

                    {/* Scan line */}
                    <div className="hero-scan absolute inset-x-0 h-px bg-accent/60 shadow-[0_0_8px_rgba(103,232,249,0.8)] pointer-events-none" />
                </div>

                {/* Detection counter */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-line text-xs text-muted">
                    <span>
                        <span className="text-accent font-semibold tabular-nums">{visible}</span> {t.hero.demo.detected}
                    </span>
                    <span className="flex gap-1.5">
                        {[...new Set(DETECTIONS.map(d => d.color))].map(c => (
                            <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
                        ))}
                    </span>
                </div>
            </div>

            <figcaption className="mt-3 text-xs text-subtle leading-relaxed">
                {t.hero.demo.caption}
            </figcaption>

            <style>{`
                @keyframes hero-scan { from { top: 0%; } to { top: 100%; } }
                .hero-scan { animation: hero-scan 3.5s linear infinite; }
                @media (prefers-reduced-motion: reduce) { .hero-scan { display: none; } }
            `}</style>
        </figure>
    );
}

export default function Hero({ settings, copy, stats = {}, hasPortfolio }) {
    const { t } = useLang();

    const handleScroll = (id) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Only show numbers that exist in the database; nothing is shown until data is entered.
    const statItems = [
        [stats.projects, t.stats.projects],
        [stats.services, t.stats.services],
        [stats.technologies, t.stats.technologies],
        [stats.team, t.stats.team],
    ].filter(([n]) => n > 0);

    return (
        <section id="hero" className="relative min-h-screen flex items-center hero-bg text-fg overflow-hidden font-sans">



            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-14 items-center">

                <div className="space-y-7">
                    <div className="inline-flex items-center gap-2 bg-surface border border-line px-3.5 py-1.5 rounded-full text-xs font-medium text-fg-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {t.hero.badge}
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                        {copy.tagline}
                    </h1>

                    <p className="text-muted text-lg leading-relaxed max-w-xl">
                        {copy.subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                            href={waLink(settings.whatsapp_number, t.wa.message)}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center justify-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            {t.hero.ctaPrimary}
                            <span className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-white/15 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                        </a>

                        <button
                            onClick={() => handleScroll(hasPortfolio ? '#portfolio' : '#services')}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-fg/15 text-fg font-semibold hover:border-fg/40 transition-colors"
                        >
                            {hasPortfolio ? t.hero.ctaPortfolio : t.hero.ctaServices}
                        </button>
                    </div>

                    {statItems.length > 0 && (
                        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-line">
                            {statItems.map(([n, label]) => (
                                <div key={label} className="flex flex-col-reverse justify-end gap-1">
                                    <dt className="text-xs text-subtle leading-snug">{label}</dt>
                                    <dd className="text-3xl font-bold text-fg tabular-nums">{n}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>

                <DetectionDemo />
            </div>
        </section>
    );
}
