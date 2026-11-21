<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('package_id')->constrained('decoration_packages')->restrictOnDelete();
            $table->date('event_date');
            $table->string('event_time')->nullable();
            $table->string('event_location');
            $table->text('event_address');
            $table->text('note')->nullable();
            $table->decimal('total_price', 12, 2);
            $table->string('status')->default('pending'); // pending, confirmed, in_progress, completed, cancelled
            $table->text('cancelled_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
