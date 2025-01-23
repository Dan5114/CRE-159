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
        Schema::create('tbl_tpl_endorsement_paper', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->timestamp('date_endorse')->nullable();
            $table->foreignId('user_id');
            $table->char('steps', length: 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_tpl_endorsement_paper');
    }
};
