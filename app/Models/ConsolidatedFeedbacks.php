<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsolidatedFeedbacks extends Model
{
    protected $fillable = [
        'research_id',
        'content',
        'user_type',
        'steps',
        'added_by'
    ];
}
