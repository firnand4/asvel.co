import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import ImageUpload from '@/Components/Admin/ImageUpload';
import TagInput from '@/Components/Admin/TagInput';
import IconPicker from '@/Components/Admin/IconPicker';

export default function Form({ project }) {
    const isEditing = !!project.id;
    const { data, setData, post, processing, errors } = useForm({
        title: project.title || '',
        category: project.category || '',
        image_file: null,
        remove_image: false,
        description: project.description || '',
        emoji: project.emoji || '🚀',
        color: project.color || '#6c63ff',
        problem: project.problem || '',
        result: project.result || '',
        tech: project.tech || [],
        order: project.order || 0,
        is_active: project.is_active ?? true,
        // File uploads need multipart POST; Laravel reads the real verb from _method.
        ...(isEditing ? { _method: 'put' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEditing ? route('admin.portfolio.update', project.id) : route('admin.portfolio.store'), { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Project' : 'Add Project'}>
            <div className="admin-header">
                <h1 className="admin-title">{isEditing ? `Edit: ${project.title}` : 'New Project'}</h1>
                <Link href={route('admin.portfolio.index')} className="admin-btn admin-btn-outline">
                    ⬅️ Back
                </Link>
            </div>

            <div className="admin-card" style={{maxWidth: '1000px'}}>
                <form onSubmit={submit}>
                    <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Project Title *</label>
                            <input
                                type="text" className="admin-input"
                                value={data.title} onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="badge-danger">{errors.title}</div>}
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Accent Color (optional)</label>
                            <div style={{display: 'flex', gap: '0.5rem'}}>
                                <input
                                    type="color" style={{width: '50px', height: '42px', padding: 0, border: 'none', background: 'transparent'}}
                                    value={data.color} onChange={e => setData('color', e.target.value)}
                                />
                                <input
                                    type="text" className="admin-input"
                                    value={data.color} onChange={e => setData('color', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Category (optional)</label>
                        <input
                            type="text" className="admin-input" placeholder="WebGIS"
                            value={data.category} onChange={e => setData('category', e.target.value)}
                        />
                        {errors.category && <div className="badge-danger">{errors.category}</div>}
                    </div>

                    <ImageUpload
                        label="Screenshot (optional)"
                        hint="JPG, PNG or WebP, max 4 MB. Landscape (16:10) works best."
                        aspect="16 / 10"
                        current={project.image}
                        file={data.image_file}
                        onFile={f => setData('image_file', f)}
                        removed={data.remove_image}
                        onRemove={v => setData('remove_image', v)}
                        error={errors.image_file}
                    />

                    <div className="admin-form-group">
                        <label className="admin-label">Description (optional)</label>
                        <textarea
                            className="admin-textarea" rows={3}
                            value={data.description} onChange={e => setData('description', e.target.value)}
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">The Problem (optional)</label>
                            <textarea
                                className="admin-textarea" rows={4}
                                value={data.problem} onChange={e => setData('problem', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">The Result (optional)</label>
                            <textarea
                                className="admin-textarea" rows={4}
                                value={data.result} onChange={e => setData('result', e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem'}}>
                        <IconPicker
                            label="Icon (shown when there is no screenshot)"
                            value={data.emoji}
                            onChange={v => setData('emoji', v)}
                            error={errors.emoji}
                        />
                        <div className="admin-form-group">
                            <label className="admin-label">Order</label>
                            <input
                                type="number" className="admin-input"
                                value={data.order} onChange={e => setData('order', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Visibility</label>
                            <select
                                className="admin-select"
                                value={data.is_active ? '1' : '0'}
                                onChange={e => setData('is_active', e.target.value === '1')}
                            >
                                <option value="1">Live</option>
                                <option value="0">Draft</option>
                            </select>
                        </div>
                    </div>

                    <TagInput
                        label="Technologies (optional)"
                        values={data.tech}
                        onChange={v => setData('tech', v)}
                        placeholder="Contoh: Laravel"
                        error={errors.tech}
                    />

                    <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {processing ? '⏳ Saving...' : '💾 Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
