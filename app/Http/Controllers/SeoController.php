<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\ServicePage;
use App\Support\Seo;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function sitemap(): Response
    {
        $urls = collect([['loc' => Seo::url('/'), 'lastmod' => null, 'priority' => '1.0']]);

        ServicePage::where('is_active', true)->orderBy('order')->get()->each(function ($page) use ($urls) {
            $urls->push(['loc' => Seo::url($page->path()), 'lastmod' => $page->updated_at, 'priority' => '0.9']);
        });

        BlogPost::where('is_published', true)->whereNotNull('slug')->orderByDesc('published_at')->get()->each(function ($post) use ($urls) {
            $urls->push(['loc' => Seo::url('/blog/' . $post->slug), 'lastmod' => $post->updated_at, 'priority' => '0.7']);
        });

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
            . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $url) {
            $xml .= '  <url><loc>' . e($url['loc']) . '</loc>'
                . ($url['lastmod'] ? '<lastmod>' . $url['lastmod']->toAtomString() . '</lastmod>' : '')
                . '<priority>' . $url['priority'] . '</priority></url>' . "\n";
        }
        $xml .= '</urlset>' . "\n";

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    public function robots(): Response
    {
        $lines = [
            'User-agent: *',
            'Disallow: /admin',
            'Disallow: /login',
            'Disallow: /register',
            'Disallow: /profile',
            'Disallow: /forgot-password',
            'Disallow: /reset-password',
            '',
            'Sitemap: ' . Seo::url('sitemap.xml'),
        ];

        return response(implode("\n", $lines) . "\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
