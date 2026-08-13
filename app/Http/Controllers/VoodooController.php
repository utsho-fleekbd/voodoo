<?php

namespace App\Http\Controllers;

use App\Events\VoodooCreated;
use App\Events\VoodooGotChildren;
use App\Events\VoodooViewCountUpdated;
use App\Models\Voodoo;
use App\Notifications\VoodooGotChildrenNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VoodooController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voodoos = Voodoo::query()
            ->with(['author'])
            ->whereNull('parent_voodoo_id')
            ->latest()
            ->get();

        return Inertia::render('voodoos/index', [
            'voodoos' => $voodoos,
        ]);
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

        $latestVoodoos = Voodoo::query()
            ->with(['author'])
            ->whereNull('parent_voodoo_id')
            ->latest()
            ->get();

        VoodooCreated::dispatch(
            $latestVoodoos,
        );

        return back();
    }

    public function storeChildren(Request $request)
    {
        $validated = $request->validate([
            'voodoo' => ['required', 'string'],
            'parent_voodoo_id' => ['exists:voodoos,id'],
            'attachment' => ['nullable'],
        ]);

        $voodoo = Voodoo::findOrFail($validated['parent_voodoo_id']);

        DB::beginTransaction();

        Voodoo::create([
            'voodoo' => $validated['voodoo'],
            'parent_voodoo_id' => $voodoo->id,
            'author_id' => $request->user()->id,
        ]);

        $voodoo->increment('re_voodoos_count', 1);

        DB::commit();

        $voodoo->load(['author', 'persuasions.user', 'allChildren'])
            ->loadCount('persuasions');

        VoodooGotChildren::dispatch(
            $voodoo,
        );

        $voodoo->author->notify(
            new VoodooGotChildrenNotification($voodoo)
        );

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Voodoo $voodoo)
    {
        $voodoo->increment('views_count', 1);

        VoodooViewCountUpdated::dispatch($voodoo->id, $voodoo->views_count);

        $voodoo->load(['author', 'persuasions.user', 'allChildren'])
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
