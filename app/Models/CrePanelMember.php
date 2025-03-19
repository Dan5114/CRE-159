<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrePanelMember extends Model
{
    protected $table = 'tbl_cre_panel_member';

    protected $fillable = [
        'research_id',
        'user_id',
        'role',
        'endorsement_status'
    ];

    public function user_profile()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function feedback_form()
    {
        return $this->belongsTo(ConsolidatedFeedbacks::class, 'user_id', 'added_by');
    }
}
