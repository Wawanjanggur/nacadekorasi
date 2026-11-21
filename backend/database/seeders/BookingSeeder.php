<?php

namespace Database\Seeders;

use App\Enums\BookingStatus;
use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Models\Booking;
use App\Models\DecorationPackage;
use App\Models\Payment;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::where('email', 'customer@gmail.com')->first();
        $packages = DecorationPackage::all();

        if (! $customer || $packages->isEmpty()) {
            return;
        }

        $package1 = $packages->first();
        $package2 = $packages->skip(1)->first() ?? $package1;
        $package3 = $packages->skip(2)->first() ?? $package1;

        // 1. Completed Booking with Full Payment & Review
        $bookingCompleted = Booking::create([
            'booking_code' => 'DKR-' . now()->subDays(20)->format('Ymd') . '-0001',
            'user_id' => $customer->id,
            'package_id' => $package1->id,
            'event_date' => now()->subDays(5)->format('Y-m-d'),
            'event_time' => '10:00 - 17:00',
            'event_location' => 'Gedung Serbaguna Puri Asri',
            'event_address' => 'Jl. Pahlawan No. 45, Kota Bandung',
            'note' => 'Mohon ditambah standing flower di dekat pintu masuk',
            'total_price' => $package1->price,
            'status' => BookingStatus::Completed,
        ]);

        // DP Payment
        Payment::create([
            'booking_id' => $bookingCompleted->id,
            'payment_code' => 'PAY-' . now()->subDays(20)->format('Ymd') . '-0001',
            'type' => PaymentType::DownPayment,
            'amount' => $package1->min_deposit_amount,
            'payment_method' => 'bank_transfer',
            'status' => PaymentStatus::Paid,
            'paid_at' => now()->subDays(19),
            'notes' => 'Pembayaran DP 30%',
        ]);

        // Settlement Payment
        Payment::create([
            'booking_id' => $bookingCompleted->id,
            'payment_code' => 'PAY-' . now()->subDays(7)->format('Ymd') . '-0002',
            'type' => PaymentType::Settlement,
            'amount' => $package1->price - $package1->min_deposit_amount,
            'payment_method' => 'bank_transfer',
            'status' => PaymentStatus::Paid,
            'paid_at' => now()->subDays(6),
            'notes' => 'Pelunasan sisa tagihan sewa dekorasi',
        ]);

        // Review
        Review::create([
            'booking_id' => $bookingCompleted->id,
            'user_id' => $customer->id,
            'package_id' => $package1->id,
            'rating' => 5,
            'comment' => 'Dekorasi sangat megah dan memuaskan! Kru datang tepat waktu dan ramah. Terima kasih banyak!',
        ]);

        // 2. Confirmed Booking with Paid DP
        $bookingConfirmed = Booking::create([
            'booking_code' => 'DKR-' . now()->format('Ymd') . '-0002',
            'user_id' => $customer->id,
            'package_id' => $package2->id,
            'event_date' => now()->addDays(14)->format('Y-m-d'),
            'event_time' => '08:00 - 14:00',
            'event_location' => 'Hotel Grand Mercure',
            'event_address' => 'Jl. Asia Afrika No. 100, Bandung',
            'note' => 'Tema rustic pastel',
            'total_price' => $package2->price,
            'status' => BookingStatus::Confirmed,
        ]);

        Payment::create([
            'booking_id' => $bookingConfirmed->id,
            'payment_code' => 'PAY-' . now()->format('Ymd') . '-0003',
            'type' => PaymentType::DownPayment,
            'amount' => $package2->min_deposit_amount,
            'payment_method' => 'bank_transfer',
            'status' => PaymentStatus::Paid,
            'paid_at' => now(),
            'notes' => 'Pembayaran DP telah diverifikasi',
        ]);

        // 3. Pending Booking (baru dibuat, belum bayar DP)
        Booking::create([
            'booking_code' => 'DKR-' . now()->format('Ymd') . '-0003',
            'user_id' => $customer->id,
            'package_id' => $package3->id,
            'event_date' => now()->addDays(30)->format('Y-m-d'),
            'event_time' => '13:00 - 18:00',
            'event_location' => 'Rumah Kediaman Pengantin',
            'event_address' => 'Komplek Permata Indah Blok C2 No. 8',
            'note' => 'Ukuran ruangan 6x4 meter',
            'total_price' => $package3->price,
            'status' => BookingStatus::Pending,
        ]);
    }
}
