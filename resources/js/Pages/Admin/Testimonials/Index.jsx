import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ testimonials }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Delete this testimonial?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AdminLayout title="Testimonials">
            <div className="admin-header">
                <h1 className="admin-title">Client Feedback</h1>
                <Link href={route('admin.testimonials.create')} className="admin-btn admin-btn-primary">
                    ➕ Add Testimonial
                </Link>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Client</th>
                                <th>Rating</th>
                                <th>Feedback Preview</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map(t => (
                                <tr key={t.id}>
                                    <td style={{fontSize: '1.5rem'}}>{t.avatar}</td>
                                    <td>
                                        <div style={{fontWeight: 600}}>{t.name}</div>
                                        <div style={{fontSize: '0.75rem', opacity: 0.7}}>{t.role}</div>
                                    </td>
                                    <td>
                                        {'⭐'.repeat(t.rating)}
                                    </td>
                                    <td>
                                        <div className="truncate" style={{maxWidth: '300px', opacity: 0.8, fontSize: '0.85rem'}}>
                                            {t.text}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <Link href={route('admin.testimonials.edit', t.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
                                                ✏️
                                            </Link>
                                            <button onClick={() => handleDelete(t.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem', color: 'var(--admin-danger)'}}>
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
