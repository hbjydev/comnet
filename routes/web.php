<?php

use App\Http\Controllers\Units\UnitController;
use App\Http\Controllers\Units\UnitMemberController;
use App\Http\Controllers\Units\UnitRankController;
use App\Http\Controllers\Units\UnitSectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    if ($request->user()) {
        return to_route('dashboard');
    }

    return to_route('units.index');
})->name('home');

Route::get('/units/{unit}/orbat', [UnitController::class, 'orbat'])->name('units.orbat');
Route::resource('units', UnitController::class);
Route::resource('units.ranks', UnitRankController::class);
Route::resource('units.sections', UnitSectionController::class);
Route::resource('units.members', UnitMemberController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
