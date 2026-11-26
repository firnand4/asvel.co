import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import TagInput from '@/Components/Admin/TagInput';
import { useForm, Link } from '@inertiajs/react';

const LANGS = [
    { key: '', label: 'Bahasa Indonesia' },
    { key: '_en', label: 'English' },
];

function Counter({ value = '', max }) {
    const n = value.length;
    return (
        <span style={{fontSize: '0.75rem', fontWeight: 600, color: n > max ? 'var(--admin-danger)' : 'var(--admin-text-muted)'}}>
            {n}/{max}{n > max ? ' (terlalu panjang, bisa terpotong di Google)' : ''}
        </span>
    );
}

function Error({ message }) {
    return message ? <div className="badge-danger" style={{marginTop: '0.3rem'}}>{message}</div> : null;
}

// Editable list of objects (process steps or FAQ items).
function ListEditor({ label, items, onChange, fields, addLabel, errors, errorKey }) {
    const update = (i, key, value) => onChange(items.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));
    const move = (i, dir) => {
        const next = [...items];
        [next[i], next[i + dir]] = [next[i + dir], next[i]];
        onChange(next);
    };

    return (
        <div className="admin-form-group">
            <label className="admin-label">{label}</label>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                {items.map((item, i) => (
                    <div key={i} style={{border: '1px solid var(--admin-border)', borderRadius: 10, padding: '0.9rem', background: 'var(--admin-surface-2)'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                            <strong style={{fontSize: '0.85rem'}}>#{i + 1}</strong>
                            <div style={{display: 'flex', gap: '0.35rem'}}>
                                <button type="button" className="admin-btn admin-btn-outline" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Naikkan">↑</button>
                                <button type="button" className="admin-btn admin-btn-outline" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Turunkan">↓</button>
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>Hapus</button>
                            </div>
                        </div>
                        {fields.map(f => (
                            <div key={f.key} style={{marginBottom: '0.5rem'}}>
                                <div style={{fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '0.2rem'}}>{f.label}</div>
                                {f.multiline ? (
                                    <textarea className="admin-textarea" rows={3} value={item[f.key] || ''} onChange={e => update(i, f.key, e.target.value)} />
                                ) : (
                                    <input type="text" className="admin-input" value={item[f.key] || ''} onChange={e => update(i, f.key, e.target.value)} />
                                )}
                                <Error message={errors[`${errorKey}.${i}.${f.key}`]} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button type="button" className="admin-btn admin-btn-outline" style={{marginTop: '0.75rem'}}
                onClick={() => onChange([...items, Object.fromEntries(fields.map(f => [f.key, '']))])}>
                + {addLabel}
            </button>
        </div>
    );
}

export default function Form({ page, services }) {
    const [tab, setTab] = useState('');
    const { data, setData, put, processing, errors } = useForm({
        service_id: page.service_id ?? '',
        h1: page.h1 || '',
        h1_en: page.h1_en || '',
        meta_title: page.meta_title || '',
        meta_title_en: page.meta_title_en || '',
        meta_description: page.meta_description || '',
        meta_description_en: page.meta_description_en || '',
        body: page.body || '',
        body_en: page.body_en || '',
        process: page.process || [],
        process_en: page.process_en || [],
        faq: page.faq || [],
        faq_en: page.faq_en || [],
        portfolio_categories: page.portfolio_categories || [],
        is_active: page.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.service-pages.update', page.id), { preserveScroll: true });
    };

    const f = (name) => name + tab; // field name for the selected language
    const tabHasErrors = (suffix) => Object.keys(errors).some(k => {
        const base = k.split('.')[0];
        return suffix ? base.endsWith('_en') : !base.endsWith('_en');
    });

    return (
        <AdminLayout title="Edit Service Page">
            <div className="admin-header">
                <h1 className="admin-title">Edit: {page.h1}</h1>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                    <a href={`/layanan/${page.slug}`} target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline">👁️ Lihat halaman</a>
                    <Link href={route('admin.service-pages.index')} className="admin-btn admin-btn-outline">⬅️ Back</Link>
                </div>
            </div>

            <form onSubmit={submit} style={{maxWidth: '1000px'}}>
                <div className="admin-card">
                    <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">URL (tidak bisa diubah)</label>
                            <input type="text" className="admin-input" value={`/layanan/${page.slug}`} readOnly disabled />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Kartu layanan di beranda</label>
                            <select className="admin-select" value={data.service_id} onChange={e => setData('service_id', e.target.value)}>
                                <option value="">— Tidak ada —</option>
                                {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                            </select>
                            <Error message={errors.service_id} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Status</label>
                            <select className="admin-select" value={data.is_active ? '1' : '0'} onChange={e => setData('is_active', e.target.value === '1')}>
                                <option value="1">Active</option>
                                <option value="0">Hidden</option>
                            </select>
                        </div>
                    </div>

                    <TagInput
                        label="Kategori portofolio yang ditampilkan (harus sama persis dengan kategori di Portfolio)"
                        values={data.portfolio_categories}
                        onChange={v => setData('portfolio_categories', v)}
                        placeholder="Contoh: WebGIS"
                    />
                </div>

                <div role="tablist" style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
                    {LANGS.map(l => (
                        <button key={l.key || 'id'} type="button" role="tab" aria-selected={tab === l.key}
                            className={`admin-btn ${tab === l.key ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                            onClick={() => setTab(l.key)}>
                            {l.label}{tabHasErrors(l.key) ? ' ⚠️' : ''}
                        </button>
                    ))}
                </div>

                <div className="admin-card" role="tabpanel">
                    {tab === '_en' && (
                        <p style={{marginTop: 0, fontSize: '0.85rem', color: 'var(--admin-text-muted)'}}>
                            Kolom English yang dikosongkan akan memakai teks Bahasa Indonesia.
                        </p>
                    )}

                    <div className="admin-form-group">
                        <label className="admin-label">Judul halaman (H1){tab ? '' : ' *'}</label>
                        <input type="text" className="admin-input" value={data[f('h1')]} onChange={e => setData(f('h1'), e.target.value)} />
                        <Error message={errors[f('h1')]} />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>Meta title{tab ? '' : ' *'}</span> <Counter value={data[f('meta_title')]} max={60} />
                        </label>
                        <input type="text" className="admin-input" value={data[f('meta_title')]} onChange={e => setData(f('meta_title'), e.target.value)} />
                        <Error message={errors[f('meta_title')]} />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>Meta description{tab ? '' : ' *'}</span> <Counter value={data[f('meta_description')]} max={155} />
                        </label>
                        <textarea className="admin-textarea" rows={3} value={data[f('meta_description')]} onChange={e => setData(f('meta_description'), e.target.value)} />
                        <Error message={errors[f('meta_description')]} />
                    </div>

                    {/* Approximate Google result preview */}
                    <div style={{border: '1px solid var(--admin-border)', borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.5rem', background: 'var(--admin-surface-2)'}}>
                        <div style={{fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginBottom: '0.35rem'}}>Pratinjau di Google (perkiraan)</div>
                        <div style={{fontSize: '0.8rem', color: 'var(--admin-text-muted)'}}>asvel.id › layanan › {page.slug}</div>
                        <div style={{color: '#1a0dab', fontSize: '1.1rem', margin: '0.2rem 0'}}>{(data[f('meta_title')] || data.meta_title).slice(0, 60)}</div>
                        <div style={{fontSize: '0.85rem', color: 'var(--admin-text-muted)'}}>{(data[f('meta_description')] || data.meta_description).slice(0, 155)}</div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Isi halaman{tab ? '' : ' *'}</label>
                        <div style={{fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '0.35rem'}}>
                            Pisahkan paragraf dengan baris kosong. Subjudul diawali "## ", daftar diawali "- ".
                        </div>
                        <textarea className="admin-textarea" rows={16} value={data[f('body')]} onChange={e => setData(f('body'), e.target.value)} style={{fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem'}} />
                        <Error message={errors[f('body')]} />
                    </div>

                    <ListEditor
                        key={`process${tab}`}
                        label="Proses kerja"
                        items={data[f('process')]}
                        onChange={v => setData(f('process'), v)}
                        fields={[{ key: 'title', label: 'Judul langkah' }, { key: 'desc', label: 'Keterangan', multiline: true }]}
                        addLabel="Tambah langkah"
                        errors={errors}
                        errorKey={f('process')}
                    />

                    <ListEditor
                        key={`faq${tab}`}
                        label="FAQ"
                        items={data[f('faq')]}
                        onChange={v => setData(f('faq'), v)}
                        fields={[{ key: 'q', label: 'Pertanyaan' }, { key: 'a', label: 'Jawaban', multiline: true }]}
                        addLabel="Tambah pertanyaan"
                        errors={errors}
                        errorKey={f('faq')}
                    />
                </div>

                <div className="admin-card" style={{position: 'sticky', bottom: '1rem', display: 'flex', justifyContent: 'flex-end'}}>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                        {processing ? '⏳ Saving...' : '💾 Simpan halaman'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
