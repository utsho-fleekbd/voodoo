<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Persuasion extends Model
{
    protected $fillable = [
        'voodoo_id',
        'persuaded_user_id',
    ];

    public function voodoo(): HasOne
    {
        return $this->hasOne(Voodoo::class, 'id', 'voodoo_id');
    }

    public function persuadedUser(): HasOne
    {
        return $this->HasOne(User::class, 'id', 'persuaded_user_id');
    }
}
