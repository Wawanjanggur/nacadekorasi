<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\DecorationPackage;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'user_id' => User::factory(),
            'package_id' => DecorationPackage::factory(),
            'rating' => fake()->numberBetween(4, 5),
            'comment' => fake()->randomElement([
                'Dekorasinya sangat indah dan rapi! Semua tamu terkesan.',
                'Pelayanan ramah, tepat waktu, dan hasilnya sesuai dengan ekspektasi kami.',
                'Sangat recommended untuk acara pernikahan atau tunangan, detailnya juara!',
                'Tim dekorasi profesional banget, pemasangan cepat dan estetik.',
            ]),
        ];
    }
}
