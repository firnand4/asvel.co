<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

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

        @php($seo = $page['props']['seo'] ?? null)

        {{-- With SSR the title/meta/canonical/Open Graph come from <Seo> via @inertiaHead.
             Without SSR (node server down) print the essentials here so crawlers still get them. --}}
        @if (empty($__inertiaSsrResponse))
            <title inertia>{{ $seo['title'] ?? config('app.name', 'Laravel') }}</title>
            @if ($seo)
                <meta name="description" content="{{ $seo['description'] }}" head-key="description" inertia>
                <link rel="canonical" href="{{ $seo['canonical'] }}" head-key="canonical" inertia>
            @endif
        @endif

        {{-- Structured data on public pages (the ones that carry `seo`) --}}
        @if ($seo)
            <script type="application/ld+json">{!! json_encode(\App\Support\Seo::localBusiness(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
            @foreach ($jsonLd ?? [] as $block)
                <script type="application/ld+json">{!! json_encode($block, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
            @endforeach
        @endif
    </head>
    <body class="font-sans antialiased bg-page text-fg">
        @inertia
    </body>
</html>
