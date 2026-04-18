import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Form({ member }) {
    const isEditing = !!member.id;
    const { data, setData, post, put, processing, errors } = useForm({
        name: member.name || '',
        role: member.role || '',
        expertise: member.expertise || '',
        bio: member.bio || '',
        emoji: member.emoji || '👨‍💻',
        linkedin_url: member.linkedin_url || '',
        order: member.order || 0,
        is_active: member.is_active ?? true,
        skills: member.skills || [],
    });

    const [skillInput, setSkillInput] = useState('');

    const addSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!data.skills.includes(skillInput.trim())) {
                setData('skills', [...data.skills, skillInput.trim()]);
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        setData('skills', data.skills.filter(s => s !== skill));
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.team.update', member.id));
        } else {
            post(route('admin.team.store'));
        }
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

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem'}}>
                        <div className="admin-form-group">
                            <label className="admin-label">Emoji Avatar</label>
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

                    <div className="admin-form-group">
                        <label className="admin-label">Skills (Type and press Enter)</label>
                        <input
                            type="text" className="admin-input"
                            value={skillInput} onChange={e => setSkillInput(e.target.value)}
                            onKeyDown={addSkill}
                            placeholder="Add skill..."
                        />
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem'}}>
                            {data.skills.map(s => (
                                <span key={s} className="admin-badge badge-success" style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                                    {s} <button type="button" onClick={() => removeSkill(s)} style={{border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit'}}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

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
