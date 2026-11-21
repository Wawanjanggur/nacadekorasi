<?php

namespace App\Http\Controllers\Api;

use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\StorePaymentRequest;
use App\Http\Requests\Payment\VerifyPaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Booking;
use App\Models\Payment;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use App\Services\PaymentService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected PaymentRepositoryInterface $paymentRepository,
        protected PaymentService $paymentService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! ($user->isAdmin() || $user->isStaff())) {
            return $this->error('Akses tidak diizinkan', 403);
        }

        $status = $request->query('status') ? PaymentStatus::tryFrom($request->query('status')) : null;
        $payments = $this->paymentRepository->getAllForAdmin($status);

        return $this->success([
            'items' => PaymentResource::collection($payments->items()),
            'pagination' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(),
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
            ],
        ], 'Daftar transaksi pembayaran');
    }

    public function store(StorePaymentRequest $request, Booking $booking): JsonResponse
    {
        $this->authorize('create', [Payment::class, $booking]);

        $payment = $this->paymentService->createPayment(
            $booking,
            $request->validated()
        );

        return $this->created(
            new PaymentResource($payment),
            'Bukti pembayaran berhasil dikirim. Menunggu verifikasi admin.'
        );
    }

    public function verify(VerifyPaymentRequest $request, Payment $payment): JsonResponse
    {
        $this->authorize('verify', $payment);

        $validated = $request->validated();
        $updated = $this->paymentService->verifyPayment(
            $payment,
            (bool) $validated['is_approved'],
            $validated['notes'] ?? null
        );

        return $this->success(
            new PaymentResource($updated->load('booking')),
            $validated['is_approved'] ? 'Pembayaran berhasil diverifikasi (Lunas)' : 'Pembayaran ditolak'
        );
    }
}
