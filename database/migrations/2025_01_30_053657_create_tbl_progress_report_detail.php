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
        Schema::create('tbl_progress_report_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('progress_report_head_id');
            $table->foreignId('file_id');
            $table->char('type', length: 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_progress_report_detail');
    }
};
