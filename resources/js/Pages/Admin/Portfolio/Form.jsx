import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Form({ project }) {
    const isEditing = !!project.id;
    const { data, setData, post, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        emoji: project.emoji || '🚀',
        color: project.color || '#6c63ff',
        problem: project.problem || '',
        result: project.result || '',
        tech: project.tech || [],
        order: project.order || 0,
        is_active: project.is_active ?? true,
    });

    const [techInput, setTechInput] = useState('');

    const addTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!data.tech.includes(techInput.trim())) {
                setData('tech', [...data.tech, techInput.trim()]);
            }
            setTechInput('');
        }
    };

    const removeTech = (t) => {
        setData('tech', data.tech.filter(item => item !== t));
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.portfolio.update', project.id));
        } else {
            post(route('admin.portfolio.store'));
        }
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
                            <label className="admin-label">Project Title</label>
                            <input
                                type="text" className="admin-input"
                                value={data.title} onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="badge-danger">{errors.title}</div>}
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Accent Color (Hex)</label>
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
                        <label className="admin-label">Description (Brief summary)</label>
                        <textarea
                            className="admin-textarea" rows={3}
                            value={data.description} onChange={e => setData('description', e.target.value)}
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">The Problem</label>
                            <textarea
                                className="admin-textarea" rows={4}
                                value={data.problem} onChange={e => setData('problem', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">The Result</label>
                            <textarea
                                className="admin-textarea" rows={4}
                                value={data.result} onChange={e => setData('result', e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Emoji Icon</label>
                            <input
                                type="text" className="admin-input"
                                value={data.emoji} onChange={e => setData('emoji', e.target.value)}
                            />
                        </div>
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

                    <div className="admin-form-group">
                        <label className="admin-label">Technologies (Type and press Enter)</label>
                        <input
                            type="text" className="admin-input"
                            value={techInput} onChange={e => setTechInput(e.target.value)}
                            onKeyDown={addTech}
                            placeholder="e.g. Laravel, React, OpenCV..."
                        />
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem'}}>
                            {data.tech.map(t => (
                                <span key={t} className="admin-badge badge-success" style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                                    {t} <button type="button" onClick={() => removeTech(t)} style={{border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit'}}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

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
