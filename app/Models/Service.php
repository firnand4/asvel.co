<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['icon','title','description','benefits','tech','color','order','is_active'];
    protected $casts    = ['benefits' => 'array', 'tech' => 'array', 'is_active' => 'boolean'];
}
