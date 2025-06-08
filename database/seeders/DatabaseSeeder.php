<?php

namespace Database\Seeders;

use App\Models\Unit;
use App\Models\UnitMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Laravel\Passport\ClientRepository;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (config('app.env', 'production') == 'local') {
            $password = 'p4ssw0rd!!';

            $user = User::factory()->create([
                'display_name' => 'Administrator',
                'username' => 'admin',
                'email' => 'test@example.com',
                'password' => $password,
            ]);

            $unit = Unit::factory()->create();

            UnitMember::factory()->create([
                'unit_id' => $unit->id,
                'user_id' => $user->id,
                'display_name' => 'Admin',
                'role' => 'owner',
                'rank_id' => $unit->ranks()->where('display_name', 'General')->first()->id,
            ]);
        }

        app(ClientRepository::class)
            ->createPersonalAccessGrantClient(
                name: config('app.name'),
                provider: 'users',
            );
    }
}
