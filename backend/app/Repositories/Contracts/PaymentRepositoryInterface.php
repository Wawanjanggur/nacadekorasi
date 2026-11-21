<?php

namespace App\Repositories\Contracts;

use App\Enums\PaymentStatus;
use App\Models\Payment;
use Illuminate\Pagination\LengthAwarePaginator;

interface PaymentRepositoryInterface extends BaseRepositoryInterface
{
    public function getForBooking(int $bookingId): array;

    public function getAllForAdmin(?PaymentStatus $status = null, int $perPage = 15): LengthAwarePaginator;

    public function findByCode(string $code): ?Payment;
}
