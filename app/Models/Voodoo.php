<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Voodoo extends Model
{
    protected $fillable = [
        'voodoo',
        'attachment',
        'author_id',
        'views',
    ];

    public function author(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    public function persuasions(): HasMany
    {
        return $this->hasMany(Persuasion::class, 'voodoo_id', 'id');
    }
}
