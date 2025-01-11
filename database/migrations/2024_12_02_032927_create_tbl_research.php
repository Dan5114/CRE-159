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
        Schema::create('tbl_research', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dept_id');
            $table->foreignId('user_id');
            $table->uuid('reference');
            $table->string('research_title', length: 200);
            $table->char('status', length: 100)->default('D');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_research');
    }
};
