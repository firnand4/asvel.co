import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

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

    const [benefitInput, setBenefitInput] = useState('');
    const [techInput, setTechInput] = useState('');

    const handleAddBenefit = (e) => {
        if (e.key === 'Enter' && benefitInput.trim()) {
            e.preventDefault();
            setData('benefits', [...data.benefits, benefitInput.trim()]);
            setBenefitInput('');
        }
    };

    const handleAddTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            setData('tech', [...data.tech, techInput.trim()]);
            setTechInput('');
        }
    };

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

                    <div className="admin-form-group">
                        <label className="admin-label">Icon (Emoji)</label>
                        <input
                            type="text" className="admin-input" style={{width: '100px'}}
                            value={data.icon} onChange={e => setData('icon', e.target.value)}
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Description</label>
                        <textarea
                            className="admin-textarea" rows={4}
                            value={data.description} onChange={e => setData('description', e.target.value)}
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Benefits (Type and press Enter)</label>
                        <input
                            type="text" className="admin-input"
                            value={benefitInput} onChange={e => setBenefitInput(e.target.value)}
                            onKeyDown={handleAddBenefit}
                            placeholder="e.g. 24/7 Support, High Performance..."
                        />
                        <div style={{marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                            {data.benefits.map((b, i) => (
                                <span key={i} className="admin-badge badge-success">
                                    {b} <button type="button" onClick={() => setData('benefits', data.benefits.filter((_, idx) => idx !== i))} style={{border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit'}}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Technologies (Type and press Enter)</label>
                        <input
                            type="text" className="admin-input"
                            value={techInput} onChange={e => setTechInput(e.target.value)}
                            onKeyDown={handleAddTech}
                        />
                        <div style={{marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                            {data.tech.map((t, i) => (
                                <span key={i} className="admin-badge" style={{background: 'var(--admin-surface-2)', color: 'var(--admin-text)'}}>
                                    {t} <button type="button" onClick={() => setData('tech', data.tech.filter((_, idx) => idx !== i))} style={{border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit'}}>×</button>
                                </span>
                            ))}
                        </div>
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
