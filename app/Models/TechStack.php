<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechStack extends Model
{
    protected $fillable = ['name','emoji','category','order','is_active'];
    protected $casts    = ['is_active' => 'boolean'];
}
