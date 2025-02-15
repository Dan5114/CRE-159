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
            $table->char('fname', length: 50);
            $table->char('lname', length: 50);
            $table->char('role', length: 20);
            $table->char('endorsement_status', length: 1)->nullable();
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
