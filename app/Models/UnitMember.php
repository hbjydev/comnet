<?php

namespace App\Models;

use App\Events\UnitMemberChanged;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UnitMember extends Model
{
    /** @use HasFactory<\Database\Factories\UnitMemberFactory> */
    use HasFactory, HasUlids;

    protected $dispatchesEvents = [
        'updating' => UnitMemberChanged::class,
    ];

    protected $fillable = [
        'unit_id',
        'user_id',
        'display_name',
        'role',
        'profile_data',
        'unit_slot_id',
        'unit_rank_id',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rank(): BelongsTo
    {
        return $this->belongsTo(UnitRank::class, 'unit_rank_id');
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(UnitSlot::class, 'unit_slot_id');
    }
}
