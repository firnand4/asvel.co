import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n';

// Tech name (lower-case) -> Simple Icons slug. Names without a logo (e.g. AWS) show as text only.
const ICON_SLUGS = {
    'laravel': 'laravel',
    'node.js': 'nodedotjs',
    'react': 'react',
    'react native': 'react',
    'vue.js': 'vuedotjs',
    'python': 'python',
    'pytorch': 'pytorch',
    'tensorflow': 'tensorflow',
    'opencv': 'opencv',
    'flutter': 'flutter',
    'kotlin': 'kotlin',
    'android': 'android',
    'postgresql': 'postgresql',
    'mysql': 'mysql',
    'mongodb': 'mongodb',
    'redis': 'redis',
    'docker': 'docker',
    'nginx': 'nginx',
    'git': 'git',
    'linux': 'linux',
    'figma': 'figma',
    'php': 'php',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'tailwind css': 'tailwindcss',
    'firebase': 'firebase',
};

function TechLabel({ name }) {
    const slug = ICON_SLUGS[name.toLowerCase()];
    const [failed, setFailed] = useState(false);

    return (
        <span className="inline-flex items-center gap-2 text-sm text-fg-2 bg-surface border border-line-soft rounded-full px-3 py-1.5">
            {slug && !failed && (
                <img
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt=""
                    width="16"
                    height="16"
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="h-4 w-4"
                />
            )}
            {name}
        </span>
    );
}

export default function TechStack({ techStack = [] }) {
    const { t } = useLang();

    const safeData = (techStack || []).filter(item => item && item.name);

    // Unique names in the admin-defined order (e.g. React and React Native share a logo but stay separate).
    const names = [...new Set(safeData.map(item => item.name))];

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

    if (!safeData.length) return null;

    return (
        <section id="tech" className="py-16 md:py-20 text-fg overflow-hidden" ref={ref}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="max-w-2xl fade-up opacity-0 translate-y-6 transition duration-700">
                    <div className="eyebrow mb-4">{t.tech.eyebrow}</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        {t.tech.title}
                    </h2>
                    <p className="text-muted mt-4 leading-relaxed">
                        {t.tech.subtitle}
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 fade-up opacity-0 translate-y-6 transition duration-700">
                    {names.map(name => <TechLabel key={name} name={name} />)}
                </div>

            </div>
        </section>
    );
}
