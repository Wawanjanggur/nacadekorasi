# NacaDecor - Wedding Decoration & Attire Booking System

A full-stack web application for booking wedding decorations and attire, built with Laravel 13 backend and Next.js 16 frontend.

## 🌟 Features

- **Decoration Package Booking**: Browse and book wedding decoration packages with multiple options (Wagal, Traditional, Wedding)
- **Attire Rental**: Rent formal wear including wedding gowns and suits
- **Makeup Services**: Professional makeup artist bookings
- **Price Calculator**: Dynamic pricing calculator with bundling discounts
- **Payment Management**: Deposit tracking with flexible payment status
- **Admin Dashboard**: Complete admin panel for managing bookings, users, and analytics
- **Role-based Access Control**: User, Staff, and Admin roles with granular permissions
- **Notification System**: Real-time notifications via email and WhatsApp integration

## 🏗️ Tech Stack

### Backend
- **Framework**: Laravel 13.x
- **PHP Version**: ^8.3
- **Database**: SQLite (development), MySQL/PgSQL (production)
- **Caching**: Redis
- **Authentication**: Laravel Sanctum API tokens
- **Media Handling**: Spatie Media Library
- **Activity Logging**: Spatie Activity Log
- **Testing**: Pest PHP

### Frontend
- **Framework**: Next.js 16.x (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **UI Components**: Lucide React icons
- **Build Tool**: Node.js with custom build scripts

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Environment**: Ubuntu Linux (WSL2 compatible)

## 🚀 Installation

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development without Docker)
- Composer 2+
- PHP 8.3+ (for local development without Docker)

### Quick Start with Docker

```bash
# Clone repository
git clone <repository-url>
cd dekorasi

# Start all services
docker-compose up -d

# Access services
# Frontend: http://localhost:3001
# Backend API: http://localhost:8001
# Redis: localhost:6381
```

### Local Development Setup

#### Backend
```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Seed database (optional)
php artisan db:seed

# Install frontend dependencies
npm install

# Build assets
npm run build

# Start Laravel server
composer run dev
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local to set API_URL
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1

# Start development server
npm run dev
```

## 📁 Project Structure

```
dekorasi/
├── backend/                 # Laravel backend API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/    # API controllers
│   │   │   ├── Middleware/          # Custom middleware
│   │   │   ├── Resources/           # API Resources (Transformers)
│   │   │   └── Requests/            # Form Request validation
│   │   ├── Models/                  # Eloquent models
│   │   ├── Repositories/            # Repository pattern implementation
│   │   ├── Services/                # Business logic layer
│   │   ├── Events/                  # Application events
│   │   ├── Notifications/           # User notifications
│   │   ├── Jobs/                    # Async jobs
│   │   └── Enums/                   # Domain enums
│   ├── database/
│   │   ├── migrations/              # Database schema
│   │   ├── seeders/                 # Test data seeding
│   │   └── factories/               # Model factories
│   ├── routes/api.php              # API route definitions
│   └── config/                     # Configuration files
│
├── frontend/                      # Next.js frontend
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── auth/              # Authentication pages
│   │   │   ├── dashboard/         # User dashboard
│   │   │   └── admin/             # Admin panel
│   │   ├── components/
│   │   │   ├── layout/            # Layout components
│   │   │   └── ui/                # UI primitives
│   │   ├── context/               # React Context providers
│   │   ├── lib/                   # Utility functions
│   │   ├── services/              # API service layers
│   │   └── types/                 # TypeScript type definitions
│   └── public/                    # Static assets
│
└── docker-compose.yml             # Docker orchestration
```

## 🔐 Environment Variables

### Backend (.env)
```env
APP_NAME=NacaDecor
APP_ENV=local
APP_KEY=your-app-key-here
APP_DEBUG=true
APP_URL=http://localhost:8001

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/html/database/database.sqlite

REDIS_HOST=redis
REDIS_PORT=6379

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001/api/v1
NEXT_PUBLIC_STORAGE_URL=http://127.0.0.1:8001/storage
NEXT_PUBLIC_APP_NAME=NacaDecor
```

## 🛠️ Available Commands

### Backend (Laravel)

```bash
# Development
composer run dev           # Starts server, queue worker, and Vite
composer run setup         # Full installation setup
composer test              # Run test suite
composer pint              # Code formatter
php artisan make:model     # Create new model
php artisan make:test      # Create test case
php artisan migrate:fresh  # Reset database
```

### Frontend (Next.js)

```bash
npm run dev        # Development server (port 3001)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
```

## 🔑 API Endpoints

All API endpoints are prefixed with `/api/v1`

### Authentication
- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user info

### Packages (Decoration)
- `GET /packages` - List all packages
- `GET /packages/{slug}` - Get package details
- `POST /packages` - Create package (admin only)
- `PUT /packages/{id}` - Update package (admin only)
- `DELETE /packages/{id}` - Delete package (admin only)

### Bookings
- `GET /bookings` - List user/admin bookings
- `GET /bookings/{code}` - Get booking by code
- `POST /bookings` - Create new booking
- `POST /bookings/{code}/cancel` - Cancel booking
- `POST /bookings/{code}/update-status` - Update status (staff/admin)

### Payments
- `GET /payments` - List payments
- `POST /payments` - Record payment
- `POST /payments/{id}/verify` - Verify payment

### Reviews
- `GET /reviews?package_id=X` - List package reviews
- `POST /reviews` - Submit review

## 👥 Roles & Permissions

### User (Customer)
- Browse packages
- Create bookings
- Make payments
- Write reviews
- View own bookings

### Staff
- All user permissions
- Manage all bookings
- Update booking status
- Verify payments
- Moderate reviews

### Admin
- All staff permissions
- Manage users
- Configure system settings
- View analytics

## 🧪 Testing

```bash
# Run all tests
vendor/bin/pest

# Run specific test file
vendor/bin/pest tests/Feature/BookingApiTest.php

# Run with coverage
vendor/bin/pest --coverage
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For support, email support@nacadecor.com or join our community Discord.

## 🙏 Acknowledgments

- Laravel Framework Team
- Next.js Contributors
- Open Source Community
