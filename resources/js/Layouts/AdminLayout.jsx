import React, { useState, useEffect } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import '../../css/admin.css';

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    useEffect(() => {
        document.body.classList.add('admin-mode');
        return () => document.body.classList.remove('admin-mode');
    }, []);

    const navLinks = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
        { label: 'Messages', href: '/admin/messages', icon: '📬' },
        { label: 'Content', type: 'label' },
        { label: 'Services', href: '/admin/services', icon: '🌐' },
        { label: 'Portfolio', href: '/admin/portfolio', icon: '🚀' },
        { label: 'Team', href: '/admin/team', icon: '👥' },
        { label: 'Blog', href: '/admin/blog', icon: '📝' },
        { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
        { label: 'Tech Stack', href: '/admin/tech-stack', icon: '⚙️' },
        { label: 'System', type: 'label' },
        { label: 'Settings', href: '/admin/settings', icon: '🔧' },
        { label: 'Profile', href: '/profile', icon: '👤' },
    ];

    return (
        <div className="admin-layout">
            <Head title={`Admin - ${title}`} />

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <Link href="/admin/dashboard" className="admin-sidebar-logo">
                    <span style={{color: 'var(--admin-primary)'}}>▲</span> ASVEL Admin
                </Link>

                <nav className="admin-nav">
                    {navLinks.map((link, i) => (
                        link.type === 'label' ? (
                            <div key={i} className="admin-nav-label">{link.label}</div>
                        ) : (
                            <Link
                                key={i}
                                href={link.href}
                                className={`admin-nav-item ${url.startsWith(link.href) ? 'active' : ''}`}
                            >
                                <span>{link.icon}</span>
                                {link.label}
                            </Link>
                        )
                    ))}
                </nav>

                <div style={{padding: '1rem', borderTop: '1px solid var(--admin-border)'}}>
                    <Link href="/logout" method="post" as="button" className="admin-nav-item" style={{width: '100%', border: 'none', background: 'transparent', cursor: 'pointer'}}>
                        <span>🚪</span> Logout
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="admin-main">
                <header className="admin-topbar">
                    <div style={{fontWeight: 600}}>
                        {title}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Link href="/" className="admin-btn admin-btn-outline" style={{fontSize: '0.8rem'}}>
                            👁️ View Site
                        </Link>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <div style={{width: 32, height: 32, borderRadius: '50%', background: 'var(--admin-surface-2)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '1rem'}}>
                                🤵
                            </div>
                            <span style={{fontSize: '0.9rem', fontWeight: 500}}>{auth.user.name}</span>
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
