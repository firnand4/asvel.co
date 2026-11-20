import { useEffect, useState } from 'react';

// Curated, widely recognised icons grouped by theme.
const ICON_GROUPS = [
    { label: 'Teknologi', icons: ['💻', '🖥️', '📱', '⌨️', '🖱️', '🌐', '🔗', '☁️', '🗄️', '💾', '🔌', '📡', '🛰️', '🤖', '🧠', '⚙️', '🔧', '🛠️', '🧪', '🔬'] },
    { label: 'Data & Analitik', icons: ['📊', '📈', '📉', '🧮', '🔢', '📋', '🗂️', '📁', '🔍', '🔎', '🧾', '📑'] },
    { label: 'Peta & Lokasi', icons: ['🗺️', '🧭', '📍', '📌', '🌍', '🌏', '🏙️', '🏘️', '🏞️', '🛣️', '🚧', '🏗️'] },
    { label: 'Kamera & Visual', icons: ['📷', '📸', '🎥', '📹', '👁️', '🖼️', '🎨', '✏️', '🖌️', '🔦'] },
    { label: 'Bisnis', icons: ['💼', '🏢', '🏬', '🏭', '🏦', '🏪', '🛒', '💳', '💰', '🧾', '🤝', '📦', '🚚', '🏷️'] },
    { label: 'Komunikasi', icons: ['💬', '📞', '✉️', '📨', '📣', '🔔', '📝', '📰', '📚', '🎓'] },
    { label: 'Layanan Publik', icons: ['🏛️', '🏥', '🏫', '🚓', '🚑', '🌾', '🌳', '💧', '⚡', '♻️'] },
    { label: 'Umum', icons: ['🚀', '⭐', '✅', '🔒', '🛡️', '🎯', '💡', '🔥', '⏱️', '📅', '🧩', '🏆', '❤️', '👥', '👤', '🌱'] },
];

// Button that shows the current icon and opens a popup grid to pick another one.
export default function IconPicker({ label = 'Icon', value, onChange, error }) {
    const [open, setOpen] = useState(false);
    const [custom, setCustom] = useState('');

    useEffect(() => {
        if (!open) return;
        const onKey = e => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const pick = icon => {
        onChange(icon);
        setOpen(false);
    };

    return (
        <div className="admin-form-group">
            <label className="admin-label">{label}</label>
            <button type="button" className="admin-input" onClick={() => setOpen(true)}
                style={{display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', textAlign: 'left'}}>
                <span style={{fontSize: '1.4rem', lineHeight: 1}}>{value || '—'}</span>
                <span style={{color: 'var(--admin-text-muted)', fontSize: '0.85rem'}}>Pilih ikon</span>
            </button>
            {error && <div className="badge-danger">{error}</div>}

            {open && (
                <div onClick={() => setOpen(false)} style={{
                    position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                }}>
                    <div role="dialog" aria-modal="true" aria-label="Pilih ikon" onClick={e => e.stopPropagation()} style={{
                        background: 'var(--admin-surface)', color: 'var(--admin-text)', border: '1px solid var(--admin-border)',
                        borderRadius: 14, width: 'min(560px, 100%)', maxHeight: '80vh', display: 'flex', flexDirection: 'column',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                    }}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--admin-border)'}}>
                            <strong>Pilih ikon</strong>
                            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup"
                                style={{border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'inherit'}}>✕</button>
                        </div>

                        <div style={{overflowY: 'auto', padding: '1rem 1.25rem'}}>
                            {ICON_GROUPS.map(group => (
                                <div key={group.label} style={{marginBottom: '1rem'}}>
                                    <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--admin-text-muted)', marginBottom: '0.5rem'}}>{group.label}</div>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: '0.35rem'}}>
                                        {group.icons.map(icon => (
                                            <button key={group.label + icon} type="button" onClick={() => pick(icon)} title={icon}
                                                style={{
                                                    fontSize: '1.4rem', height: 44, borderRadius: 8, cursor: 'pointer',
                                                    border: icon === value ? '2px solid var(--admin-primary)' : '1px solid var(--admin-border)',
                                                    background: icon === value ? 'var(--admin-primary-glow)' : 'var(--admin-surface-2)',
                                                }}>
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{display: 'flex', gap: '0.5rem', padding: '0.9rem 1.25rem', borderTop: '1px solid var(--admin-border)'}}>
                            <input type="text" className="admin-input" placeholder="Atau tempel emoji lain…" maxLength={16}
                                value={custom} onChange={e => setCustom(e.target.value)} style={{flex: 1}} />
                            <button type="button" className="admin-btn admin-btn-primary" disabled={!custom.trim()}
                                onClick={() => { pick(custom.trim()); setCustom(''); }}>
                                Pakai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
