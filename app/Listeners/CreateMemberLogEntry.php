<?php

namespace App\Listeners;

use App\Events\UnitMemberChanged;
use App\Models\UnitMemberLog;
use App\Models\UnitRank;
use App\Models\UnitSlot;

class CreateMemberLogEntry
{
    /**
     * Handle the event.
     */
    public function handle(UnitMemberChanged $event): void
    {
        $member = $event->unitMember;
        foreach ($member->getDirty() as $key => $value) {
            $log = new UnitMemberLog(['unit_member_id' => $member->id]);

            if ($key == 'unit_rank_id') {
                $log->event_type = "promotion";

                $prevRank = UnitRank::find($member->getOriginal($key));
                $newRank = $member->rank;

                if ($prevRank->sort_order > $member->rank->sort_order) $log->event_type = "demotion";
                $log->previous = $prevRank->id;
                $log->new = $newRank->id;
            } else if ($key == 'unit_slot_id') {
                $log->event_type = "slot_assigned";
                $prevSlot = UnitSlot::find($member->getOriginal($key));
                $newSlot = $member->slot;

                if ($newSlot == null) $log->event_type = "slot_unassigned";

                $log->previous =$prevSlot != null ? $prevSlot->id : null;
                $log->new = $newSlot != null ? $newSlot->id : null;
            }

            $log->save();
        }
    }
}
