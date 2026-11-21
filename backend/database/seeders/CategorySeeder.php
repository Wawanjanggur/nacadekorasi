<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Pernikahan (Wedding)',
                'slug' => 'pernikahan-wedding',
                'description' => 'Paket dekorasi pelaminan, akad nikah, gate masuk, dan lorong jalan pengantin elegan.',
                'icon' => 'heart',
                'is_active' => true,
            ],
            [
                'name' => 'Lamaran (Engagement)',
                'slug' => 'lamaran-engagement',
                'description' => 'Dekorasi backdrop intim dan estetik untuk prosesi lamaran dan pertunangan keluarga.',
                'icon' => 'ring',
                'is_active' => true,
            ],
            [
                'name' => 'Ulang Tahun (Birthday)',
                'slug' => 'ulang-tahun-birthday',
                'description' => 'Dekorasi ceria dengan balon, backdrop tematik, lighting meriah untuk anak maupun dewasa.',
                'icon' => 'cake',
                'is_active' => true,
            ],
            [
                'name' => 'Acara Perusahaan (Corporate)',
                'slug' => 'acara-perusahaan-corporate',
                'description' => 'Dekorasi panggung formal, backdrop seminar, gala dinner, dan peluncuran produk.',
                'icon' => 'briefcase',
                'is_active' => true,
            ],
            [
                'name' => 'Photobooth & Corner',
                'slug' => 'photobooth-corner',
                'description' => 'Spot foto estetik dengan aksesoris foto, lampu sorot studio, dan properti unik.',
                'icon' => 'camera',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}
