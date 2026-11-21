<?php

namespace App\Policies;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Booking $booking): bool
    {
        return $user->isStaff() || $user->id === $booking->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function updateStatus(User $user, Booking $booking): bool
    {
        return $user->isStaff();
    }

    public function cancel(User $user, Booking $booking): bool
    {
        if ($user->isStaff()) {
            return true;
        }

        // Customer can only cancel if booking is still pending
        return $user->id === $booking->user_id && $booking->status === BookingStatus::Pending;
    }
}
