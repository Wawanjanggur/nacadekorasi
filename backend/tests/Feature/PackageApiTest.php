<?php

use App\Models\Category;
use App\Models\DecorationPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest can list active packages', function () {
    DecorationPackage::factory()->count(3)->create(['is_active' => true]);
    DecorationPackage::factory()->create(['is_active' => false]);

    $response = $this->getJson('/api/v1/packages');

    $response->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonCount(3, 'data.items');
});

test('guest can view single package by slug', function () {
    $package = DecorationPackage::factory()->create(['is_active' => true]);

    $response = $this->getJson("/api/v1/packages/{$package->slug}");

    $response->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.slug', $package->slug);
});

test('admin can create a new decoration package', function () {
    $admin = User::factory()->admin()->create();
    $category = Category::factory()->create();

    $payload = [
        'category_id' => $category->id,
        'name' => 'Paket Luxury Glass Wedding',
        'description' => 'Paket dekorasi serba kaca dan lampu kristal mewah.',
        'price' => 18000000,
        'deposit_percentage' => 30,
        'is_active' => true,
    ];

    $response = $this->actingAs($admin)
        ->postJson('/api/v1/packages', $payload);

    $response->assertCreated()
        ->assertJsonPath('data.name', 'Paket Luxury Glass Wedding');

    $this->assertDatabaseHas('decoration_packages', [
        'name' => 'Paket Luxury Glass Wedding',
    ]);
});

test('regular customer cannot create a decoration package', function () {
    $customer = User::factory()->create();
    $category = Category::factory()->create();

    $response = $this->actingAs($customer)
        ->postJson('/api/v1/packages', [
            'category_id' => $category->id,
            'name' => 'Hack Package',
            'price' => 1000,
        ]);

    $response->assertForbidden();
});
