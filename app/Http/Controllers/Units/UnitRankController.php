<?php

namespace App\Http\Controllers\Units;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Models\UnitMember;
use App\Models\UnitSection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UnitRankController extends Controller
{
    public function index(Request $request, Unit $unit): Response
    {
        return Inertia::render('units/sections/index', [
            'unit' => $unit,
            'sections' => $unit
                ->sections()
                ->with('slots')
                ->orderBy('-created_at')
                ->paginate($request->get('per_page')),
        ]);
    }

    public function show(Unit $unit, UnitSection $section)
    {
        return Inertia::render('units/sections/show', [
            'unit' => $unit,
            'member' => $section->load(['slots']),
        ]);
    }

    public function edit(Unit $unit, UnitSection $section)
    {
        return Inertia::render('units/members/edit', [
            'unit' => $unit,
            'member' => $section->load(['slots']),
        ]);
    }
}
