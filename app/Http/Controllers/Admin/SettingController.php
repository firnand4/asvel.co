<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
   public function index()
{
    return Inertia::render('Admin/Settings', [
        'settings' => SiteSetting::all()
    ]);
}

    public function update(Request $request)
    {
        // The map URL is rendered as an iframe on the homepage, so only Google Maps embeds are allowed.
        $request->validate([
            'settings.maps_embed_url' => ['nullable', 'url', 'starts_with:https://www.google.com/maps'],
        ], [
            'settings.maps_embed_url.starts_with' => 'The map URL must start with https://www.google.com/maps',
        ]);

        $settings = $request->input('settings', []);

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->route('admin.settings')->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
