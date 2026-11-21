<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can register successfully', function () {
    $response = $this->postJson('/api/v1/auth/register', [
        'name' => 'Ahmad Dani',
        'email' => 'ahmad@example.com',
        'password' => 'password123',
        'phone' => '08123456789',
    ]);

    $response->assertCreated()
        ->assertJsonPath('success', true)
        ->assertJsonStructure([
            'data' => [
                'user' => ['id', 'name', 'email', 'role'],
                'token',
            ],
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'ahmad@example.com',
        'role' => 'customer',
    ]);
});

test('user can login with valid credentials', function () {
    $user = User::factory()->create([
        'email' => 'user@test.com',
        'password' => 'secret123',
    ]);

    $response = $this->postJson('/api/v1/auth/login', [
        'email' => 'user@test.com',
        'password' => 'secret123',
    ]);

    $response->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.user.email', 'user@test.com');
});

test('user cannot login with invalid password', function () {
    User::factory()->create([
        'email' => 'user@test.com',
        'password' => 'secret123',
    ]);

    $response = $this->postJson('/api/v1/auth/login', [
        'email' => 'user@test.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertUnprocessable();
});

test('authenticated user can view profile and logout', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->getJson('/api/v1/auth/me')
        ->assertOk()
        ->assertJsonPath('data.email', $user->email);
});
