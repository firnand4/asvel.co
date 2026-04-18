<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => ContactMessage::orderByDesc('created_at')->get()
        ]);
    }

    public function show(ContactMessage $message)
    {
        if (!$message->read_at) {
            $message->update(['read_at' => now()]);
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message
        ]);
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return redirect()->route('admin.messages.index')->with('success', 'Message deleted.');
    }
}
