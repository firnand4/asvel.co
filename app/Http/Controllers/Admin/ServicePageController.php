<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServicePage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicePageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ServicePages/Index', [
            'pages' => ServicePage::with('service:id,title')->orderBy('order')->get(),
        ]);
    }

    public function edit(ServicePage $servicePage)
    {
        return Inertia::render('Admin/ServicePages/Form', [
            'page'     => $servicePage,
            'services' => Service::orderBy('order')->get(['id', 'title']),
        ]);
    }

    public function update(Request $request, ServicePage $servicePage)
    {
        $validated = $request->validate([
            'service_id'             => 'nullable|exists:services,id',
            'h1'                     => 'required|string|max:255',
            'h1_en'                  => 'nullable|string|max:255',
            'meta_title'             => 'required|string|max:255',
            'meta_title_en'          => 'nullable|string|max:255',
            'meta_description'       => 'required|string|max:300',
            'meta_description_en'    => 'nullable|string|max:300',
            'body'                   => 'required|string',
            'body_en'                => 'nullable|string',
            'process'                => 'nullable|array',
            'process.*.title'        => 'required|string|max:255',
            'process.*.desc'         => 'nullable|string|max:1000',
            'process_en'             => 'nullable|array',
            'process_en.*.title'     => 'required|string|max:255',
            'process_en.*.desc'      => 'nullable|string|max:1000',
            'faq'                    => 'nullable|array',
            'faq.*.q'                => 'required|string|max:500',
            'faq.*.a'                => 'required|string|max:3000',
            'faq_en'                 => 'nullable|array',
            'faq_en.*.q'             => 'required|string|max:500',
            'faq_en.*.a'             => 'required|string|max:3000',
            'portfolio_categories'   => 'nullable|array',
            'portfolio_categories.*' => 'string|max:100',
            'is_active'              => 'required|boolean',
        ]);

        // Cleared lists must be stored as empty arrays, not left unchanged.
        foreach (['process', 'process_en', 'faq', 'faq_en', 'portfolio_categories'] as $list) {
            $validated[$list] = array_values($request->input($list, []));
        }

        $servicePage->update($validated);

        return redirect()->route('admin.service-pages.index')->with('success', 'Halaman layanan berhasil diperbarui.');
    }
}
