<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Models\Booking;
use App\Models\Payment;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PaymentService
{
    public function __construct(
        protected PaymentRepositoryInterface $paymentRepository
    ) {
    }

    public function createPayment(Booking $booking, array $data): Payment
    {
        $amount = (float) $data['amount'];
        $remaining = $booking->remaining_balance;

        if ($remaining <= 0) {
            throw ValidationException::withMessages([
                'amount' => ['Pemesanan ini sudah lunas, tidak ada sisa tagihan.'],
            ]);
        }

        if ($amount > $remaining) {
            throw ValidationException::withMessages([
                'amount' => ["Jumlah pembayaran (Rp " . number_format($amount, 0, ',', '.') . ") melebihi sisa tagihan (Rp " . number_format($remaining, 0, ',', '.') . ")."],
            ]);
        }

        $type = PaymentType::from($data['type']);
        if ($type === PaymentType::DownPayment && $amount < $booking->package->min_deposit_amount) {
            throw ValidationException::withMessages([
                'amount' => ['Pembayaran DP minimal adalah Rp ' . number_format($booking->package->min_deposit_amount, 0, ',', '.')],
            ]);
        }

        return DB::transaction(function () use ($booking, $data, $type, $amount) {
            $paymentCode = 'PAY-' . now()->format('Ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));

            return $this->paymentRepository->create([
                'booking_id' => $booking->id,
                'payment_code' => $paymentCode,
                'type' => $type,
                'amount' => $amount,
                'payment_method' => $data['payment_method'] ?? 'bank_transfer',
                'status' => PaymentStatus::PendingVerification,
                'proof_image' => $data['proof_image'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);
        });
    }

    public function verifyPayment(Payment $payment, bool $isApproved, ?string $notes = null): Payment
    {
        return DB::transaction(function () use ($payment, $isApproved, $notes) {
            if ($isApproved) {
                $payment->update([
                    'status' => PaymentStatus::Paid,
                    'paid_at' => now(),
                    'notes' => $notes ?? 'Pembayaran berhasil diverifikasi',
                ]);

                // Auto confirm booking if it is pending and DP/Full is verified
                $booking = $payment->booking;
                if ($booking->status === BookingStatus::Pending && in_array($payment->type, [PaymentType::DownPayment, PaymentType::Full])) {
                    $booking->update(['status' => BookingStatus::Confirmed]);
                }
            } else {
                $payment->update([
                    'status' => PaymentStatus::Failed,
                    'notes' => $notes ?? 'Bukti pembayaran tidak valid / ditolak.',
                ]);
            }

            return $payment->fresh();
        });
    }
}
