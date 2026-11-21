<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\User;

class PaymentPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function view(User $user, Payment $payment): bool
    {
        return $user->isStaff() || $user->id === $payment->booking->user_id;
    }

    public function create(User $user, Booking $booking): bool
    {
        return $user->id === $booking->user_id;
    }

    public function verify(User $user): bool
    {
        return $user->isStaff();
    }
}
