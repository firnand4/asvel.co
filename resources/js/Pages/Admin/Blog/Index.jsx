import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ posts }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Delete this post?')) {
            destroy(route('admin.blog.destroy', id));
        }
    };

    return (
        <AdminLayout title="Blog Posts">
            <div className="admin-header">
                <h1 className="admin-title">Blog Content</h1>
                <Link href={route('admin.blog.create')} className="admin-btn admin-btn-primary">
                    📝 Write New Post
                </Link>
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(p => (
                                <tr key={p.id}>
                                    <td style={{fontSize: '1.5rem'}}>{p.emoji}</td>
                                    <td>
                                        <div style={{fontWeight: 600}}>{p.title}</div>
                                        <div style={{fontSize: '0.75rem', opacity: 0.7}}>{p.read_time}</div>
                                    </td>
                                    <td>
                                        <span className="admin-badge" style={{background: p.color+'22', color: p.color}}>
                                            {p.category}
                                        </span>
                                    </td>
                                    <td>{p.published_at ? new Date(p.published_at).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <span className={`admin-badge ${p.is_published ? 'badge-success' : 'badge-danger'}`}>
                                            {p.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <Link href={route('admin.blog.edit', p.id)} className="admin-btn admin-btn-outline" style={{padding: '0.4rem 0.6rem'}}>
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
