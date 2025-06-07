<?php

namespace App\Providers;

use App\Models\Unit;
use App\Policies\UnitPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Passport::tokensCan([
            'user:read' => 'Retrieve user info.',
            'units:write' => 'Write access to units.',
            'units:read' => 'Retrieve unit info.',
            'units:read:ranks' => 'Retrieve unit rank info.',
            'units:read:members' => 'Retrieve unit member info.',
            'units:read:orbat' => 'Retrieve unit slot & section info.',
            'units:admin' => 'Delete access to your units.',
        ]);
    }
}
