<?php

namespace Database\Seeders;

use App\Models\Unit;
use App\Models\UnitMember;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $password = 'p4ssw0rd!!';

        $user = User::factory()->create([
            'display_name' => 'Administrator',
            'username' => 'admin',
            'email' => 'test@example.com',
            'password' => $password,
        ]);

        $unit = Unit::factory()->create();

        $membership = UnitMember::factory()->create([
            'unit_id' => $unit->id,
            'user_id' => $user->id,
            'display_name' => 'Admin',
        ]);
    }
}
