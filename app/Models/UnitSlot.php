<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UnitSlot extends Model
{
    /** @use HasFactory<\Database\Factories\UnitSlotFactory> */
    use HasFactory, HasUlids;

    protected $fillable = [
        'display_name',
        'description',
        'section_id',
        'icon',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(UnitSection::class);
    }

    public function member(): HasOne
    {
        return $this->hasOne(UnitMember::class);
    }
}
