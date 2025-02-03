<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgressReportDetail extends Model
{
    protected $table = 'tbl_progress_report_detail';

    protected $fillable = [
        'progress_report_head_id',
        'file_id',
        'type'
    ];

    public function files()
    {
        return $this->belongsTo(ResearchDoc::class, 'file_id', 'id')->select('id', 'file_name', 'created_at');
    }
   
}

