<?php

namespace App\Listeners;

use App\Events\UnitCreated;
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
                'sort_order' => 0,
            ]),
            $unit->ranks()->create([
                'display_name' => 'Corporal',
                'short_name' => 'Cpl',
                'sort_order' => 1,
            ]),
            $unit->ranks()->create([
                'display_name' => 'Sergeant',
                'short_name' => 'Sgt',
                'sort_order' => 2,
            ]),
            $unit->ranks()->create([
                'display_name' => 'General',
                'short_name' => 'Gen',
                'sort_order' => 3,
            ]),
        ];

        if ($user = Auth::user()) {
            $unit->members()->create([
                'user_id' => $user->id,
                'unit_rank_id' => $ranks[3]->id,
                'role' => 'owner',
            ]);
        }
    }
}
