<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchDoc extends Model
{
    protected $table = 'tbl_research_docs';
    
    protected $fillable = [
        'research_id',
        'steps',
        'seen_status',
        'seen_date',
        'turnitin_score',
        'turnitin_status',
        'turnitin_file',
        'turnitin_path',
        'uploader',
        'report_date',
        'file_name',
        'file_path'
    ];
}
