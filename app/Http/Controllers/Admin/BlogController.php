<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'posts' => BlogPost::orderByDesc('published_at')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Form', [
            'post' => new BlogPost(['emoji' => '📝', 'is_published' => true, 'order' => 0, 'published_at' => now(), 'color' => '#6c63ff'])
        ]);
    }

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->input('slug') ?: $request->input('title'))]);

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => ['required', 'alpha_dash', 'max:255', Rule::unique('blog_posts', 'slug')],
            'category'     => 'required|string|max:100',
            'excerpt'      => 'required|string',
            'content'      => 'nullable|string',
            'emoji'        => 'required|string|max:10',
            'color'        => 'required|string|max:20',
            'read_time'    => 'required|string|max:50',
            'is_published' => 'required|boolean',
            'published_at' => 'nullable|date',
        ]);

        BlogPost::create($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function edit(BlogPost $blog)
    {
        return Inertia::render('Admin/Blog/Form', [
            'post' => $blog
        ]);
    }

    public function update(Request $request, BlogPost $blog)
    {
        $request->merge(['slug' => Str::slug($request->input('slug') ?: $request->input('title'))]);

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => ['required', 'alpha_dash', 'max:255', Rule::unique('blog_posts', 'slug')->ignore($blog->id)],
            'category'     => 'required|string|max:100',
            'excerpt'      => 'required|string',
            'content'      => 'nullable|string',
            'emoji'        => 'required|string|max:10',
            'color'        => 'required|string|max:20',
            'read_time'    => 'required|string|max:50',
            'is_published' => 'required|boolean',
            'published_at' => 'nullable|date',
        ]);

        $blog->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(BlogPost $blog)
    {
        $blog->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil dihapus.');
    }
}
