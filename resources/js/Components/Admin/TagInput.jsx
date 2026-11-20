import { useState } from 'react';

// List input for admin forms: add with the button, Enter or a comma; remove with ×.
// Enter is ignored while an IME/autocorrect composition is active, since that first
// Enter only confirms the typed word (macOS reports it as "Process", not "Enter").
export default function TagInput({ label, values = [], onChange, placeholder, error }) {
    const [text, setText] = useState('');

    const add = () => {
        const items = text.split(',').map(s => s.trim()).filter(Boolean);
        const next = [...values];
        items.forEach(item => {
            if (!next.includes(item)) next.push(item);
        });
        if (next.length !== values.length) onChange(next);
        setText('');
    };

    const onKeyDown = (e) => {
        if (e.nativeEvent.isComposing || e.keyCode === 229) return;
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault(); // also keeps Enter from submitting the form
            add();
        }
    };

    return (
        <div className="admin-form-group">
            <label className="admin-label">{label}</label>
            <div style={{display: 'flex', gap: '0.5rem'}}>
                <input
                    type="text"
                    className="admin-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    style={{flex: 1}}
                />
                <button type="button" className="admin-btn admin-btn-outline" onClick={add} disabled={!text.trim()}>
                    + Tambah
                </button>
            </div>
            <div style={{fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '0.35rem'}}>
                Tekan Enter, koma, atau tombol Tambah. Bisa beberapa sekaligus: Laravel, React
            </div>
            {values.length > 0 && (
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem'}}>
                    {values.map(v => (
                        <span key={v} className="admin-badge badge-success" style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                            {v}
                            <button type="button" onClick={() => onChange(values.filter(x => x !== v))} aria-label={`Hapus ${v}`}
                                style={{border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit'}}>×</button>
                        </span>
                    ))}
                </div>
            )}
            {error && <div className="badge-danger">{error}</div>}
        </div>
    );
}
