<?php

namespace App\Http\Controllers;

use App\Models\Persuasion;
use App\Models\Voodoo;
use Illuminate\Http\Request;

class PersuasionController extends Controller
{
    public function persuade(Request $request, Voodoo $voodoo)
    {
        $persuasions = Persuasion::query()
            ->where('persuaded_user_id', $request->user()->id)
            ->where('voodoo_id', $voodoo->id)
            ->get();

        if ($persuasions->count() > 0) {
            $persuasions = Persuasion::query()
                ->where('persuaded_user_id', $request->user()->id)
                ->where('voodoo_id', $voodoo->id)
                ->delete();
        } else {
            $voodoo->persuasions()->create([
                'persuaded_user_id' => $request->user()->id,
            ]);
        }
    }
}
