<?php

namespace App\Http\Controllers\Api;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Booking;
use App\Models\Review;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{
    use ApiResponse;

    public function store(StoreReviewRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $user = $request->user();

        $booking = Booking::findOrFail($validated['booking_id']);

        if ($booking->user_id !== $user->id) {
            return $this->error('Anda hanya bisa memberikan ulasan untuk pesanan Anda sendiri.', 403);
        }

        if ($booking->status !== BookingStatus::Completed) {
            return $this->error('Ulasan hanya dapat diberikan setelah acara selesai (status: completed).', 422);
        }

        $review = Review::create([
            'booking_id' => $booking->id,
            'user_id' => $user->id,
            'package_id' => $booking->package_id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return $this->created(new ReviewResource($review->load(['user', 'package'])), 'Terima kasih atas ulasan dan rating Anda!');
    }
}
