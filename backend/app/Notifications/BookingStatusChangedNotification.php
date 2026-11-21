<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingStatusChangedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Booking $booking)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $statusLabel = $this->booking->status->label();

        return (new MailMessage)
            ->subject("Update Status Pemesanan [{$this->booking->booking_code}] - {$statusLabel}")
            ->greeting("Halo {$notifiable->name},")
            ->line("Status pemesanan dekorasi Anda [{$this->booking->booking_code}] telah diperbarui menjadi: **{$statusLabel}**.")
            ->when($this->booking->cancelled_reason, fn ($mail) => $mail->line("Alasan pembatalan: {$this->booking->cancelled_reason}"))
            ->action('Cek Status Booking', url("/bookings/{$this->booking->booking_code}"))
            ->line('Hubungi layanan pelanggan kami jika Anda membutuhkan bantuan.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'booking_code' => $this->booking->booking_code,
            'status' => $this->booking->status->value,
            'status_label' => $this->booking->status->label(),
        ];
    }
}
