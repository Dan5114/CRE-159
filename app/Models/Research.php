<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Research extends Model
{
    protected $table = 'tbl_research';

    protected $fillable = [
        'research_title',
        'date_completion',
        'date_extension',
        'academic_year',
        'date_completed',
        'date_issued',
        'reference',
        'dept_id',
        'type',
        'user_id',
        'approval'
    ];

    public function app_status(): BelongsTo
    {
        return $this->BelongsTo(CreApplicationStatus::class, 'id', 'research_id')->withDefault([
            "name" => null,
            "steps" => null,
            "status" => null
        ]);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
 
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'dept_id', 'dept_id');
    }

    public function meeting(): BelongsTo
    {
        return $this->belongsTo(CreMeeting::class, 'id', 'research_id')->withDefault([
            "id" => ""
        ]);
    }

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(CrePanelMember::class, 'id', 'research_id');
    }

    
}
