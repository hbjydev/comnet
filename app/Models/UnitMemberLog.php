<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class UnitMemberLog extends Model
{
    use HasUlids;

    protected $fillable = [
        'unit_member_id',
        'event_type',
        'previous',
        'new',
    ];
}
