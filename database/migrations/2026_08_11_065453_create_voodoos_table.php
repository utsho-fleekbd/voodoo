<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voodoos', function (Blueprint $table) {
            $table->id();
            $table->text('voodoo');
            $table->string('attachment')->nullable();
            $table->foreignId('author_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('parent_voodoo_id')
                ->nullable()
                ->constrained('voodoos')
                ->nullOnDelete();
            $table->integer('views_count')->default(0);
            $table->integer('persuasions_count')->default(0);
            $table->integer('re_voodoos_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voodoos');
    }
};
