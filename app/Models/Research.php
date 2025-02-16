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
        'reference',
        'dept_id',
        'type',
        'user_id'
    ];

    public function app_status(): BelongsTo
    {
        return $this->BelongsTo(CreApplicationStatus::class, 'id', 'research_id')->withDefault([
            "name" => "Pending",
            "steps" => "Pending",
            "status" => "Pending"
        ]);;
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

    
}
