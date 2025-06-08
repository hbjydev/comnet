<?php

namespace App\Http\Controllers\Units;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $units = Unit::withCount(['members', 'sections', 'ranks'])
            ->paginate($request->get('per_page'));

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

        $avatar = $request->file('avatar')->store('unit/avatar');
        $banner = $request->file('banner')->store('unit/banner');

        $unit = Unit::create([
            ...$data,
            'avatar' => $avatar,
            'banner' => $banner,
        ]);

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
     * Display the specified resource.
     */
    public function edit(Request $request, Unit $unit): Response
    {
        if ($user = $request->user()) {
            if ($user->can('update', $unit)) {
                return Inertia::render('units/settings/profile', ['unit' => $unit]);
            }
        }
        return abort(403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $data = $request->validated();

        $avatar = $request->file('avatar')->store('unit/avatar');
        $banner = $request->file('banner')->store('unit/banner');

        $unit->fill([
            ...$data,
            'avatar' => $avatar,
            'banner' => $banner,
        ]);

        $unit->save();

        return to_route('units.edit', ['unit' => $unit->slug]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function orbat(Unit $unit)
    {
        return Inertia::render('units/orbat', [
            'unit' => $unit,
            'sections' => $unit->sections()
                ->whereNull('unit_section_id')
                ->with('slots')
                ->with('sections')
                ->get(),
        ]);
    }
}
