<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\StoresPublicImages;
use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    use StoresPublicImages;

    public function index()
    {
        return Inertia::render('Admin/Team/Index', [
            'team' => TeamMember::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Team/Form', [
            'member' => new TeamMember(['is_active' => true, 'order' => 0])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateMember($request);
        $validated['photo'] = $this->syncPublicImage($request->file('photo'), false, null, 'team');

        TeamMember::create($validated);

        return redirect()->route('admin.team.index')->with('success', 'Anggota tim berhasil ditambahkan.');
    }

    public function edit(TeamMember $team)
    {
        return Inertia::render('Admin/Team/Form', [
            'member' => $team
        ]);
    }

    public function update(Request $request, TeamMember $team)
    {
        $validated = $this->validateMember($request);
        $validated['photo'] = $this->syncPublicImage(
            $request->file('photo'), $request->boolean('remove_photo'), $team->photo, 'team'
        );

        $team->update($validated);

        return redirect()->route('admin.team.index')->with('success', 'Anggota tim berhasil diperbarui.');
    }

    public function destroy(TeamMember $team)
    {
        $this->deletePublicImage($team->photo);
        $team->delete();
        return redirect()->route('admin.team.index')->with('success', 'Anggota tim berhasil dihapus.');
    }

    private function validateMember(Request $request): array
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'role'         => 'required|string|max:255',
            'expertise'    => 'required|string|max:255',
            'bio'          => 'nullable|string',
            'skills'       => 'nullable|array',
            'photo'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'remove_photo' => 'nullable|boolean',
            'linkedin_url' => 'nullable|url|max:255',
            'order'        => 'required|integer',
            'is_active'    => 'required|boolean',
        ]);

        // Multipart forms omit empty arrays, so a cleared skills list must be set explicitly.
        $validated['skills'] = $request->input('skills', []);
        unset($validated['photo'], $validated['remove_photo']);

        return $validated;
    }
}
