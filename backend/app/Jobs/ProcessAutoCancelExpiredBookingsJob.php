<?php

namespace App\Jobs;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Notifications\BookingStatusChangedNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessAutoCancelExpiredBookingsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        // Cancel pending bookings older than 48 hours
        $expiredBookings = Booking::where('status', BookingStatus::Pending)
            ->where('created_at', '<=', now()->subHours(48))
            ->get();

        Log::info('Checking expired bookings', ['count' => $expiredBookings->count()]);

        foreach ($expiredBookings as $booking) {
            $booking->update([
                'status' => BookingStatus::Cancelled,
                'cancelled_reason' => 'Dibatalkan otomatis oleh sistem karena melewati batas waktu pembayaran DP (48 jam).',
            ]);

            $booking->user->notify(new BookingStatusChangedNotification($booking));
        }
    }
}
