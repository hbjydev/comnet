<?php

namespace App\Models;

use App\Events\UnitCreated;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Unit extends Model
{
    /** @use HasFactory<\Database\Factories\UnitFactory> */
    use HasUlids, HasFactory;

    protected $dispatchesEvents = [
        'created' => UnitCreated::class,
    ];

    protected $fillable = [
        'display_name',
        'description',
        'slug',
        'avatar',
        'banner',
    ];

    public function getRouteKeyName() {
        return 'slug';
    }

    public function members(): HasMany {
        return $this->hasMany(UnitMember::class);
    }

    public function ranks(): HasMany {
        return $this->hasMany(UnitRank::class);
    }

    public function sections(): HasMany {
        return $this->hasMany(UnitSection::class);
    }

    public function slots(): HasManyThrough {
        return $this->hasManyThrough(UnitSlot::class, UnitSection::class);
    }

    public function owner(): HasOneThrough {
        return $this->members->where('role', 'owner');
    }
}
