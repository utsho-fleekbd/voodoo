<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Voodoo extends Model
{
    protected $fillable = [
        'voodoo',
        'attachment',
        'author_id',
        'parent_voodoo_id',
        'views_count',
        'persuasions_count',
        're_voodoos_count',
    ];

    public function author(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    public function persuasions(): HasMany
    {
        return $this->hasMany(Persuasion::class, 'voodoo_id', 'id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(
            Voodoo::class,
            'parent_voodoo_id',
            'id'
        );
    }

    public function children(): HasMany
    {
        return $this->hasMany(
            Voodoo::class,
            'parent_voodoo_id',
            'id'
        );
    }

    public function allChildren(): HasMany
    {
        return $this->children()
            ->with(['author', 'allChildren']);
    }
}
