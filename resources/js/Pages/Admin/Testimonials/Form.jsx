import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Form({ testimonial }) {
    const isEditing = !!testimonial.id;
    const { data, setData, post, put, processing, errors } = useForm({
        name: testimonial.name || '',
        role: testimonial.role || '',
        avatar: testimonial.avatar || '👤',
        text: testimonial.text || '',
        rating: testimonial.rating || 5,
        order: testimonial.order || 0,
        is_active: testimonial.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.testimonials.update', testimonial.id));
        } else {
            post(route('admin.testimonials.store'));
        }
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Testimonial' : 'Add Testimonial'}>
            <div className="admin-header">
                <h1 className="admin-title">{isEditing ? `Edit Feedback from ${testimonial.name}` : 'New Testimonial'}</h1>
                <Link href={route('admin.testimonials.index')} className="admin-btn admin-btn-outline">
                    ⬅️ Back
                </Link>
            </div>

            <div className="admin-card" style={{maxWidth: '800px'}}>
                <form onSubmit={submit}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Client Name</label>
                            <input
                                type="text" className="admin-input"
                                value={data.name} onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="badge-danger">{errors.name}</div>}
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Client Role/Company</label>
                            <input
                                type="text" className="admin-input"
                                value={data.role} onChange={e => setData('role', e.target.value)}
                                placeholder="CEO at TechCorp"
                            />
                        </div>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Avatar (Emoji)</label>
                            <input
                                type="text" className="admin-input"
                                value={data.avatar} onChange={e => setData('avatar', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Rating (1-5)</label>
                            <select
                                className="admin-select"
                                value={data.rating}
                                onChange={e => setData('rating', parseInt(e.target.value))}
                            >
                                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Testimonial Content</label>
                        <textarea
                            className="admin-textarea" rows={6}
                            value={data.text} onChange={e => setData('text', e.target.value)}
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Order</label>
                            <input
                                type="number" className="admin-input"
                                value={data.order} onChange={e => setData('order', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Status</label>
                            <select
                                className="admin-select"
                                value={data.is_active ? '1' : '0'}
                                onChange={e => setData('is_active', e.target.value === '1')}
                            >
                                <option value="1">Visible</option>
                                <option value="0">Hidden</option>
                            </select>
                        </div>
                    </div>

                    <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {processing ? '⏳ Saving...' : '💾 Save Testimonial'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
