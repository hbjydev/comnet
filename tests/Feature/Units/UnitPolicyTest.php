<?php

use App\Models\Unit;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

beforeEach(function () {
    $this->actingAs(User::factory()->create());

    Unit::create([
        'display_name' => 'Testing Unit',
        'slug' => 'testing-unit',
    ]);
});

test('owners can view the settings page', function () {
    $this->get('/units/testing-unit/edit')->assertOk();
});

test('admins can view the settings page', function () {
    User::first()->memberships()->first()->fill(['role' => 'admin'])->saveQuietly();
    $this->get('/units/testing-unit/edit')->assertOk();
});

test('normal members cannot view the settings page', function () {
    User::first()->memberships()->first()->fill(['role' => 'normal'])->saveQuietly();
    $this->get('/units/testing-unit/edit')->assertForbidden();
});

test('banned members cannot view the settings page', function () {
    User::first()->memberships()->first()->fill(['role' => 'banned'])->saveQuietly();
    $this->get('/units/testing-unit/edit')->assertForbidden();
});

test('guests cannot view the settings page', function () {
    Auth::logout();
    $this->get('/units/testing-unit/edit')->assertForbidden();
});
