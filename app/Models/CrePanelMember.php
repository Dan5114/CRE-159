<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrePanelMember extends Model
{
    protected $table = 'tbl_cre_panel_member';

    protected $fillable = [
        'research_id',
        'name',
        'role',
        'endorsement_status'
    ];
}
