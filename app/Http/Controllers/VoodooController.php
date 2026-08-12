<?php

namespace App\Http\Controllers;

use App\Events\VoodooViewUpdated;
use App\Models\Voodoo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoodooController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voodoos = Voodoo::query()
            ->with(['author', 'persuasions'])
            ->withCount('persuasions')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('voodoos/index', [
            'voodoos' => $voodoos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('voodoos/create_or_edit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'voodoo' => ['required', 'string'],
            'attachment' => ['nullable'],
        ]);

        Voodoo::create([
            'voodoo' => $validated['voodoo'],
            'author_id' => $request->user()->id,
        ]);

        return to_route('voodoos.index')
            ->with(['message' => 'Voodoo has been cast upon the world']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Voodoo $voodoo)
    {
        $voodoo->increment('views', 1);

        VoodooViewUpdated::dispatch($voodoo->id, $voodoo->views);

        $voodoo->load(['author', 'persuasions'])
            ->loadCount('persuasions');

        return Inertia::render('voodoos/show', [
            'voodoo' => $voodoo,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voodoo $voodoo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voodoo $voodoo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voodoo $voodoo)
    {
        //
    }
}
