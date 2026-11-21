<?php

namespace Database\Seeders;

use App\Models\DecorationItem;
use Illuminate\Database\Seeder;

class DecorationItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Backdrop Arch Kayu Jati 3x2.5m',
                'item_code' => 'ITM-BD001',
                'category' => 'Backdrop',
                'stock' => 5,
                'condition' => 'good',
                'description' => 'Backdrop lengkung minimalis berbahan kayu jati solid finishing natural rustic.',
            ],
            [
                'name' => 'Sofa Pelaminan Chesterfield Putih',
                'item_code' => 'ITM-FN001',
                'category' => 'Furniture',
                'stock' => 4,
                'condition' => 'good',
                'description' => 'Sofa mewah berlapis kulit sintetis premium warna broken white.',
            ],
            [
                'name' => 'Kursi Pengantin Tiffany Gold',
                'item_code' => 'ITM-FN002',
                'category' => 'Furniture',
                'stock' => 50,
                'condition' => 'good',
                'description' => 'Kursi tiffany elegan warna emas cocok untuk akad nikah dan tamu VIP.',
            ],
            [
                'name' => 'Standing Flower Pilar Besi Tempa Gold 120cm',
                'item_code' => 'ITM-FL001',
                'category' => 'Floral',
                'stock' => 16,
                'condition' => 'good',
                'description' => 'Pilar bunga sudut pelaminan atau lorong jalan pengantin.',
            ],
            [
                'name' => 'Rangkaian Bunga Segar & Artificial Mix Premium',
                'item_code' => 'ITM-FL002',
                'category' => 'Floral',
                'stock' => 20,
                'condition' => 'good',
                'description' => 'Kombinasi mawar putih, baby breath, eucalyptus, dan daun monstera.',
            ],
            [
                'name' => 'Spotlight Par LED RGB 54x3W',
                'item_code' => 'ITM-LT001',
                'category' => 'Lighting',
                'stock' => 12,
                'condition' => 'good',
                'description' => 'Lampu sorot panggung dengan berbagai pilihan warna ambient.',
            ],
            [
                'name' => 'Lampu Gantung Filament Edison Bulat',
                'item_code' => 'ITM-LT002',
                'category' => 'Lighting',
                'stock' => 8,
                'condition' => 'good',
                'description' => 'Lampu bohlam vintage warm white memberikan kesan hangat dan romantis.',
            ],
            [
                'name' => 'Neon Sign Custom "Better Together"',
                'item_code' => 'ITM-PR001',
                'category' => 'Props',
                'stock' => 3,
                'condition' => 'good',
                'description' => 'Lampu neon fleksibel warna warm white untuk aksen backdrop photo.',
            ],
            [
                'name' => 'Karpet Jalan Beludru Merah 25m',
                'item_code' => 'ITM-PR002',
                'category' => 'Props',
                'stock' => 4,
                'condition' => 'good',
                'description' => 'Karpet jalan pengantin karpet merah tebal dan empuk.',
            ],
            [
                'name' => 'Welcome Sign Acrylic Transparan + Standing Kayu',
                'item_code' => 'ITM-PR003',
                'category' => 'Props',
                'stock' => 6,
                'condition' => 'good',
                'description' => 'Papan selamat datang tamu dari bahan akrilik bening tebal 5mm.',
            ],
        ];

        foreach ($items as $item) {
            DecorationItem::updateOrCreate(['item_code' => $item['item_code']], $item);
        }
    }
}
