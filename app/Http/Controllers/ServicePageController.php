<?php

namespace App\Http\Controllers;

use App\Models\PortfolioItem;
use App\Models\ServicePage;
use App\Models\SiteSetting;
use App\Support\Seo;
use Inertia\Inertia;

class ServicePageController extends Controller
{
    public function show(string $slug)
    {
        $page = ServicePage::where('slug', $slug)->where('is_active', true)->firstOrFail();

        $projects = PortfolioItem::where('is_active', true)
            ->whereIn('category', $page->portfolio_categories ?: ['__none__'])
            ->orderBy('order')
            ->get();

        $others = ServicePage::where('is_active', true)
            ->where('id', '!=', $page->id)
            ->orderBy('order')
            ->get(['slug', 'h1', 'h1_en']);

        return Inertia::render('ServicePage', [
            'page'     => $page,
            'projects' => $projects,
            'others'   => $others,
            'settings' => SiteSetting::allKeyed(),
            'seo'      => Seo::page($page->meta_title, $page->meta_description, $page->path(), [
                'title_en'       => $page->meta_title_en,
                'description_en' => $page->meta_description_en,
            ]),
        ])->withViewData([
            'jsonLd' => array_filter([
                Seo::faqPage($page->faq ?? []),
                Seo::breadcrumbs([['Beranda', '/'], ['Layanan', '/#services'], [$page->h1, $page->path()]]),
            ]),
        ]);
    }
}
