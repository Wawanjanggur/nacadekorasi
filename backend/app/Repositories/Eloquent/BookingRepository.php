<?php

namespace App\Repositories\Eloquent;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Repositories\Contracts\BookingRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class BookingRepository extends BaseRepository implements BookingRepositoryInterface
{
    public function __construct(Booking $model)
    {
        parent::__construct($model);
    }

    public function getForUser(int $userId, int $perPage = 10): LengthAwarePaginator
    {
        return $this->model
            ->with(['package.category', 'payments', 'review'])
            ->where('user_id', $userId)
            ->latest()
            ->paginate($perPage);
    }

    public function getAllForAdmin(?BookingStatus $status = null, ?string $search = null, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['user', 'package.category', 'payments', 'review'])
            ->when($status, fn ($q) => $q->where('status', $status))
            ->when($search, function ($q) use ($search) {
                $q->where('booking_code', 'like', "%{$search}%")
                    ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
            })
            ->latest()
            ->paginate($perPage);
    }

    public function findByCode(string $code): ?Booking
    {
        return $this->model
            ->with(['user', 'package.category', 'package.items', 'payments', 'review'])
            ->where('booking_code', $code)
            ->first();
    }

    public function isDateBooked(string $eventDate, ?int $ignoreBookingId = null): bool
    {
        // Misal dalam 1 tanggal, maksimal 3 event bersamaan bisa ditangani
        return $this->model
            ->where('event_date', $eventDate)
            ->whereIn('status', [BookingStatus::Confirmed, BookingStatus::InProgress])
            ->when($ignoreBookingId, fn ($q) => $q->where('id', '!=', $ignoreBookingId))
            ->count() >= 3;
    }
}
