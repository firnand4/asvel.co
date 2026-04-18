import React from 'react';
import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Simple Error Boundary for the root level
class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) { return { hasError: true, error }; }
    componentDidCatch(error, errorInfo) { console.error("FATAL ERROR:", error, errorInfo); }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', background: '#111', color: '#ff4444', height: '100vh', fontFamily: 'monospace' }}>
                    <h1>FATAL ERROR DETECTED</h1>
                    <pre>{this.state.error?.toString()}</pre>
                    <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        try {
            console.log('Resolving page:', name);
            const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
            const page = pages[`./Pages/${name}.jsx`];
            
            if (!page) {
                console.error(`Page component "${name}" not found in glob.`);
                throw new Error(`Page component "${name}" could not be found.`);
            }
            
            return page.default;
        } catch (e) {
            console.error('Inertia Resolution Error:', e);
            throw e;
        }
    },
    setup({ el, App, props }) {
        console.log('Mounting Inertia app with props:', props);
        try {
            const root = createRoot(el);
            root.render(
                <GlobalErrorBoundary>
                    <App {...props} />
                </GlobalErrorBoundary>
            );
        } catch (e) {
            console.error('Mounting failed:', e);
            el.innerHTML = `<div style="color:red; padding:20px;">Mounting Failed: ${e.message}</div>`;
        }
    },
    progress: {
        color: '#6366f1',
    },
});
