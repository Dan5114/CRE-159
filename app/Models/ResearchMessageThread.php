<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchMessageThread extends Model
{
    protected $table = 'tbl_research_message_thread';
    
    protected $fillable = [
        'research_id',
        'remarks',
        'seen_by',
        'read_status',
        'steps'
    ];
}
