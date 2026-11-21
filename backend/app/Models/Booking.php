<?php

namespace App\Models;

use App\Enums\BookingStatus;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

class Booking extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'booking_code',
        'user_id',
        'package_id',
        'event_date',
        'event_time',
        'event_location',
        'event_address',
        'note',
        'total_price',
        'status',
        'cancelled_reason',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'total_price' => 'decimal:2',
            'status' => BookingStatus::class,
        ];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['status', 'event_date', 'total_price', 'cancelled_reason'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn (string $eventName) => "Booking telah di-{$eventName}");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(DecorationPackage::class, 'package_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }

    public function getTotalPaidAttribute(): float
    {
        return (float) $this->payments()
            ->where('status', PaymentStatus::Paid)
            ->sum('amount');
    }

    public function getRemainingBalanceAttribute(): float
    {
        return max(0, (float) $this->total_price - $this->total_paid);
    }

    public function isFullyPaid(): bool
    {
        return $this->remaining_balance <= 0;
    }
}
