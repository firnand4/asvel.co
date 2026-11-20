import { useEffect, useState } from 'react';
import { useLang } from '../i18n';

const STORAGE_KEY = 'asvel_theme';

// Used outside the LanguageProvider (admin pages).
const FALLBACK_LABELS = { themeLight: 'Ganti ke mode terang', themeDark: 'Ganti ke mode gelap' };

// The initial theme is applied by the inline script in app.blade.php; this button only switches it.
export default function ThemeToggle({ className = '' }) {
    const labels = useLang()?.t?.nav ?? FALLBACK_LABELS;
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
        } catch {
            // Storage unavailable: the choice applies to this page view only.
        }
    };

    const label = dark ? labels.themeLight : labels.themeDark;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className={className || 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted hover:text-fg transition-colors'}
        >
            {dark ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
