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
        Schema::create('groups', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('name'); // Name of the group
            $table->text('description')->nullable(); // Description of the group's purpose
            $table->integer('reputation_required')->default(0); // Minimum reputation to join/create
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps(); // Includes created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
