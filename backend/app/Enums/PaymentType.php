<?php

namespace App\Enums;

enum PaymentType: string
{
    case DownPayment = 'dp';
    case Settlement = 'settlement';
    case Full = 'full';

    public function label(): string
    {
        return match ($this) {
            self::DownPayment => 'Uang Muka (DP)',
            self::Settlement => 'Pelunasan',
            self::Full => 'Pembayaran Penuh (100%)',
        };
    }
}
