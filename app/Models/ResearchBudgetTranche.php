<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchBudgetTranche extends Model
{
    protected $table = 'tbl_research_budget_tranche';

    protected $fillable = [
        'research_id',
        'status',
        'created_at',
        'updated_at'
    ];

    
}
