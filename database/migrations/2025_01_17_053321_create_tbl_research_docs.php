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
        Schema::create('tbl_research_docs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->char('file_name', length: 100);
            $table->char('file_path', length: 100);
            $table->char('steps', length: 100);
            $table->char('seen_status', length: 100)->nullable();
            $table->timestamp('seen_date')->nullable();
            $table->timestamp('report_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_research_docs');
    }
};
