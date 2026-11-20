import { useEffect, useState } from 'react';

// File picker with preview for admin forms. `current` is the saved path (relative to public/).
export default function ImageUpload({ label, hint, current, file, onFile, removed, onRemove, error, aspect = '1 / 1' }) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const src = preview || (current && !removed ? `/${current.replace(/^\/+/, '')}` : null);

    return (
        <div className="admin-form-group">
            <label className="admin-label">{label}</label>
            <div style={{display: 'flex', gap: '1.25rem', alignItems: 'flex-start'}}>
                <div style={{
                    width: 160, aspectRatio: aspect, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                    background: 'var(--admin-surface-2)', border: '1px solid var(--admin-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--admin-text-muted)', fontSize: '0.8rem',
                }}>
                    {src ? <img src={src} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : 'No image'}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={e => onFile(e.target.files[0] || null)}
                        className="admin-input"
                    />
                    {hint && <div style={{fontSize: '0.75rem', color: 'var(--admin-text-muted)'}}>{hint}</div>}
                    {current && !file && (
                        <label style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer'}}>
                            <input type="checkbox" checked={removed} onChange={e => onRemove(e.target.checked)} />
                            Remove current image
                        </label>
                    )}
                    {error && <div className="badge-danger">{error}</div>}
                </div>
            </div>
        </div>
    );
}
