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
        Schema::create('events', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('title'); // Title of the event
            $table->text('description')->nullable(); // Details about the event
            $table->string('location'); // Address or online link
            $table->dateTime('date_time'); // Scheduled time for the event
            $table->unsignedBigInteger('created_by'); // FK to user.id
            $table->timestamps(); // Includes created_at and updated_at

            // Foreign Key Constraint
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
