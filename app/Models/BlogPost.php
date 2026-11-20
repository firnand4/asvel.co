<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = ['emoji','category','title','slug','excerpt','content','color','read_time','is_published','published_at','order'];
    protected $casts    = ['is_published' => 'boolean', 'published_at' => 'datetime'];
}
