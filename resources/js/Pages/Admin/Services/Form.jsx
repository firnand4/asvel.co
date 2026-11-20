import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import IconPicker from '@/Components/Admin/IconPicker';
import TagInput from '@/Components/Admin/TagInput';

export default function Form({ service }) {
    const isEditing = !!service.id;
    const { data, setData, post, put, processing, errors } = useForm({
        title: service.title || '',
        icon: service.icon || '🌐',
        description: service.description || '',
        color: service.color || '#6c63ff',
        benefits: service.benefits || [],
        tech: service.tech || [],
        order: service.order || 0,
        is_active: service.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.services.update', service.id));
        } else {
            post(route('admin.services.store'));
        }
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Service' : 'Add Service'}>
            <div className="admin-header">
                <h1 className="admin-title">{isEditing ? `Edit Service: ${service.title}` : 'New Service Offering'}</h1>
                <Link href={route('admin.services.index')} className="admin-btn admin-btn-outline">
                    ⬅️ Back
                </Link>
            </div>

            <div className="admin-card" style={{maxWidth: '800px'}}>
                <form onSubmit={submit}>
                    <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Service Title</label>
                            <input
                                type="text" className="admin-input"
                                value={data.title} onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="badge-danger">{errors.title}</div>}
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Accent Color</label>
                            <input
                                type="text" className="admin-input"
                                value={data.color} onChange={e => setData('color', e.target.value)}
                                placeholder="#6c63ff"
                            />
                        </div>
                    </div>

                    <div style={{maxWidth: 240}}>
                        <IconPicker label="Icon" value={data.icon} onChange={v => setData('icon', v)} error={errors.icon} />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Description</label>
                        <textarea
                            className="admin-textarea" rows={4}
                            value={data.description} onChange={e => setData('description', e.target.value)}
                        />
                    </div>

                    <TagInput
                        label="Benefits"
                        values={data.benefits}
                        onChange={v => setData('benefits', v)}
                        placeholder="Contoh: Deteksi objek real-time"
                        error={errors.benefits}
                    />

                    <TagInput
                        label="Technologies"
                        values={data.tech}
                        onChange={v => setData('tech', v)}
                        placeholder="Contoh: Python"
                        error={errors.tech}
                    />

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
                                <option value="1">Active</option>
                                <option value="0">Hidden</option>
                            </select>
                        </div>
                    </div>

                    <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {processing ? '⏳ Saving...' : '💾 Save Service'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
