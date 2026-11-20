<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('title');
        });

        Schema::table('portfolio_items', function (Blueprint $table) {
            $table->string('category')->nullable()->after('title');
            $table->string('image')->nullable()->after('category'); // path under public/, e.g. images/portfolio/sikp.png
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });

        Schema::table('portfolio_items', function (Blueprint $table) {
            $table->dropColumn(['category', 'image']);
        });
    }
};
