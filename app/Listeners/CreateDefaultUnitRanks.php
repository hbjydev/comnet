<?php

namespace App\Listeners;

use App\Events\UnitCreated;
use App\Models\UnitMember;
use App\Models\UnitRank;
use Illuminate\Support\Facades\Auth;

class CreateDefaultUnitRanks
{
    /**
     * Handle the event.
     */
    public function handle(UnitCreated $event): void
    {
        $unit = $event->unit;

        $ranks = [
            $unit->ranks()->create([
                'display_name' => 'Private',
                'short_name' => 'Pvt',
            ]),
            $unit->ranks()->create([
                'display_name' => 'Corporal',
                'short_name' => 'Cpl',
            ]),
            $unit->ranks()->create([
                'display_name' => 'Sergeant',
                'short_name' => 'Sgt',
            ]),
            $unit->ranks()->create([
                'display_name' => 'General',
                'short_name' => 'Gen',
            ]),
        ];

        if ($user = Auth::user()) {
            $unit->members()->create([
                'user_id' => $user->id,
                'rank_id' => $ranks[3]->id,
                'role' => 'owner',
            ]);
        }
    }
}
