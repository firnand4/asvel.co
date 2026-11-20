import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import ImageUpload from '@/Components/Admin/ImageUpload';
import TagInput from '@/Components/Admin/TagInput';

export default function Form({ member }) {
    const isEditing = !!member.id;
    const { data, setData, post, processing, errors } = useForm({
        name: member.name || '',
        role: member.role || '',
        expertise: member.expertise || '',
        bio: member.bio || '',
        photo: null,
        remove_photo: false,
        linkedin_url: member.linkedin_url || '',
        order: member.order || 0,
        is_active: member.is_active ?? true,
        skills: member.skills || [],
        // File uploads need multipart POST; Laravel reads the real verb from _method.
        ...(isEditing ? { _method: 'put' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEditing ? route('admin.team.update', member.id) : route('admin.team.store'), { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Member' : 'Add Member'}>
            <div className="admin-header">
                <h1 className="admin-title">{isEditing ? `Edit: ${member.name}` : 'New Team Member'}</h1>
                <Link href={route('admin.team.index')} className="admin-btn admin-btn-outline">
                    ⬅️ Back
                </Link>
            </div>

            <div className="admin-card" style={{maxWidth: '800px'}}>
                <form onSubmit={submit}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Name</label>
                            <input
                                type="text" className="admin-input"
                                value={data.name} onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="badge-danger" style={{padding: '0.2rem', marginTop: '0.2rem', fontSize: '0.7rem'}}>{errors.name}</div>}
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Role</label>
                            <input
                                type="text" className="admin-input"
                                value={data.role} onChange={e => setData('role', e.target.value)}
                            />
                            {errors.role && <div className="badge-danger" style={{padding: '0.2rem', marginTop: '0.2rem', fontSize: '0.7rem'}}>{errors.role}</div>}
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Expertise (Short line about tech focus)</label>
                        <input
                            type="text" className="admin-input"
                            value={data.expertise} onChange={e => setData('expertise', e.target.value)}
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Bio</label>
                        <textarea
                            className="admin-textarea" rows={4}
                            value={data.bio} onChange={e => setData('bio', e.target.value)}
                        />
                    </div>

                    <ImageUpload
                        label="Photo"
                        hint="JPG, PNG or WebP, max 2 MB. A square photo works best."
                        current={member.photo}
                        file={data.photo}
                        onFile={f => setData('photo', f)}
                        removed={data.remove_photo}
                        onRemove={v => setData('remove_photo', v)}
                        error={errors.photo}
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
                            <label className="admin-label">Visibility</label>
                            <select
                                className="admin-select"
                                value={data.is_active ? '1' : '0'}
                                onChange={e => setData('is_active', e.target.value === '1')}
                            >
                                <option value="1">Active (Show on Site)</option>
                                <option value="0">Hidden</option>
                            </select>
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">LinkedIn URL</label>
                        <input
                            type="url" className="admin-input"
                            value={data.linkedin_url} onChange={e => setData('linkedin_url', e.target.value)}
                        />
                    </div>

                    <TagInput
                        label="Skills"
                        values={data.skills}
                        onChange={v => setData('skills', v)}
                        placeholder="Contoh: Laravel"
                        error={errors.skills}
                    />

                    <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {processing ? '⏳ Saving...' : '💾 Save Member'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
