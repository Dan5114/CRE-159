<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreApplicationStatus extends Model
{
    protected $table = 'tbl_cre_application_status';

    protected $fillable = [
        'research_id',
        'steps',
        'name',
        'start',
        'end',
        'status'
    ];
}
