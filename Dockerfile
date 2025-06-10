FROM phpswoole/swoole:php8.3-alpine AS base

# Set working directory
WORKDIR /var/www/html

RUN apk add --no-cache libpq-dev libxml2-dev curl-dev libzip-dev libpng-dev icu-dev libsodium-dev \
    && docker-php-ext-install pdo_pgsql xml bcmath curl opcache zip gd intl sodium

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

FROM base AS deps

# Copy Composer manifests
COPY composer.json composer.lock ./

# Install PHP deps & Laravel Octane
RUN composer install --no-dev --no-interaction --no-autoloader --no-scripts

FROM base AS app

# Copy Composer dependencies
COPY --from=deps /var/www/html/vendor /var/www/html/vendor

# Copy Laravel app
COPY . .

RUN composer dump-autoload --optimize && \
    php artisan octane:install --server=swoole && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

RUN chown -R www-data /var/www/html

USER www-data

EXPOSE 8000

CMD ["php", "artisan", "octane:start", "--server=swoole", "--host=0.0.0.0", "--port=8000", "--workers=4", "--task-workers=4"]
