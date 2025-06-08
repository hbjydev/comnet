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
    public function index(Request $request, Unit $unit): Response
    {
        return Inertia::render('units/members/index', [
            'unit' => $unit,
            'members' => $unit
                ->members()
                ->with('user')
                ->with('rank')
                ->with('slot')
                ->orderBy('-created_at')
                ->paginate($request->get('per_page')),
        ]);
    }

    public function show(Unit $unit, UnitMember $member)
    {
        return Inertia::render('units/members/show', [
            'unit' => $unit,
            'member' => $member->load(['user', 'rank', 'slot']),
        ]);
    }

    public function edit(Unit $unit, UnitMember $member)
    {
        return Inertia::render('units/members/edit', [
            'unit' => $unit,
            'member' => $member->load(['user', 'rank', 'slot']),
        ]);
    }
}
