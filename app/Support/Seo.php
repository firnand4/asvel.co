<?php

namespace App\Support;

use App\Models\SiteSetting;
use Illuminate\Support\Str;

/**
 * Builds the SEO data for public pages. The array is passed to the page as the `seo`
 * prop (rendered by resources/js/Components/Seo.jsx) and read by app.blade.php for the
 * no-SSR fallback and the JSON-LD blocks.
 *
 * URLs are built from APP_URL, so production must use APP_URL=https://asvel.id.
 */
class Seo
{
    public static function page(string $title, string $description, string $path = '/', array $extra = []): array
    {
        return array_merge([
            'title'       => $title,
            'description' => Str::limit(trim(preg_replace('/\s+/', ' ', $description)), 160, '…'),
            'canonical'   => self::url($path),
            'image'       => self::url('images/logo-mark.png'),
            'type'        => 'website',
        ], $extra);
    }

    public static function url(string $path = '/'): string
    {
        return rtrim(config('app.url'), '/') . '/' . ltrim($path, '/');
    }

    /** schema.org LocalBusiness built only from what is filled in Global Settings. */
    public static function localBusiness(): array
    {
        $s = SiteSetting::allKeyed();

        $sameAs = collect(['linkedin_url', 'github_url', 'twitter_url', 'instagram_url'])
            ->map(fn ($key) => $s[$key] ?? null)
            ->filter(fn ($url) => $url && Str::startsWith($url, ['http://', 'https://']))
            ->values()
            ->all();

        $phone = $s['whatsapp_number'] ?? null;

        return array_filter([
            '@context'    => 'https://schema.org',
            '@type'       => 'LocalBusiness',
            '@id'         => self::url('/#business'),
            'name'        => $s['company_name'] ?? config('app.name'),
            'description' => $s['subheadline'] ?? null,
            'url'         => self::url('/'),
            'logo'        => self::url('images/logo-mark.png'),
            'image'       => self::url('images/logo-mark.png'),
            'email'       => filter_var($s['email'] ?? null, FILTER_VALIDATE_EMAIL) ?: null,
            'telephone'   => $phone ? '+' . ltrim($phone, '+') : null,
            'address'     => !empty($s['office_address']) ? [
                '@type'           => 'PostalAddress',
                'streetAddress'   => $s['office_address'],
                'addressLocality' => 'Kabupaten Malang',
                'addressRegion'   => 'Jawa Timur',
                'addressCountry'  => 'ID',
            ] : null,
            'areaServed'  => 'ID',
            'sameAs'      => $sameAs ?: null,
        ]);
    }

    /** schema.org FAQPage for a list of ['q' => ..., 'a' => ...]. */
    public static function faqPage(array $faq): ?array
    {
        $items = collect($faq)->filter(fn ($i) => !empty($i['q']) && !empty($i['a']))->values();
        if ($items->isEmpty()) {
            return null;
        }

        return [
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            'mainEntity' => $items->map(fn ($i) => [
                '@type'          => 'Question',
                'name'           => $i['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $i['a']],
            ])->all(),
        ];
    }

    /** schema.org BreadcrumbList for [[name, path], ...]. */
    public static function breadcrumbs(array $items): array
    {
        return [
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            'itemListElement' => collect($items)->values()->map(fn ($item, $i) => [
                '@type'    => 'ListItem',
                'position' => $i + 1,
                'name'     => $item[0],
                'item'     => self::url($item[1]),
            ])->all(),
        ];
    }
}
