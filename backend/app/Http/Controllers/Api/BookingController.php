<?php

namespace App\Http\Controllers\Api;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\CancelBookingRequest;
use App\Http\Requests\Booking\StoreBookingRequest;
use App\Http\Requests\Booking\UpdateBookingStatusRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Repositories\Contracts\BookingRepositoryInterface;
use App\Services\BookingService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected BookingRepositoryInterface $bookingRepository,
        protected BookingService $bookingService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isAdmin() || $user->isStaff()) {
            $status = $request->query('status') ? BookingStatus::tryFrom($request->query('status')) : null;
            $search = $request->query('search');
            $bookings = $this->bookingRepository->getAllForAdmin($status, $search);
        } else {
            $bookings = $this->bookingRepository->getForUser($user->id);
        }

        return $this->success([
            'items' => BookingResource::collection($bookings->items()),
            'pagination' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ], 'Daftar booking dekorasi');
    }

    public function show(string $code, Request $request): JsonResponse
    {
        $booking = $this->bookingRepository->findByCode($code);

        if (! $booking) {
            return $this->error('Data booking tidak ditemukan', 404);
        }

        $this->authorize('view', $booking);

        return $this->success(new BookingResource($booking), 'Detail pemesanan dekorasi');
    }

    public function store(StoreBookingRequest $request): JsonResponse
    {
        $booking = $this->bookingService->createBooking(
            $request->user(),
            $request->validated()
        );

        return $this->created(
            new BookingResource($booking->load(['package.category'])),
            'Booking dekorasi berhasil dibuat. Silakan lakukan pembayaran DP.'
        );
    }

    public function updateStatus(UpdateBookingStatusRequest $request, Booking $booking): JsonResponse
    {
        $this->authorize('updateStatus', $booking);

        $newStatus = BookingStatus::from($request->validated()['status']);
        $reason = $request->validated()['reason'] ?? null;

        $updated = $this->bookingService->updateStatus($booking, $newStatus, $reason);

        return $this->success(new BookingResource($updated->load(['package', 'user'])), 'Status booking berhasil diubah');
    }

    public function cancel(CancelBookingRequest $request, Booking $booking): JsonResponse
    {
        $this->authorize('cancel', $booking);

        $updated = $this->bookingService->cancelBooking(
            $booking,
            $request->validated()['reason'],
            $request->user()
        );

        return $this->success(new BookingResource($updated), 'Pemesanan berhasil dibatalkan');
    }
}
