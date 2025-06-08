<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitRank extends Model
{
    /** @use HasFactory<\Database\Factories\UnitMemberFactory> */
    use HasFactory, HasUlids;

    protected $fillable = [
        'unit_id',
        'display_name',
        'short_name',
        'icon',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(UnitMember::class);
    }
}
