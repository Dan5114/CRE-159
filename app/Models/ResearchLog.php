<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchLog extends Model
{
    protected $table = 'tbl_research_logs';
    protected $primaryKey = 'r_log_id';  
    
    protected $fillable = [
        'research_id',
        'steps',
        'remarks'
    ];
}
