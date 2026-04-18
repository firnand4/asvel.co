import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats = {} }) {
    return (
        <AdminLayout title="Dashboard">
            <div className="admin-stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Unread Messages</span>
                    <span className="stat-val" style={{ color: stats.unread_messages > 0 ? 'var(--admin-danger)' : 'inherit' }}>
                        {stats.unread_messages}
                    </span>
                    <Link href="/admin/messages" className="admin-btn admin-btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                        View Inbox
                    </Link>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Total Projects</span>
                    <span className="stat-val">{stats.total_projects}</span>
                    <Link href="/admin/portfolio" className="admin-btn admin-btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                        Manage Portfolio
                    </Link>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Blog Posts</span>
                    <span className="stat-val">{stats.total_posts}</span>
                    <Link href="/admin/blog" className="admin-btn admin-btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                        Write Post
                    </Link>
                </div>

                <div className="stat-card">
                    <span className="stat-label">Services</span>
                    <span className="stat-val">{stats.total_services}</span>
                    <Link href="/admin/services" className="admin-btn admin-btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                        Edit Services
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/admin/team/create" className="admin-btn admin-btn-primary">
                        ➕ Add Team Member
                    </Link>
                    <Link href="/admin/portfolio/create" className="admin-btn admin-btn-primary">
                        ➕ Add Project
                    </Link>
                    <Link href="/admin/settings" className="admin-btn admin-btn-outline">
                        ⚙️ Global Settings
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
