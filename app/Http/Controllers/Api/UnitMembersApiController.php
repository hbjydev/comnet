<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UnitMembersApiController extends Controller
{
    public function index(Request $request, Unit $unit): Response
    {
        return new Response([
            'data' => $unit
                ->members()
                ->with('user')
                ->with('rank')
                ->orderBy('-created_at')
                ->paginate($request->get('per_page')),
        ]);
    }
}
