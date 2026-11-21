# Dokumentasi REST API Sistem Dekorasi v1

Base URL: `http://localhost:8000/api/v1`

Semua request yang mengirimkan body JSON wajib menyertakan header:
```http
Accept: application/json
Content-Type: application/json
```
Untuk endpoint yang terproteksi, sertakan token autentikasi:
```http
Authorization: Bearer {token}
```

---

## 1. Autentikasi (`/auth`)

### Register Customer Baru
- **Method / URL**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "password": "password123",
    "phone": "08123456789"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registrasi berhasil",
    "data": {
      "user": {
        "id": 4,
        "name": "Budi Santoso",
        "email": "budi@example.com",
        "role": "customer",
        "role_label": "Customer",
        "phone": "08123456789",
        "avatar": null
      },
      "token": "1|abc123token...",
      "token_type": "Bearer"
    }
  }
  ```

### Login
- **Method / URL**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "admin@dekorasi.com",
    "password": "password"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login berhasil",
    "data": {
      "user": { ... },
      "token": "2|xyz789token...",
      "token_type": "Bearer"
    }
  }
  ```

### Profil Pengguna Saat Ini
- **Method / URL**: `GET /auth/me` *(Auth required)*

### Logout
- **Method / URL**: `POST /auth/logout` *(Auth required)*

---

## 2. Kategori & Katalog Paket Dekorasi (`/categories`, `/packages`)

### Daftar Kategori
- **Method / URL**: `GET /categories`
- **Response**: List kategori (Wedding, Engagement, Birthday, Corporate, Photobooth) dengan jumlah paket aktif.

### Daftar Paket Dekorasi
- **Method / URL**: `GET /packages?category_id=1&search=rustic&page=1&per_page=12`
- **Response**: List paket dengan relasi kategori, list items/properti dekorasi, total review & rating.

### Detail Paket Dekorasi
- **Method / URL**: `GET /packages/{slug}`
- **Response**: Informasi detail paket, daftar item penyusun paket beserta kuantitas, review customer, dan kalkulasi minimal DP.

### Tambah Paket (Admin Only)
- **Method / URL**: `POST /packages` *(Auth required, Role: Admin)*
- **Body**:
  ```json
  {
    "category_id": 1,
    "name": "Paket Outdoor Garden Twilight",
    "description": "Dekorasi pernikahan romantis outdoor di taman...",
    "price": 11000000,
    "deposit_percentage": 30,
    "thumbnail": "https://example.com/thumbnail.jpg",
    "is_active": true,
    "items": [
      { "item_id": 1, "quantity": 1 },
      { "item_id": 3, "quantity": 4 }
    ]
  }
  ```

---

## 3. Pemesanan / Booking (`/bookings`)

### Buat Booking Baru (Customer)
- **Method / URL**: `POST /bookings` *(Auth required)*
- **Body**:
  ```json
  {
    "package_id": 1,
    "event_date": "2026-11-20",
    "event_time": "09:00 - 16:00",
    "event_location": "Gedung Pernikahan Grand Melati",
    "event_address": "Jl. Asia Afrika No. 12",
    "note": "Tema nuansa emerald green dan gold"
  }
  ```
- **Response (201 Created)**: Mengembalikan data booking dengan kode unik misal `DKR-20260921-A1B2` dan status awal `pending`.

### Daftar Booking
- **Method / URL**: `GET /bookings` *(Auth required)*
  - Customer melihat histori pemesanannya sendiri.
  - Staff / Admin melihat seluruh pemesanan pelanggan dengan filter `?status=pending&search=...`.

### Detail Booking
- **Method / URL**: `GET /bookings/{booking_code}` *(Auth required)*
  - Menampilkan data lengkap, kalkulasi pembayaran: `total_price`, `total_paid`, `remaining_balance`, `is_fully_paid`.

### Batalkan Booking
- **Method / URL**: `POST /bookings/{booking_id}/cancel` *(Auth required)*
- **Body**:
  ```json
  {
    "reason": "Perubahan rencana jadwal dari keluarga"
  }
  ```

### Ubah Status Booking (Staff / Admin)
- **Method / URL**: `PATCH /bookings/{booking_id}/status` *(Auth required, Role: Admin/Staff)*
- **Body**:
  ```json
  {
    "status": "in_progress",
    "reason": "Kru sudah tiba dan dekorasi sedang dipasang"
  }
  ```
- Status yang tersedia: `pending`, `confirmed`, `in_progress`, `completed`, `cancelled`.

---

## 4. Pembayaran / Payment (`/bookings/{booking}/payments`, `/payments`)

### Kirim Pembayaran / DP (Customer)
- **Method / URL**: `POST /bookings/{booking_id}/payments` *(Auth required)*
- **Body**:
  ```json
  {
    "type": "dp",
    "amount": 4500000,
    "payment_method": "bank_transfer",
    "proof_image": "https://example.com/receipt.jpg",
    "notes": "Pembayaran DP 30% via transfer BCA"
  }
  ```

### Verifikasi Pembayaran (Staff / Admin)
- **Method / URL**: `PATCH /payments/{payment_id}/verify` *(Auth required, Role: Admin/Staff)*
- **Body**:
  ```json
  {
    "is_approved": true,
    "notes": "Dana telah masuk di rekening BCA perusahaan"
  }
  ```
- *Catatan: Ketika pembayaran DP atau Full diverifikasi, status booking secara otomatis berubah dari `pending` menjadi `confirmed`.*

---

## 5. Ulasan / Review (`/reviews`)

### Beri Ulasan Paket Dekorasi (Customer)
- **Method / URL**: `POST /reviews` *(Auth required)*
- **Body**:
  ```json
  {
    "booking_id": 1,
    "rating": 5,
    "comment": "Dekorasi sangat cantik, semua keluarga dan tamu puas!"
  }
  ```
- *Catatan: Hanya dapat diisi jika status booking sudah `completed`.*

---

## 6. Health Check
- **Method / URL**: `GET /health`
- **Response**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-09-21T03:30:00.000000Z",
    "service": "dekorasi-backend-api",
    "version": "1.0.0"
  }
  ```
