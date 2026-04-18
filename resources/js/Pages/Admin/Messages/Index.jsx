import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ messages }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Delete this message?')) {
            destroy(route('admin.messages.destroy', id));
        }
    };

    return (
        <AdminLayout title="Messages">
            <div className="admin-header">
                <h1 className="admin-title">Inquiry Inbox</h1>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Sender</th>
                                <th>Date</th>
                                <th>Preview</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(m => (
                                <tr key={m.id} style={{fontWeight: m.read_at ? 400 : 700}}>
                                    <td>
                                        <span className={`admin-badge ${m.read_at ? 'badge-success' : 'badge-warning'}`}>
                                            {m.read_at ? 'Read' : 'New'}
                                        </span>
                                    </td>
                                    <td>
                                        <div>{m.name}</div>
                                        <div style={{fontSize: '0.75rem', opacity: 0.7}}>{m.email}</div>
                                    </td>
                                    <td>{new Date(m.created_at).toLocaleString()}</td>
                                    <td>
                                        <div className="truncate" style={{maxWidth: '300px', opacity: 0.8}}>
                                            {m.message}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <Link href={route('admin.messages.show', m.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
                                                👁️
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
                {messages.length === 0 && (
                    <div style={{textAlign: 'center', padding: '3rem', opacity: 0.5}}>
                        No messages yet.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
