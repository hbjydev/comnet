<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UnitSection extends Model
{
    /** @use HasFactory<\Database\Factories\UnitMemberFactory> */
    use HasUlids, HasFactory;

    protected $fillable = [
        'unit_id',
        'display_name',
        'description',
        'icon',
    ];

    public function unit(): BelongsTo {
        return $this->belongsTo(Unit::class);
    }
}
