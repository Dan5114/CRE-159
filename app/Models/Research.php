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
        'reference',
        'dept_id',
        'user_id'
    ];

    public function app_status(): hasMany
    {
        return $this->hasMany(CreApplicationStatus::class, 'id', 'reseach_id');
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
