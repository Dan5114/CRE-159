<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'tbl_research_requirements';
    
    protected $fillable = [
        'research_id',
        'file_name',
        'file_path',
        'document_for'
    ];
}
