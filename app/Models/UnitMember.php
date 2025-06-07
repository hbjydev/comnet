<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UnitMember extends Model
{
    /** @use HasFactory<\Database\Factories\UnitMemberFactory> */
    use HasFactory;

    protected $fillable = [
        'unit_id',
        'user_id',
        'display_name',
        'role',
        'profile_data',
        'slot_id',
        'rank_id',
    ];

    public function unit(): BelongsTo {
        return $this->belongsTo(Unit::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function rank(): BelongsTo {
        return $this->belongsTo(UnitRank::class);
    }

    public function slot(): BelongsTo {
        return $this->belongsTo(UnitSlot::class);
    }
}
