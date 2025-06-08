<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class UnitSection extends Model
{
    /** @use HasFactory<\Database\Factories\UnitMemberFactory> */
    use HasFactory, HasUlids;

    protected $fillable = [
        'unit_id',
        'display_name',
        'description',
        'icon',
    ];

    protected $with = [
        'sections',
        'slots',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(UnitSection::class);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(UnitSection::class);
    }

    public function slots(): HasMany
    {
        return $this->hasMany(UnitSlot::class);
    }

    public function members(): HasManyThrough
    {
        return $this->hasManyThrough(UnitMember::class, UnitSlot::class);
    }
}
