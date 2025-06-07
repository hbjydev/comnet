<?php

use App\Http\Controllers\Units\UnitController;
use App\Http\Controllers\Units\UnitMemberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('units', UnitController::class);
Route::resource('units.members', UnitMemberController::class)->scoped([
    'member' => 'user_id',
]);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
