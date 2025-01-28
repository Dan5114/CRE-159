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
        Schema::create('tbl_urb_approval', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->timestamp('date_approved')->nullable();
            $table->foreignId('approved_by');
            $table->char('remarks', length: 150);
            $table->char('steps', length: 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_urb_approval');
    }
};
