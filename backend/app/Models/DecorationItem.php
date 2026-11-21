<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DecorationItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'item_code',
        'category',
        'stock',
        'condition',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'stock' => 'integer',
        ];
    }

    public function packages(): BelongsToMany
    {
        return $this->belongsToMany(DecorationPackage::class, 'package_item', 'item_id', 'package_id')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
