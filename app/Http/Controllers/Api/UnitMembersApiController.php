<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Response;

class UnitMembersApiController extends Controller
{
    public function index(Unit $unit): Response {
        return new Response([
            'data' => $unit->members()->paginate(25),
        ]);
    }
}
