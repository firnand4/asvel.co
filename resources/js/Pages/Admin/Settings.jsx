import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Settings({ settings }) {
    // Initial state from settings array to object
    const initialSettings = {};
    settings.forEach(s => {
        initialSettings[s.key] = s.value;
    });

    const { data, setData, post, processing, errors } = useForm({
        settings: initialSettings
    });

    const handleChange = (key, val) => {
        setData('settings', {
            ...data.settings,
            [key]: val
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    // Grouping settings
    const groups = {
        'Hero & Branding': ['company_name', 'tagline', 'subheadline'],
        'Contact Info': ['email', 'whatsapp', 'whatsapp_number', 'office_address', 'office_hours'],
        'About Section': ['about_intro', 'vision', 'mission'],
        'Statistics': ['stats_projects', 'stats_clients', 'stats_years', 'stats_satisfaction'],
        'Social Media': ['linkedin_url', 'github_url', 'twitter_url', 'instagram_url'],
    };

    return (
        <AdminLayout title="Site Settings">
            <div className="admin-header">
                <h1 className="admin-title">Global Configurations</h1>
            </div>

            <form onSubmit={submit} style={{maxWidth: '900px'}}>
                {Object.entries(groups).map(([groupName, keys]) => (
                    <div key={groupName} className="admin-card">
                        <h3 style={{marginBottom: '1.5rem', color: 'var(--admin-primary)'}}>{groupName}</h3>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                            {keys.map(key => {
                                const setting = settings.find(s => s.key === key);
                                if (!setting) return null;

                                return (
                                    <div key={key} className="admin-form-group" style={{marginBottom: 0}}>
                                        <label className="admin-label">{setting.label}</label>
                                        {setting.type === 'textarea' ? (
                                            <textarea
                                                className="admin-textarea" rows={3}
                                                value={data.settings[key] || ''}
                                                onChange={e => handleChange(key, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                type="text" className="admin-input"
                                                value={data.settings[key] || ''}
                                                onChange={e => handleChange(key, e.target.value)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="admin-card" style={{position: 'sticky', bottom: '2rem', zIndex: 10, border: '1px solid var(--admin-primary)'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--admin-text-muted)'}}>
                            Careful: Changes here reflect immediately on the frontend.
                        </p>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={processing}>
                            {processing ? '⏳ Saving...' : '🚀 Update All Settings'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
