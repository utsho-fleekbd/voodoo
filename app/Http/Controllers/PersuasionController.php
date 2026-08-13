<?php

namespace App\Http\Controllers;

use App\Events\PersuasionCountUpdated;
use App\Models\Persuasion;
use App\Models\Voodoo;
use App\Notifications\VoodooPersuadedOneNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersuasionController extends Controller
{
    public function persuade(Request $request, Voodoo $voodoo)
    {
        $persuasions = Persuasion::query()
            ->where('persuaded_user_id', $request->user()->id)
            ->where('voodoo_id', $voodoo->id)
            ->get();

        if ($persuasions->count() > 0) {
            DB::beginTransaction();

            $persuasions = Persuasion::query()
                ->where('persuaded_user_id', $request->user()->id)
                ->where('voodoo_id', $voodoo->id)
                ->delete();
            $voodoo->decrement('persuasions_count', 1);

            DB::commit();
        } else {
            DB::beginTransaction();

            $persuasion = $voodoo->persuasions()->create([
                'persuaded_user_id' => $request->user()->id,
            ]);
            $voodoo->increment('persuasions_count', 1);

            DB::commit();

            $voodoo->author->notify(
                new VoodooPersuadedOneNotification($persuasion)
            );
        }

        PersuasionCountUpdated::dispatch($voodoo->id, $voodoo->persuasions_count);

        return back();
    }
}
