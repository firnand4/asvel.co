<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['name','role','expertise','bio','skills','emoji','linkedin_url','order','is_active'];
    protected $casts    = ['skills' => 'array', 'is_active' => 'boolean'];
}
