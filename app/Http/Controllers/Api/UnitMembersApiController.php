<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Models\UnitMember;
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

    public function memberLog(Request $request, Unit $unit, UnitMember $member): Response
    {
        return new Response([
            'data' => $member
                ->memberLogs()
                ->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 25)),
        ]);
    }
}
