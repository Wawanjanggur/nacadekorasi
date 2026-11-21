<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DecorationPackageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'formatted_price' => 'Rp ' . number_format((float) $this->price, 0, ',', '.'),
            'deposit_percentage' => $this->deposit_percentage,
            'min_deposit_amount' => $this->min_deposit_amount,
            'formatted_min_deposit' => 'Rp ' . number_format($this->min_deposit_amount, 0, ',', '.'),
            'thumbnail' => $this->thumbnail,
            'is_active' => $this->is_active,
            'items' => DecorationItemResource::collection($this->whenLoaded('items')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'average_rating' => $this->whenLoaded('reviews', fn () => round((float) $this->reviews->avg('rating'), 1)),
            'reviews_count' => $this->whenLoaded('reviews', fn () => $this->reviews->count()),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
