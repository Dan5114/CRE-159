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
        Schema::create('tbl_cre_progress_report_header', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->timestamp('date_scheduled')->nullable();
            $table->char('steps', length: 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_cre_progress_report_header');
    }
};
