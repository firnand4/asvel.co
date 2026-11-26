<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServicePage extends Model
{
    protected $fillable = [
        'slug', 'service_id',
        'h1', 'h1_en', 'meta_title', 'meta_title_en', 'meta_description', 'meta_description_en',
        'body', 'body_en', 'process', 'process_en', 'faq', 'faq_en',
        'portfolio_categories', 'order', 'is_active',
    ];

    protected $casts = [
        'process'              => 'array',
        'process_en'           => 'array',
        'faq'                  => 'array',
        'faq_en'               => 'array',
        'portfolio_categories' => 'array',
        'is_active'            => 'boolean',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function path(): string
    {
        return '/layanan/' . $this->slug;
    }
}
