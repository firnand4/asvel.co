#!/usr/bin/env bash
# Deploy asvel.id on the VPS. Run from any directory as the user that owns the app files:
#   bash /var/www/asvel.co/deploy.sh
#
# Assumes the SSR server runs as the systemd unit in deploy/asvel-ssr.service (Restart=always),
# so stopping it at the end makes systemd start it again with the new bundle.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/asvel.co}"
cd "$APP_DIR"

echo "==> Maintenance mode"
php artisan down --retry=15 || true
trap 'php artisan up' EXIT

echo "==> Code"
git pull --ff-only

echo "==> PHP dependencies"
composer install --no-dev --optimize-autoloader --no-interaction

echo "==> Frontend: client bundle + SSR bundle (bootstrap/ssr/ssr.js)"
npm ci
npm run build

echo "==> Database"
php artisan migrate --force
# Idempotent: only creates service pages that do not exist yet; admin edits are kept.
php artisan db:seed --class=ServicePagesSeeder --force

echo "==> Storage link (uploaded team photos and portfolio screenshots)"
[ -L public/storage ] || php artisan storage:link

echo "==> Caches"
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Restart SSR (systemd brings it back up with the new bundle)"
php artisan inertia:stop-ssr || true

echo "==> Done"
