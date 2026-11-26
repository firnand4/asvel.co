import { useState, useEffect } from 'react';
import { useLang, LANGUAGES } from '../i18n';
import ThemeToggle from './ThemeToggle';

const sectionIds = ['about', 'services', 'portfolio', 'team', 'process', 'blog', 'contact'];

export function LanguageSwitch({ className = '' }) {
    const { lang, setLang, t } = useLang();

    return (
        <div role="group" aria-label={t.nav.language} className={`inline-flex rounded-full border border-line p-0.5 text-xs ${className}`}>
            {LANGUAGES.map(code => (
                <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`px-2.5 py-1 rounded-full uppercase font-semibold transition-colors ${lang === code ? 'bg-fg text-page' : 'text-muted hover:text-fg'}`}
                >
                    {code}
                </button>
            ))}
        </div>
    );
}

export default function Navbar() {
    const { t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('');
    const [available, setAvailable] = useState(sectionIds);

    // Sections without data are not rendered, so hide their links too.
    useEffect(() => {
        setAvailable(sectionIds.filter(id => document.getElementById(id)));
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);

            let current = '';
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    current = id;
                }
            });
            setActive(current);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNav = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const links = available.map(id => ({ id, label: t.nav[id] }));

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-page/90 backdrop-blur-xl border-b border-line py-3'
                    : 'bg-transparent py-5'
                }`}>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

                    <a href="#hero" onClick={e => handleNav(e, 'hero')}
                        className="text-fg font-black text-lg sm:text-2xl tracking-tighter lowercase flex items-center whitespace-nowrap">
                        <span>asvel coding factory</span>
                        <span className="text-accent ml-0.5">.</span>
                    </a>

                    <div className="hidden lg:flex items-center gap-7">
                        {links.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={e => handleNav(e, link.id)}
                                className={`text-sm transition-colors ${active === link.id ? 'text-accent font-semibold' : 'text-muted hover:text-fg'}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitch />
                        <button
                            onClick={e => handleNav(e, 'contact')}
                            className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                        >
                            {t.nav.cta}
                        </button>
                    </div>

                    <div className="flex lg:hidden items-center gap-2">
                        <ThemeToggle />
                        <LanguageSwitch />
                        <button
                            className="text-accent text-2xl hover:text-fg transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menu"
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </nav>

            {menuOpen && (
                <div className="fixed inset-0 bg-page/95 z-40 flex flex-col items-center justify-center space-y-7 text-fg">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={e => handleNav(e, link.id)}
                            className="text-lg hover:text-accent transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}

                    <button
                        onClick={e => handleNav(e, 'contact')}
                        className="bg-indigo-700 text-white text-sm font-semibold px-8 py-3 rounded-full mt-4"
                    >
                        {t.nav.cta}
                    </button>
                </div>
            )}
        </>
    );
}
