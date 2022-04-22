FROM composer:2
FROM php:8.1-fpm-alpine3.14

RUN mkdir -p /app && chown -R www-data:www-data /app

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .
