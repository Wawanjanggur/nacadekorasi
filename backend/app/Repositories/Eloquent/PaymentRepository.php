<?php

namespace App\Repositories\Eloquent;

use App\Enums\PaymentStatus;
use App\Models\Payment;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PaymentRepository extends BaseRepository implements PaymentRepositoryInterface
{
    public function __construct(Payment $model)
    {
        parent::__construct($model);
    }

    public function getForBooking(int $bookingId): array
    {
        return $this->model
            ->where('booking_id', $bookingId)
            ->latest()
            ->get()
            ->all();
    }

    public function getAllForAdmin(?PaymentStatus $status = null, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['booking.user', 'booking.package'])
            ->when($status, fn ($q) => $q->where('status', $status))
            ->latest()
            ->paginate($perPage);
    }

    public function findByCode(string $code): ?Payment
    {
        return $this->model
            ->with(['booking.user', 'booking.package'])
            ->where('payment_code', $code)
            ->first();
    }
}
