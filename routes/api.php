<?php

use App\Http\Controllers\Api\UnitMembersApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('api.units.members.')
    ->prefix('/units/{unit:slug}/members')
    ->group(function () {
        Route::get(
            '/',
            [UnitMembersApiController::class, 'index']
        )->name('index');

        Route::get(
            '/{member}/log',
            [UnitMembersApiController::class, 'memberLog']
        )->name('log');
    });

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
