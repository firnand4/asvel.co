<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('portfolio_items', function (Blueprint $table) {
            $table->id();
            $table->string('emoji')->default('🚀');
            $table->string('title');
            $table->text('description');
            $table->json('tech')->nullable();
            $table->text('problem')->nullable();
            $table->text('result')->nullable();
            $table->string('color')->default('#6c63ff');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_items');
    }
};
