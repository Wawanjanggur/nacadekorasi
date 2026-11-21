<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Events\BookingCreated;
use App\Models\Booking;
use App\Models\DecorationPackage;
use App\Models\User;
use App\Notifications\BookingStatusChangedNotification;
use App\Repositories\Contracts\BookingRepositoryInterface;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingService
{
    public function __construct(
        protected BookingRepositoryInterface $bookingRepository,
        protected PackageRepositoryInterface $packageRepository
    ) {
    }

    public function createBooking(User $user, array $data): Booking
    {
        /** @var DecorationPackage $package */
        $package = $this->packageRepository->findOrFail($data['package_id']);

        if (! $package->is_active) {
            throw ValidationException::withMessages([
                'package_id' => ['Paket dekorasi ini saat ini sedang tidak aktif / tidak tersedia.'],
            ]);
        }

        // Check date slot limit
        if ($this->bookingRepository->isDateBooked($data['event_date'])) {
            throw ValidationException::withMessages([
                'event_date' => ['Jadwal untuk tanggal acara tersebut sudah penuh. Silakan pilih tanggal lain.'],
            ]);
        }

        $booking = DB::transaction(function () use ($user, $package, $data) {
            $bookingCode = 'DKR-' . now()->format('Ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));

            return $this->bookingRepository->create([
                'booking_code' => $bookingCode,
                'user_id' => $user->id,
                'package_id' => $package->id,
                'event_date' => $data['event_date'],
                'event_time' => $data['event_time'] ?? null,
                'event_location' => $data['event_location'],
                'event_address' => $data['event_address'],
                'note' => $data['note'] ?? null,
                'total_price' => $package->price,
                'status' => BookingStatus::Pending,
            ]);
        });

        // Dispatch Event
        event(new BookingCreated($booking));

        return $booking;
    }

    public function updateStatus(Booking $booking, BookingStatus $newStatus, ?string $reason = null): Booking
    {
        $updateData = ['status' => $newStatus];

        if ($newStatus === BookingStatus::Cancelled && $reason) {
            $updateData['cancelled_reason'] = $reason;
        }

        $booking->update($updateData);

        // Notify customer on status update
        $booking->user->notify(new BookingStatusChangedNotification($booking));

        return $booking->fresh();
    }

    public function cancelBooking(Booking $booking, string $reason, User $actor): Booking
    {
        if (in_array($booking->status, [BookingStatus::Completed, BookingStatus::Cancelled])) {
            throw ValidationException::withMessages([
                'status' => ['Pemesanan ini sudah selesai atau telah dibatalkan sebelumnya.'],
            ]);
        }

        $booking->update([
            'status' => BookingStatus::Cancelled,
            'cancelled_reason' => $reason . ' (oleh ' . $actor->name . ')',
        ]);

        $booking->user->notify(new BookingStatusChangedNotification($booking));

        return $booking->fresh();
    }
}
