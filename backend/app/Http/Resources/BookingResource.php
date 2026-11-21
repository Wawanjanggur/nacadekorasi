<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_code' => $this->booking_code,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'package_id' => $this->package_id,
            'package' => new DecorationPackageResource($this->whenLoaded('package')),
            'event_date' => $this->event_date?->format('Y-m-d'),
            'event_time' => $this->event_time,
            'event_location' => $this->event_location,
            'event_address' => $this->event_address,
            'note' => $this->note,
            'total_price' => (float) $this->total_price,
            'formatted_total_price' => 'Rp ' . number_format((float) $this->total_price, 0, ',', '.'),
            'total_paid' => $this->total_paid,
            'formatted_total_paid' => 'Rp ' . number_format($this->total_paid, 0, ',', '.'),
            'remaining_balance' => $this->remaining_balance,
            'formatted_remaining_balance' => 'Rp ' . number_format($this->remaining_balance, 0, ',', '.'),
            'is_fully_paid' => $this->isFullyPaid(),
            'status' => $this->status?->value ?? $this->status,
            'status_label' => $this->status?->label(),
            'cancelled_reason' => $this->cancelled_reason,
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
            'review' => new ReviewResource($this->whenLoaded('review')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
