<?php

namespace Database\Factories;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\DecorationPackage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_code' => 'DKR-' . now()->format('Ymd') . '-' . strtoupper(fake()->unique()->bothify('####')),
            'user_id' => User::factory(),
            'package_id' => DecorationPackage::factory(),
            'event_date' => fake()->dateTimeBetween('+1 week', '+3 months')->format('Y-m-d'),
            'event_time' => '09:00 - 16:00',
            'event_location' => 'Ballroom Hotel ' . fake()->city(),
            'event_address' => fake()->address(),
            'note' => fake()->optional()->sentence(),
            'total_price' => 5000000,
            'status' => BookingStatus::Pending,
            'cancelled_reason' => null,
        ];
    }

    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BookingStatus::Confirmed,
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BookingStatus::Completed,
        ]);
    }
}
