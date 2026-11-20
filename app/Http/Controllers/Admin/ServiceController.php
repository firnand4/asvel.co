<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Form', [
            'service' => new Service(['icon' => '🌐', 'is_active' => true, 'order' => 0, 'benefits' => [], 'tech' => []])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'icon'        => 'required|string|max:10',
            'description' => 'required|string',
            'benefits'    => 'nullable|array',
            'tech'        => 'nullable|array',
            'color'       => 'required|string|max:20',
            'order'       => 'required|integer',
            'is_active'   => 'required|boolean',
        ]);

        Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Form', [
            'service' => $service
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'icon'        => 'required|string|max:10',
            'description' => 'required|string',
            'benefits'    => 'nullable|array',
            'tech'        => 'nullable|array',
            'color'       => 'required|string|max:20',
            'order'       => 'required|integer',
            'is_active'   => 'required|boolean',
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil diperbarui.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil dihapus.');
    }
}
