<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchMember extends Model
{
    protected $table = 'tbl_research_member';
    
    protected $fillable = [
        'research_id',
        'name'
    ];
}
