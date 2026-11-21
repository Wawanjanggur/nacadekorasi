<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::firstOrCreate(
            ['email' => 'admin@dekorasi.com'],
            [
                'name' => 'Admin Dekorasi',
                'password' => Hash::make('password'),
                'role' => UserRole::Admin,
                'phone' => '081234567890',
            ]
        );

        // Staff / Dekorator
        User::firstOrCreate(
            ['email' => 'staff@dekorasi.com'],
            [
                'name' => 'Budi Staff Dekor',
                'password' => Hash::make('password'),
                'role' => UserRole::Staff,
                'phone' => '081234567891',
            ]
        );

        // Customer Demo
        User::firstOrCreate(
            ['email' => 'customer@gmail.com'],
            [
                'name' => 'Siti Nurhaliza',
                'password' => Hash::make('password'),
                'role' => UserRole::Customer,
                'phone' => '081234567892',
            ]
        );

        // Additional dummy customers
        User::factory()->count(5)->create();
    }
}
