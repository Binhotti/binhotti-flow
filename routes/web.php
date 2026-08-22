<?php

declare(strict_types=1);

use App\Controllers\AuthController;
use App\Controllers\DashboardController;

return [
    'GET /' => [DashboardController::class, 'index'],

    'GET /login' => [AuthController::class, 'showLogin'],
    'POST /login' => [AuthController::class, 'login'],

    'GET /register' => [AuthController::class, 'showRegister'],
    'POST /register' => [AuthController::class, 'register'],

    'POST /logout' => [AuthController::class, 'logout'],
];
