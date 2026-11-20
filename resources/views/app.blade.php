<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $metaTitle ?? config('app.name', 'Laravel') }}</title>
        @isset($metaDescription)
            <meta name="description" content="{{ $metaDescription }}" head-key="description" inertia>
        @endisset

        <!-- Favicon (Asvel logo, transparent background) -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" rel="stylesheet" />

        <!-- Theme: light by default; dark only when the visitor chose it (applied before first paint) -->
        <script>
            (function () {
                var theme = null;
                try { theme = localStorage.getItem('asvel_theme'); } catch (e) {}
                document.documentElement.classList.toggle('dark', theme === 'dark');
            })();
        </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-page text-fg">
        @inertia
    </body>
</html>
