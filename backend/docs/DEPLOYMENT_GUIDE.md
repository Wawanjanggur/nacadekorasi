# Panduan Deployment & Production Readiness Checklist

Berikut adalah instruksi untuk deployment backend ke server production (VPS, Docker, Forge, Ploi, atau AWS/GCP):

---

## 1. Environment Configuration (`.env.production`)
Pastikan variabel environment berikut disesuaikan:
```dotenv
APP_NAME="Dekorasi App"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.dekorasi.com

# Database (MySQL / PostgreSQL untuk skala production)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dekorasi_production
DB_USERNAME=dekorasi_user
DB_PASSWORD=secret_db_password

# Queue & Cache
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Mail Server
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=postmaster@mg.dekorasi.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@dekorasi.com"
MAIL_FROM_NAME="${APP_NAME}"
```

---

## 2. Langkah Deployment (CI/CD / Release Script)

```bash
# 1. Masuk ke direktori backend
cd /var/www/dekorasi/backend

# 2. Tarik update kode terbaru
git pull origin main

# 3. Install composer dependencies (no dev, optimized)
composer install --no-dev --optimize-autoloader

# 4. Jalankan migrasi database
php artisan migrate --force

# 5. Buat storage symbolic link jika belum
php artisan storage:link

# 6. Optimasi Cache Laravel untuk Production Performance
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 7. Restart Queue Worker & Supervisor
php artisan queue:restart
sudo supervisorctl restart all
```

---

## 3. Monitoring & Background Workers (Supervisor)

### Worker Queue (Supervisor config `/etc/supervisor/conf.d/dekorasi-worker.conf`):
```ini
[program:dekorasi-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/dekorasi/backend/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/dekorasi/backend/storage/logs/worker.log
stopwaitsecs=3600
```

### Scheduler Cronjob (`crontab -e`):
```cron
* * * * * cd /var/www/dekorasi/backend && php artisan schedule:run >> /dev/null 2>&1
```

### Health Check Monitoring
Gunakan endpoint:
```http
GET https://api.dekorasi.com/api/v1/health
```
Dapat diintegrasikan dengan tools monitoring seperti Uptime Kuma, Better Uptime, Datadog, atau Prometheus/Grafana.
