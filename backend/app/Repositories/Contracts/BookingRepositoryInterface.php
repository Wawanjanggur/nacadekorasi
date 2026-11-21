<?php

namespace App\Repositories\Contracts;

use App\Enums\BookingStatus;
use App\Models\Booking;
use Illuminate\Pagination\LengthAwarePaginator;

interface BookingRepositoryInterface extends BaseRepositoryInterface
{
    public function getForUser(int $userId, int $perPage = 10): LengthAwarePaginator;

    public function getAllForAdmin(?BookingStatus $status = null, ?string $search = null, int $perPage = 15): LengthAwarePaginator;

    public function findByCode(string $code): ?Booking;

    public function isDateBooked(string $eventDate, ?int $ignoreBookingId = null): bool;
}
