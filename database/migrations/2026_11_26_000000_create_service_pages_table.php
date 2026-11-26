<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // URL: /layanan/{slug}; not editable in admin to keep indexed URLs stable
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete(); // homepage card that links here

            // Indonesian (default) and English content, both editable in admin
            $table->string('h1');
            $table->string('h1_en')->nullable();
            $table->string('meta_title');
            $table->string('meta_title_en')->nullable();
            $table->string('meta_description', 300);
            $table->string('meta_description_en', 300)->nullable();
            $table->longText('body');                 // paragraphs, "## " headings, "- " lists
            $table->longText('body_en')->nullable();
            $table->json('process')->nullable();      // [{title, desc}]
            $table->json('process_en')->nullable();
            $table->json('faq')->nullable();          // [{q, a}]
            $table->json('faq_en')->nullable();

            $table->json('portfolio_categories')->nullable(); // portfolio categories shown as related projects
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_pages');
    }
};
