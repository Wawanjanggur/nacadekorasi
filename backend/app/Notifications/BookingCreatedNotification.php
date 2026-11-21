<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingCreatedNotification extends Notification implements ShouldQueue
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
        return (new MailMessage)
            ->subject("Konfirmasi Pemesanan Dekorasi [{$this->booking->booking_code}]")
            ->greeting("Halo {$notifiable->name},")
            ->line("Pemesanan dekorasi Anda untuk acara pada tanggal {$this->booking->event_date->format('d F Y')} telah kami terima.")
            ->line("Paket yang dipilih: {$this->booking->package->name}")
            ->line("Total Biaya: Rp " . number_format((float) $this->booking->total_price, 0, ',', '.'))
            ->line("Silakan melakukan pembayaran Uang Muka (DP) minimal sebesar Rp " . number_format($this->booking->package->min_deposit_amount, 0, ',', '.') . " untuk mengamankan jadwal acara Anda.")
            ->action('Lihat Detail Booking', url("/bookings/{$this->booking->booking_code}"))
            ->line('Terima kasih telah mempercayakan dekorasi acara spesial Anda kepada kami!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'booking_code' => $this->booking->booking_code,
            'package_name' => $this->booking->package->name,
            'event_date' => $this->booking->event_date->format('Y-m-d'),
            'total_price' => (float) $this->booking->total_price,
            'message' => "Booking {$this->booking->booking_code} berhasil dibuat. Menunggu pembayaran DP.",
        ];
    }
}
