import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ services }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Delete this service?')) {
            destroy(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout title="Services">
            <div className="admin-header">
                <h1 className="admin-title">Service Offerings</h1>
                <Link href={route('admin.services.create')} className="admin-btn admin-btn-primary">
                    ➕ Add Service
                </Link>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Tech Base</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(s => (
                                <tr key={s.id}>
                                    <td>
                                        <div className="admin-badge" style={{fontSize: '1.25rem', background: s.color+'22', color: s.color}}>
                                            {s.icon}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{fontWeight: 600}}>{s.title}</div>
                                        <div style={{fontSize: '0.8rem', color: 'var(--admin-text-muted)', maxWidth: '300px'}} className="truncate">
                                            {s.description}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.3rem'}}>
                                            {s.tech?.map(t => <span key={t} className="admin-badge" style={{background: 'var(--admin-surface-2)', color: 'var(--admin-text)'}}>{t}</span>)}
                                        </div>
                                    </td>
                                    <td>{s.order}</td>
                                    <td>
                                        <span className={`admin-badge ${s.is_active ? 'badge-success' : 'badge-danger'}`}>
                                            {s.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <Link href={route('admin.services.edit', s.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
                                                ✏️
                                            </Link>
                                            <button onClick={() => handleDelete(s.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem', color: 'var(--admin-danger)'}}>
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
