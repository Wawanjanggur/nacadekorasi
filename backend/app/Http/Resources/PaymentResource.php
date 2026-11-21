<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_id' => $this->booking_id,
            'payment_code' => $this->payment_code,
            'type' => $this->type?->value ?? $this->type,
            'type_label' => $this->type?->label(),
            'amount' => (float) $this->amount,
            'formatted_amount' => 'Rp ' . number_format((float) $this->amount, 0, ',', '.'),
            'payment_method' => $this->payment_method,
            'status' => $this->status?->value ?? $this->status,
            'status_label' => $this->status?->label(),
            'proof_image' => $this->proof_image,
            'paid_at' => $this->paid_at?->toISOString(),
            'notes' => $this->notes,
            'created_at' => $this->created_at?->toISOString(),
            'booking' => new BookingResource($this->whenLoaded('booking')),
        ];
    }
}
