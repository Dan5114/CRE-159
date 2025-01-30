<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreProgressReportHeader extends Model
{
    protected $table = 'tbl_cre_progress_report_header';

    protected $fillable = [
        'research_id',
        'date_scheduled',
        'steps'
    ];

    public function details()
    {
        return $this->hasMany(ProgressReportDetail::class, 'progress_report_head_id', 'id');
    }

    
}
