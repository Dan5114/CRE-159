<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrePanelMember extends Model
{
    protected $table = 'tbl_cre_panel_member';

    protected $fillable = [
        'research_id',
        'user_id',
        'endorsement_status'
    ];

    public function user_profile()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
