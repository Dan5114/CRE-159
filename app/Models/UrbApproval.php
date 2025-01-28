<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UrbApproval extends Model
{
    protected $table = 'tbl_urb_approval';

    protected $fillable = [
        'research_id',
        'date_approved',
        'remarks',
        'approved_by',
        'steps'
    ];
}
