<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TechStack;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechStackController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/TechStack/Index', [
            'techs' => TechStack::orderBy('category')->orderBy('order')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:100',
            'emoji'     => 'required|string|max:10',
            'category'  => 'required|string|max:100',
            'order'     => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        TechStack::create($validated);

        return redirect()->route('admin.tech-stack.index')->with('success', 'Tech added.');
    }

    public function update(Request $request, TechStack $tech_stack)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:100',
            'emoji'     => 'required|string|max:10',
            'category'  => 'required|string|max:100',
            'order'     => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $tech_stack->update($validated);

        return redirect()->route('admin.tech-stack.index')->with('success', 'Tech updated.');
    }

    public function destroy(TechStack $tech_stack)
    {
        $tech_stack->delete();
        return redirect()->route('admin.tech-stack.index')->with('success', 'Tech removed.');
    }
}
