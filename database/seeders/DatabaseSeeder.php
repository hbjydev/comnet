<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Laravel\Passport\ClientRepository;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app(ClientRepository::class)
            ->createPersonalAccessGrantClient(
                name: config('app.name'),
                provider: 'users',
            );
    }
}
