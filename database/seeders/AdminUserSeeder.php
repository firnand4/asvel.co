<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

/**
 * Creates the admin account, or resets its password, from .env (see config/admin.php).
 * Safe to re-run on its own:
 *   php artisan db:seed --class=AdminUserSeeder
 */
class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $password = config('admin.password');
        if (blank($password)) {
            throw new RuntimeException('ADMIN_PASSWORD is not set. Add it to .env before running the seeder.');
        }

        User::updateOrCreate(
            ['email' => config('admin.email')],
            ['name' => config('admin.name'), 'password' => Hash::make($password)]
        );
    }
}
