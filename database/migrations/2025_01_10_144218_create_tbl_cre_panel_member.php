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
        Schema::create('tbl_cre_panel_member', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->foreignId('user_id');
            $table->char('role', length: 50)->nullable();
            $table->char('endorsement_status', length: 25)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_cre_panel_member');
    }
};
