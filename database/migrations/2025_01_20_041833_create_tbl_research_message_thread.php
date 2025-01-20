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
        Schema::create('tbl_research_message_thread', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->char('remarks', length: 200);
            $table->char('read_status', length: 1);
            $table->char('steps', length: 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_research_message_thread');
    }
};
