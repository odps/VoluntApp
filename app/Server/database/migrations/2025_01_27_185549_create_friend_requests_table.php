<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('friend_requests', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('from_user_id'); // FK to user.id (request sender)
            $table->unsignedBigInteger('to_user_id'); // FK to user.id (request receiver)
            $table->enum('status', ['pending', 'accepted', 'rejected']); // Request status
            $table->timestamp('created_at')->useCurrent(); // Request creation time
            $table->timestamp('responded_at')->nullable(); // Time of response (nullable)

            // Foreign Key Constraints
            $table->foreign('from_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('to_user_id')->references('id')->on('users')->onDelete('cascade');

            // Ensure a request between two users cannot exist twice
            $table->unique(['from_user_id', 'to_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friend_requests');
    }
};
