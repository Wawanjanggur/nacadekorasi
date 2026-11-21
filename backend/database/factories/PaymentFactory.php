<?php

namespace Database\Factories;

use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'payment_code' => 'PAY-' . now()->format('Ymd') . '-' . strtoupper(fake()->unique()->bothify('####')),
            'type' => PaymentType::DownPayment,
            'amount' => 1500000,
            'payment_method' => 'bank_transfer',
            'status' => PaymentStatus::PendingVerification,
            'proof_image' => 'https://placehold.co/600x800/png?text=Bukti+Transfer',
            'paid_at' => now(),
            'notes' => 'Pembayaran Uang Muka (DP)',
        ];
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => PaymentStatus::Paid,
            'paid_at' => now(),
        ]);
    }
}
