<?php

namespace Database\Factories;

use App\Models\DecorationItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DecorationItem>
 */
class DecorationItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Backdrop Lengkung Kayu',
                'Standing Flower Gold',
                'Kursi Pengantin Tiffany Gold',
                'Lampu Gantung Edison Vintage',
                'Karpet Jalan Beludru Merah',
                'Meja Akad Marmer Bulat',
                'Neon Sign Welcome Board',
                'Vas Bunga Keramik Putih Elegan',
                'Mini Spotlight Warm White 50W',
                'Gazebo Kayu Jati Minimalis'
            ]) . ' #' . fake()->unique()->numberBetween(100, 999),
            'item_code' => 'ITM-' . strtoupper(fake()->unique()->bothify('??###')),
            'category' => fake()->randomElement(['Backdrop', 'Lighting', 'Floral', 'Furniture', 'Props']),
            'stock' => fake()->numberBetween(2, 50),
            'condition' => 'good',
            'description' => fake()->sentence(),
        ];
    }
}
