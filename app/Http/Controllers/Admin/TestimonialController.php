<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonials/Form', [
            'testimonial' => new Testimonial(['avatar' => '👤', 'rating' => 5, 'is_active' => true, 'order' => 0])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'role'      => 'required|string|max:255',
            'avatar'    => 'required|string|max:10',
            'text'      => 'required|string',
            'rating'    => 'required|integer|min:1|max:5',
            'order'     => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial added.');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Form', [
            'testimonial' => $testimonial
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'role'      => 'required|string|max:255',
            'avatar'    => 'required|string|max:10',
            'text'      => 'required|string',
            'rating'    => 'required|integer|min:1|max:5',
            'order'     => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial removed.');
    }
}
