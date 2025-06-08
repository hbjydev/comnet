<?php

namespace App\Http\Controllers\Units;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Models\UnitMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UnitMemberController extends Controller
{
    function index(Request $request, Unit $unit): Response {
        return Inertia::render('units/members/index', [
            'unit' => $unit,
            'members' => $unit
                ->members()
                ->with('user')
                ->with('rank')
                ->with('slot')
                ->paginate($request->get('per_page')),
        ]);
    }

    function show(Unit $unit, UnitMember $member) {
        return Inertia::render('units/members/show', [
            'unit' => $unit,
            'member' => $member->load(['user', 'rank', 'slot']),
        ]);
    }

    function edit(Unit $unit, UnitMember $member) {
        return Inertia::render('units/members/edit', [
            'unit' => $unit,
            'member' => $member->load(['user', 'rank', 'slot']),
        ]);
    }
}
