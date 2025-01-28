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
        Schema::create('friendships', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('user_id_1'); // FK to user.id (first user)
            $table->unsignedBigInteger('user_id_2'); // FK to user.id (second user)
            $table->enum('status', ['pending', 'accepted', 'rejected', 'blocked']); // Friendship status
            $table->timestamp('requested_at'); // Timestamp of request creation
            $table->timestamp('updated_at')->nullable(); // Last status update

            // Foreign Key Constraints
            $table->foreign('user_id_1')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_id_2')->references('id')->on('users')->onDelete('cascade');

            // Se verifica que una pareja de usuarios sea unica
            $table->unique(['user_id_1', 'user_id_2']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friendships');
    }
};
