<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Team/Index', [
            'team' => TeamMember::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Team/Form', [
            'member' => new TeamMember(['emoji' => '👨‍💻', 'is_active' => true, 'order' => 0])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'role'         => 'required|string|max:255',
            'expertise'    => 'required|string|max:255',
            'bio'          => 'nullable|string',
            'skills'       => 'nullable|array',
            'emoji'        => 'required|string|max:10',
            'linkedin_url' => 'nullable|url|max:255',
            'order'        => 'required|integer',
            'is_active'    => 'required|boolean',
        ]);

        TeamMember::create($validated);

        return redirect()->route('admin.team.index')->with('success', 'Team member added successfully.');
    }

    public function edit(TeamMember $team)
    {
        return Inertia::render('Admin/Team/Form', [
            'member' => $team
        ]);
    }

    public function update(Request $request, TeamMember $team)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'role'         => 'required|string|max:255',
            'expertise'    => 'required|string|max:255',
            'bio'          => 'nullable|string',
            'skills'       => 'nullable|array',
            'emoji'        => 'required|string|max:10',
            'linkedin_url' => 'nullable|url|max:255',
            'order'        => 'required|integer',
            'is_active'    => 'required|boolean',
        ]);

        $team->update($validated);

        return redirect()->route('admin.team.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $team)
    {
        $team->delete();
        return redirect()->route('admin.team.index')->with('success', 'Team member removed.');
    }
}
