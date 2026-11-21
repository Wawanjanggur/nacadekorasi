<?php

use App\Enums\BookingStatus;
use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Models\Booking;
use App\Models\DecorationPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

uses(RefreshDatabase::class);

test('authenticated customer can create a booking', function () {
    Notification::fake();

    $customer = User::factory()->create();
    $package = DecorationPackage::factory()->create([
        'price' => 5000000,
        'deposit_percentage' => 30,
        'is_active' => true,
    ]);

    $payload = [
        'package_id' => $package->id,
        'event_date' => now()->addWeeks(3)->format('Y-m-d'),
        'event_time' => '10:00 - 15:00',
        'event_location' => 'Gedung Kartini',
        'event_address' => 'Jl. Merdeka No. 123',
        'note' => 'Harap sediakan karpet merah panjang',
    ];

    $response = $this->actingAs($customer)
        ->postJson('/api/v1/bookings', $payload);

    $response->assertCreated()
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.total_price', 5000000)
        ->assertJsonPath('data.status', 'pending');

    $this->assertDatabaseHas('bookings', [
        'user_id' => $customer->id,
        'package_id' => $package->id,
        'status' => 'pending',
    ]);
});

test('customer can submit payment proof for booking', function () {
    $customer = User::factory()->create();
    $package = DecorationPackage::factory()->create(['price' => 6000000, 'deposit_percentage' => 30]);
    $booking = Booking::factory()->create([
        'user_id' => $customer->id,
        'package_id' => $package->id,
        'total_price' => 6000000,
        'status' => BookingStatus::Pending,
    ]);

    $response = $this->actingAs($customer)
        ->postJson("/api/v1/bookings/{$booking->id}/payments", [
            'type' => 'dp',
            'amount' => 1800000,
            'payment_method' => 'bank_transfer',
            'proof_image' => 'https://example.com/proof.jpg',
            'notes' => 'Transfer via BCA',
        ]);

    $response->assertCreated()
        ->assertJsonPath('data.status', 'pending_verification')
        ->assertJsonPath('data.amount', 1800000);

    $this->assertDatabaseHas('payments', [
        'booking_id' => $booking->id,
        'type' => 'dp',
        'status' => 'pending_verification',
    ]);
});

test('staff or admin can verify payment and booking auto confirms', function () {
    $staff = User::factory()->staff()->create();
    $booking = Booking::factory()->create(['status' => BookingStatus::Pending]);
    $payment = \App\Models\Payment::factory()->create([
        'booking_id' => $booking->id,
        'type' => PaymentType::DownPayment,
        'status' => PaymentStatus::PendingVerification,
    ]);

    $response = $this->actingAs($staff)
        ->patchJson("/api/v1/payments/{$payment->id}/verify", [
            'is_approved' => true,
            'notes' => 'Bukti valid, dana sudah masuk ke rekening',
        ]);

    $response->assertOk()
        ->assertJsonPath('data.status', 'paid');

    $this->assertEquals(BookingStatus::Confirmed, $booking->fresh()->status);
});
