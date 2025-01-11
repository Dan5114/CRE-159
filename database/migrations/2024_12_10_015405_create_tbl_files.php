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
        Schema::create('tbl_files', function (Blueprint $table) {
            $table->increments('file_id');
            $table->foreignId('research_id');
            $table->char('file_name', length: 100);
            $table->char('file_path', length: 100);
            $table->char('file_url', length: 255)->nullable();
            $table->char('document_for', length: 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_files');
    }
};
