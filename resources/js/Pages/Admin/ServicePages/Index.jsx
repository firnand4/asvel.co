import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Index({ pages }) {
    return (
        <AdminLayout title="Service Pages">
            <div className="admin-header">
                <h1 className="admin-title">Service Pages</h1>
            </div>

            <div className="admin-card">
                <p style={{marginTop: 0, color: 'var(--admin-text-muted)', fontSize: '0.9rem'}}>
                    Halaman SEO untuk tiap layanan. URL (slug) sengaja tidak bisa diubah agar halaman yang sudah terindeks Google tidak rusak.
                </p>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Halaman</th>
                            <th>URL</th>
                            <th>Kartu layanan</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div style={{fontWeight: 600}}>{p.h1}</div>
                                    <div style={{fontSize: '0.75rem', color: 'var(--admin-text-muted)'}}>{p.h1_en}</div>
                                </td>
                                <td>
                                    <a href={`/layanan/${p.slug}`} target="_blank" rel="noreferrer" style={{color: 'var(--admin-primary)', fontSize: '0.85rem'}}>
                                        /layanan/{p.slug} ↗
                                    </a>
                                </td>
                                <td>{p.service?.title || '—'}</td>
                                <td>
                                    <span className={`admin-badge ${p.is_active ? 'badge-success' : 'badge-danger'}`}>
                                        {p.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td>
                                    <Link href={route('admin.service-pages.edit', p.id)} className="admin-btn admin-btn-outline" style={{fontSize: '0.8rem'}}>
                                        ✏️ Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
