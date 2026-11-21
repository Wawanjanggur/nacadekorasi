<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\DecorationItem;
use App\Models\DecorationPackage;
use Illuminate\Database\Seeder;

class DecorationPackageSeeder extends Seeder
{
    public function run(): void
    {
        $wedding = Category::where('slug', 'pernikahan-wedding')->first();
        $engagement = Category::where('slug', 'lamaran-engagement')->first();
        $birthday = Category::where('slug', 'ulang-tahun-birthday')->first();
        $corporate = Category::where('slug', 'acara-perusahaan-corporate')->first();
        $photobooth = Category::where('slug', 'photobooth-corner')->first();

        $items = DecorationItem::all()->keyBy('item_code');

        $packages = [
            [
                'category_id' => $wedding->id,
                'name' => 'Royal Heritage Gold Wedding',
                'slug' => 'royal-heritage-gold-wedding',
                'description' => 'Paket pelaminan megah dengan nuansa adat modern, panggung 6 meter, sofa chesterfield, pilar bunga segar melimpah, dan pencahayaan panggung lengkap.',
                'price' => 15000000,
                'deposit_percentage' => 30,
                'thumbnail' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                'is_active' => true,
                'items' => [
                    'ITM-BD001' => 1,
                    'ITM-FN001' => 1,
                    'ITM-FN002' => 6,
                    'ITM-FL001' => 4,
                    'ITM-FL002' => 4,
                    'ITM-LT001' => 4,
                    'ITM-PR002' => 1,
                    'ITM-PR003' => 1,
                ],
            ],
            [
                'category_id' => $wedding->id,
                'name' => 'Rustic Romance Minimalist Wedding',
                'slug' => 'rustic-romance-minimalist-wedding',
                'description' => 'Dekorasi pernikahan bertema rustic modern dengan elemen kayu jati solid, tanaman hijau segar, dan lampu filament vintage hangat.',
                'price' => 9500000,
                'deposit_percentage' => 30,
                'thumbnail' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                'is_active' => true,
                'items' => [
                    'ITM-BD001' => 1,
                    'ITM-FN001' => 1,
                    'ITM-FN002' => 4,
                    'ITM-FL001' => 2,
                    'ITM-FL002' => 2,
                    'ITM-LT002' => 4,
                    'ITM-PR001' => 1,
                    'ITM-PR003' => 1,
                ],
            ],
            [
                'category_id' => $engagement->id,
                'name' => 'Intimate Floral Engagement',
                'slug' => 'intimate-floral-engagement',
                'description' => 'Dekorasi lamaran manis dan intim untuk di rumah maupun cafe. Termasuk backdrop lengkung, rangkaian bunga pastel, neon sign, dan 2 kursi tiffany.',
                'price' => 3500000,
                'deposit_percentage' => 40,
                'thumbnail' => 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
                'is_active' => true,
                'items' => [
                    'ITM-BD001' => 1,
                    'ITM-FN002' => 2,
                    'ITM-FL001' => 2,
                    'ITM-FL002' => 2,
                    'ITM-PR001' => 1,
                    'ITM-PR003' => 1,
                ],
            ],
            [
                'category_id' => $birthday->id,
                'name' => 'Glamour Sweet Seventeen Party',
                'slug' => 'glamour-sweet-seventeen-party',
                'description' => 'Dekorasi ulang tahun megah dengan backdrop bulat, neon sign umur, spotlight warna-warni, dan standing flower modern.',
                'price' => 4200000,
                'deposit_percentage' => 30,
                'thumbnail' => 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
                'is_active' => true,
                'items' => [
                    'ITM-BD001' => 1,
                    'ITM-LT001' => 4,
                    'ITM-FL002' => 2,
                    'ITM-PR001' => 1,
                ],
            ],
            [
                'category_id' => $corporate->id,
                'name' => 'Executive Corporate Stage & Backdrop',
                'slug' => 'executive-corporate-stage-backdrop',
                'description' => 'Setup dekorasi panggung profesional untuk seminar, peluncuran produk baru, atau annual meeting perusahaan.',
                'price' => 12000000,
                'deposit_percentage' => 50,
                'thumbnail' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
                'is_active' => true,
                'items' => [
                    'ITM-LT001' => 6,
                    'ITM-PR002' => 1,
                    'ITM-PR003' => 2,
                ],
            ],
            [
                'category_id' => $photobooth->id,
                'name' => 'Aesthetic Corner Photobooth',
                'slug' => 'aesthetic-corner-photobooth',
                'description' => 'Spot foto estetik dengan aksen neon sign kekinian, lampu sorot hangat, dan properti foto yang menarik.',
                'price' => 2500000,
                'deposit_percentage' => 30,
                'thumbnail' => 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
                'is_active' => true,
                'items' => [
                    'ITM-BD001' => 1,
                    'ITM-LT002' => 2,
                    'ITM-PR001' => 1,
                    'ITM-PR003' => 1,
                ],
            ],
        ];

        foreach ($packages as $pkgData) {
            $itemsData = $pkgData['items'];
            unset($pkgData['items']);

            $package = DecorationPackage::updateOrCreate(
                ['slug' => $pkgData['slug']],
                $pkgData
            );

            // Sync items with quantity
            $syncData = [];
            foreach ($itemsData as $code => $qty) {
                if (isset($items[$code])) {
                    $syncData[$items[$code]->id] = ['quantity' => $qty];
                }
            }
            $package->items()->sync($syncData);
        }
    }
}
