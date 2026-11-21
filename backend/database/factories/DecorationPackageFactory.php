<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\DecorationPackage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<DecorationPackage>
 */
class DecorationPackageFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Rustic Romance Elegance',
            'Modern Minimalist White',
            'Traditional Royal Gold',
            'Garden Boho Chic',
            'Intimate Pastel Dream',
            'Luxury Emerald Glamour',
            'Romantic Blush Floral',
            'Classic European Heritage'
        ]) . ' ' . fake()->unique()->numberBetween(1, 99);

        return [
            'category_id' => Category::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(3),
            'price' => fake()->randomElement([3500000, 5000000, 7500000, 10000000, 15000000, 25000000]),
            'deposit_percentage' => 30,
            'thumbnail' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            'is_active' => true,
        ];
    }
}
