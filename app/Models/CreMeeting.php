<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreMeeting extends Model
{
    protected $table = 'tbl_cre_meeting';

    protected $fillable = [
        'research_id',
        'meeting_date',
        'status'
    ];
}
