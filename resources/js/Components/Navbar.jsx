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
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-black/60 backdrop-blur-md border-b border-white/10'
                    : 'bg-transparent'
                }`}>

                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">

                    {/* LOGO */}
                    <a href="#hero" onClick={e => handleNav(e, '#hero')}
                        className="text-white font-bold text-lg tracking-wide">
                        {companyName}
                    </a>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={e => handleNav(e, link.href)}
                                className={`text-sm transition ${active === link.href
                                        ? 'text-indigo-400'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={e => handleNav(e, '#contact')}
                        className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                        Start a Project
                    </button>

                    {/* HAMBURGER */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-6 text-white text-lg">

                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={e => handleNav(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}

                    <button
                        onClick={e => handleNav(e, '#contact')}
                        className="bg-indigo-600 px-6 py-3 rounded-lg"
                    >
                        Start a Project
                    </button>

                </div>
            )}
        </>
    );
}