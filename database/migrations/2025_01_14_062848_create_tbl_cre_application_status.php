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
        Schema::create('tbl_cre_application_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('research_id');
            $table->char('steps', length: 50);
            $table->char('name', length: 50);
            $table->timestamp('start')->nullable();
            $table->timestamp('end')->nullable();
            $table->char('status', length: 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_cre_application_status');
    }
};
