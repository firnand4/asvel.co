<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\StoresPublicImages;
use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    use StoresPublicImages;

    public function index()
    {
        return Inertia::render('Admin/Portfolio/Index', [
            'projects' => PortfolioItem::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Portfolio/Form', [
            'project' => new PortfolioItem(['emoji' => '🚀', 'is_active' => true, 'order' => 0, 'tech' => []])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateProject($request);
        $validated['image'] = $this->syncPublicImage($request->file('image_file'), false, null, 'portfolio');

        PortfolioItem::create($validated);

        return redirect()->route('admin.portfolio.index')->with('success', 'Proyek berhasil ditambahkan.');
    }

    public function edit(PortfolioItem $portfolio)
    {
        return Inertia::render('Admin/Portfolio/Form', [
            'project' => $portfolio
        ]);
    }

    public function update(Request $request, PortfolioItem $portfolio)
    {
        $validated = $this->validateProject($request);
        $validated['image'] = $this->syncPublicImage(
            $request->file('image_file'), $request->boolean('remove_image'), $portfolio->image, 'portfolio'
        );

        $portfolio->update($validated);

        return redirect()->route('admin.portfolio.index')->with('success', 'Proyek berhasil diperbarui.');
    }

    public function destroy(PortfolioItem $portfolio)
    {
        $this->deletePublicImage($portfolio->image);
        $portfolio->delete();
        return redirect()->route('admin.portfolio.index')->with('success', 'Proyek berhasil dihapus.');
    }

    private function validateProject(Request $request): array
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'nullable|string|max:100',
            'image_file'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'remove_image' => 'nullable|boolean',
            'description'  => 'nullable|string',
            'tech'         => 'nullable|array',
            'problem'      => 'nullable|string',
            'result'       => 'nullable|string',
            'emoji'        => 'nullable|string|max:16',
            'color'        => 'nullable|string|max:20',
            'order'        => 'nullable|integer',
            'is_active'    => 'nullable|boolean',
        ]);

        // Only the title is required; fill the rest with sensible defaults.
        // (description is NOT NULL in the table, so an empty one is stored as '')
        $validated['description'] = $validated['description'] ?? '';
        $validated['emoji'] = $validated['emoji'] ?? '🚀';
        $validated['color'] = $validated['color'] ?? '#6c63ff';
        $validated['order'] = $validated['order'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active', true);

        // Multipart forms omit empty arrays, so a cleared tech list must be set explicitly.
        $validated['tech'] = $request->input('tech', []);
        unset($validated['image_file'], $validated['remove_image']);

        return $validated;
    }
}
