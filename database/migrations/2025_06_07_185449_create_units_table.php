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
            $table->enum('visibility', ['public', 'unlisted', 'private'])->default('public');
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
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('unit_sections', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('display_name');
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->foreignUlid('unit_id');
            $table->foreignUlid('unit_section_id')->nullable()->references('id')->on('unit_sections');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('unit_slots', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('display_name');
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->foreignUlid('unit_section_id');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('unit_members', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('unit_id');
            $table->foreignUlid('user_id')->nullable();
            $table->string('display_name')->nullable();
            $table->enum('role', ['owner', 'admin', 'normal', 'banned'])->default('normal');
            $table->jsonb('profile_data')->default('{}');
            $table->foreignUlid('unit_rank_id');
            $table->foreignUlid('unit_slot_id')->nullable();
            $table->timestamps();
            $table->unique(['unit_id', 'user_id']);
            $table->unique(['unit_id', 'unit_slot_id']);
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
