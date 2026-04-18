import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ projects }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('admin.portfolio.destroy', id));
        }
    };

    return (
        <AdminLayout title="Portfolio">
            <div className="admin-header">
                <h1 className="admin-title">Project Portfolio</h1>
                <Link href={route('admin.portfolio.create')} className="admin-btn admin-btn-primary">
                    ➕ Add Project
                </Link>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Technologies</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{fontSize: '1.5rem'}}>{p.emoji}</div>
                                    </td>
                                    <td>
                                        <div style={{fontWeight: 600}}>{p.title}</div>
                                        <div style={{fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700}}>{p.color}</div>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.3rem'}}>
                                            {p.tech.map(t => <span key={t} className="admin-badge badge-success">{t}</span>)}
                                        </div>
                                    </td>
                                    <td>{p.order}</td>
                                    <td>
                                        <span className={`admin-badge ${p.is_active ? 'badge-success' : 'badge-danger'}`}>
                                            {p.is_active ? 'Live' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <Link href={route('admin.portfolio.edit', p.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
                                                ✏️
                                            </Link>
                                            <button onClick={() => handleDelete(p.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem', color: 'var(--admin-danger)'}}>
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
