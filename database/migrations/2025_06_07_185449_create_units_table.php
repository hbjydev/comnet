<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('units', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('display_name');
            $table->string('description')->nullable();
            $table->string('slug', 24)->unique();
            $table->string('avatar')->nullable();
            $table->string('banner')->nullable();
            $table->timestamps();
        });

        Schema::create('unit_ranks', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('display_name');
            $table->string('short_name');
            $table->string('icon')->nullable();
            $table->foreignUlid('unit_id');
            $table->timestamps();
        });

        Schema::create('unit_sections', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('display_name');
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->foreignUlid('unit_id');
            $table->foreignUlid('unit_section_id')->nullable()->references('id')->on('unit_sections');
            $table->timestamps();
        });

        Schema::create('unit_slots', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('display_name');
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->foreignUlid('unit_section_id');
            $table->timestamps();
        });

        Schema::create('unit_members', function (Blueprint $table) {
            $table->foreignUlid('unit_id');
            $table->foreignUlid('user_id');
            $table->string('display_name')->nullable();
            $table->enum('role', ['owner', 'admin', 'normal', 'banned'])->default('normal');
            $table->jsonb('profile_data')->default('{}');
            $table->foreignUlid('rank_id')->unique();
            $table->foreignUlid('slot_id')->unique()->nullable();
            $table->timestamps();

            $table->primary(['unit_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_members');
        Schema::dropIfExists('units');
    }
};
