<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Health Check Endpoint
    Route::get('/health', function () {
        return response()->json([
            'status' => 'healthy',
            'timestamp' => now()->toISOString(),
            'service' => 'dekorasi-backend-api',
            'version' => '1.0.0',
        ]);
    });

    // Public Authentication Endpoints
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Public Catalog Endpoints
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{idOrSlug}', [CategoryController::class, 'show']);
    Route::get('/packages', [PackageController::class, 'index']);
    Route::get('/packages/{slug}', [PackageController::class, 'show']);

    // Protected Endpoints (Requires auth:sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        // Auth User Profile & Logout
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Bookings
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/bookings/{code}', [BookingController::class, 'show']);
        Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);

        // Payments
        Route::post('/bookings/{booking}/payments', [PaymentController::class, 'store']);

        // Reviews
        Route::post('/reviews', [ReviewController::class, 'store']);

        // Staff & Admin Endpoints
        Route::middleware('role:admin,staff')->group(function () {
            Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus']);
            Route::get('/payments', [PaymentController::class, 'index']);
            Route::patch('/payments/{payment}/verify', [PaymentController::class, 'verify']);
        });

        // Admin-only Endpoints
        Route::middleware('role:admin')->group(function () {
            Route::post('/packages', [PackageController::class, 'store']);
            Route::put('/packages/{package}', [PackageController::class, 'update']);
            Route::delete('/packages/{package}', [PackageController::class, 'destroy']);
        });
    });
});
