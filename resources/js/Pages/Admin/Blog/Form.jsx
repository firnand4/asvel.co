import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import IconPicker from '@/Components/Admin/IconPicker';

export default function Form({ post }) {
    const isEditing = !!post.id;
    const { data, setData, post: postData, put, processing, errors } = useForm({
        title: post.title || '',
        slug: post.slug || '',
        category: post.category || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        emoji: post.emoji || '📝',
        color: post.color || '#6c63ff',
        read_time: post.read_time || '5 min read',
        is_published: post.is_published ?? true,
        published_at: post.published_at ? post.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.blog.update', post.id));
        } else {
            postData(route('admin.blog.store'));
        }
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Post' : 'New Post'}>
            <div className="admin-header">
                <h1 className="admin-title">{isEditing ? `Edit: ${post.title}` : 'Write New Post'}</h1>
                <Link href={route('admin.blog.index')} className="admin-btn admin-btn-outline">
                    ⬅️ Back
                </Link>
            </div>

            <div className="admin-card" style={{maxWidth: '1000px'}}>
                <form onSubmit={submit}>
                    <div className="admin-form-group">
                        <label className="admin-label">Title</label>
                        <input
                            type="text" className="admin-input"
                            value={data.title} onChange={e => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="badge-danger">{errors.title}</div>}
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Slug (URL: /blog/slug). Leave empty to generate from the title</label>
                        <input
                            type="text" className="admin-input" placeholder="judul-artikel-anda"
                            value={data.slug} onChange={e => setData('slug', e.target.value)}
                        />
                        {errors.slug && <div className="badge-danger">{errors.slug}</div>}
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Category</label>
                            <input
                                type="text" className="admin-input"
                                value={data.category} onChange={e => setData('category', e.target.value)}
                                placeholder="e.g. AI, Web Dev"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Read Time</label>
                            <input
                                type="text" className="admin-input"
                                value={data.read_time} onChange={e => setData('read_time', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Accent Color</label>
                            <input
                                type="text" className="admin-input"
                                value={data.color} onChange={e => setData('color', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Excerpt (Brief summary for the card)</label>
                        <textarea
                            className="admin-textarea" rows={3}
                            value={data.excerpt} onChange={e => setData('excerpt', e.target.value)}
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Full Content (Markdown or HTML supported)</label>
                        <textarea
                            className="admin-textarea" rows={12}
                            value={data.content || ''} onChange={e => setData('content', e.target.value)}
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem'}}>
                        <IconPicker label="Icon" value={data.emoji} onChange={v => setData('emoji', v)} error={errors.emoji} />
                        <div className="admin-form-group">
                            <label className="admin-label">Publish Date</label>
                            <input
                                type="date" className="admin-input"
                                value={data.published_at} onChange={e => setData('published_at', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Status</label>
                            <select
                                className="admin-select"
                                value={data.is_published ? '1' : '0'}
                                onChange={e => setData('is_published', e.target.value === '1')}
                            >
                                <option value="1">Published</option>
                                <option value="0">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {processing ? '⏳ Saving...' : '🚀 Save Post'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
