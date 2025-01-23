<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TplEndorsementPaper extends Model
{
    protected $table = 'tbl_tpl_endorsement_paper';

    protected $fillable = [
        'research_id',
        'date_endorse',
        'user_id',
        'steps'
    ];
}
