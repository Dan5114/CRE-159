<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_departments', function (Blueprint $table) {
            $table->increments('dept_id');
            $table->char('name', length: 100);
            $table->timestamps();
        });

        DB::table('tbl_departments')->insert([
            ['name' => 'College of Arts & Sciences'],
            ['name' => 'College of Business & Accountancy'],
            ['name' => 'College of Education'],
            ['name' => 'College of Engineering & Computing Studies'],
            ['name' => 'College of Nursing'],
            ['name' => 'College of Law'],
            ['name' => 'College of Medicine'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_departments');
    }
};
