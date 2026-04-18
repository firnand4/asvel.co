import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Show({ message }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Delete this message?')) {
            destroy(route('admin.messages.destroy', message.id));
        }
    };

    return (
        <AdminLayout title="Read Message">
            <div className="admin-header">
                <h1 className="admin-title">Message from {message.name}</h1>
                <Link href={route('admin.messages.index')} className="admin-btn admin-btn-outline">
                    ⬅️ Back to Inbox
                </Link>
            </div>

            <div className="admin-card" style={{maxWidth: '800px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem', marginBottom: '1.5rem'}}>
                    <div>
                        <div style={{fontSize: '0.85rem', color: 'var(--admin-text-muted)'}}>From:</div>
                        <div style={{fontWeight: 700, fontSize: '1.1rem'}}>{message.name}</div>
                        <div style={{color: 'var(--admin-primary)'}}>{message.email}</div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.85rem', color: 'var(--admin-text-muted)'}}>Received:</div>
                        <div style={{fontWeight: 600}}>{new Date(message.created_at).toLocaleString()}</div>
                    </div>
                </div>

                <div style={{fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: 'var(--admin-text)'}}>
                    {message.message}
                </div>

                <div style={{marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: '1rem'}}>
                    <a href={`mailto:${message.email}`} className="admin-btn admin-btn-primary">
                        📧 Reply via Email
                    </a>
                    <button onClick={handleDelete} className="admin-btn admin-btn-outline" style={{color: 'var(--admin-danger)'}}>
                        🗑️ Delete Message
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
