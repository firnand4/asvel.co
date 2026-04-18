<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
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
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'tech'        => 'nullable|array',
            'problem'     => 'nullable|string',
            'result'      => 'nullable|string',
            'emoji'       => 'required|string|max:10',
            'color'       => 'required|string|max:20',
            'order'       => 'required|integer',
            'is_active'   => 'required|boolean',
        ]);

        PortfolioItem::create($validated);

        return redirect()->route('admin.portfolio.index')->with('success', 'Project added successfully.');
    }

    public function edit(PortfolioItem $portfolio)
    {
        return Inertia::render('Admin/Portfolio/Form', [
            'project' => $portfolio
        ]);
    }

    public function update(Request $request, PortfolioItem $portfolio)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'tech'        => 'nullable|array',
            'problem'     => 'nullable|string',
            'result'      => 'nullable|string',
            'emoji'       => 'required|string|max:10',
            'color'       => 'required|string|max:20',
            'order'       => 'required|integer',
            'is_active'   => 'required|boolean',
        ]);

        $portfolio->update($validated);

        return redirect()->route('admin.portfolio.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(PortfolioItem $portfolio)
    {
        $portfolio->delete();
        return redirect()->route('admin.portfolio.index')->with('success', 'Project removed.');
    }
}
