import { useState, useEffect } from 'react';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#team', label: 'Team' },
    { href: '#process', label: 'Process' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar({ companyName = 'ASVEL' }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);

            let current = '';
            navLinks.forEach(link => {
                const el = document.querySelector(link.href);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    current = link.href;
                }
            });
            setActive(current);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNav = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#05050A]/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
                    : 'bg-transparent py-5'
                }`}>

                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

                    {/* LOGO */}
                    <a href="#hero" onClick={e => handleNav(e, '#hero')}
                        className="text-white font-black text-2xl tracking-tighter lowercase flex items-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-300 to-indigo-400">asvel</span>
                        <span className="text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] ml-0.5">.</span>
                    </a>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={e => handleNav(e, link.href)}
                                className={`text-[11px] font-mono uppercase tracking-[0.15em] transition-all ${active === link.href
                                        ? 'text-cyan-400 font-bold'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={e => handleNav(e, '#contact')}
                        className="hidden md:block border border-indigo-500/50 hover:bg-indigo-600/20 text-indigo-300 hover:text-white font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-sm transition-all shadow-[0_0_10px_rgba(99,102,241,0.1)] hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                    >
                        Initialize
                    </button>

                    {/* HAMBURGER */}
                    <button
                        className="md:hidden text-cyan-400 text-2xl hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="fixed inset-0 bg-[#05050A]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 text-white">

                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={e => handleNav(e, link.href)}
                            className="font-mono text-sm uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}

                    <button
                        onClick={e => handleNav(e, '#contact')}
                        className="border border-indigo-500 text-indigo-300 font-mono text-xs uppercase tracking-widest px-8 py-3 mt-4"
                    >
                        Initialize_Project
                    </button>

                </div>
            )}
        </>
    );
}