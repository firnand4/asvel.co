import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ team }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this team member?')) {
            destroy(route('admin.team.destroy', id));
        }
    };

    return (
        <AdminLayout title="Team Members">
            <div className="admin-header">
                <h1 className="admin-title">Team Management</h1>
                <Link href={route('admin.team.create')} className="admin-btn admin-btn-primary">
                    ➕ Add Member
                </Link>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.map(m => (
                                <tr key={m.id}>
                                    <td>
                                        {m.photo
                                            ? <img src={`/${m.photo}`} alt="" style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}} />
                                            : <div style={{width: 40, height: 40, borderRadius: '50%', background: 'var(--admin-surface-2)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '0.8rem'}}>{m.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}</div>}
                                    </td>
                                    <td>
                                        <div style={{fontWeight: 600}}>{m.name}</div>
                                        <div style={{fontSize: '0.75rem', color: 'var(--admin-text-muted)'}}>{m.expertise}</div>
                                    </td>
                                    <td>{m.role}</td>
                                    <td>{m.order}</td>
                                    <td>
                                        <span className={`admin-badge ${m.is_active ? 'badge-success' : 'badge-danger'}`}>
                                            {m.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <Link href={route('admin.team.edit', m.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
                                                ✏️
                                            </Link>
                                            <button onClick={() => handleDelete(m.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem', color: 'var(--admin-danger)'}}>
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
