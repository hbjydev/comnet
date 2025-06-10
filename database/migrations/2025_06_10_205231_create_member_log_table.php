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
        Schema::create('unit_member_logs', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->foreignUlid('unit_member_id');
            $table->enum('event_type', ['promotion', 'demotion', 'slot_assigned', 'slot_removed', 'awarded']);
            $table->string('previous')->nullable();
            $table->string('new')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_member_logs');
    }
};
