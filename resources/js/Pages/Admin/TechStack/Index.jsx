import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Index({ techs }) {
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        name: '', emoji: '⚙️', category: 'Backend', order: 0, is_active: true
    });

    const [editingId, setEditingId] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route('admin.tech-stack.update', editingId), {
                onSuccess: () => { setEditingId(null); reset(); }
            });
        } else {
            post(route('admin.tech-stack.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (t) => {
        setEditingId(t.id);
        setData({
            name: t.name,
            emoji: t.emoji,
            category: t.category,
            order: t.order,
            is_active: t.is_active
        });
    };

    const handleDelete = (id) => {
        if (confirm('Remove this tech?')) {
            destroy(route('admin.tech-stack.destroy', id));
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    return (
        <AdminLayout title="Tech Stack">
            <div className="admin-header">
                <h1 className="admin-title">Technology Ecosystem</h1>
            </div>

            <div className="admin-card">
                <h3 style={{marginBottom: '1.5rem'}}>{editingId ? 'Edit Technology' : 'Add New Technology'}</h3>
                <form onSubmit={submit} style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end'}}>
                    <div className="admin-form-group" style={{flex: 1, minWidth: '150px', marginBottom: 0}}>
                        <label className="admin-label">Name</label>
                        <input type="text" className="admin-input" value={data.name} onChange={e => setData('name', e.target.value)} required />
                    </div>
                    <div className="admin-form-group" style={{width: '80px', marginBottom: 0}}>
                        <label className="admin-label">Emoji</label>
                        <input type="text" className="admin-input" value={data.emoji} onChange={e => setData('emoji', e.target.value)} required />
                    </div>
                    <div className="admin-form-group" style={{width: '150px', marginBottom: 0}}>
                        <label className="admin-label">Category</label>
                        <select className="admin-select" value={data.category} onChange={e => setData('category', e.target.value)}>
                            <option>Backend</option>
                            <option>Frontend</option>
                            <option>Mobile</option>
                            <option>AI/Data</option>
                            <option>Database</option>
                            <option>DevOps</option>
                            <option>Cloud</option>
                            <option>Design</option>
                        </select>
                    </div>
                    <div className="admin-form-group" style={{width: '80px', marginBottom: 0}}>
                        <label className="admin-label">Order</label>
                        <input type="number" className="admin-input" value={data.order} onChange={e => setData('order', e.target.value)} />
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {editingId ? 'Update' : 'Add Tech'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={cancelEdit} className="admin-btn admin-btn-outline">Cancel</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techs.map(t => (
                                <tr key={t.id} style={{opacity: t.is_active ? 1 : 0.5}}>
                                    <td style={{fontSize: '1.5rem'}}>{t.emoji}</td>
                                    <td style={{fontWeight: 600}}>{t.name}</td>
                                    <td>
                                        <span className="admin-badge badge-success">{t.category}</span>
                                    </td>
                                    <td>{t.order}</td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <button onClick={() => handleEdit(t)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
                                                ✏️
                                            </button>
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
