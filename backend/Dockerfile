FROM docker.io/library/php:8.4-cli

# Install dependensi sistem dan ekstensi PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    $PHPIZE_DEPS \
    libsqlite3-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
 && pecl install redis \
 && docker-php-ext-enable redis \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-configure intl \
 && docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath intl xml zip gd \
 && rm -rf /var/lib/apt/lists/*

# Salin Composer
COPY --from=docker.io/library/composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

EXPOSE 8000

CMD ["php", "artisan", "serve", "--no-reload", "--host=0.0.0.0", "--port=8000"]
