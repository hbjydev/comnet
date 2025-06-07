<?php

use App\Http\Controllers\Api\UnitMembersApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/units/{unit}/members', [UnitMembersApiController::class, 'index'])->name('api.unit.members');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
