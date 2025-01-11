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
        Schema::create('tbl_research_logs', function (Blueprint $table) {
            $table->increments('r_log_id');
            $table->foreignId('research_id');
            $table->char('steps', length: 100);
            $table->char('remarks', length: 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_research_logs');
    }
};
