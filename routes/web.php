<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\TeamMember;
use App\Models\Service;
use App\Models\PortfolioItem;
use App\Models\BlogPost;
use App\Models\Testimonial;
use App\Models\TechStack;
use App\Models\SiteSetting;
use App\Models\ContactMessage;

use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TechStackController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\MessageController;

Route::get('/', function () {
    return Inertia::render('Home', [
        'team'         => TeamMember::where('is_active', true)->orderBy('order')->get(),
        'services'     => Service::where('is_active', true)->orderBy('order')->get(),
        'portfolio'    => PortfolioItem::where('is_active', true)->orderBy('order')->get(),
        'blogPosts'    => BlogPost::where('is_published', true)->orderBy('order')->orderByDesc('published_at')->get(),
        'testimonials' => Testimonial::where('is_active', true)->orderBy('order')->get(),
        'techStacks'   => TechStack::where('is_active', true)->orderBy('order')->get(),
        'settings'     => SiteSetting::allKeyed(),
    ]);
})->name('home');

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name'    => 'required|string|max:255',
        'email'   => 'required|email|max:255',
        'message' => 'required|string|max:5000',
    ]);

    ContactMessage::create($validated);

    return back()->with('success', 'Message sent! We will get back to you shortly.');
});

// Admin Panel Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'unread_messages' => ContactMessage::whereNull('read_at')->count(),
                'total_projects'  => PortfolioItem::count(),
                'total_posts'     => BlogPost::count(),
                'total_services'  => Service::count(),
            ]
        ]);
    })->name('dashboard');

    Route::resource('team', TeamController::class)->names('admin.team');
    Route::resource('services', ServiceController::class)->names('admin.services');
    Route::resource('portfolio', PortfolioController::class)->names('admin.portfolio');
    Route::resource('blog', BlogController::class)->names('admin.blog');
    Route::resource('testimonials', TestimonialController::class)->names('admin.testimonials');
    Route::resource('tech-stack', TechStackController::class)->names('admin.tech-stack');
    Route::resource('messages', MessageController::class)->only(['index', 'show', 'destroy'])->names('admin.messages');
    
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings');
    Route::post('/settings', [SettingController::class, 'update'])->name('admin.settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
