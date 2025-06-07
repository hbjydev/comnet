<?php

namespace App\Http\Controllers\Units;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Models\Unit;
use Inertia\Inertia;
use Inertia\Response;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $units = Unit::paginate(25);

        return Inertia::render('units/index', [
            'units' => $units,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('units/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request)
    {
        $data = $request->validated();
        $unit = Unit::create($data);

        return to_route('units.show', ['unit' => $unit->slug]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Unit $unit): Response
    {
        return Inertia::render('units/show', ['unit' => $unit]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        //
    }
}
