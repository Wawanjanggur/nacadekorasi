<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'package_id' => ['required', 'integer', 'exists:decoration_packages,id'],
            'event_date' => ['required', 'date', 'after_or_equal:today'],
            'event_time' => ['nullable', 'string', 'max:50'],
            'event_location' => ['required', 'string', 'max:255'],
            'event_address' => ['required', 'string'],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
