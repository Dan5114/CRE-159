<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'tbl_files';
    protected $primaryKey = 'file_id';  
    
    protected $fillable = [
        'research_id',
        'file_name',
        'file_path',
        'file_url',
        'document_for'
    ];
}
