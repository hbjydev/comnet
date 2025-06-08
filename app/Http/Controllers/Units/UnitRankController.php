<?php

namespace App\Http\Controllers\Units;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Inertia\Inertia;
use Inertia\Response;

class UnitRankController extends Controller
{
    public function index(Unit $unit): Response
    {
        return Inertia::render('units/ranks/index', [
            'unit' => $unit,
            'ranks' => $unit->ranks,
        ]);
    }
}
