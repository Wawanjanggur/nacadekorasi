<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DecorationItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'item_code' => $this->item_code,
            'category' => $this->category,
            'stock' => $this->stock,
            'condition' => $this->condition,
            'description' => $this->description,
            'quantity' => $this->whenPivotLoaded('package_item', fn () => $this->pivot->quantity),
        ];
    }
}
