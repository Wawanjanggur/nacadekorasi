<?php

namespace App\Http\Requests\Payment;

use App\Enums\PaymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', Rule::enum(PaymentType::class)],
            'amount' => ['required', 'numeric', 'min:10000'],
            'payment_method' => ['required', 'string', 'in:bank_transfer,qris,cash'],
            'proof_image' => ['nullable', 'string'],
            'notes' => ['nullable', 'string', 'max:500'],
        ];
    }
}
