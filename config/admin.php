<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Initial Admin Account
    |--------------------------------------------------------------------------
    |
    | Used by DatabaseSeeder to create the first admin user. The password has
    | no default on purpose: set ADMIN_PASSWORD in .env before seeding.
    |
    */

    'name' => env('ADMIN_NAME', 'Asvel Admin'),

    'email' => env('ADMIN_EMAIL', 'admin@asvel.co'),

    'password' => env('ADMIN_PASSWORD'),

];
