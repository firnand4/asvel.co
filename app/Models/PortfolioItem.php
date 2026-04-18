<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = ['emoji','title','description','tech','problem','result','color','order','is_active'];
    protected $casts    = ['tech' => 'array', 'is_active' => 'boolean'];
}
