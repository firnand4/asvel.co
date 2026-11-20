import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            // Theme tokens; values live in resources/css/app.css (light on :root, dark on .dark)
            colors: {
                page: 'rgb(var(--page) / <alpha-value>)',
                section: 'rgb(var(--section) / <alpha-value>)',
                surface: 'rgb(var(--surface) / <alpha-value>)',
                'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
                fg: 'rgb(var(--fg) / <alpha-value>)',
                'fg-2': 'rgb(var(--fg-2) / <alpha-value>)',
                muted: 'rgb(var(--muted) / <alpha-value>)',
                subtle: 'rgb(var(--subtle) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                brand: 'rgb(var(--brand) / <alpha-value>)',
                line: 'var(--line)',
                'line-soft': 'var(--line-soft)',
            },
        },
    },

    plugins: [forms],
};
