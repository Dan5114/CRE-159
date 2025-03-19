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
        Schema::create('consolidated_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->longText('content')->nullable();
            $table->char('steps', length: 1);
            $table->char('user_type', length: 25);
            $table->foreignId('added_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consolidated_feedbacks');
    }
};
