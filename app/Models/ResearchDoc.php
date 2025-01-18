<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchDoc extends Model
{
    protected $table = 'tbl_research_docs';
    
    protected $fillable = [
        'research_id',
        'steps',
        'report_date',
        'file_name',
        'file_path'
    ];
}
